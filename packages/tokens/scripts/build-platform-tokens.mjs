import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { loadNormalizedTokenGraph } from "./platform/normalize-tokens.mjs";
import { renderSwiftUIArtifacts } from "./platform/render-swiftui.mjs";
import { renderKotlinArtifacts } from "./platform/render-kotlin.mjs";
import { renderWindowsArtifacts } from "./platform/render-windows.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const tokensDir = resolve(scriptDir, "..");
const generatedDir = resolve(tokensDir, "generated");

const renderers = {
  swiftui: renderSwiftUIArtifacts,
  kotlin: renderKotlinArtifacts,
  windows: renderWindowsArtifacts
};

function parseArgs(argv) {
  const args = {
    platforms: Object.keys(renderers),
    syncConsumerRoot: null,
    syncSubdir: ".generated",
    validateConsumer: false
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--platform") {
      args.platforms = [argv[index + 1]];
      index += 1;
    } else if (arg === "--sync-consumer-root") {
      args.syncConsumerRoot = resolve(process.cwd(), argv[index + 1]);
      index += 1;
    } else if (arg === "--sync-subdir") {
      args.syncSubdir = argv[index + 1];
      index += 1;
    } else if (arg === "--validate-consumer") {
      args.validateConsumer = true;
    }
  }
  return args;
}

async function writeArtifacts(platform, artifactMap) {
  const platformDir = resolve(generatedDir, platform);
  await rm(platformDir, { recursive: true, force: true });
  await mkdir(platformDir, { recursive: true });

  for (const [fileName, contents] of Object.entries(artifactMap)) {
    await writeFile(resolve(platformDir, fileName), contents, "utf8");
  }

  return platformDir;
}

async function syncConsumer(platform, consumerRoot, syncSubdir) {
  const consumerGeneratedDir = resolve(consumerRoot, syncSubdir);
  const sourceDir = resolve(generatedDir, platform);
  await rm(consumerGeneratedDir, { recursive: true, force: true });
  await mkdir(consumerGeneratedDir, { recursive: true });
  await cp(sourceDir, consumerGeneratedDir, { recursive: true });
  return consumerGeneratedDir;
}

async function validateConsumerSync(platform, consumerRoot, syncSubdir) {
  const consumerGeneratedDir = resolve(consumerRoot, syncSubdir);
  if (!existsSync(consumerGeneratedDir)) {
    throw new Error(`Missing synced consumer directory for ${platform}: ${consumerGeneratedDir}`);
  }

  const sourceFiles = await Promise.all(
    Object.keys(renderers[platform](loadNormalizedTokenGraph())).map(async (fileName) => {
      const source = await readFile(resolve(generatedDir, platform, fileName), "utf8");
      const consumer = await readFile(resolve(consumerGeneratedDir, fileName), "utf8");
      if (source !== consumer) {
        throw new Error(`Consumer artifact is out of sync for ${platform}: ${fileName}`);
      }
      return fileName;
    })
  );

  return sourceFiles;
}

export async function generatePlatformArtifacts(platforms = Object.keys(renderers)) {
  const graph = loadNormalizedTokenGraph();
  const generated = {};

  for (const platform of platforms) {
    generated[platform] = renderers[platform](graph);
  }

  return generated;
}

const args = parseArgs(process.argv.slice(2));
const artifactsByPlatform = await generatePlatformArtifacts(args.platforms);

for (const platform of args.platforms) {
  await writeArtifacts(platform, artifactsByPlatform[platform]);
  if (args.syncConsumerRoot) {
    await syncConsumer(platform, args.syncConsumerRoot, args.syncSubdir);
    if (args.validateConsumer) {
      await validateConsumerSync(platform, args.syncConsumerRoot, args.syncSubdir);
    }
  }
}

console.log(`Generated platform token artifacts for: ${args.platforms.join(", ")}`);
if (args.syncConsumerRoot) {
  console.log(`Synced consumer artifacts to: ${resolve(args.syncConsumerRoot, args.syncSubdir)}`);
}
