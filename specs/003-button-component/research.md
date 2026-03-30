# Research: 버튼 컴포넌트

## Decision 1: Keep the authoritative button contract as a foundation JSON spec

**Decision**: Define the canonical button contract in
`spec/components/button/button.spec.json`, and treat that file as
the only authority for variants, sizes, states, icon slot rules, accessibility
expectations, and documented platform exceptions.

**Rationale**: The constitution requires JSON spec to be the authority for
component contract details. A foundation-level location keeps ownership above
any single implementation package and prevents React from becoming the de facto
spec.

**Alternatives considered**:

- Define the contract only in React props and docs.
  Rejected because implementation and docs cannot replace the JSON spec layer.
- Keep the contract only in `/specs/003-button-component/spec.md`.
  Rejected because the feature spec explains intent, but the constitution
  reserves exact component contract authority for JSON spec.

## Decision 2: Add button-specific component tokens that reference semantic tokens

**Decision**: Create a dedicated button component-token file at
`packages/tokens/data/components/button.json` with mappings for variant,
size, and state surfaces such as background, foreground, border, focus ring,
padding, and icon gap.

**Rationale**: The token hierarchy requires component tokens as the final
component-level visual contract. Button styling is too specific to live only as
shared semantic tokens, but it must still consume semantic tokens rather than
raw palette values.

**Alternatives considered**:

- Consume semantic tokens directly inside the React component.
  Rejected because it would bypass the required component-token layer.
- Define raw values directly inside the button token file.
  Rejected because reusable raw values must remain in foundation tokens and not
  be reintroduced at component level.

## Decision 3: Treat loading as a state overlay, not a separate variant

**Decision**: Model loading as a shared state that can apply to actionable
button variants, with clear precedence over hover and pressed visuals and with
interaction locked during processing.

**Rationale**: Loading communicates temporary processing rather than a distinct
action intent. Keeping it as a state avoids exploding the variant matrix while
still meeting the spec's requirement for clear in-progress feedback and duplicate
submission prevention.

**Alternatives considered**:

- Model loading as a dedicated button variant.
  Rejected because it mixes visual intent with transient interaction state.
- Leave loading handling to each implementation package.
  Rejected because that would create undocumented behavior drift across platforms.

## Decision 4: Keep icon-only controls out of the base button contract

**Decision**: Scope the base button contract to text-led buttons with optional
leading or trailing icons, and reserve icon-only actions for a later dedicated
feature.

**Rationale**: The feature spec explicitly centers text labels as the primary
identifier and treats icon-only controls as out of scope for v1. This keeps the
contract smaller and clearer while avoiding early ambiguity around hit targets,
accessible naming, and visual density.

**Alternatives considered**:

- Include icon-only button support immediately.
  Rejected because it adds distinct accessibility and sizing rules that deserve
  their own component contract.
- Ban icons entirely in v1.
  Rejected because the spec requires support for leading and trailing icons.

## Decision 5: Plan the first implementation and verification slice around React, while preserving parity metadata for other platforms

**Decision**: Deliver the first concrete implementation in
`packages/react/components/button/`, while documenting parity expectations and
future platform translation duties for SwiftUI, Kotlin Compose, and Windows
Native UI in the shared contract and docs.

**Rationale**: The constitution requires at least one platform implementation
before a component is done, and React is the repository's reusable JavaScript UI
layer. Planning parity expectations early prevents the first implementation from
smuggling in React-only names or unsupported states.

**Alternatives considered**:

- Wait for all platforms before planning any implementation.
  Rejected because it would slow the first usable release unnecessarily.
- Treat Next.js as a separate platform in the contract.
  Rejected because the constitution explicitly defines Next.js as a React
  consumer environment rather than a first-class parity platform.
