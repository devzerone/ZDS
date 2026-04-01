import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const buttonSpecPath = resolve(root, "spec/components/button/button.spec.json");
const buttonTokenPath = resolve(root, "packages/tokens/data/components/button.json");

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

const spec = loadJson(buttonSpecPath, "button spec");
const tokens = loadJson(buttonTokenPath, "button component tokens");

if (spec) {
  const requiredVariants = ["primary", "secondary", "tertiary", "destructive"];
  const requiredSizes = ["small", "medium", "large"];
  const requiredStates = ["default", "hover", "pressed", "focus", "disabled", "loading"];
  const requiredSlots = ["label", "leading-icon", "trailing-icon"];
  const requiredPlatforms = ["react", "swiftui", "kotlin", "windows"];

  for (const key of requiredVariants) {
    if (!spec.variants?.[key]) {
      errors.push(`Missing required variant: ${key}`);
    }
  }

  for (const key of requiredSizes) {
    if (!spec.sizes?.[key]) {
      errors.push(`Missing required size: ${key}`);
    }
  }

  for (const key of requiredStates) {
    if (!spec.states?.[key]) {
      errors.push(`Missing required state: ${key}`);
    }
  }

  for (const key of requiredSlots) {
    if (!spec.slots?.[key]) {
      errors.push(`Missing required slot: ${key}`);
    }
  }

  if (spec.accessibility?.labelRequired !== true) {
    errors.push("Button spec must require labels");
  }
  if (spec.accessibility?.iconOnlyAllowed !== false) {
    errors.push("Button spec must forbid icon-only buttons in the base contract");
  }
  if (spec.accessibility?.loadingLocksInteraction !== true) {
    errors.push("Button spec must lock interaction while loading");
  }

  if (!Array.isArray(spec.statePrecedence) || spec.statePrecedence.join(",") !== "disabled,loading,pressed,focus,hover,default") {
    errors.push("Button spec must declare the expected state precedence order");
  }

  for (const platform of requiredPlatforms) {
    const entry = spec.parity?.[platform];
    if (!entry) {
      errors.push(`Missing parity record for platform: ${platform}`);
      continue;
    }
    for (const field of ["status", "gap", "owner", "remediationTarget"]) {
      if (!entry[field]) {
        errors.push(`Parity record for ${platform} must include ${field}`);
      }
    }
  }

  const generatedArtifacts = spec.tokenDelivery?.generatedArtifacts;
  const nativeConsumers = spec.tokenDelivery?.nativeConsumers;
  const manualEditBoundaries = spec.tokenDelivery?.manualEditBoundaries;
  const validationCommands = spec.tokenDelivery?.validationCommands;

  if (!generatedArtifacts?.swiftui?.includes("packages/tokens/generated/swiftui/ZDSButtonTokens.swift")) {
    errors.push("Button spec must document the SwiftUI generated button artifact path");
  }
  if (!generatedArtifacts?.kotlin?.includes("packages/tokens/generated/kotlin/ZDSButtonTokens.kt")) {
    errors.push("Button spec must document the Kotlin generated button artifact path");
  }
  if (!generatedArtifacts?.windows?.includes("packages/tokens/generated/windows/ButtonTokens.xaml")) {
    errors.push("Button spec must document the Windows generated button artifact path");
  }

  if (!nativeConsumers?.swiftui?.includes("packages/swiftui/components/Button.swift")) {
    errors.push("Button spec must document the SwiftUI consumer path");
  }
  if (!nativeConsumers?.kotlin?.includes("packages/kotlin/components/Button.kt")) {
    errors.push("Button spec must document the Kotlin consumer path");
  }
  if (!nativeConsumers?.windows?.includes("packages/windows/components/Button.xaml.cs")) {
    errors.push("Button spec must document the Windows consumer path");
  }

  for (const key of ["generatedArtifacts", "nativeSyncDirectories", "consumerCode"]) {
    if (!manualEditBoundaries?.[key]) {
      errors.push(`Button spec must describe manual edit boundary: ${key}`);
    }
  }

  for (const command of ["pnpm generate:platform-tokens", "pnpm validate:tokens", "pnpm validate:native"]) {
    if (!validationCommands?.includes(command)) {
      errors.push(`Button spec must include validation command: ${command}`);
    }
  }

  const fallback = spec.nativeRepresentationFallback;
  if (fallback?.policy !== "explicit-parity-exception-or-unsupported-until-approved") {
    errors.push("Button spec must declare the native representation fallback policy");
  }
  if (!fallback?.requiredAction || !fallback?.allowedFallback || !fallback?.recordLocation) {
    errors.push("Button spec must document fallback action, allowed fallback, and record location");
  }
}

if (spec && tokens) {
  const variantNames = Object.keys(spec.variants ?? {});
  const sizeNames = Object.keys(spec.sizes ?? {});
  const stateNames = Object.keys(spec.states ?? {});

  for (const variant of variantNames) {
    if (!tokens.variants?.[variant]) {
      errors.push(`Missing token variant mapping for ${variant}`);
      continue;
    }
    for (const state of stateNames) {
      if (!tokens.variants[variant][state]) {
        errors.push(`Missing token mapping for ${variant}.${state}`);
      }
    }
  }

  for (const size of sizeNames) {
    if (!tokens.sizes?.[size]) {
      errors.push(`Missing size token mapping for ${size}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Button spec validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Button spec validation passed.");
console.log(`Variants: ${Object.keys(spec.variants).length}`);
console.log(`Sizes: ${Object.keys(spec.sizes).length}`);
console.log(`States: ${Object.keys(spec.states).length}`);
