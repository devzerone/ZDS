import SwiftUI

public struct ZDSButtonColorTokenSet {
  public let backgroundToken: String
  public let backgroundLightHex: String
  public let backgroundDarkHex: String
  public let foregroundToken: String
  public let foregroundLightHex: String
  public let foregroundDarkHex: String
  public let borderToken: String
  public let borderLightHex: String
  public let borderDarkHex: String
  public let focusToken: String
  public let focusLightHex: String
  public let focusDarkHex: String
}

public struct ZDSButtonSizeTokenSet {
  public let minHeight: CGFloat
  public let paddingX: String
  public let paddingY: String
  public let gap: String
  public let radius: String
  public let labelTypography: String
  public let iconSize: CGFloat
}

public enum ZDSGeneratedButtonTokens {
  public static let statePrecedence: [String] = ["disabled","loading","pressed","focus","hover","default"]

  public static let sizes: [String: ZDSButtonSizeTokenSet] = [
    "small": ZDSButtonSizeTokenSet(minHeight: 32, paddingX: "space.150", paddingY: "space.050", gap: "space.050", radius: "radius.sm", labelTypography: "font.label.md", iconSize: 14),
    "medium": ZDSButtonSizeTokenSet(minHeight: 40, paddingX: "space.200", paddingY: "space.100", gap: "space.100", radius: "radius.md", labelTypography: "font.label.md", iconSize: 16),
    "large": ZDSButtonSizeTokenSet(minHeight: 48, paddingX: "space.300", paddingY: "space.150", gap: "space.100", radius: "radius.lg", labelTypography: "font.body.lg", iconSize: 18)
  ]

