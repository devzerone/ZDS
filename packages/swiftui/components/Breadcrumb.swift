import SwiftUI

// MARK: - Public Types

/// Represents a single item in a breadcrumb navigation trail.
public struct ZDSBreadcrumbItem {
  public let label: String
  public let onNavigate: (() -> Void)?
  public let navigationId: String?

  public init(
    label: String,
    onNavigate: (() -> Void)? = nil,
    navigationId: String? = nil
  ) {
    self.label = label
    self.onNavigate = onNavigate
    self.navigationId = navigationId
  }
}

/// Describes the visual role a breadcrumb item plays in the trail.
public enum ZDSBreadcrumbRole: String, CaseIterable {
  case ancestor
  case current
  case collapsedSummary
}

// MARK: - Internal Types

/// Internal representation of a breadcrumb item with its resolved role.
struct ZDSBreadcrumbInternalItem: Identifiable {
  let id: String
  let label: String
  let role: ZDSBreadcrumbRole
  let onNavigate: (() -> Void)?
  let navigationId: String?

  init(
    id: String,
    label: String,
    role: ZDSBreadcrumbRole,
    onNavigate: (() -> Void)? = nil,
    navigationId: String? = nil
  ) {
    self.id = id
    self.label = label
    self.role = role
    self.onNavigate = onNavigate
    self.navigationId = navigationId
  }
}

// MARK: - Collapse Logic

/// Collapses breadcrumb items when the count exceeds `maxVisibleItems`.
///
/// When `items.count > maxVisibleItems` and `maxVisibleItems >= 4`, the function keeps the
/// first item, inserts a collapsed summary ("..."), and appends the last
/// `(maxVisibleItems - 2)` items. Otherwise all items are returned with their
/// roles assigned (last = `.current`, rest = `.ancestor`).
///
/// - Parameters:
///   - items: The full list of breadcrumb items provided by the consumer.
///   - maxVisibleItems: Maximum number of visible items before collapsing occurs.
/// - Returns: An array of internal items with resolved roles.
func collapseBreadcrumbItems(
  items: [ZDSBreadcrumbItem],
  maxVisibleItems: Int?
) -> [ZDSBreadcrumbInternalItem] {
  guard !items.isEmpty else {
    fatalError("ZDS Breadcrumb requires at least one item.")
  }

  let count = items.count

  // No collapse needed when maxVisibleItems is nil, or all items fit, or threshold is below minimum.
  guard let max = maxVisibleItems, count > max, max >= 4 else {
    return items.enumerated().map { index, item in
      ZDSBreadcrumbInternalItem(
        id: item.navigationId ?? "breadcrumb-\(index)",
        label: item.label,
        role: index == count - 1 ? .current : .ancestor,
        onNavigate: item.onNavigate,
        navigationId: item.navigationId
      )
    }
  }

  let tailCount = max - 2
  let trailingItems = items.suffix(tailCount)

  var result: [ZDSBreadcrumbInternalItem] = []

  // First item (ancestor)
  let first = items[0]
  result.append(ZDSBreadcrumbInternalItem(
    id: first.navigationId ?? "breadcrumb-0",
    label: first.label,
    role: .ancestor,
    onNavigate: first.onNavigate,
    navigationId: first.navigationId
  ))

  // Collapsed summary
  result.append(ZDSBreadcrumbInternalItem(
    id: "collapsed-summary",
    label: "...",
    role: .collapsedSummary
  ))

  // Trailing items – the last one is `.current`, the rest are `.ancestor`
  let trailingStartIndex = count - tailCount
  for (offset, item) in trailingItems.enumerated() {
    let absoluteIndex = trailingStartIndex + offset
    let isLast = absoluteIndex == count - 1
    result.append(ZDSBreadcrumbInternalItem(
      id: item.navigationId ?? "breadcrumb-\(absoluteIndex)",
      label: item.label,
      role: isLast ? .current : .ancestor,
      onNavigate: item.onNavigate,
      navigationId: item.navigationId
    ))
  }

  return result
}

// MARK: - Breadcrumb View

/// A breadcrumb navigation component that reveals hierarchy and current location.
///
/// ```swift
/// ZDSBreadcrumb(items: [
///   ZDSBreadcrumbItem(label: "Home", onNavigate: { goToHome() }),
///   ZDSBreadcrumbItem(label: "Products", onNavigate: { goToProducts() }),
///   ZDSBreadcrumbItem(label: "Detail")
/// ])
/// ```
public struct ZDSBreadcrumb: View {
  @Environment(\.colorScheme) private var colorScheme

