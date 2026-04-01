import SwiftUI

// Review note: SwiftUI preserves the shared variant, size, and core state names.
// Touch-first parity exceptions for hover and pressed are documented in
// spec/components/button/button.spec.json as swiftui-hover-pressed.
public enum ZDSButtonVariant: String, CaseIterable {
  case primary
  case secondary
  case tertiary
  case destructive
}

public enum ZDSButtonSize: String, CaseIterable {
  case small
  case medium
  case large
}

public enum ZDSButtonState: String, CaseIterable {
  case `default`
  case focus
  case disabled
  case loading
}

public struct ZDSButton: View {
  @Environment(\.colorScheme) private var colorScheme

  public let label: String
  public let variant: ZDSButtonVariant
  public let size: ZDSButtonSize
  public let state: ZDSButtonState
  public let leadingIcon: Image?
  public let trailingIcon: Image?
  public let onPress: () -> Void

  public init(
    label: String,
    variant: ZDSButtonVariant = .primary,
    size: ZDSButtonSize = .medium,
    state: ZDSButtonState = .default,
    leadingIcon: Image? = nil,
    trailingIcon: Image? = nil,
    onPress: @escaping () -> Void = {}
  ) {
    self.label = label
    self.variant = variant
    self.size = size
    self.state = state
    self.leadingIcon = leadingIcon
    self.trailingIcon = trailingIcon
    self.onPress = onPress
  }

  public var body: some View {
    let sizeTokens = ZDSGeneratedButtonTokens.sizeTokens(for: size)
    let colorTokens = ZDSGeneratedButtonTokens.colorTokens(for: variant, state: state)

    Button(action: {
      guard state != .loading, state != .disabled else {
        return
      }
      onPress()
    }) {
      HStack(spacing: spacingValue(sizeTokens)) {
        if let leadingIcon {
          leadingIcon
            .foregroundStyle(Color(zdsHex: foregroundHex(colorTokens)))
        }
        Text(label)
          .font(fontValue(sizeTokens))
          .foregroundStyle(Color(zdsHex: foregroundHex(colorTokens)))
        if state == .loading {
          ProgressView()
            .progressViewStyle(.circular)
            .tint(Color(zdsHex: foregroundHex(colorTokens)))
        } else if let trailingIcon {
          trailingIcon
            .foregroundStyle(Color(zdsHex: foregroundHex(colorTokens)))
        }
      }
      .frame(minHeight: sizeTokens.minHeight)
      .padding(.horizontal, spacingValue(sizeTokens.paddingX))
      .padding(.vertical, spacingValue(sizeTokens.paddingY))
      .frame(maxWidth: .infinity)
      .background(
        RoundedRectangle(cornerRadius: radiusValue(sizeTokens))
          .fill(Color(zdsHex: backgroundHex(colorTokens)))
      )
      .overlay(
        RoundedRectangle(cornerRadius: radiusValue(sizeTokens))
          .stroke(Color(zdsHex: borderHex(colorTokens)), lineWidth: 1)
      )
    }
    .buttonStyle(.plain)
    .disabled(state == .loading || state == .disabled)
    .accessibilityLabel(Text(label))
  }

  private func spacingValue(_ tokenName: String) -> CGFloat {
    ZDSFoundationTokens.spacing[tokenName] ?? 0
  }

  private func radiusValue(_ sizeTokens: ZDSButtonSizeTokenSet) -> CGFloat {
    ZDSFoundationTokens.radius[sizeTokens.radius] ?? 0
  }

  private func spacingValue(_ sizeTokens: ZDSButtonSizeTokenSet) -> CGFloat {
    ZDSFoundationTokens.spacing[sizeTokens.gap] ?? 0
  }

  private func fontValue(_ sizeTokens: ZDSButtonSizeTokenSet) -> Font {
    let typography = ZDSFoundationTokens.typography[sizeTokens.labelTypography]
    switch typography?.fontSize {
      case 18:
        return .body
      default:
        return .callout
    }
  }

  private func backgroundHex(_ tokenSet: ZDSButtonColorTokenSet) -> String {
    colorScheme == .dark ? tokenSet.backgroundDarkHex : tokenSet.backgroundLightHex
  }

  private func foregroundHex(_ tokenSet: ZDSButtonColorTokenSet) -> String {
    colorScheme == .dark ? tokenSet.foregroundDarkHex : tokenSet.foregroundLightHex
  }

  private func borderHex(_ tokenSet: ZDSButtonColorTokenSet) -> String {
    colorScheme == .dark ? tokenSet.borderDarkHex : tokenSet.borderLightHex
  }
}