  public static let variants: [String: [String: ZDSButtonColorTokenSet]] = [
    "primary": [
      "default": ZDSButtonColorTokenSet(backgroundToken: "color.bg.brand", backgroundLightHex: "#5e6ad2", backgroundDarkHex: "#8b98f0", foregroundToken: "color.fg.inverse", foregroundLightHex: "#ffffff", foregroundDarkHex: "#171b24", borderToken: "color.border.brand", borderLightHex: "#5e6ad2", borderDarkHex: "#b2bbff", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "hover": ZDSButtonColorTokenSet(backgroundToken: "color.bg.brand-strong", backgroundLightHex: "#4f59bf", backgroundDarkHex: "#b2bbff", foregroundToken: "color.fg.inverse", foregroundLightHex: "#ffffff", foregroundDarkHex: "#171b24", borderToken: "color.border.brand", borderLightHex: "#5e6ad2", borderDarkHex: "#b2bbff", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "pressed": ZDSButtonColorTokenSet(backgroundToken: "color.bg.brand-strong", backgroundLightHex: "#4f59bf", backgroundDarkHex: "#b2bbff", foregroundToken: "color.fg.inverse", foregroundLightHex: "#ffffff", foregroundDarkHex: "#171b24", borderToken: "color.border.strong", borderLightHex: "#9aa3b2", borderDarkHex: "#6b7280", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "focus": ZDSButtonColorTokenSet(backgroundToken: "color.bg.brand", backgroundLightHex: "#5e6ad2", backgroundDarkHex: "#8b98f0", foregroundToken: "color.fg.inverse", foregroundLightHex: "#ffffff", foregroundDarkHex: "#171b24", borderToken: "color.border.brand", borderLightHex: "#5e6ad2", borderDarkHex: "#b2bbff", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "disabled": ZDSButtonColorTokenSet(backgroundToken: "color.bg.surface-alt", backgroundLightHex: "#f1f3f6", backgroundDarkHex: "#242a35", foregroundToken: "color.fg.disabled", foregroundLightHex: "#9aa3b2", foregroundDarkHex: "#515967", borderToken: "color.border.default", borderLightHex: "#e4e8ee", borderDarkHex: "#3a414e", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "loading": ZDSButtonColorTokenSet(backgroundToken: "color.bg.brand-soft", backgroundLightHex: "#e9ebff", backgroundDarkHex: "#2b3167", foregroundToken: "color.fg.brand", foregroundLightHex: "#4f59bf", foregroundDarkHex: "#b2bbff", borderToken: "color.border.brand", borderLightHex: "#5e6ad2", borderDarkHex: "#b2bbff", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff")
    ],
    "secondary": [
      "default": ZDSButtonColorTokenSet(backgroundToken: "color.bg.surface", backgroundLightHex: "#f8f9fb", backgroundDarkHex: "#171b24", foregroundToken: "color.fg.primary", foregroundLightHex: "#171b24", foregroundDarkHex: "#f8f9fb", borderToken: "color.border.default", borderLightHex: "#e4e8ee", borderDarkHex: "#3a414e", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "hover": ZDSButtonColorTokenSet(backgroundToken: "color.bg.surface-alt", backgroundLightHex: "#f1f3f6", backgroundDarkHex: "#242a35", foregroundToken: "color.fg.primary", foregroundLightHex: "#171b24", foregroundDarkHex: "#f8f9fb", borderToken: "color.border.strong", borderLightHex: "#9aa3b2", borderDarkHex: "#6b7280", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "pressed": ZDSButtonColorTokenSet(backgroundToken: "color.bg.surface-alt", backgroundLightHex: "#f1f3f6", backgroundDarkHex: "#242a35", foregroundToken: "color.fg.primary", foregroundLightHex: "#171b24", foregroundDarkHex: "#f8f9fb", borderToken: "color.border.strong", borderLightHex: "#9aa3b2", borderDarkHex: "#6b7280", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "focus": ZDSButtonColorTokenSet(backgroundToken: "color.bg.surface", backgroundLightHex: "#f8f9fb", backgroundDarkHex: "#171b24", foregroundToken: "color.fg.primary", foregroundLightHex: "#171b24", foregroundDarkHex: "#f8f9fb", borderToken: "color.border.brand", borderLightHex: "#5e6ad2", borderDarkHex: "#b2bbff", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "disabled": ZDSButtonColorTokenSet(backgroundToken: "color.bg.surface-alt", backgroundLightHex: "#f1f3f6", backgroundDarkHex: "#242a35", foregroundToken: "color.fg.disabled", foregroundLightHex: "#9aa3b2", foregroundDarkHex: "#515967", borderToken: "color.border.default", borderLightHex: "#e4e8ee", borderDarkHex: "#3a414e", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "loading": ZDSButtonColorTokenSet(backgroundToken: "color.bg.brand-soft", backgroundLightHex: "#e9ebff", backgroundDarkHex: "#2b3167", foregroundToken: "color.fg.brand", foregroundLightHex: "#4f59bf", foregroundDarkHex: "#b2bbff", borderToken: "color.border.brand", borderLightHex: "#5e6ad2", borderDarkHex: "#b2bbff", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff")
    ],
    "tertiary": [
      "default": ZDSButtonColorTokenSet(backgroundToken: "color.bg.canvas", backgroundLightHex: "#ffffff", backgroundDarkHex: "#0d1016", foregroundToken: "color.fg.brand", foregroundLightHex: "#4f59bf", foregroundDarkHex: "#b2bbff", borderToken: "color.border.default", borderLightHex: "#e4e8ee", borderDarkHex: "#3a414e", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "hover": ZDSButtonColorTokenSet(backgroundToken: "color.bg.brand-soft", backgroundLightHex: "#e9ebff", backgroundDarkHex: "#2b3167", foregroundToken: "color.fg.brand", foregroundLightHex: "#4f59bf", foregroundDarkHex: "#b2bbff", borderToken: "color.border.brand", borderLightHex: "#5e6ad2", borderDarkHex: "#b2bbff", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "pressed": ZDSButtonColorTokenSet(backgroundToken: "color.bg.brand-soft", backgroundLightHex: "#e9ebff", backgroundDarkHex: "#2b3167", foregroundToken: "color.fg.brand", foregroundLightHex: "#4f59bf", foregroundDarkHex: "#b2bbff", borderToken: "color.border.strong", borderLightHex: "#9aa3b2", borderDarkHex: "#6b7280", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "focus": ZDSButtonColorTokenSet(backgroundToken: "color.bg.canvas", backgroundLightHex: "#ffffff", backgroundDarkHex: "#0d1016", foregroundToken: "color.fg.brand", foregroundLightHex: "#4f59bf", foregroundDarkHex: "#b2bbff", borderToken: "color.border.brand", borderLightHex: "#5e6ad2", borderDarkHex: "#b2bbff", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "disabled": ZDSButtonColorTokenSet(backgroundToken: "color.bg.canvas", backgroundLightHex: "#ffffff", backgroundDarkHex: "#0d1016", foregroundToken: "color.fg.disabled", foregroundLightHex: "#9aa3b2", foregroundDarkHex: "#515967", borderToken: "color.border.default", borderLightHex: "#e4e8ee", borderDarkHex: "#3a414e", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff"),
      "loading": ZDSButtonColorTokenSet(backgroundToken: "color.bg.brand-soft", backgroundLightHex: "#e9ebff", backgroundDarkHex: "#2b3167", foregroundToken: "color.fg.brand", foregroundLightHex: "#4f59bf", foregroundDarkHex: "#b2bbff", borderToken: "color.border.brand", borderLightHex: "#5e6ad2", borderDarkHex: "#b2bbff", focusToken: "color.accent.primary", focusLightHex: "#5e6ad2", focusDarkHex: "#b2bbff")
    ],
    "destructive": [
      "default": ZDSButtonColorTokenSet(backgroundToken: "color.bg.danger", backgroundLightHex: "#b33854", backgroundDarkHex: "#f56483", foregroundToken: "color.fg.inverse", foregroundLightHex: "#ffffff", foregroundDarkHex: "#171b24", borderToken: "color.border.danger", borderLightHex: "#b33854", borderDarkHex: "#ff8ea3", focusToken: "color.accent.danger", focusLightHex: "#d84f68", focusDarkHex: "#ff8ea3"),
      "hover": ZDSButtonColorTokenSet(backgroundToken: "color.bg.danger", backgroundLightHex: "#b33854", backgroundDarkHex: "#f56483", foregroundToken: "color.fg.inverse", foregroundLightHex: "#ffffff", foregroundDarkHex: "#171b24", borderToken: "color.border.danger", borderLightHex: "#b33854", borderDarkHex: "#ff8ea3", focusToken: "color.accent.danger", focusLightHex: "#d84f68", focusDarkHex: "#ff8ea3"),
      "pressed": ZDSButtonColorTokenSet(backgroundToken: "color.bg.danger", backgroundLightHex: "#b33854", backgroundDarkHex: "#f56483", foregroundToken: "color.fg.inverse", foregroundLightHex: "#ffffff", foregroundDarkHex: "#171b24", borderToken: "color.border.strong", borderLightHex: "#9aa3b2", borderDarkHex: "#6b7280", focusToken: "color.accent.danger", focusLightHex: "#d84f68", focusDarkHex: "#ff8ea3"),
      "focus": ZDSButtonColorTokenSet(backgroundToken: "color.bg.danger", backgroundLightHex: "#b33854", backgroundDarkHex: "#f56483", foregroundToken: "color.fg.inverse", foregroundLightHex: "#ffffff", foregroundDarkHex: "#171b24", borderToken: "color.border.danger", borderLightHex: "#b33854", borderDarkHex: "#ff8ea3", focusToken: "color.accent.danger", focusLightHex: "#d84f68", focusDarkHex: "#ff8ea3"),
      "disabled": ZDSButtonColorTokenSet(backgroundToken: "color.bg.danger-soft", backgroundLightHex: "#ffdce3", backgroundDarkHex: "#652438", foregroundToken: "color.fg.disabled", foregroundLightHex: "#9aa3b2", foregroundDarkHex: "#515967", borderToken: "color.border.default", borderLightHex: "#e4e8ee", borderDarkHex: "#3a414e", focusToken: "color.accent.danger", focusLightHex: "#d84f68", focusDarkHex: "#ff8ea3"),
      "loading": ZDSButtonColorTokenSet(backgroundToken: "color.bg.danger-soft", backgroundLightHex: "#ffdce3", backgroundDarkHex: "#652438", foregroundToken: "color.status.danger.fg", foregroundLightHex: "#922d46", foregroundDarkHex: "#ff8ea3", borderToken: "color.border.danger", borderLightHex: "#b33854", borderDarkHex: "#ff8ea3", focusToken: "color.accent.danger", focusLightHex: "#d84f68", focusDarkHex: "#ff8ea3")
    ]
  ]

  public static func sizeTokens(for size: ZDSButtonSize) -> ZDSButtonSizeTokenSet {
    sizes[size.rawValue]!
  }

  public static func colorTokens(for variant: ZDSButtonVariant, state: ZDSButtonState) -> ZDSButtonColorTokenSet {
    variants[variant.rawValue]![state.rawValue]!
  }
}
