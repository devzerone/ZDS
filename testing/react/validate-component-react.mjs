import { readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const componentsDir = resolve(root, "packages/react/src/components");

function collectTestFiles(dir) {
  const files = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = resolve(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...collectTestFiles(fullPath));
      continue;
    }

    if (entry.endsWith(".test.ts") || entry.endsWith(".test.tsx")) {
      files.push(fullPath);
    }
  }

  return files;
}

const testFiles = collectTestFiles(componentsDir).sort();

if (testFiles.length === 0) {
  console.error("No React component test files were found.");
  process.exit(1);
}

console.log(`Running ${testFiles.length} React component test file(s)...`);

const result = spawnSync(
  process.execPath,
  ["--import", "tsx", "--test", ...testFiles],
  {
    stdio: "inherit",
    cwd: root,
    env: process.env
  }
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log("\nAll React component tests passed.");
