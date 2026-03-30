# Research: 브랜드 차별화 디자인 토큰 정의

## Decision 1: Keep token source of truth in `packages/tokens/data/`

**Decision**: Store all foundation token artifacts under
`packages/tokens/data/`, separating raw palette values, semantic tokens,
theme mappings, typography, spacing, and radius by concern.

**Rationale**: The constitution makes design tokens the only authority for
reusable visual values. A single foundation package location keeps token
ownership clear and prevents platform packages from inventing competing token
names or values.

**Alternatives considered**:

- Store tokens inside each platform package.
  Rejected because it would fragment the source of truth and create parity drift.
- Store tokens only in documentation files.
  Rejected because documentation is descriptive, not the authoritative token layer.

## Decision 2: Preserve the constitutional token hierarchy while adding theme mappings

**Decision**: Plan token artifacts with raw palette tokens, semantic tokens,
component-token scaffolding, and theme mappings for light and dark contexts.
Concrete component-token values may be filled by later component features, but
the layer and naming structure must exist now.

**Rationale**: This matches the constitution's required token architecture and
aligns with the feature spec's goal of separating palette values from semantic
meaning while still preserving the required component-token layer. It keeps this
feature focused on foundation work without violating the constitutional
hierarchy.

**Alternatives considered**:

- Expose raw palette tokens directly to product consumers.
  Rejected because the constitution forbids raw-token-first consumption for UI meaning.
- Omit component tokens entirely until a later feature.
  Rejected because the constitution requires the component-token layer to exist
  as part of the hierarchy.

## Decision 3: Anchor the primary brand family to `#5e6ad2`

**Decision**: Use `#5e6ad2` as the canonical primary brand anchor and derive its
variations as lighter and stronger steps in the same family, while defining two
secondary brand families, one neutral family, and four state families.

**Rationale**: The spec now fixes the primary color and asks that variations be
generated around it. Anchoring the palette to a single source color preserves a
recognizable brand identity while still allowing semantic and theme coverage.

**Alternatives considered**:

- Choose palette values independently per step.
  Rejected because it risks losing visual continuity with the chosen brand anchor.
- Keep the primary family undefined until implementation.
  Rejected because it would leave a critical planning decision unresolved.

## Decision 4: Standardize on English token identifiers with Korean guidance

**Decision**: Token identifiers will use English semantic names, while the
documentation and explanatory guidance remain in Korean.

**Rationale**: English identifiers provide stable cross-tool and cross-platform
references for token consumers. Korean guidance keeps the system accessible to
the current team and documentation readers.

**Alternatives considered**:

- Use Korean token identifiers.
  Rejected because it increases friction for downstream toolchains and code consumers.
- Duplicate identifiers in both English and Korean.
  Rejected because two identifier systems would create ambiguity.

## Decision 5: Validate tokens through executable structure, theme, contrast, and differentiation checks

**Decision**: The first validation layer for this feature will include
executable checks for token completeness, light/dark theme coverage, semantic
naming correctness, and key contrast-sensitive token pairs, plus a documented
review that confirms the palette remains visually distinct from the Seed
reference.

**Rationale**: This feature defines foundational visual values, not component
rendering. Structural and accessibility-oriented token checks give meaningful
quality signals before any platform package consumes the new tokens, and the
distinctiveness review closes the spec's branding success criterion.

**Alternatives considered**:

- Delay all validation until component implementation exists.
  Rejected because token defects would spread into multiple consumers.
- Treat visual regression as the primary validation step now.
  Rejected because no `.pen` or component output changes are in scope for this feature.
