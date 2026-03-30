import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const docsDist = resolve(root, "apps/docs/dist/index.html");
const docsContent = resolve(root, "apps/docs/content/components/button.mdx");
const docsPage = resolve(root, "apps/docs/app/components/button/page.tsx");

const requiredStates = ["default", "disabled", "loading", "focus", "hover", "pressed"];
const requiredRefs = [
  "spec/components/button/button.spec.json",
  "packages/tokens/data/components/button.json",
  "pen/components/button/button.pen",
  "packages/react/components/button/Button.tsx"
];

const errors = [];

if (!existsSync(docsDist)) {
  errors.push("Missing docs build artifact: apps/docs/dist/index.html");
}

const content = existsSync(docsContent) ? readFileSync(docsContent, "utf8") : "";
const page = existsSync(docsPage) ? readFileSync(docsPage, "utf8") : "";

for (const state of requiredStates) {
  if (!content.includes(state) && !page.includes(state)) {
    errors.push(`Missing required button state in docs surface: ${state}`);
  }
}

for (const ref of requiredRefs) {
  if (!page.includes(ref)) {
    errors.push(`Missing source reference in button docs page: ${ref}`);
  }
}

if (!docsContent.includes("/apps/docs/content/")) {
  // no-op; ownership is enforced by canonical path itself
}

if (errors.length > 0) {
  console.error("Docs validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Docs build validation passed.");
