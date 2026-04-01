import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const errors = [];
const surfaces = [
  {
    name: "foundation-tokens",
    docsContent: readFileSync(resolve(root, "apps/docs/content/foundation/tokens.mdx"), "utf8"),
    docsPage: readFileSync(resolve(root, "apps/docs/app/foundation/tokens/page.tsx"), "utf8"),
    validate() {
      for (const marker of [
        "packages/tokens/generated/swiftui/ZDSButtonTokens.swift",
        "packages/tokens/generated/kotlin/ZDSButtonTokens.kt",
        "packages/tokens/generated/windows/ButtonTokens.xaml",
        "packages/swiftui/components/Button.swift",
        "packages/kotlin/components/Button.kt",
        "packages/windows/components/Button.xaml.cs"
      ]) {
        if (!this.docsContent.includes(marker) && !this.docsPage.includes(marker)) {
          errors.push(`Foundation tokens docs must reference native delivery artifact: ${marker}`);
        }
      }
    }
  },
  {
    name: "button",
    spec: JSON.parse(readFileSync(resolve(root, "spec/components/button/button.spec.json"), "utf8")),
    docsContent: readFileSync(resolve(root, "apps/docs/content/components/button.mdx"), "utf8"),
    storyFile: readFileSync(resolve(root, "packages/react/src/components/button/Button.stories.tsx"), "utf8"),
    validate() {
      for (const variant of Object.keys(this.spec.variants)) {
        if (!this.docsContent.includes(variant) || !this.storyFile.includes(variant)) {
          errors.push(`Button variant missing from docs or stories: ${variant}`);
        }
      }

      for (const state of Object.keys(this.spec.states)) {
        if (!this.docsContent.includes(state) || !this.storyFile.includes(state)) {
          errors.push(`Button state missing from docs or stories: ${state}`);
        }
      }

      for (const size of Object.keys(this.spec.sizes)) {
        if (!this.storyFile.includes(size)) {
          errors.push(`Button size missing from stories: ${size}`);
        }
      }
    }
  },
  {
    name: "breadcrumb",
    spec: JSON.parse(readFileSync(resolve(root, "spec/components/breadcrumb/breadcrumb.spec.json"), "utf8")),
    docsContent: readFileSync(resolve(root, "apps/docs/content/components/breadcrumb.mdx"), "utf8"),
    storyFile: readFileSync(resolve(root, "packages/react/src/components/breadcrumb/Breadcrumb.stories.tsx"), "utf8"),
    validate() {
      for (const role of Object.keys(this.spec.items)) {
        if (!this.docsContent.includes(role)) {
          errors.push(`Breadcrumb role missing from docs: ${role}`);
        }
      }

      for (const platform of Object.keys(this.spec.parity)) {
        if (!this.docsContent.includes(platform)) {
          errors.push(`Breadcrumb parity platform missing from docs: ${platform}`);
        }
      }

      if (!this.docsContent.includes("collapse-middle")) {
        errors.push("Breadcrumb docs must explain collapse-middle overflow behavior.");
      }

      for (const storyName of ["Playground", "SingleStep", "ConstrainedPath"]) {
        if (!this.storyFile.includes(storyName)) {
          errors.push(`Breadcrumb stories must include ${storyName}.`);
        }
      }
    }
  }
];

for (const surface of surfaces) {
  surface.validate();
}

if (errors.length > 0) {
  console.error("Docs system validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Docs system validation passed.");
