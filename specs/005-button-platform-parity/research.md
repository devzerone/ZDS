# Research: 버튼 플랫폼 확장

## Decision 1: Keep the existing JSON button contract as the single parity authority

**Decision**: Continue using `spec/components/button/button.spec.json` as the
only authoritative source for shared button variants, sizes, states,
accessibility expectations, and platform readiness metadata.

**Rationale**: The constitution requires shared contract details to live above
any single implementation. Because React already exists and the other platform
roots are placeholders, keeping parity rules centralized prevents React source
or platform-local code from becoming the de facto contract.

**Alternatives considered**:

- Split parity metadata into platform package files.
  Rejected because ownership would drift downward into implementation layers.
- Track parity only in docs.
  Rejected because docs are communication surfaces, not authoritative sources.

## Decision 2: Treat platform differences as explicit exceptions, not silent renames

**Decision**: Preserve shared variant, size, slot, and state names across all
platforms, and record any unavoidable platform differences as explicit parity
exceptions with rationale and follow-up targets.

**Rationale**: The feature goal is semantic parity, not renderer equality.
Platform conventions can influence exact visuals, but hidden divergence would
break reviewer confidence and create inconsistent adoption guidance.

**Alternatives considered**:

- Allow each platform to rename button variants to match local conventions.
  Rejected because it would erase cross-platform language consistency.
- Ignore non-critical differences until all platforms ship.
  Rejected because temporary lag is allowed only when metadata names the gap.

## Decision 3: Keep hover and pressed as shared contract states with conditional platform expectations

**Decision**: Retain `hover` and `pressed` in the shared state model for all
platforms, while allowing platforms without pointer-driven interaction to record
how those meanings are represented, approximated, or treated as exceptions.

**Rationale**: Removing those states from the contract would weaken the shared
button model. Keeping them in the contract preserves a consistent review matrix,
while exception metadata gives touch-first or OS-native platforms a controlled
way to describe differences.

**Alternatives considered**:

- Remove `hover` from the shared contract entirely.
  Rejected because React and Windows pointer surfaces still need it.
- Force pixel-identical state presentation on every platform.
  Rejected because parity is semantic, not pixel-for-pixel.

## Decision 4: Require platform implementations to consume the existing token meaning rather than redefine it

**Decision**: Use the current button component-token file as the shared visual
meaning layer and require every platform implementation to map from that shared
meaning instead of creating platform-specific variant semantics.

**Rationale**: The repository already has the raw -> semantic -> component token
chain. Extending the button to more platforms should broaden consumption of that
chain rather than fork it, otherwise parity becomes impossible to audit.

**Alternatives considered**:

- Let each platform translate directly from docs prose.
  Rejected because prose is not deterministic enough for parity validation.
- Create separate token files per platform for button semantics.
  Rejected because the shared button meaning is not platform-specific.

## Decision 5: Expand validation around parity metadata and artifact consistency before deep implementation

**Decision**: Prioritize validation updates that can prove parity status,
artifact synchronization, and platform exception coverage before expecting full
behavioral depth in every new platform package.

**Rationale**: SwiftUI, Kotlin, and Windows roots are currently empty. The
highest planning leverage comes from ensuring spec, docs, and checks can detect
missing or inconsistent platform support early, so later implementation slices
cannot drift silently.

**Alternatives considered**:

- Start with platform code only and postpone parity validation.
  Rejected because drift would become harder to unwind later.
- Require fully complete implementations for every platform in the first slice.
  Rejected because the feature spec allows staged readiness as long as the gaps
  are explicit and reviewable.
