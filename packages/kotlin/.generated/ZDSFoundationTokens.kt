package zds.foundation

data class ZDSColorToken(val lightHex: String, val darkHex: String)
data class ZDSTypographyToken(val fontSize: Int, val lineHeight: Int, val fontWeight: Int)

object ZDSFoundationTokens {
    val spacing = mapOf(
        "space.0" to 0,
        "space.025" to 2,
        "space.050" to 4,
        "space.100" to 8,
        "space.150" to 12,
        "space.200" to 16,
        "space.300" to 24,
        "space.400" to 32,
        "space.500" to 40,
        "space.600" to 48,
        "space.800" to 64,
        "space.1000" to 80
    )

    val radius = mapOf(
        "radius.none" to 0,
        "radius.xs" to 4,
        "radius.sm" to 8,
        "radius.md" to 12,
        "radius.lg" to 16,
        "radius.xl" to 24,
        "radius.full" to 999
    )

    val typography = mapOf(
        "font.title.lg" to ZDSTypographyToken(fontSize = 40, lineHeight = 52, fontWeight = 700),
        "font.title.md" to ZDSTypographyToken(fontSize = 32, lineHeight = 42, fontWeight = 700),
        "font.title.sm" to ZDSTypographyToken(fontSize = 24, lineHeight = 32, fontWeight = 600),
        "font.body.lg" to ZDSTypographyToken(fontSize = 18, lineHeight = 28, fontWeight = 500),
        "font.body.md" to ZDSTypographyToken(fontSize = 16, lineHeight = 24, fontWeight = 400),
        "font.body.sm" to ZDSTypographyToken(fontSize = 14, lineHeight = 20, fontWeight = 400),
        "font.caption.md" to ZDSTypographyToken(fontSize = 12, lineHeight = 18, fontWeight = 400),
        "font.label.md" to ZDSTypographyToken(fontSize = 14, lineHeight = 20, fontWeight = 600)
    )

    val colors = mapOf(
        "color.fg.primary" to ZDSColorToken(lightHex = "#171b24", darkHex = "#f8f9fb"),
        "color.fg.secondary" to ZDSColorToken(lightHex = "#3a414e", darkHex = "#e4e8ee"),
        "color.fg.tertiary" to ZDSColorToken(lightHex = "#6b7280", darkHex = "#9aa3b2"),
        "color.fg.brand" to ZDSColorToken(lightHex = "#4f59bf", darkHex = "#b2bbff"),
        "color.fg.inverse" to ZDSColorToken(lightHex = "#ffffff", darkHex = "#171b24"),
        "color.fg.disabled" to ZDSColorToken(lightHex = "#9aa3b2", darkHex = "#515967"),
        "color.bg.canvas" to ZDSColorToken(lightHex = "#ffffff", darkHex = "#0d1016"),
        "color.bg.surface" to ZDSColorToken(lightHex = "#f8f9fb", darkHex = "#171b24"),
        "color.bg.surface-alt" to ZDSColorToken(lightHex = "#f1f3f6", darkHex = "#242a35"),
        "color.bg.brand" to ZDSColorToken(lightHex = "#5e6ad2", darkHex = "#8b98f0"),
        "color.bg.brand-strong" to ZDSColorToken(lightHex = "#4f59bf", darkHex = "#b2bbff"),
        "color.bg.brand-soft" to ZDSColorToken(lightHex = "#e9ebff", darkHex = "#2b3167"),
        "color.bg.danger" to ZDSColorToken(lightHex = "#b33854", darkHex = "#f56483"),
        "color.bg.danger-soft" to ZDSColorToken(lightHex = "#ffdce3", darkHex = "#652438"),
        "color.border.default" to ZDSColorToken(lightHex = "#e4e8ee", darkHex = "#3a414e"),
        "color.border.strong" to ZDSColorToken(lightHex = "#9aa3b2", darkHex = "#6b7280"),
        "color.border.danger" to ZDSColorToken(lightHex = "#b33854", darkHex = "#ff8ea3"),
        "color.border.brand" to ZDSColorToken(lightHex = "#5e6ad2", darkHex = "#b2bbff"),
        "color.accent.primary" to ZDSColorToken(lightHex = "#5e6ad2", darkHex = "#b2bbff"),
        "color.accent.secondary" to ZDSColorToken(lightHex = "#1ca6a3", darkHex = "#78dfda"),
        "color.accent.danger" to ZDSColorToken(lightHex = "#d84f68", darkHex = "#ff8ea3"),
        "color.status.info.fg" to ZDSColorToken(lightHex = "#1d53a4", darkHex = "#90c6ff"),
        "color.status.info.bg" to ZDSColorToken(lightHex = "#eef6ff", darkHex = "#152545"),
        "color.status.success.fg" to ZDSColorToken(lightHex = "#1f6442", darkHex = "#7fd9a0"),
        "color.status.success.bg" to ZDSColorToken(lightHex = "#eefbf3", darkHex = "#0a2418"),
        "color.status.warning.fg" to ZDSColorToken(lightHex = "#95511c", darkHex = "#ffc26d"),
        "color.status.warning.bg" to ZDSColorToken(lightHex = "#fff8ed", darkHex = "#3a1c0a"),
        "color.status.danger.fg" to ZDSColorToken(lightHex = "#922d46", darkHex = "#ff8ea3"),
        "color.status.danger.bg" to ZDSColorToken(lightHex = "#fff0f3", darkHex = "#3a0f1c")
    )
}
