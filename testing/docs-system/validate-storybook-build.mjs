import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const storybookDist = resolve(root, "dist/storybook/index.html");
const storyFile = resolve(root, "packages/react/src/components/button/Button.stories.tsx");
const requiredStates = ["default", "disabled", "loading", "focus", "hover", "pressed"];
const errors = [];

if (!existsSync(storybookDist)) {
  errors.push("Missing Storybook build artifact: dist/storybook/index.html");
}

const storySource = existsSync(storyFile) ? readFileSync(storyFile, "utf8") : "";

for (const state of requiredStates) {
  if (!storySource.includes(state)) {
    errors.push(`Missing required state coverage in Button stories: ${state}`);
  }
}

if (!storySource.includes("docsUrl")) {
  errors.push("Button stories must include canonical docs backlink metadata.");
}

if (errors.length > 0) {
  console.error("Storybook build validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Storybook build validation passed.");
