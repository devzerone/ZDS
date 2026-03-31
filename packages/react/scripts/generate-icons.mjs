import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const reactPackageDir = resolve(scriptDir, "..");
const repoRoot = resolve(reactPackageDir, "..", "..");
const foundationIconsDir = resolve(repoRoot, "packages", "foundation", "icons");
const outputDir = resolve(reactPackageDir, "src", "icons");

function toComponentName(filename) {
  const baseName = filename.replace(/\.svg$/i, "");
  return baseName
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
}

const entries = await readdir(foundationIconsDir, { withFileTypes: true });
const svgFiles = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".svg"))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const svgFile of svgFiles) {
  await execFileAsync(
    "pnpm",
    [
      "exec",
      "svgr",
      "--typescript",
      "--icon",
      "--no-dimensions",
      "--out-dir",
      outputDir,
      resolve(foundationIconsDir, svgFile)
    ],
    { cwd: repoRoot }
  );
}

const exportsFile = `${svgFiles
  .map((svgFile) => `export { default as ${toComponentName(svgFile)}Icon } from "./${toComponentName(svgFile)}";`)
  .join("\n")}\n`;

await writeFile(resolve(outputDir, "index.ts"), exportsFile, "utf8");
