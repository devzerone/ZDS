function toBrushKey(prefix, suffix) {
  return `${prefix}.${suffix}`;
}

function renderButtonSizeResources(sizes) {
  return Object.entries(sizes)
    .map(
      ([sizeName, value]) => `  <x:Double x:Key="Button.Size.${sizeName}.MinHeight">${value.minHeight}</x:Double>
  <Thickness x:Key="Button.Size.${sizeName}.Padding">${sizeName === "small" ? "12,4,12,4" : sizeName === "medium" ? "16,8,16,8" : "24,12,24,12"}</Thickness>
  <x:Double x:Key="Button.Size.${sizeName}.Gap">${sizeName === "small" ? 4 : 8}</x:Double>
  <x:Double x:Key="Button.Size.${sizeName}.CornerRadius">${sizeName === "small" ? 8 : sizeName === "medium" ? 12 : 16}</x:Double>
  <x:Double x:Key="Button.Size.${sizeName}.LabelFontSize">${value.labelTypography === "font.body.lg" ? 18 : 14}</x:Double>`
    )
    .join("\n");
}

function renderButtonVariantResources(variants) {
  return Object.entries(variants)
    .flatMap(([variantName, states]) =>
      Object.entries(states).flatMap(([stateName, tokenSet]) => [
        `  <SolidColorBrush x:Key="${toBrushKey(`Button.Variant.${variantName}.${stateName}`, "Background")}" Color="${tokenSet.background.lightHex}" />`,
        `  <SolidColorBrush x:Key="${toBrushKey(`Button.Variant.${variantName}.${stateName}`, "Foreground")}" Color="${tokenSet.foreground.lightHex}" />`,
        `  <SolidColorBrush x:Key="${toBrushKey(`Button.Variant.${variantName}.${stateName}`, "Border")}" Color="${tokenSet.border.lightHex}" />`,
        `  <x:String x:Key="${toBrushKey(`Button.Variant.${variantName}.${stateName}`, "BackgroundToken")}">${tokenSet.background.token}</x:String>`,
        `  <x:String x:Key="${toBrushKey(`Button.Variant.${variantName}.${stateName}`, "ForegroundToken")}">${tokenSet.foreground.token}</x:String>`,
        `  <x:String x:Key="${toBrushKey(`Button.Variant.${variantName}.${stateName}`, "BorderToken")}">${tokenSet.border.token}</x:String>`
      ])
    )
    .join("\n");
}

export function renderWindowsArtifacts(graph) {
  const foundation = `<?xml version="1.0" encoding="utf-8"?>
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
  ${Object.entries(graph.foundation.spacing)
    .map(([key, value]) => `<x:Double x:Key="${key}">${value}</x:Double>`)
    .join("\n  ")}
  ${Object.entries(graph.foundation.radius)
    .map(([key, value]) => `<x:Double x:Key="${key}">${value}</x:Double>`)
    .join("\n  ")}
</ResourceDictionary>
`;

  const button = `<?xml version="1.0" encoding="utf-8"?>
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
${renderButtonSizeResources(graph.button.sizes)}
${renderButtonVariantResources(graph.button.variants)}
</ResourceDictionary>
`;

  return {
    "FoundationTokens.xaml": foundation,
    "ButtonTokens.xaml": button
  };
}
