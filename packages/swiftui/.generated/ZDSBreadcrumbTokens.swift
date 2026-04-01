import SwiftUI

public struct ZDSBreadcrumbColorToken {
  public let token: String
  public let lightHex: String
  public let darkHex: String
}

public enum ZDSGeneratedBreadcrumbTokens {
  public static let layout: [String: String] = [
    "itemGap": "space.050",
    "separatorGap": "space.100",
    "wrapGap": "space.100",
    "paddingY": "space.050"
  ]

  public static let typography: [String: String] = [
    "itemLabel": "font.label.md",
    "summaryLabel": "font.label.md"
  ]

  public static let itemRoles: [String: [String: ZDSBreadcrumbColorToken]] = [
    "ancestor": [
      "foreground": ZDSBreadcrumbColorToken(token: "color.fg.secondary", lightHex: "#3a414e", darkHex: "#e4e8ee"),
      "interactiveForeground": ZDSBreadcrumbColorToken(token: "color.fg.secondary", lightHex: "#3a414e", darkHex: "#e4e8ee"),
      "focus": ZDSBreadcrumbColorToken(token: "color.accent.primary", lightHex: "#5e6ad2", darkHex: "#b2bbff")
    ],
    "current": [
      "foreground": ZDSBreadcrumbColorToken(token: "color.fg.primary", lightHex: "#171b24", darkHex: "#f8f9fb"),
      "emphasis": ZDSBreadcrumbColorToken(token: "color.fg.primary", lightHex: "#171b24", darkHex: "#f8f9fb")
    ],
    "collapsed-summary": [
      "foreground": ZDSBreadcrumbColorToken(token: "color.fg.tertiary", lightHex: "#6b7280", darkHex: "#9aa3b2")
    ]
  ]

  public static let separator = ZDSBreadcrumbColorToken(token: "color.fg.tertiary", lightHex: "#6b7280", darkHex: "#9aa3b2")
}
