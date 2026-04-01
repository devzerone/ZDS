package zds.breadcrumb

import zds.foundation.ZDSFoundationTokens
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.foundation.isSystemInDarkTheme

// Review note: Compose breadcrumb mirrors the React collapse and role semantics.
// Accessibility follows the Kotlin/Compose TalkBack checklist in
// testing/accessibility/breadcrumb-accessibility-checklist-kotlin.md.

/**
 * A single breadcrumb entry provided by the consumer.
 *
 * @param label         Display text for this breadcrumb item.
 * @param onNavigate    Optional click handler. When null the item is non-interactive.
 * @param navigationId  Optional stable identifier used as a Compose key for recomposition.
 */
data class ZDSBreadcrumbItem(
    val label: String,
    val onNavigate: (() -> Unit)? = null,
    val navigationId: String? = null
)

/**
 * Visual / semantic role assigned to each item during rendering.
 * Maps to the token roles in [ZDSBreadcrumbTokens.itemRoles].
 */
enum class ZDSBreadcrumbRole {
    ANCESTOR,
    CURRENT,
    COLLAPSED_SUMMARY
}

/**
 * Internal representation used by the composable after collapse logic is applied.
 * Carries the resolved [role] alongside the original consumer data.
 */
internal data class ZDSBreadcrumbInternalItem(
    val role: ZDSBreadcrumbRole,
    val label: String,
    val onNavigate: (() -> Unit)? = null,
    val navigationId: String? = null
)

/**
 * Applies breadcrumb collapse logic.
 *
 * When [items] has more entries than [maxVisibleItems] **and** [maxVisibleItems] >= 4,
 * the result is:
 *   [first item] + [CollapsedSummary("...")] + [last (maxVisibleItems - 2) items]
 *
 * Otherwise every item is returned with the last one marked [ZDSBreadcrumbRole.CURRENT]
 * and the rest marked [ZDSBreadcrumbRole.ANCESTOR].
 *
 * @throws IllegalArgumentException if [items] is empty.
 */
fun collapseBreadcrumbItems(
    items: List<ZDSBreadcrumbItem>,
    maxVisibleItems: Int? = null
): List<ZDSBreadcrumbInternalItem> {
    require(items.isNotEmpty()) {
        "ZDS Breadcrumb requires at least one item."
    }

    if (maxVisibleItems != null && items.size > maxVisibleItems && maxVisibleItems >= 4) {
        val tailCount = maxVisibleItems - 2
        val trailing = items.takeLast(tailCount)

        return buildList {
            add(
                ZDSBreadcrumbInternalItem(
                    role = ZDSBreadcrumbRole.ANCESTOR,
                    label = items[0].label,
                    onNavigate = items[0].onNavigate,
                    navigationId = items[0].navigationId
                )
            )
            add(
                ZDSBreadcrumbInternalItem(
                    role = ZDSBreadcrumbRole.COLLAPSED_SUMMARY,
                    label = "..."
                )
            )
            trailing.forEach { item ->
                val isLast = item === items.last()
                add(
                    ZDSBreadcrumbInternalItem(
                        role = if (isLast) ZDSBreadcrumbRole.CURRENT else ZDSBreadcrumbRole.ANCESTOR,
                        label = item.label,
                        onNavigate = item.onNavigate,
                        navigationId = item.navigationId
                    )
                )
            }
        }
    }

    return items.mapIndexed { index, item ->
        ZDSBreadcrumbInternalItem(
            role = if (index == items.lastIndex) ZDSBreadcrumbRole.CURRENT else ZDSBreadcrumbRole.ANCESTOR,
            label = item.label,
            onNavigate = item.onNavigate,
            navigationId = item.navigationId
        )
    }
}

/**
 * Resolved token values consumed by the composable.
 * All dimensions are in dp-ready Int values resolved from [ZDSFoundationTokens].
 */
data class ZDSBreadcrumbStyle(
    val itemGap: Int,
    val separatorGap: Int,
    val wrapGap: Int,
    val paddingY: Int,
    val itemFontSize: Int,
    val itemLineHeight: Int,
    val itemFontWeight: Int,
    val summaryFontSize: Int,
    val summaryLineHeight: Int,
    val summaryFontWeight: Int,
    val ancestorForegroundHex: String,
    val ancestorInteractiveForegroundHex: String,
    val ancestorFocusHex: String,
    val currentForegroundHex: String,
    val currentEmphasisHex: String,
    val collapsedSummaryForegroundHex: String,
    val separatorForegroundHex: String
)

/**
 * Resolves all breadcrumb token values for the given [darkMode] setting.
 * Follows the same token-resolution pattern as [zdsButtonStyle].
 */
