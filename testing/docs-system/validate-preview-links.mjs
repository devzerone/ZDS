import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const errors = [];
const foundationPage = readFileSync(resolve(root, "apps/docs/app/foundation/page.tsx"), "utf8");
const foundationTokensPage = readFileSync(resolve(root, "apps/docs/app/foundation/tokens/page.tsx"), "utf8");
const siteNav = readFileSync(resolve(root, "apps/docs/components/navigation/site-nav.ts"), "utf8");
const surfaces = [
  {
    name: "Button",
    docsPage: readFileSync(resolve(root, "apps/docs/app/components/button/page.tsx"), "utf8"),
    storyFile: readFileSync(resolve(root, "packages/react/src/components/button/Button.stories.tsx"), "utf8"),
    storybookPath: "/storybook/index.html?path=/story/components-button--playground",
    docsRoute: 'docsUrl: "/components/button"',
    metadataMarker: "BUTTON_VISUAL_STATES"
  },
  {
    name: "Breadcrumb",
    docsPage: readFileSync(resolve(root, "apps/docs/app/components/breadcrumb/page.tsx"), "utf8"),
    storyFile: readFileSync(resolve(root, "packages/react/src/components/breadcrumb/Breadcrumb.stories.tsx"), "utf8"),
    storybookPath: "/storybook/index.html?path=/story/components-breadcrumb--playground",
    docsRoute: 'docsUrl: "/components/breadcrumb"',
    metadataMarker: "ConstrainedPath"
  }
];

if (!siteNav.includes('href: "/foundation/tokens"')) {
  errors.push("Site navigation must expose the foundation tokens route.");
}

if (!foundationPage.includes('href="/foundation/tokens"') && !foundationPage.includes('href: "/foundation/tokens"')) {
  errors.push("Foundation landing page must link to the native token delivery guidance.");
}

for (const marker of [
  "packages/tokens/generated/swiftui/ZDSButtonTokens.swift",
  "packages/tokens/generated/kotlin/ZDSButtonTokens.kt",
  "packages/tokens/generated/windows/ButtonTokens.xaml"
]) {
  if (!foundationTokensPage.includes(marker)) {
    errors.push(`Foundation tokens page must reference generated native artifact path: ${marker}`);
  }
}

for (const surface of surfaces) {
  if (!surface.docsPage.includes(surface.storybookPath)) {
    errors.push(`${surface.name} docs page must link to the canonical Storybook preview.`);
  }

  if (!surface.storyFile.includes(surface.docsRoute)) {
    errors.push(`${surface.name} stories must link back to the canonical docs route.`);
  }

  if (!surface.storyFile.includes(surface.metadataMarker)) {
    errors.push(`${surface.name} stories must expose shared metadata or canonical examples for review.`);
  }
}

if (errors.length > 0) {
  console.error("Preview link validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Preview link validation passed.");
