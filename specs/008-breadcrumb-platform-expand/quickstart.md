# Quickstart: Breadcrumb Platform Expansion

**Feature Branch**: `008-breadcrumb-platform-expand`
**Date**: 2026-03-31

## Overview

Extend the existing React breadcrumb component to three native platforms: SwiftUI (iOS), Kotlin/Compose (Android), and Windows/WinUI. Each platform follows the Button component's established patterns for file structure, token consumption, and export conventions.

## Key Reference Files

| Purpose | Path |
|---------|------|
| Shared semantics contract | `spec/components/breadcrumb/breadcrumb.spec.json` |
| Shared design tokens | `packages/tokens/data/components/breadcrumb.json` |
| React reference implementation | `packages/react/src/components/breadcrumb/Breadcrumb.tsx` |
| React primitive layer | `packages/react/src/primitives/breadcrumb/` |
| Existing breadcrumb contract | `specs/006-breadcrumb-component/contracts/breadcrumb-component-contract.md` |
| Button component (SwiftUI pattern) | `packages/swiftui/components/Button.swift` |
| Button component (Kotlin pattern) | `packages/kotlin/components/Button.kt` |
| Button component (Windows pattern) | `packages/windows/components/Button.xaml` |

## Implementation Sequence

### Step 1: Generate platform tokens

Run the token generation pipeline to create breadcrumb token files for each platform:

```bash
# From repo root
node packages/tokens/scripts/build-platform-tokens.mjs \
  --sync-consumer-root packages/swiftui --sync-subdir .generated
node packages/tokens/scripts/build-platform-tokens.mjs --platform swiftui \
  --sync-consumer-root packages/swiftui --sync-subdir .generated
node packages/tokens/scripts/build-platform-tokens.mjs --platform kotlin \
  --sync-consumer-root packages/kotlin --sync-subdir .generated
node packages/tokens/scripts/build-platform-tokens.mjs --platform windows \
  --sync-consumer-root packages/windows --sync-subdir .generated
```

Expected outputs:
- `packages/swiftui/.generated/ZDSBreadcrumbTokens.swift`
- `packages/kotlin/.generated/ZDSBreadcrumbTokens.kt`
- `packages/windows/.generated/BreadcrumbTokens.xaml`

### Step 2: Implement per-platform components

Each platform creates its breadcrumb component following the Button pattern:

**SwiftUI**: `packages/swiftui/components/Breadcrumb.swift`
- Import `ZDSGeneratedBreadcrumbTokens`
- Use `HStack` with `ForEach` for items
- Use `Button` for ancestors, `Text` for current/collapsed
- Use `Image(systemName: "chevron.right")` for separators
- Apply `.accessibilityElement` modifiers

**Kotlin/Compose**: `packages/kotlin/components/Breadcrumb.kt`
- Import `ZDSBreadcrumbTokens`
- Use `Row` with `forEach` for items
- Use `ClickableText` or `TextButton` for ancestors, `Text` for current/collapsed
- Use Compose `Icon` for separators
- Apply `semantics` modifiers for accessibility

**Windows/WinUI**: `packages/windows/components/Breadcrumb.xaml` + `Breadcrumb.xaml.cs`
- Merge `BreadcrumbTokens.xaml` resources
- Use `StackPanel` (Orientation="Horizontal") with items
- Use `HyperlinkButton` for ancestors, `TextBlock` for current/collapsed
- Use `FontIcon` or `PathIcon` for separators
- Set `AutomationProperties.LandmarkType="Navigation"`

### Step 3: Update parity metadata

Update `spec/components/breadcrumb/breadcrumb.spec.json`:
- Change each platform's `parity.status` from "not-started" to "ready"
- Set `remediationTarget` to "008-breadcrumb-platform-expand"

### Step 4: Create accessibility checklists

Create manual accessibility checklists for each platform under `testing/accessibility/`:
- `breadcrumb-accessibility-checklist-swiftui.md`
- `breadcrumb-accessibility-checklist-kotlin.md`
- `breadcrumb-accessibility-checklist-windows.md`

### Step 5: Update documentation

Update `apps/docs/content/components/breadcrumb.mdx`:
- Update parity status table to show all platforms as "ready"

## Key API Patterns

### Item model (platform-agnostic)

```
BreadcrumbItem {
  label: String           // Required. Display text.
  isCurrent: Boolean      // Derived. True for last item.
  onNavigate: Function?   // Callback for ancestor items.
  navigationId: String?   // Optional route identifier.
}
```

### Overflow algorithm

```
function collapse(items, maxVisible):
  if maxVisible < 4 OR items.length <= maxVisible:
    return items
  return [items[0], CollapsedSummary("..."), ...items.slice(items.length - (maxVisible - 2))]
```

### Token categories

| Category | Tokens |
|----------|--------|
| Layout | itemGap, separatorGap, wrapGap, paddingY |
| Typography | itemLabel, summaryLabel |
| Ancestor colors | foreground, interactiveForeground, focus |
| Current colors | foreground, emphasis |
| Collapsed colors | foreground |
| Separator colors | foreground |
