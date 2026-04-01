package zds.button

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
    val statePrecedence = listOf("disabled", "loading", "pressed", "focus", "hover", "default")

    val sizes = mapOf(
        "small" to ZDSButtonSizeTokenSet(minHeight = 32, paddingX = "space.150", paddingY = "space.050", gap = "space.050", radius = "radius.sm", labelTypography = "font.label.md", iconSize = 14),
        "medium" to ZDSButtonSizeTokenSet(minHeight = 40, paddingX = "space.200", paddingY = "space.100", gap = "space.100", radius = "radius.md", labelTypography = "font.label.md", iconSize = 16),
        "large" to ZDSButtonSizeTokenSet(minHeight = 48, paddingX = "space.300", paddingY = "space.150", gap = "space.100", radius = "radius.lg", labelTypography = "font.body.lg", iconSize = 18)
    )

    val variants = mapOf(
        "primary" to mapOf(
            "default" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.brand", backgroundLightHex = "#5e6ad2", backgroundDarkHex = "#8b98f0", foregroundToken = "color.fg.inverse", foregroundLightHex = "#ffffff", foregroundDarkHex = "#171b24", borderToken = "color.border.brand", borderLightHex = "#5e6ad2", borderDarkHex = "#b2bbff", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "hover" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.brand-strong", backgroundLightHex = "#4f59bf", backgroundDarkHex = "#b2bbff", foregroundToken = "color.fg.inverse", foregroundLightHex = "#ffffff", foregroundDarkHex = "#171b24", borderToken = "color.border.brand", borderLightHex = "#5e6ad2", borderDarkHex = "#b2bbff", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "pressed" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.brand-strong", backgroundLightHex = "#4f59bf", backgroundDarkHex = "#b2bbff", foregroundToken = "color.fg.inverse", foregroundLightHex = "#ffffff", foregroundDarkHex = "#171b24", borderToken = "color.border.strong", borderLightHex = "#9aa3b2", borderDarkHex = "#6b7280", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "focus" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.brand", backgroundLightHex = "#5e6ad2", backgroundDarkHex = "#8b98f0", foregroundToken = "color.fg.inverse", foregroundLightHex = "#ffffff", foregroundDarkHex = "#171b24", borderToken = "color.border.brand", borderLightHex = "#5e6ad2", borderDarkHex = "#b2bbff", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "disabled" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.surface-alt", backgroundLightHex = "#f1f3f6", backgroundDarkHex = "#242a35", foregroundToken = "color.fg.disabled", foregroundLightHex = "#9aa3b2", foregroundDarkHex = "#515967", borderToken = "color.border.default", borderLightHex = "#e4e8ee", borderDarkHex = "#3a414e", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "loading" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.brand-soft", backgroundLightHex = "#e9ebff", backgroundDarkHex = "#2b3167", foregroundToken = "color.fg.brand", foregroundLightHex = "#4f59bf", foregroundDarkHex = "#b2bbff", borderToken = "color.border.brand", borderLightHex = "#5e6ad2", borderDarkHex = "#b2bbff", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff")
        ),
        "secondary" to mapOf(
            "default" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.surface", backgroundLightHex = "#f8f9fb", backgroundDarkHex = "#171b24", foregroundToken = "color.fg.primary", foregroundLightHex = "#171b24", foregroundDarkHex = "#f8f9fb", borderToken = "color.border.default", borderLightHex = "#e4e8ee", borderDarkHex = "#3a414e", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "hover" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.surface-alt", backgroundLightHex = "#f1f3f6", backgroundDarkHex = "#242a35", foregroundToken = "color.fg.primary", foregroundLightHex = "#171b24", foregroundDarkHex = "#f8f9fb", borderToken = "color.border.strong", borderLightHex = "#9aa3b2", borderDarkHex = "#6b7280", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "pressed" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.surface-alt", backgroundLightHex = "#f1f3f6", backgroundDarkHex = "#242a35", foregroundToken = "color.fg.primary", foregroundLightHex = "#171b24", foregroundDarkHex = "#f8f9fb", borderToken = "color.border.strong", borderLightHex = "#9aa3b2", borderDarkHex = "#6b7280", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "focus" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.surface", backgroundLightHex = "#f8f9fb", backgroundDarkHex = "#171b24", foregroundToken = "color.fg.primary", foregroundLightHex = "#171b24", foregroundDarkHex = "#f8f9fb", borderToken = "color.border.brand", borderLightHex = "#5e6ad2", borderDarkHex = "#b2bbff", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "disabled" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.surface-alt", backgroundLightHex = "#f1f3f6", backgroundDarkHex = "#242a35", foregroundToken = "color.fg.disabled", foregroundLightHex = "#9aa3b2", foregroundDarkHex = "#515967", borderToken = "color.border.default", borderLightHex = "#e4e8ee", borderDarkHex = "#3a414e", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "loading" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.brand-soft", backgroundLightHex = "#e9ebff", backgroundDarkHex = "#2b3167", foregroundToken = "color.fg.brand", foregroundLightHex = "#4f59bf", foregroundDarkHex = "#b2bbff", borderToken = "color.border.brand", borderLightHex = "#5e6ad2", borderDarkHex = "#b2bbff", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff")
        ),
        "tertiary" to mapOf(
            "default" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.canvas", backgroundLightHex = "#ffffff", backgroundDarkHex = "#0d1016", foregroundToken = "color.fg.brand", foregroundLightHex = "#4f59bf", foregroundDarkHex = "#b2bbff", borderToken = "color.border.default", borderLightHex = "#e4e8ee", borderDarkHex = "#3a414e", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "hover" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.brand-soft", backgroundLightHex = "#e9ebff", backgroundDarkHex = "#2b3167", foregroundToken = "color.fg.brand", foregroundLightHex = "#4f59bf", foregroundDarkHex = "#b2bbff", borderToken = "color.border.brand", borderLightHex = "#5e6ad2", borderDarkHex = "#b2bbff", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "pressed" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.brand-soft", backgroundLightHex = "#e9ebff", backgroundDarkHex = "#2b3167", foregroundToken = "color.fg.brand", foregroundLightHex = "#4f59bf", foregroundDarkHex = "#b2bbff", borderToken = "color.border.strong", borderLightHex = "#9aa3b2", borderDarkHex = "#6b7280", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "focus" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.canvas", backgroundLightHex = "#ffffff", backgroundDarkHex = "#0d1016", foregroundToken = "color.fg.brand", foregroundLightHex = "#4f59bf", foregroundDarkHex = "#b2bbff", borderToken = "color.border.brand", borderLightHex = "#5e6ad2", borderDarkHex = "#b2bbff", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "disabled" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.canvas", backgroundLightHex = "#ffffff", backgroundDarkHex = "#0d1016", foregroundToken = "color.fg.disabled", foregroundLightHex = "#9aa3b2", foregroundDarkHex = "#515967", borderToken = "color.border.default", borderLightHex = "#e4e8ee", borderDarkHex = "#3a414e", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff"),
            "loading" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.brand-soft", backgroundLightHex = "#e9ebff", backgroundDarkHex = "#2b3167", foregroundToken = "color.fg.brand", foregroundLightHex = "#4f59bf", foregroundDarkHex = "#b2bbff", borderToken = "color.border.brand", borderLightHex = "#5e6ad2", borderDarkHex = "#b2bbff", focusToken = "color.accent.primary", focusLightHex = "#5e6ad2", focusDarkHex = "#b2bbff")
        ),
        "destructive" to mapOf(
            "default" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.danger", backgroundLightHex = "#b33854", backgroundDarkHex = "#f56483", foregroundToken = "color.fg.inverse", foregroundLightHex = "#ffffff", foregroundDarkHex = "#171b24", borderToken = "color.border.danger", borderLightHex = "#b33854", borderDarkHex = "#ff8ea3", focusToken = "color.accent.danger", focusLightHex = "#d84f68", focusDarkHex = "#ff8ea3"),
            "hover" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.danger", backgroundLightHex = "#b33854", backgroundDarkHex = "#f56483", foregroundToken = "color.fg.inverse", foregroundLightHex = "#ffffff", foregroundDarkHex = "#171b24", borderToken = "color.border.danger", borderLightHex = "#b33854", borderDarkHex = "#ff8ea3", focusToken = "color.accent.danger", focusLightHex = "#d84f68", focusDarkHex = "#ff8ea3"),
            "pressed" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.danger", backgroundLightHex = "#b33854", backgroundDarkHex = "#f56483", foregroundToken = "color.fg.inverse", foregroundLightHex = "#ffffff", foregroundDarkHex = "#171b24", borderToken = "color.border.strong", borderLightHex = "#9aa3b2", borderDarkHex = "#6b7280", focusToken = "color.accent.danger", focusLightHex = "#d84f68", focusDarkHex = "#ff8ea3"),
            "focus" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.danger", backgroundLightHex = "#b33854", backgroundDarkHex = "#f56483", foregroundToken = "color.fg.inverse", foregroundLightHex = "#ffffff", foregroundDarkHex = "#171b24", borderToken = "color.border.danger", borderLightHex = "#b33854", borderDarkHex = "#ff8ea3", focusToken = "color.accent.danger", focusLightHex = "#d84f68", focusDarkHex = "#ff8ea3"),
            "disabled" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.danger-soft", backgroundLightHex = "#ffdce3", backgroundDarkHex = "#652438", foregroundToken = "color.fg.disabled", foregroundLightHex = "#9aa3b2", foregroundDarkHex = "#515967", borderToken = "color.border.default", borderLightHex = "#e4e8ee", borderDarkHex = "#3a414e", focusToken = "color.accent.danger", focusLightHex = "#d84f68", focusDarkHex = "#ff8ea3"),
            "loading" to ZDSButtonColorTokenSet(backgroundToken = "color.bg.danger-soft", backgroundLightHex = "#ffdce3", backgroundDarkHex = "#652438", foregroundToken = "color.status.danger.fg", foregroundLightHex = "#922d46", foregroundDarkHex = "#ff8ea3", borderToken = "color.border.danger", borderLightHex = "#b33854", borderDarkHex = "#ff8ea3", focusToken = "color.accent.danger", focusLightHex = "#d84f68", focusDarkHex = "#ff8ea3")
        )
    )

    fun sizeTokens(size: ZDSButtonSize): ZDSButtonSizeTokenSet = sizes.getValue(size.name.lowercase())

    fun colorTokens(variant: ZDSButtonVariant, state: ZDSButtonState): ZDSButtonColorTokenSet {
        return variants.getValue(variant.name.lowercase()).getValue(state.name.lowercase())
    }
}
