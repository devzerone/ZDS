package zds.breadcrumb

data class ZDSBreadcrumbColorToken(
    val token: String,
    val lightHex: String,
    val darkHex: String
)

object ZDSBreadcrumbTokens {
    val layout = mapOf(
        "itemGap" to "space.050",
        "separatorGap" to "space.100",
        "wrapGap" to "space.100",
        "paddingY" to "space.050"
    )

    val typography = mapOf(
        "itemLabel" to "font.label.md",
        "summaryLabel" to "font.label.md"
    )

    val itemRoles = mapOf(
        "ancestor" to mapOf(
            "foreground" to ZDSBreadcrumbColorToken(token = "color.fg.secondary", lightHex = "#3a414e", darkHex = "#e4e8ee"),
            "interactiveForeground" to ZDSBreadcrumbColorToken(token = "color.fg.secondary", lightHex = "#3a414e", darkHex = "#e4e8ee"),
            "focus" to ZDSBreadcrumbColorToken(token = "color.accent.primary", lightHex = "#5e6ad2", darkHex = "#b2bbff")
        ),
        "current" to mapOf(
            "foreground" to ZDSBreadcrumbColorToken(token = "color.fg.primary", lightHex = "#171b24", darkHex = "#f8f9fb"),
            "emphasis" to ZDSBreadcrumbColorToken(token = "color.fg.primary", lightHex = "#171b24", darkHex = "#f8f9fb")
        ),
        "collapsed-summary" to mapOf(
            "foreground" to ZDSBreadcrumbColorToken(token = "color.fg.tertiary", lightHex = "#6b7280", darkHex = "#9aa3b2")
        )
    )

    val separator = ZDSBreadcrumbColorToken(token = "color.fg.tertiary", lightHex = "#6b7280", darkHex = "#9aa3b2")
}
