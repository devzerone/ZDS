# Data Model: Breadcrumb Platform Expansion

**Feature Branch**: `008-breadcrumb-platform-expand`
**Date**: 2026-03-31

## Entities

### BreadcrumbItem

Represents a single step in the navigation hierarchy.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| label | String | Yes | Display text for this breadcrumb step |
| key | String | No | Unique identifier; defaults to label or index |
| isCurrent | Boolean | Derived | Whether this is the current page (last item) |
| isCollapsed | Boolean | Derived | Whether this represents a collapsed summary |
| ariaLabel | String | No | Accessible label override (e.g., for collapsed summary) |

**Validation rules**:
- `label` MUST NOT be empty
- Exactly one item in a path MUST have `isCurrent = true` (the last item)
- `isCollapsed` items MUST NOT be interactive

### BreadcrumbItem (Ancestor variant)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| onNavigate | Callback | Yes | Callback invoked when this ancestor is tapped/clicked |
| navigationId | String | No | Optional identifier passed to `onNavigate` for route resolution |

**Validation rules**:
- Every non-current, non-collapsed item SHOULD have an `onNavigate` callback
- Ancestor items without `onNavigate` render as non-interactive text (degraded but valid)

### BreadcrumbItem (Current variant)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| (all base fields) | — | — | Inherits from BreadcrumbItem |

**Validation rules**:
- MUST be the last item in the path
- MUST be rendered with distinct visual styling (fontWeight emphasis)
- MUST NOT respond to tap/click

### BreadcrumbItem (Collapsed Summary variant)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| label | String | Fixed | Always "..." |
| ariaLabel | String | Yes | Accessible description (e.g., "Collapsed breadcrumb path") |

**Validation rules**:
- MUST NOT be interactive
- Only one collapsed summary may exist per breadcrumb path

### BreadcrumbProps / BreadcrumbConfiguration

The public component configuration accepted by each platform.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| items | Array of BreadcrumbItem | Yes | — | Ordered list from root ancestor to current page |
| maxVisibleItems | Integer | No | null (no overflow) | Threshold for activating collapse-middle overflow |
| ariaLabel | String | No | "Breadcrumb" | Accessible label for the navigation landmark |

**Validation rules**:
- `items` MUST contain at least 1 item
- If `maxVisibleItems < 4`, overflow collapse MUST NOT activate

## Relationships

```
BreadcrumbConfiguration
  └── items: BreadcrumbItem[] (ordered, 1..N)
        ├── Ancestor (0..N-1 items, interactive, has onNavigate)
        ├── CollapsedSummary (0..1 items, overflow indicator)
        └── Current (exactly 1, always last, non-interactive)
```

## State Transitions

### Overflow Collapse

```
Input: items[1..N], maxVisibleItems=M

If N <= M OR M < 4:
  → Display all items (no collapse)

If N > M AND M >= 4:
  → visible = [items[0], CollapsedSummary, ...items[N-(M-2)..N-1]]
  → Hidden items count: N - M
  → Preserved: first item + last (M-2) items
```

### Single-Item Path

```
Input: items[1] (single current item)
→ Render as non-interactive text, no separators, no navigation landmark
```

## Platform Token Mapping

### Layout Tokens

| Token Name | Semantic Reference | Usage |
|------------|-------------------|-------|
| itemGap | space.050 | Gap between breadcrumb items |
| separatorGap | space.100 | Gap around separators |
| wrapGap | space.100 | Row gap when wrapping |
| paddingY | space.050 | Vertical padding on items |

### Color Tokens (per role)

| Role | Token | Usage |
|------|-------|-------|
| ancestor.foreground | color.fg.secondary | Default ancestor text color |
| ancestor.interactiveForeground | color.fg.secondary | Ancestor link color (tap target) |
| ancestor.focus | color.accent.primary | Ancestor focus ring color |
| current.foreground | color.fg.primary | Current item text color |
| current.emphasis | color.fg.primary | Current item emphasis color |
| collapsed-summary.foreground | color.fg.tertiary | Collapsed "..." text color |
| separator.foreground | color.fg.tertiary | Chevron separator color |

### Typography Tokens

| Token Name | Semantic Reference | Usage |
|------------|-------------------|-------|
| itemLabel | font.label.md | Font for breadcrumb item labels |
| summaryLabel | font.label.md | Font for collapsed summary label |
