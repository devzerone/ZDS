function quote(value) {
  return JSON.stringify(value);
}

function renderMap(entries, formatValue, indent = "        ") {
  return Object.entries(entries)
    .map(([key, value]) => `${indent}${quote(key)} to ${formatValue(value)}`)
    .join(",\n");
}

export function renderKotlinArtifacts(graph) {
  const foundation = `package zds.button

data class ZDSColorToken(val lightHex: String, val darkHex: String)
data class ZDSTypographyToken(val fontSize: Int, val lineHeight: Int, val fontWeight: Int)

object ZDSFoundationTokens {
    val spacing = mapOf(
${renderMap(graph.foundation.spacing, (value) => value, "        ")}
    )

    val radius = mapOf(
${renderMap(graph.foundation.radius, (value) => value, "        ")}
    )

    val typography = mapOf(
${renderMap(
  graph.foundation.typography,
  (value) => `ZDSTypographyToken(fontSize = ${value.fontSize}, lineHeight = ${value.lineHeight}, fontWeight = ${value.fontWeight})`,
  "        "
)}
    )

    val colors = mapOf(
${renderMap(
  graph.foundation.colors,
  (value) => `ZDSColorToken(lightHex = ${quote(value.lightHex)}, darkHex = ${quote(value.darkHex)})`,
  "        "
)}
    )
}
`;

  const buttonSizes = renderMap(
    graph.button.sizes,
    (value) =>
      `ZDSButtonSizeTokenSet(minHeight = ${value.minHeight}, paddingX = ${quote(value.paddingX)}, paddingY = ${quote(
        value.paddingY
      )}, gap = ${quote(value.gap)}, radius = ${quote(value.radius)}, labelTypography = ${quote(
        value.labelTypography
      )}, iconSize = ${value.iconSize})`,
    "        "
  );

  const buttonVariants = Object.entries(graph.button.variants)
    .map(([variantName, states]) => {
      const renderedStates = renderMap(
        states,
        (value) =>
          `ZDSButtonColorTokenSet(backgroundToken = ${quote(value.background.token)}, backgroundLightHex = ${quote(
            value.background.lightHex
          )}, backgroundDarkHex = ${quote(value.background.darkHex)}, foregroundToken = ${quote(
            value.foreground.token
          )}, foregroundLightHex = ${quote(value.foreground.lightHex)}, foregroundDarkHex = ${quote(
            value.foreground.darkHex
          )}, borderToken = ${quote(value.border.token)}, borderLightHex = ${quote(
            value.border.lightHex
          )}, borderDarkHex = ${quote(value.border.darkHex)}, focusToken = ${quote(
            value.focus.token
          )}, focusLightHex = ${quote(value.focus.lightHex)}, focusDarkHex = ${quote(value.focus.darkHex)})`,
        "            "
      );

      return `        ${quote(variantName)} to mapOf(\n${renderedStates}\n        )`;
    })
    .join(",\n");

  const button = `package zds.button

data class ZDSButtonColorTokenSet(
    val backgroundToken: String,
    val backgroundLightHex: String,
    val backgroundDarkHex: String,
    val foregroundToken: String,
    val foregroundLightHex: String,
    val foregroundDarkHex: String,
    val borderToken: String,
    val borderLightHex: String,
    val borderDarkHex: String,
    val focusToken: String,
    val focusLightHex: String,
    val focusDarkHex: String
)

data class ZDSButtonSizeTokenSet(
    val minHeight: Int,
    val paddingX: String,
    val paddingY: String,
    val gap: String,
    val radius: String,
    val labelTypography: String,
    val iconSize: Int
)

object ZDSButtonTokens {
    val statePrecedence = listOf(${graph.button.statePrecedence.map((value) => quote(value)).join(", ")})

    val sizes = mapOf(
${buttonSizes}
    )

    val variants = mapOf(
${buttonVariants}
    )

    fun sizeTokens(size: ZDSButtonSize): ZDSButtonSizeTokenSet = sizes.getValue(size.name.lowercase())

    fun colorTokens(variant: ZDSButtonVariant, state: ZDSButtonState): ZDSButtonColorTokenSet {
        return variants.getValue(variant.name.lowercase()).getValue(state.name.lowercase())
    }
}
`;

  return {
    "ZDSFoundationTokens.kt": foundation,
    "ZDSButtonTokens.kt": button
  };
}
