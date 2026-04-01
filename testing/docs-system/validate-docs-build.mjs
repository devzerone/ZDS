import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const docsDist = resolve(root, "apps/docs/dist/index.html");

const errors = [];

if (!existsSync(docsDist)) {
  errors.push("Missing docs build artifact: apps/docs/dist/index.html");
}

const docsSurfaces = [
  {
    name: "foundation-tokens",
    contentPath: resolve(root, "apps/docs/content/foundation/tokens.mdx"),
    pagePath: resolve(root, "apps/docs/app/foundation/tokens/page.tsx"),
    requiredTerms: [
      "native token delivery",
      "packages/tokens/generated/swiftui/ZDSButtonTokens.swift",
      "packages/tokens/generated/kotlin/ZDSButtonTokens.kt",
      "packages/tokens/generated/windows/ButtonTokens.xaml",
      "pnpm generate:platform-tokens"
    ],
    requiredRefs: [
      "spec/components/button/button.spec.json",
      "packages/tokens/scripts/build-platform-tokens.mjs",
      "specs/007-native-token-delivery/quickstart.md"
    ]
  },
  {
    name: "button",
    contentPath: resolve(root, "apps/docs/content/components/button.mdx"),
    pagePath: resolve(root, "apps/docs/app/components/button/page.tsx"),
    requiredTerms: ["default", "disabled", "loading", "focus", "hover", "pressed"],
    requiredRefs: [
      "spec/components/button/button.spec.json",
      "packages/tokens/data/components/button.json",
      "pen/components/button/button.pen",
      "packages/react/src/components/button/Button.tsx"
    ]
  },
  {
    name: "breadcrumb",
    contentPath: resolve(root, "apps/docs/content/components/breadcrumb.mdx"),
    pagePath: resolve(root, "apps/docs/app/components/breadcrumb/page.tsx"),
    requiredTerms: ["ancestor", "current", "collapsed-summary", "not-started"],
    requiredRefs: [
      "spec/components/breadcrumb/breadcrumb.spec.json",
      "packages/tokens/data/components/breadcrumb.json",
      "pen/components/breadcrumb/breadcrumb.pen",
      "packages/react/src/components/breadcrumb/Breadcrumb.tsx"
    ]
  }
];

for (const surface of docsSurfaces) {
  const content = existsSync(surface.contentPath) ? readFileSync(surface.contentPath, "utf8") : "";
  const page = existsSync(surface.pagePath) ? readFileSync(surface.pagePath, "utf8") : "";

  for (const term of surface.requiredTerms) {
    if (!content.includes(term) && !page.includes(term)) {
      errors.push(`Missing required ${surface.name} docs term: ${term}`);
    }
  }

  for (const ref of surface.requiredRefs) {
    if (!page.includes(ref)) {
      errors.push(`Missing source reference in ${surface.name} docs page: ${ref}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Docs validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Docs build validation passed.");
