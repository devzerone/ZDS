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
    Button(action: {
      guard state != .loading, state != .disabled else {
        return
      }
      onPress()
    }) {
      HStack(spacing: spacingValue) {
        if let leadingIcon {
          leadingIcon
        }
        Text(label)
          .font(fontValue)
        if state == .loading {
          ProgressView()
            .progressViewStyle(.circular)
        } else if let trailingIcon {
          trailingIcon
        }
      }
      .frame(minHeight: minHeightValue)
      .padding(.horizontal, horizontalPadding)
      .padding(.vertical, verticalPadding)
      .frame(maxWidth: .infinity)
    }
    .buttonStyle(.plain)
    .disabled(state == .loading || state == .disabled)
    .accessibilityLabel(Text(label))
  }

  private var minHeightValue: CGFloat {
    switch size {
      case .small: return 32
      case .medium: return 40
      case .large: return 48
    }
  }

  private var horizontalPadding: CGFloat {
    switch size {
      case .small: return 12
      case .medium: return 16
      case .large: return 20
    }
  }

  private var verticalPadding: CGFloat {
    switch size {
      case .small: return 4
      case .medium: return 8
      case .large: return 12
    }
  }

  private var spacingValue: CGFloat {
    switch size {
      case .small: return 4
      case .medium, .large: return 8
    }
  }

  private var fontValue: Font {
    switch size {
      case .large: return .body
      case .small, .medium: return .callout
    }
  }
}
