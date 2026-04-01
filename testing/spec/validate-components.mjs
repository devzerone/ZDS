import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const validatorsDir = resolve(root, "testing/spec");
const validatorFiles = readdirSync(validatorsDir)
  .filter((entry) => entry.startsWith("validate-") && entry.endsWith("-spec.mjs"))
  .filter((entry) => entry !== "validate-components.mjs")
  .sort();

if (validatorFiles.length === 0) {
  console.error("No component spec validators were found in testing/spec.");
  process.exit(1);
}

console.log(`Running ${validatorFiles.length} component spec validator(s)...`);

for (const file of validatorFiles) {
  const validatorPath = resolve(validatorsDir, file);
  console.log(`\n==> ${file}`);

  const result = spawnSync(process.execPath, [validatorPath], {
    stdio: "inherit",
    cwd: root
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("\nAll component spec validators passed.");
