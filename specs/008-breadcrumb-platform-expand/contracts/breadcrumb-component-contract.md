# Breadcrumb Platform Expansion Contract

**Feature Branch**: `008-breadcrumb-platform-expand`
**Date**: 2026-03-31
**Supersedes**: `specs/006-breadcrumb-component/contracts/breadcrumb-component-contract.md` (extends for native platforms)

## Purpose

This contract extends the existing breadcrumb contract to cover native platform implementations (SwiftUI, Kotlin/Compose, Windows/WinUI). It defines the minimum behavioral and structural requirements that each native platform MUST satisfy to achieve parity with the React reference.

## Shared Semantics Contract (unchanged)

All rules from the original `specs/006-breadcrumb-component/contracts/breadcrumb-component-contract.md` remain binding. This document adds only the native-platform-specific additions.

## Native Platform Public API Contract

### Component Configuration

Each platform MUST expose a breadcrumb component accepting:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| items | Ordered list of item models | Yes | — | Breadcrumb items from root to current page |
| maxVisibleItems | Integer | No | null | Overflow threshold; collapse activates when item count exceeds this value |
| onNavigate | Callback(item) | Yes* | — | Per-item callback invoked when an ancestor is tapped/clicked |
| ariaLabel / accessibilityLabel | String | No | "Breadcrumb" | Accessible name for the navigation landmark |

*`onNavigate` is required on the component level; individual items that lack a callback render as non-interactive text.

### Item Model

Each platform MUST define an item model with:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| label | String | Yes | Display text |
| isCurrent | Boolean | Derived | Automatically true for the last item |
| onNavigate | Callback | Conditional | Required for ancestor items; omitted for current and collapsed items |
| navigationId | String | No | Optional identifier passed to onNavigate |

### Overflow Contract (native-specific)

1. The collapse algorithm MUST follow the React reference: `collapseBreadcrumbItems` in `packages/react/src/components/breadcrumb/Breadcrumb.tsx`.
2. When `maxVisibleItems` is not provided or is less than 4, the full path MUST render without collapse.
3. When collapse is active: `[first item] + [collapsed summary "..."] + [last (maxVisibleItems - 2) items]`.
4. The collapsed summary MUST NOT be a dropdown, expandable control, or navigation target.

### Separator Contract (native-specific)

1. Separators MUST be chevron-right icons rendered as decorative elements.
2. Separators MUST be hidden from assistive technology (equivalent of `aria-hidden="true"`).
3. Separators MUST NOT receive keyboard focus.

## Accessibility Contract (native-specific)

### iOS / SwiftUI

1. The breadcrumb container MUST use `.accessibilityElement(children: .contain)` with `.accessibilityAddTraits(.isNavigationMarker)`.
2. Ancestor items MUST be focusable and announced as links/buttons.
3. Current item MUST be announced as text (not a link) with indication of current page.
4. Separators MUST have `.accessibilityHidden(true)`.
5. The collapsed summary MUST be announced as decorative/hidden or with a descriptive label like "Collapsed breadcrumb path".

### Android / Kotlin Compose

1. The breadcrumb container MUST use `semantics { traversalIndex = 0f }` with appropriate content description.
2. Ancestor items MUST be clickable and announced as navigation targets.
3. Current item MUST have `Role.Text` semantics and be announced distinctly from ancestors.
4. Separators MUST have `clearAndSetSemantics { }` to be hidden from TalkBack.
5. The collapsed summary MUST be announced as "Collapsed breadcrumb path" or hidden.

### Windows / WinUI

1. The breadcrumb container MUST use `AutomationProperties.LandmarkType="Navigation"`.
2. Ancestor items MUST be `HyperlinkButton` or equivalent with `AutomationProperties.Name`.
3. Current item MUST be a `TextBlock` (not a button) with `AutomationProperties.HelpText` indicating current page.
4. Separators MUST have `AutomationProperties.AccessibilityView="Raw"` to hide from Narrator.
5. The collapsed summary MUST have `AutomationProperties.Name="Collapsed breadcrumb path"`.

## Parity Contract (updated)

1. React is the reference implementation; native platforms achieve parity by satisfying all rules in this contract.
2. Parity status in `spec/components/breadcrumb/breadcrumb.spec.json` MUST be updated per platform upon completion:
   - `swiftui.status` → "ready"
   - `kotlin.status` → "ready"
   - `windows.status` → "ready"
3. Parity means preserved contract, semantics, overflow behavior, and accessibility expectations — not pixel-identical rendering.
4. No platform exceptions are approved for v1.

## Token Consumption Contract

1. Each platform MUST consume tokens from the generated platform-specific token file (`.generated/ZDSBreadcrumbTokens.swift`, `.generated/ZDSBreadcrumbTokens.kt`, `.generated/BreadcrumbTokens.xaml`).
2. Token files are generated by `packages/tokens/scripts/build-platform-tokens.mjs` reading `packages/tokens/data/components/breadcrumb.json`.
3. Components MUST NOT hardcode color values or spacing; all visual values MUST come from the token layer.
4. Dark mode support MUST be handled through the token layer's light/dark hex variants.
