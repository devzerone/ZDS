package zds.button

// Review note: Compose preserves the shared variant, size, and core state names.
// Touch-first parity exceptions for hover and pressed are documented in
// spec/components/button/button.spec.json as kotlin-hover-pressed.
enum class ZDSButtonVariant {
    PRIMARY,
    SECONDARY,
    TERTIARY,
    DESTRUCTIVE
}

enum class ZDSButtonSize {
    SMALL,
    MEDIUM,
    LARGE
}

enum class ZDSButtonState {
    DEFAULT,
    FOCUS,
    DISABLED,
    LOADING
}

data class ZDSButtonModel(
    val label: String,
    val variant: ZDSButtonVariant = ZDSButtonVariant.PRIMARY,
    val size: ZDSButtonSize = ZDSButtonSize.MEDIUM,
    val state: ZDSButtonState = ZDSButtonState.DEFAULT,
    val leadingIconName: String? = null,
    val trailingIconName: String? = null
)

data class ZDSButtonStyle(
    val minHeight: Int,
    val horizontalPadding: Int,
    val verticalPadding: Int,
    val gap: Int,
    val cornerRadius: Int,
    val backgroundHex: String,
    val foregroundHex: String,
    val borderHex: String,
    val backgroundToken: String,
    val foregroundToken: String,
    val borderToken: String
)

fun zdsButtonInteractionAllowed(state: ZDSButtonState): Boolean {
    return state != ZDSButtonState.DISABLED && state != ZDSButtonState.LOADING
}

fun zdsButtonMinHeight(size: ZDSButtonSize): Int {
    return ZDSButtonTokens.sizeTokens(size).minHeight
}

fun zdsButtonLoadingLock(state: ZDSButtonState): Boolean {
    return state == ZDSButtonState.LOADING
}

fun zdsButtonStyle(
    variant: ZDSButtonVariant,
    size: ZDSButtonSize,
    state: ZDSButtonState,
    darkMode: Boolean = false
): ZDSButtonStyle {
    val sizeTokens = ZDSButtonTokens.sizeTokens(size)
    val colorTokens = ZDSButtonTokens.colorTokens(variant, state)

    return ZDSButtonStyle(
        minHeight = sizeTokens.minHeight,
        horizontalPadding = ZDSFoundationTokens.spacing.getValue(sizeTokens.paddingX),
        verticalPadding = ZDSFoundationTokens.spacing.getValue(sizeTokens.paddingY),
        gap = ZDSFoundationTokens.spacing.getValue(sizeTokens.gap),
        cornerRadius = ZDSFoundationTokens.radius.getValue(sizeTokens.radius),
        backgroundHex = if (darkMode) colorTokens.backgroundDarkHex else colorTokens.backgroundLightHex,
        foregroundHex = if (darkMode) colorTokens.foregroundDarkHex else colorTokens.foregroundLightHex,
        borderHex = if (darkMode) colorTokens.borderDarkHex else colorTokens.borderLightHex,
        backgroundToken = colorTokens.backgroundToken,
        foregroundToken = colorTokens.foregroundToken,
        borderToken = colorTokens.borderToken
    )
}
