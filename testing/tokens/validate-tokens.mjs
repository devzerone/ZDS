import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

const files = {
  palette: resolve(root, "packages/tokens/data/color/palette.json"),
  semantic: resolve(root, "packages/tokens/data/color/semantic.json"),
  components: resolve(root, "packages/tokens/data/components/core.json"),
  buttonComponents: resolve(root, "packages/tokens/data/components/button.json"),
  typography: resolve(root, "packages/tokens/data/typography/core.json"),
  spacing: resolve(root, "packages/tokens/data/spacing/core.json"),
  radius: resolve(root, "packages/tokens/data/radius/core.json"),
  light: resolve(root, "packages/tokens/data/themes/light.json"),
  dark: resolve(root, "packages/tokens/data/themes/dark.json")
};

const requiredFamilies = [
  "brand",
  "secondary-teal",
  "secondary-amber",
  "neutral",
  "info",
  "success",
  "warning",
  "danger"
];

const errors = [];

function loadJson(name, path) {
  if (!existsSync(path)) {
    errors.push(`${name} file missing: ${path}`);
    return null;
  }

  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    errors.push(`${name} file is not valid JSON: ${path} (${error.message})`);
    return null;
  }
}

function flattenPaletteSteps(families) {
  const stepSet = new Set();
  for (const [familyName, familyData] of Object.entries(families)) {
    for (const stepName of Object.keys(familyData.steps ?? {})) {
      stepSet.add(`${familyName}.${stepName}`);
    }
  }
  return stepSet;
}

function ensureEnglishLike(name) {
  return /^[a-z0-9.-]+$/.test(name);
}

const palette = loadJson("palette", files.palette);
const semantic = loadJson("semantic", files.semantic);
const components = loadJson("components", files.components);
const buttonComponents = loadJson("button components", files.buttonComponents);
const typography = loadJson("typography", files.typography);
const spacing = loadJson("spacing", files.spacing);
const radius = loadJson("radius", files.radius);
const lightTheme = loadJson("light theme", files.light);
const darkTheme = loadJson("dark theme", files.dark);

if (palette?.families) {
  for (const family of requiredFamilies) {
    if (!palette.families[family]) {
      errors.push(`Missing required palette family: ${family}`);
    }
  }

  if (palette.families.brand?.anchor !== "#5e6ad2") {
    errors.push("Brand anchor must equal #5e6ad2");
  }
}

const paletteStepSet = palette?.families ? flattenPaletteSteps(palette.families) : new Set();

if (semantic?.tokens) {
  for (const [tokenName, tokenData] of Object.entries(semantic.tokens)) {
    if (!ensureEnglishLike(tokenName)) {
      errors.push(`Semantic token name must be English-like: ${tokenName}`);
    }

    for (const refName of ["light", "dark"]) {
      const ref = tokenData[refName];
      if (!paletteStepSet.has(ref)) {
        errors.push(`Semantic token ${tokenName} references unknown palette step: ${ref}`);
      }
    }
  }
}

function validateTheme(themeName, themeJson) {
  if (!themeJson?.theme) {
    return;
  }

  const semanticKeys = new Set(Object.keys(semantic?.tokens ?? {}));
  for (const [tokenName, tokenValue] of Object.entries(themeJson.theme)) {
    if (!semanticKeys.has(tokenName)) {
      errors.push(`${themeName} theme contains unknown semantic token key: ${tokenName}`);
    }
    if (tokenValue !== `{${tokenName}}`) {
      errors.push(`${themeName} theme token ${tokenName} must map to {${tokenName}}`);
    }
  }

  for (const tokenName of semanticKeys) {
    if (!(tokenName in themeJson.theme)) {
      errors.push(`${themeName} theme missing semantic token: ${tokenName}`);
    }
  }
}

validateTheme("light", lightTheme);
validateTheme("dark", darkTheme);

if (components?.components) {
  const semanticKeys = new Set(Object.keys(semantic?.tokens ?? {}));
  for (const [componentName, groups] of Object.entries(components.components)) {
    if (!ensureEnglishLike(componentName)) {
      errors.push(`Component scaffold name must be English-like: ${componentName}`);
    }
    for (const stateMap of Object.values(groups)) {
      for (const reference of Object.values(stateMap)) {
        if (!semanticKeys.has(reference)) {
          errors.push(`Component scaffold reference must point to semantic token: ${componentName} -> ${reference}`);
        }
      }
    }
  }
}

if (buttonComponents?.variants) {
  const semanticKeys = new Set(Object.keys(semantic?.tokens ?? {}));
  for (const [variantName, stateMap] of Object.entries(buttonComponents.variants)) {
    if (!ensureEnglishLike(variantName)) {
      errors.push(`Button variant name must be English-like: ${variantName}`);
    }
    for (const [stateName, tokenMap] of Object.entries(stateMap)) {
      if (!ensureEnglishLike(stateName)) {
        errors.push(`Button state name must be English-like: ${variantName}.${stateName}`);
      }
      for (const tokenKey of ["background", "foreground", "border", "focus"]) {
        const tokenRef = tokenMap[tokenKey];
        if (typeof tokenRef !== "string" || !semanticKeys.has(tokenRef)) {
          errors.push(`Button token ${variantName}.${stateName}.${tokenKey} must reference an existing semantic token`);
        }
      }
    }
  }
}

if (buttonComponents?.sizes) {
  const spacingKeys = new Set(Object.keys(spacing?.tokens ?? {}));
  const radiusKeys = new Set(Object.keys(radius?.tokens ?? {}));
  const typographyKeys = new Set(Object.keys(typography?.tokens ?? {}));

  for (const [sizeName, sizeMap] of Object.entries(buttonComponents.sizes)) {
    if (!spacingKeys.has(sizeMap.paddingX) || !spacingKeys.has(sizeMap.paddingY) || !spacingKeys.has(sizeMap.gap)) {
      errors.push(`Button size ${sizeName} must reference existing spacing tokens`);
    }
    if (!radiusKeys.has(sizeMap.radius)) {
      errors.push(`Button size ${sizeName} must reference an existing radius token`);
    }
    if (!typographyKeys.has(sizeMap.labelTypography)) {
      errors.push(`Button size ${sizeName} must reference an existing typography token`);
    }
  }
}

for (const [name, json] of Object.entries({ typography, spacing, radius })) {
  if (!json?.tokens || Object.keys(json.tokens).length === 0) {
    errors.push(`${name} tokens must not be empty`);
  }
}

if (errors.length > 0) {
  console.error("Token validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Token validation passed.");
console.log(`Validated files: ${Object.keys(files).length}`);
console.log(`Semantic tokens: ${Object.keys(semantic.tokens).length}`);
console.log(`Palette families: ${Object.keys(palette.families).length}`);
