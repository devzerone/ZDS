import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const tokensDir = resolve(scriptDir, "../..");

function loadJson(relativePath) {
  return JSON.parse(readFileSync(resolve(tokensDir, relativePath), "utf8"));
}

function toStepEntry(reference) {
  const [family, step] = reference.split(".");
  return { family, step };
}

function resolvePaletteHex(palette, reference) {
  const { family, step } = toStepEntry(reference);
  return palette.families?.[family]?.steps?.[step] ?? null;
}

function resolveSemanticTokenMap(palette, semantic) {
  return Object.fromEntries(
    Object.entries(semantic.tokens).map(([tokenName, tokenData]) => [
      tokenName,
      {
        category: tokenData.category,
        intent: tokenData.intent,
        lightRef: tokenData.light,
        darkRef: tokenData.dark,
        lightHex: resolvePaletteHex(palette, tokenData.light),
        darkHex: resolvePaletteHex(palette, tokenData.dark)
      }
    ])
  );
}

function resolveButtonVariants(buttonTokens, semanticTokens) {
  return Object.fromEntries(
    Object.entries(buttonTokens.variants).map(([variantName, stateMap]) => [
      variantName,
      Object.fromEntries(
        Object.entries(stateMap).map(([stateName, tokenMap]) => [
          stateName,
          Object.fromEntries(
            Object.entries(tokenMap).map(([tokenRole, tokenName]) => [
              tokenRole,
              {
                token: tokenName,
                ...semanticTokens[tokenName]
              }
            ])
          )
        ])
      )
    ])
  );
}

export function loadNormalizedTokenGraph() {
  const palette = loadJson("data/color/palette.json");
  const semantic = loadJson("data/color/semantic.json");
  const spacing = loadJson("data/spacing/core.json");
  const radius = loadJson("data/radius/core.json");
  const typography = loadJson("data/typography/core.json");
  const buttonTokens = loadJson("data/components/button.json");

  const semanticTokens = resolveSemanticTokenMap(palette, semantic);

  return {
    meta: {
      generatedBy: "packages/tokens/scripts/build-platform-tokens.mjs",
      sourceRoot: "packages/tokens/data/"
    },
    foundation: {
      colors: semanticTokens,
      spacing: spacing.tokens,
      radius: radius.tokens,
      typography: typography.tokens
    },
    button: {
      statePrecedence: buttonTokens.statePrecedence,
      sizes: buttonTokens.sizes,
      variants: resolveButtonVariants(buttonTokens, semanticTokens)
    }
  };
}
