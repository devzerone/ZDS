import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const docsPage = readFileSync(resolve(root, "apps/docs/app/components/button/page.tsx"), "utf8");
const storyFile = readFileSync(resolve(root, "packages/react/components/button/Button.stories.tsx"), "utf8");

const errors = [];

if (!docsPage.includes("/storybook/index.html?path=/story/components-button--playground")) {
  errors.push("Button docs page must link to the canonical Storybook Button preview.");
}

if (!storyFile.includes('docsUrl: "/components/button"')) {
  errors.push("Button stories must link back to the canonical docs route.");
}

if (!storyFile.includes("BUTTON_VISUAL_STATES")) {
  errors.push("Button stories must source state controls from shared Button metadata.");
}

if (errors.length > 0) {
  console.error("Preview link validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Preview link validation passed.");
