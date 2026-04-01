import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const packageDir = resolve(scriptDir, "..");
const distDir = resolve(packageDir, "dist");

await rm(distDir, { recursive: true, force: true });
await execFileAsync("pnpm", ["exec", "tsc", "-p", "tsconfig.build.json"], {
  cwd: packageDir
});
await mkdir(resolve(distDir, "data"), { recursive: true });
await mkdir(resolve(distDir, "generated"), { recursive: true });
await cp(resolve(packageDir, "data"), resolve(distDir, "data"), { recursive: true });
await cp(resolve(packageDir, "generated"), resolve(distDir, "generated"), { recursive: true });
await cp(resolve(packageDir, "tokens.css"), resolve(distDir, "tokens.css"));