fun zdsBreadcrumbStyle(darkMode: Boolean = false): ZDSBreadcrumbStyle {
    val ancestorTokens = ZDSBreadcrumbTokens.itemRoles["ancestor"]!!
    val currentTokens = ZDSBreadcrumbTokens.itemRoles["current"]!!
    val collapsedTokens = ZDSBreadcrumbTokens.itemRoles["collapsed-summary"]!!
    val separatorTokens = ZDSBreadcrumbTokens.separator

    val itemTypoToken = ZDSFoundationTokens.typography.getValue(ZDSBreadcrumbTokens.typography.getValue("itemLabel"))
    val summaryTypoToken = ZDSFoundationTokens.typography.getValue(ZDSBreadcrumbTokens.typography.getValue("summaryLabel"))

    fun ZDSBreadcrumbColorToken.hex() = if (darkMode) darkHex else lightHex

    return ZDSBreadcrumbStyle(
        itemGap = ZDSFoundationTokens.spacing.getValue(ZDSBreadcrumbTokens.layout.getValue("itemGap")),
        separatorGap = ZDSFoundationTokens.spacing.getValue(ZDSBreadcrumbTokens.layout.getValue("separatorGap")),
        wrapGap = ZDSFoundationTokens.spacing.getValue(ZDSBreadcrumbTokens.layout.getValue("wrapGap")),
        paddingY = ZDSFoundationTokens.spacing.getValue(ZDSBreadcrumbTokens.layout.getValue("paddingY")),
        itemFontSize = itemTypoToken.fontSize,
        itemLineHeight = itemTypoToken.lineHeight,
        itemFontWeight = itemTypoToken.fontWeight,
        summaryFontSize = summaryTypoToken.fontSize,
        summaryLineHeight = summaryTypoToken.lineHeight,
        summaryFontWeight = summaryTypoToken.fontWeight,
        ancestorForegroundHex = (ancestorTokens["foreground"] as ZDSBreadcrumbColorToken).hex(),
        ancestorInteractiveForegroundHex = (ancestorTokens["interactiveForeground"] as ZDSBreadcrumbColorToken).hex(),
        ancestorFocusHex = (ancestorTokens["focus"] as ZDSBreadcrumbColorToken).hex(),
        currentForegroundHex = (currentTokens["foreground"] as ZDSBreadcrumbColorToken).hex(),
        currentEmphasisHex = (currentTokens["emphasis"] as ZDSBreadcrumbColorToken).hex(),
        collapsedSummaryForegroundHex = (collapsedTokens["foreground"] as ZDSBreadcrumbColorToken).hex(),
        separatorForegroundHex = separatorTokens.hex()
    )
}

/**
 * ZDS Breadcrumb composable.
 *
 * Renders a horizontal breadcrumb trail with optional collapse logic.
 *
 * @param items            Consumer-provided breadcrumb entries. Must contain at least one item.
 * @param maxVisibleItems  When set and >= 4, items beyond this threshold are collapsed
 *                         into a "..." summary between the first and last N-2 items.
 * @param ariaLabel        Accessibility label applied to the container semantics.
 * @throws IllegalArgumentException if [items] is empty.
 */
@Composable
fun zdsBreadcrumb(
    items: List<ZDSBreadcrumbItem>,
    maxVisibleItems: Int? = null,
    ariaLabel: String = "Breadcrumb"
) {
    require(items.isNotEmpty()) {
        "ZDS Breadcrumb requires at least one item."
    }

    val style = zdsBreadcrumbStyle(darkMode = isSystemInDarkTheme())
    val resolvedItems = collapseBreadcrumbItems(items, maxVisibleItems)

    Row(
        horizontalArrangement = Arrangement.spacedBy(style.itemGap.dp),
        modifier = Modifier
            .semantics(mergeDescendants = true) {
                contentDescription = ariaLabel
            }
            .padding(vertical = style.paddingY.dp)
    ) {
        resolvedItems.forEachIndexed { index, item ->
            // Separator before every item except the first
            if (index > 0) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
                    contentDescription = null,
                    tint = Color(android.graphics.Color.parseColor(style.separatorForegroundHex)),
                    modifier = Modifier.clearAndSetSemantics { }
                )
            }

            when (item.role) {
                ZDSBreadcrumbRole.ANCESTOR -> {
                    val textStyle = TextStyle(
                        fontSize = style.itemFontSize.sp,
                        lineHeight = style.itemLineHeight.sp,
                        fontWeight = FontWeight(style.itemFontWeight),
                        color = Color(android.graphics.Color.parseColor(style.ancestorInteractiveForegroundHex))
                    )

                    if (item.onNavigate != null) {
                        Text(
                            text = item.label,
                            style = textStyle,
                            modifier = Modifier.clickable {
                                item.onNavigate.invoke()
                            }
                        )
                    } else {
                        Text(
                            text = item.label,
                            style = textStyle
                        )
                    }
                }

                ZDSBreadcrumbRole.CURRENT -> {
                    Text(
                        text = item.label,
                        style = TextStyle(
                            fontSize = style.itemFontSize.sp,
                            lineHeight = style.itemLineHeight.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Color(android.graphics.Color.parseColor(style.currentForegroundHex))
                        )
                    )
                }

                ZDSBreadcrumbRole.COLLAPSED_SUMMARY -> {
                    Text(
                        text = item.label,
                        style = TextStyle(
                            fontSize = style.summaryFontSize.sp,
                            lineHeight = style.summaryLineHeight.sp,
                            fontWeight = FontWeight(style.summaryFontWeight),
                            color = Color(android.graphics.Color.parseColor(style.collapsedSummaryForegroundHex))
                        ),
                        modifier = Modifier.clearAndSetSemantics {
                            contentDescription = "Collapsed breadcrumb path"
                        }
                    )
                }
            }
        }
    }
}
