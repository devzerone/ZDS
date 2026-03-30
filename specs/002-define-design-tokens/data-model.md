# Data Model: 브랜드 차별화 디자인 토큰 정의

## Entity: PaletteFamily

**Description**: A raw color family that groups related tonal steps under one
visual identity.

**Fields**:

- `name`: Semantic family identifier such as `brand`, `secondary-teal`, or `neutral`
- `role`: Whether the family is primary, secondary, neutral, or state-driven
- `anchor_value`: Canonical source color for the family when applicable
- `steps`: Ordered tonal variations from weakest to strongest emphasis
- `usage_notes`: Guidance on when the family should or should not be referenced

**Validation Rules**:

- `name` MUST use English semantic naming.
- Primary family `anchor_value` MUST equal `#5e6ad2`.
- `steps` MUST be ordered consistently for all families in the same scale.

## Entity: SemanticColorToken

**Description**: A token that expresses UI meaning rather than a raw palette
value.

**Fields**:

- `name`: Semantic identifier such as `color.fg.primary` or `color.bg.success-soft`
- `category`: Foreground, background, border, accent, status, inverse, or disabled
- `intent`: User-facing meaning carried by the token
- `light_reference`: Palette step used in light theme
- `dark_reference`: Palette step used in dark theme
- `contrast_sensitivity`: Whether the token participates in accessibility-critical pairings

**Validation Rules**:

- `name` MUST not expose raw color names or platform names.
- `light_reference` and `dark_reference` MUST resolve to valid `PaletteFamily` steps.
- Accessibility-critical tokens MUST define both theme references.

## Entity: TypographyToken

**Description**: A token that defines a reusable text hierarchy role.

**Fields**:

- `name`: Semantic identifier such as `font.title.lg` or `font.body.md`
- `tier`: Title, body, caption, label, or supporting text
- `size`: Relative text scale
- `weight`: Emphasis level
- `line_height`: Reading rhythm associated with the token
- `usage_notes`: Guidance for role-based usage

**Validation Rules**:

- Every documented text tier in the spec MUST have at least one token.
- Names MUST describe role before visual size nuance.

## Entity: DimensionScaleToken

**Description**: A token for reusable spacing or radius values.

**Fields**:

- `name`: Semantic identifier such as `space.200` or `radius.md`
- `dimension_type`: Spacing or radius
- `scale_order`: Relative order in the scale
- `value`: Canonical dimension value
- `usage_notes`: Recommended usage boundaries

**Validation Rules**:

- Scale ordering MUST be monotonic within each dimension type.
- Spacing and radius tokens MUST be distinguishable by namespace.

## Entity: ThemeMapping

**Description**: A mapping that assigns semantic tokens to a specific theme
context.

**Fields**:

- `theme_name`: `light` or `dark`
- `semantic_tokens`: Included `SemanticColorToken` mappings
- `inverse_rules`: Rules for inverse surfaces within the theme
- `status_support`: Confirmation that all required state meanings are represented

**Validation Rules**:

- `theme_name` MUST be either `light` or `dark` for this feature.
- Every required semantic token MUST exist in both theme mappings.
- `inverse_rules` MUST preserve meaning rather than rename token intent.

## Entity: ComponentTokenScaffold

**Description**: A placeholder component-token layer that reserves semantic
consumption points for future component specs.

**Fields**:

- `component_name`: Semantic component identifier such as `button` or `input`
- `token_group`: Role-based token set such as `background`, `foreground`, or `border`
- `semantic_reference`: Semantic token consumed by the component token
- `state_scope`: Default, hover, active, disabled, or inverse-ready scope when applicable
- `notes`: Guidance on how later component specs should extend the scaffold

**Validation Rules**:

- `component_name` MUST use stable system naming rather than product naming.
- `semantic_reference` MUST resolve to an existing semantic token.
- The scaffold MUST not introduce raw palette references directly.

## Entity: TokenDocumentationEntry

**Description**: A documentation record that explains how a token or token
family should be used by contributors.

**Fields**:

- `subject_name`: Token or family name being documented
- `language`: Documentation language
- `purpose`: Explanation of intended use
- `do_use`: Recommended usage patterns
- `avoid_use`: Misuse patterns to avoid

**Validation Rules**:

- `language` MUST be Korean for explanatory content in this feature.
- Every semantic color category MUST have at least one documentation entry.

## Relationships

- A `PaletteFamily` contains many tonal steps consumed by `SemanticColorToken`.
- A `SemanticColorToken` resolves differently through `ThemeMapping` for light
  and dark themes.
- `TypographyToken` and `DimensionScaleToken` are sibling token groups inside
  the same foundation package.
- `TokenDocumentationEntry` explains one or more `PaletteFamily`,
  `SemanticColorToken`, `TypographyToken`, `DimensionScaleToken`, or
  `ComponentTokenScaffold` entities.
