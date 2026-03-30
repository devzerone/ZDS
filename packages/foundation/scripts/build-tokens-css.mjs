import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const foundationDir = resolve(scriptDir, "..");
const tokensDir = resolve(foundationDir, "tokens");
const outputFile = resolve(foundationDir, "tokens.css");

function toCssVarName(tokenName) {
  return `--${tokenName.replaceAll(".", "-")}`;
}

function toPaletteVarName(familyName, stepName) {
  return `--palette-${familyName}-${stepName}`;
}

function formatValue(value, unit = "") {
  return `${value}${unit}`;
}

async function readJson(pathname) {
  const content = await readFile(pathname, "utf8");
  return JSON.parse(content);
}

function renderDeclarations(entries) {
  return entries.map(([name, value]) => `  ${name}: ${value};`).join("\n");
}

function resolvePaletteReference(reference) {
  const [familyName, stepName] = reference.split(".");
  return `var(${toPaletteVarName(familyName, stepName)})`;
}

const [palette, semantic, spacing, radius, typography] = await Promise.all([
  readJson(resolve(tokensDir, "color/palette.json")),
  readJson(resolve(tokensDir, "color/semantic.json")),
  readJson(resolve(tokensDir, "spacing/core.json")),
  readJson(resolve(tokensDir, "radius/core.json")),
  readJson(resolve(tokensDir, "typography/core.json"))
]);

const rootDeclarations = [];
const darkDeclarations = [['color-scheme', 'dark']];

rootDeclarations.push(["color-scheme", "light"]);

for (const [familyName, family] of Object.entries(palette.families)) {
  for (const [stepName, colorValue] of Object.entries(family.steps)) {
    rootDeclarations.push([toPaletteVarName(familyName, stepName), colorValue]);
  }
}

for (const [tokenName, tokenValue] of Object.entries(spacing.tokens)) {
  rootDeclarations.push([toCssVarName(tokenName), formatValue(tokenValue, "px")]);
}

for (const [tokenName, tokenValue] of Object.entries(radius.tokens)) {
  rootDeclarations.push([toCssVarName(tokenName), formatValue(tokenValue, "px")]);
}

for (const [tokenName, tokenValue] of Object.entries(typography.tokens)) {
  const tokenKey = tokenName.replaceAll(".", "-");
  rootDeclarations.push([`--${tokenKey}-family`, tokenValue.fontFamily]);
  rootDeclarations.push([`--${tokenKey}-size`, formatValue(tokenValue.fontSize, "px")]);
  rootDeclarations.push([`--${tokenKey}-line-height`, formatValue(tokenValue.lineHeight, "px")]);
  rootDeclarations.push([`--${tokenKey}-weight`, String(tokenValue.fontWeight)]);
}

for (const [tokenName, tokenValue] of Object.entries(semantic.tokens)) {
  rootDeclarations.push([toCssVarName(tokenName), resolvePaletteReference(tokenValue.light)]);
  darkDeclarations.push([toCssVarName(tokenName), resolvePaletteReference(tokenValue.dark)]);
}

const css = [
  "/* Generated from packages/foundation/tokens/*.json. Do not edit by hand. */",
  ":root {",
  renderDeclarations(rootDeclarations),
  "}",
  "",
  ':root[data-theme="dark"], [data-theme="dark"] {',
  renderDeclarations(darkDeclarations),
  "}",
  ""
].join("\n");

await mkdir(dirname(outputFile), { recursive: true });
await writeFile(outputFile, css, "utf8");
