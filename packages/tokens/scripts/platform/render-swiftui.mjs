function escapeSwiftString(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll("\"", "\\\"");
}

function renderSpacingMap(spacing) {
  return Object.entries(spacing)
    .map(([key, value]) => `    "${escapeSwiftString(key)}": ${value}`)
    .join(",\n");
}

function renderRadiusMap(radius) {
  return Object.entries(radius)
    .map(([key, value]) => `    "${escapeSwiftString(key)}": ${value}`)
    .join(",\n");
}

function renderTypographyMap(typography) {
  return Object.entries(typography)
    .map(
      ([key, value]) =>
        `    "${escapeSwiftString(key)}": ZDSTypographyToken(fontSize: ${value.fontSize}, lineHeight: ${value.lineHeight}, fontWeight: ${value.fontWeight})`
    )
    .join(",\n");
}

function renderColorMap(colors) {
  return Object.entries(colors)
    .map(
      ([key, value]) =>
        `    "${escapeSwiftString(key)}": ZDSColorToken(lightHex: "${value.lightHex}", darkHex: "${value.darkHex}")`
    )
    .join(",\n");
}

function renderButtonVariantMap(variants) {
  return Object.entries(variants)
    .map(([variantName, states]) => {
      const stateLines = Object.entries(states)
        .map(
          ([stateName, tokenSet]) =>
            `      "${stateName}": ZDSButtonColorTokenSet(backgroundToken: "${tokenSet.background.token}", backgroundLightHex: "${tokenSet.background.lightHex}", backgroundDarkHex: "${tokenSet.background.darkHex}", foregroundToken: "${tokenSet.foreground.token}", foregroundLightHex: "${tokenSet.foreground.lightHex}", foregroundDarkHex: "${tokenSet.foreground.darkHex}", borderToken: "${tokenSet.border.token}", borderLightHex: "${tokenSet.border.lightHex}", borderDarkHex: "${tokenSet.border.darkHex}", focusToken: "${tokenSet.focus.token}", focusLightHex: "${tokenSet.focus.lightHex}", focusDarkHex: "${tokenSet.focus.darkHex}")`
        )
        .join(",\n");

      return `    "${variantName}": [\n${stateLines}\n    ]`;
    })
    .join(",\n");
}

function renderButtonSizeMap(sizes) {
  return Object.entries(sizes)
    .map(
      ([sizeName, sizeValue]) =>
        `    "${sizeName}": ZDSButtonSizeTokenSet(minHeight: ${sizeValue.minHeight}, paddingX: ${JSON.stringify(sizeValue.paddingX)}, paddingY: ${JSON.stringify(sizeValue.paddingY)}, gap: ${JSON.stringify(sizeValue.gap)}, radius: ${JSON.stringify(sizeValue.radius)}, labelTypography: ${JSON.stringify(sizeValue.labelTypography)}, iconSize: ${sizeValue.iconSize})`
    )
    .join(",\n");
}

function renderBreadcrumbRoleColorEntries(itemRoles) {
  return Object.entries(itemRoles)
    .map(([roleName, tokens]) => {
      const props = Object.entries(tokens)
        .map(([prop, value]) => {
          if (typeof value === "object" && value.lightHex !== undefined) {
            return `      "${prop}": ZDSBreadcrumbColorToken(token: "${value.token}", lightHex: "${value.lightHex}", darkHex: "${value.darkHex}")`;
          }
          return `      "${prop}": ${JSON.stringify(value)}`;
        })
        .join(",\n");
      return `    "${roleName}": [\n${props}\n    ]`;
    })
    .join(",\n");
}

function renderBreadcrumbSwift(graph) {
  const bc = graph.breadcrumb;
  return `import SwiftUI

public struct ZDSBreadcrumbColorToken {
  public let token: String
  public let lightHex: String
  public let darkHex: String
}

public enum ZDSGeneratedBreadcrumbTokens {
  public static let layout: [String: String] = [
${Object.entries(bc.layout).map(([k, v]) => `    "${k}": "${v}"`).join(",\n")}
  ]

  public static let typography: [String: String] = [
${Object.entries(bc.typography).map(([k, v]) => `    "${k}": "${v}"`).join(",\n")}
  ]

  public static let itemRoles: [String: [String: ZDSBreadcrumbColorToken]] = [
${renderBreadcrumbRoleColorEntries(bc.itemRoles)}
  ]

  public static let separator = ZDSBreadcrumbColorToken(token: "${bc.separator.foregroundToken}", lightHex: "${bc.separator.lightHex}", darkHex: "${bc.separator.darkHex}")
}
`;
}

export function renderSwiftUIArtifacts(graph) {
  const foundation = `import SwiftUI

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
${renderSpacingMap(graph.foundation.spacing)}
  ]

  public static let radius: [String: CGFloat] = [
${renderRadiusMap(graph.foundation.radius)}
  ]

  public static let typography: [String: ZDSTypographyToken] = [
${renderTypographyMap(graph.foundation.typography)}
  ]

  public static let colors: [String: ZDSColorToken] = [
${renderColorMap(graph.foundation.colors)}
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
`;

  const button = `import SwiftUI

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
  public static let statePrecedence: [String] = ${JSON.stringify(graph.button.statePrecedence)}

  public static let sizes: [String: ZDSButtonSizeTokenSet] = [
${renderButtonSizeMap(graph.button.sizes)}
  ]

  public static let variants: [String: [String: ZDSButtonColorTokenSet]] = [
${renderButtonVariantMap(graph.button.variants)}
  ]

  public static func sizeTokens(for size: ZDSButtonSize) -> ZDSButtonSizeTokenSet {
    sizes[size.rawValue]!
  }

  public static func colorTokens(for variant: ZDSButtonVariant, state: ZDSButtonState) -> ZDSButtonColorTokenSet {
    variants[variant.rawValue]![state.rawValue]!
  }
}
`;

  return {
    "ZDSFoundationTokens.swift": foundation,
    "ZDSButtonTokens.swift": button,
    "ZDSBreadcrumbTokens.swift": renderBreadcrumbSwift(graph)
  };
}
