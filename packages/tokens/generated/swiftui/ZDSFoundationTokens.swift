import SwiftUI

public enum ZDSThemeMode: String {
  case light
  case dark
}

public struct ZDSColorToken {
  public let lightHex: String
  public let darkHex: String

  public func hex(for mode: ZDSThemeMode) -> String {
    mode == .dark ? darkHex : lightHex
  }
}

public struct ZDSTypographyToken {
  public let fontSize: CGFloat
  public let lineHeight: CGFloat
  public let fontWeight: CGFloat
}

public enum ZDSFoundationTokens {
  public static let spacing: [String: CGFloat] = [
    "space.0": 0,
    "space.025": 2,
    "space.050": 4,
    "space.100": 8,
    "space.150": 12,
    "space.200": 16,
    "space.300": 24,
    "space.400": 32,
    "space.500": 40,
    "space.600": 48,
    "space.800": 64,
    "space.1000": 80
  ]

  public static let radius: [String: CGFloat] = [
    "radius.none": 0,
    "radius.xs": 4,
    "radius.sm": 8,
    "radius.md": 12,
    "radius.lg": 16,
    "radius.xl": 24,
    "radius.full": 999
  ]

  public static let typography: [String: ZDSTypographyToken] = [
    "font.title.lg": ZDSTypographyToken(fontSize: 40, lineHeight: 52, fontWeight: 700),
    "font.title.md": ZDSTypographyToken(fontSize: 32, lineHeight: 42, fontWeight: 700),
    "font.title.sm": ZDSTypographyToken(fontSize: 24, lineHeight: 32, fontWeight: 600),
    "font.body.lg": ZDSTypographyToken(fontSize: 18, lineHeight: 28, fontWeight: 500),
    "font.body.md": ZDSTypographyToken(fontSize: 16, lineHeight: 24, fontWeight: 400),
    "font.body.sm": ZDSTypographyToken(fontSize: 14, lineHeight: 20, fontWeight: 400),
    "font.caption.md": ZDSTypographyToken(fontSize: 12, lineHeight: 18, fontWeight: 400),
    "font.label.md": ZDSTypographyToken(fontSize: 14, lineHeight: 20, fontWeight: 600)
  ]

  public static let colors: [String: ZDSColorToken] = [
    "color.fg.primary": ZDSColorToken(lightHex: "#171b24", darkHex: "#f8f9fb"),
    "color.fg.secondary": ZDSColorToken(lightHex: "#3a414e", darkHex: "#e4e8ee"),
    "color.fg.tertiary": ZDSColorToken(lightHex: "#6b7280", darkHex: "#9aa3b2"),
    "color.fg.brand": ZDSColorToken(lightHex: "#4f59bf", darkHex: "#b2bbff"),
    "color.fg.inverse": ZDSColorToken(lightHex: "#ffffff", darkHex: "#171b24"),
    "color.fg.disabled": ZDSColorToken(lightHex: "#9aa3b2", darkHex: "#515967"),
    "color.bg.canvas": ZDSColorToken(lightHex: "#ffffff", darkHex: "#0d1016"),
    "color.bg.surface": ZDSColorToken(lightHex: "#f8f9fb", darkHex: "#171b24"),
    "color.bg.surface-alt": ZDSColorToken(lightHex: "#f1f3f6", darkHex: "#242a35"),
    "color.bg.brand": ZDSColorToken(lightHex: "#5e6ad2", darkHex: "#8b98f0"),
    "color.bg.brand-strong": ZDSColorToken(lightHex: "#4f59bf", darkHex: "#b2bbff"),
    "color.bg.brand-soft": ZDSColorToken(lightHex: "#e9ebff", darkHex: "#2b3167"),
    "color.bg.danger": ZDSColorToken(lightHex: "#b33854", darkHex: "#f56483"),
    "color.bg.danger-soft": ZDSColorToken(lightHex: "#ffdce3", darkHex: "#652438"),
    "color.border.default": ZDSColorToken(lightHex: "#e4e8ee", darkHex: "#3a414e"),
    "color.border.strong": ZDSColorToken(lightHex: "#9aa3b2", darkHex: "#6b7280"),
    "color.border.danger": ZDSColorToken(lightHex: "#b33854", darkHex: "#ff8ea3"),
    "color.border.brand": ZDSColorToken(lightHex: "#5e6ad2", darkHex: "#b2bbff"),
    "color.accent.primary": ZDSColorToken(lightHex: "#5e6ad2", darkHex: "#b2bbff"),
    "color.accent.secondary": ZDSColorToken(lightHex: "#1ca6a3", darkHex: "#78dfda"),
    "color.accent.danger": ZDSColorToken(lightHex: "#d84f68", darkHex: "#ff8ea3"),
    "color.status.info.fg": ZDSColorToken(lightHex: "#1d53a4", darkHex: "#90c6ff"),
    "color.status.info.bg": ZDSColorToken(lightHex: "#eef6ff", darkHex: "#152545"),
    "color.status.success.fg": ZDSColorToken(lightHex: "#1f6442", darkHex: "#7fd9a0"),
    "color.status.success.bg": ZDSColorToken(lightHex: "#eefbf3", darkHex: "#0a2418"),
    "color.status.warning.fg": ZDSColorToken(lightHex: "#95511c", darkHex: "#ffc26d"),
    "color.status.warning.bg": ZDSColorToken(lightHex: "#fff8ed", darkHex: "#3a1c0a"),
    "color.status.danger.fg": ZDSColorToken(lightHex: "#922d46", darkHex: "#ff8ea3"),
    "color.status.danger.bg": ZDSColorToken(lightHex: "#fff0f3", darkHex: "#3a0f1c")
  ]
}

public extension Color {
  init(zdsHex hex: String) {
    let sanitized = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
    var value: UInt64 = 0
    Scanner(string: sanitized).scanHexInt64(&value)

    let red, green, blue: Double
    switch sanitized.count {
      case 6:
        red = Double((value >> 16) & 0xFF) / 255
        green = Double((value >> 8) & 0xFF) / 255
        blue = Double(value & 0xFF) / 255
      default:
        red = 0
        green = 0
        blue = 0
    }

    self.init(.sRGB, red: red, green: green, blue: blue, opacity: 1)
  }
}
