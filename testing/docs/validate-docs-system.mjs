import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const spec = JSON.parse(readFileSync(resolve(root, "spec/components/button/button.spec.json"), "utf8"));
const docsContent = readFileSync(resolve(root, "apps/docs/content/components/button.mdx"), "utf8");
const storyFile = readFileSync(resolve(root, "packages/react/src/components/button/Button.stories.tsx"), "utf8");

const errors = [];

for (const variant of Object.keys(spec.variants)) {
  if (!docsContent.includes(variant) || !storyFile.includes(variant)) {
    errors.push(`Variant missing from docs or stories: ${variant}`);
  }
}

for (const state of Object.keys(spec.states)) {
  if (!docsContent.includes(state) || !storyFile.includes(state)) {
    errors.push(`State missing from docs or stories: ${state}`);
  }
}

for (const size of Object.keys(spec.sizes)) {
  if (!storyFile.includes(size)) {
    errors.push(`Size missing from stories: ${size}`);
  }
}

if (errors.length > 0) {
  console.error("Docs system validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Docs system validation passed.");
