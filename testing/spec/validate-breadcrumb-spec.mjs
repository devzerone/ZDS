import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const specPath = resolve(root, "spec/components/breadcrumb/breadcrumb.spec.json");
const tokenPath = resolve(root, "packages/tokens/data/components/breadcrumb.json");

const errors = [];

function loadJson(path, label) {
  if (!existsSync(path)) {
    errors.push(`Missing ${label}: ${path}`);
    return null;
  }

  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON for ${label}: ${error.message}`);
    return null;
  }
}

const spec = loadJson(specPath, "breadcrumb spec");
const tokens = loadJson(tokenPath, "breadcrumb component tokens");

if (spec) {
  const requiredRoles = ["ancestor", "current", "collapsed-summary"];
  const requiredPlatforms = ["react", "swiftui", "kotlin", "windows"];

  for (const role of requiredRoles) {
    if (!spec.items?.[role]) {
      errors.push(`Missing required breadcrumb item role: ${role}`);
    }
  }

  if (spec.items?.current?.hrefAllowed !== false) {
    errors.push("Breadcrumb current role must forbid href");
  }
  if (spec.items?.current?.interactive !== false) {
    errors.push("Breadcrumb current role must be non-interactive");
  }
  if (spec.separator?.decorative !== true) {
    errors.push("Breadcrumb separator must remain decorative");
  }
  if (spec.overflowPolicy?.preserveCurrent !== true) {
    errors.push("Breadcrumb overflow policy must preserve the current item");
  }
  if (spec.overflowPolicy?.preserveStart !== true) {
    errors.push("Breadcrumb overflow policy must preserve the start item");
  }
  if (spec.accessibility?.navigationLandmarkRequired !== true) {
    errors.push("Breadcrumb spec must require navigation landmark semantics");
  }
  if (spec.accessibility?.currentPageAnnounced !== true) {
    errors.push("Breadcrumb spec must require current-page announcement");
  }
  if (spec.accessibility?.separatorDecorative !== true) {
    errors.push("Breadcrumb spec must keep separators decorative");
  }

  for (const platform of requiredPlatforms) {
    const entry = spec.parity?.[platform];
    if (!entry) {
      errors.push(`Missing breadcrumb parity record for platform: ${platform}`);
      continue;
    }
    for (const field of ["status", "gap", "owner", "remediationTarget"]) {
      if (!entry[field]) {
        errors.push(`Breadcrumb parity record for ${platform} must include ${field}`);
      }
    }
  }
}

if (spec && tokens) {
  const semanticTokenNames = new Set([
    tokens.itemRoles?.ancestor?.foreground,
    tokens.itemRoles?.ancestor?.interactiveForeground,
    tokens.itemRoles?.ancestor?.focus,
    tokens.itemRoles?.current?.foreground,
    tokens.itemRoles?.current?.emphasis,
    tokens.itemRoles?.["collapsed-summary"]?.foreground,
    tokens.separator?.foreground
  ]);

  for (const tokenName of semanticTokenNames) {
    if (typeof tokenName !== "string" || !tokenName.startsWith("color.")) {
      errors.push(`Breadcrumb token reference must be a semantic color token: ${String(tokenName)}`);
    }
  }

  for (const key of ["itemGap", "separatorGap", "wrapGap", "paddingY"]) {
    if (typeof tokens.layout?.[key] !== "string" || !tokens.layout[key].startsWith("space.")) {
      errors.push(`Breadcrumb layout token ${key} must reference an existing spacing token`);
    }
  }

  for (const key of ["itemLabel", "summaryLabel"]) {
    if (typeof tokens.typography?.[key] !== "string" || !tokens.typography[key].startsWith("font.")) {
      errors.push(`Breadcrumb typography token ${key} must reference an existing typography token`);
    }
  }
}

if (errors.length > 0) {
  console.error("Breadcrumb spec validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Breadcrumb spec validation passed.");
console.log(`Roles: ${Object.keys(spec.items).length}`);
console.log(`Platforms: ${Object.keys(spec.parity).length}`);