  public let items: [ZDSBreadcrumbItem]
  public let maxVisibleItems: Int?
  public let ariaLabel: String

  public init(
    items: [ZDSBreadcrumbItem],
    maxVisibleItems: Int? = nil,
    ariaLabel: String = "Breadcrumb"
  ) {
    self.items = items
    self.maxVisibleItems = maxVisibleItems
    self.ariaLabel = ariaLabel
  }

  public var body: some View {
    if items.isEmpty {
      fatalError("ZDS Breadcrumb requires at least one item.")
    }

    let resolved = collapseBreadcrumbItems(items: items, maxVisibleItems: maxVisibleItems)
    let ancestorTokens = ZDSGeneratedBreadcrumbTokens.itemRoles["ancestor"]!
    let currentTokens = ZDSGeneratedBreadcrumbTokens.itemRoles["current"]!
    let collapsedTokens = ZDSGeneratedBreadcrumbTokens.itemRoles["collapsed-summary"]!
    let separatorToken = ZDSGeneratedBreadcrumbTokens.separator

    let itemGap = spacingValue(ZDSGeneratedBreadcrumbTokens.layout["itemGap"])
    let separatorGap = spacingValue(ZDSGeneratedBreadcrumbTokens.layout["separatorGap"])
    let paddingY = spacingValue(ZDSGeneratedBreadcrumbTokens.layout["paddingY"])
    let itemTypography = typographyValue(ZDSGeneratedBreadcrumbTokens.typography["itemLabel"])

    Group {
      HStack(spacing: 0) {
        ForEach(Array(resolved.enumerated()), id: \.element.id) { index, item in
          // Separator before every item except the first
          if index > 0 {
            Image(systemName: "chevron.right")
              .font(.system(size: 12))
              .foregroundStyle(color(from: separatorToken))
              .accessibilityHidden(true)
              .padding(.horizontal, separatorGap)
          }

          // Item content based on role
          switch item.role {
          case .ancestor:
            Button(action: {
              item.onNavigate?()
            }) {
              Text(item.label)
                .font(itemTypography)
                .foregroundStyle(interactiveForeground(from: ancestorTokens))
                .padding(.vertical, paddingY)
            }
            .buttonStyle(.plain)
            .accessibilityLabel(Text(item.label))
            .accessibilityAddTraits(.isButton)

          case .current:
            Text(item.label)
              .font(itemTypography)
              .fontWeight(.semibold)
              .foregroundStyle(currentForeground(from: currentTokens))
              .padding(.vertical, paddingY)
              .accessibilityLabel(Text(item.label))
              .accessibilityAddTraits(.isStaticText)

          case .collapsedSummary:
            Text(item.label)
              .font(itemTypography)
              .foregroundStyle(collapsedForeground(from: collapsedTokens))
              .padding(.vertical, paddingY)
              .accessibilityLabel(Text("Collapsed breadcrumb path"))
          }
        }
      }
    }
    .accessibilityElement(children: .contain)
    .accessibilityAddTraits(.isNavigationMarker)
  }

  // MARK: - Token Helpers

  private func spacingValue(_ tokenName: String?) -> CGFloat {
    guard let tokenName else { return 0 }
    return ZDSFoundationTokens.spacing[tokenName] ?? 0
  }

  private func typographyValue(_ tokenName: String?) -> Font {
    guard let tokenName,
          let token = ZDSFoundationTokens.typography[tokenName] else {
      return .callout
    }
    switch Int(token.fontSize) {
    case 14:
      return .callout
    case 16:
      return .body
    case 18:
      return .title3
    default:
      return .callout
    }
  }

  private func color(from token: ZDSBreadcrumbColorToken) -> Color {
    let hex = colorScheme == .dark ? token.darkHex : token.lightHex
    return Color(zdsHex: hex)
  }

  private func interactiveForeground(
    from roles: [String: ZDSBreadcrumbColorToken]
  ) -> Color {
    guard let token = roles["interactiveForeground"] else {
      return Color(zdsHex: "#3a414e")
    }
    return color(from: token)
  }

  private func currentForeground(
    from roles: [String: ZDSBreadcrumbColorToken]
  ) -> Color {
    guard let token = roles["foreground"] else {
      return Color(zdsHex: "#171b24")
    }
    return color(from: token)
  }

  private func collapsedForeground(
    from roles: [String: ZDSBreadcrumbColorToken]
  ) -> Color {
    guard let token = roles["foreground"] else {
      return Color(zdsHex: "#6b7280")
    }
    return color(from: token)
  }
}
