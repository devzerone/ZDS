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

fun zdsButtonInteractionAllowed(state: ZDSButtonState): Boolean {
    return state != ZDSButtonState.DISABLED && state != ZDSButtonState.LOADING
}

fun zdsButtonMinHeight(size: ZDSButtonSize): Int {
    return when (size) {
        ZDSButtonSize.SMALL -> 32
        ZDSButtonSize.MEDIUM -> 40
        ZDSButtonSize.LARGE -> 48
    }
}

fun zdsButtonLoadingLock(state: ZDSButtonState): Boolean {
    return state == ZDSButtonState.LOADING
}
