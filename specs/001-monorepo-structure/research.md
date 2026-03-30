# Research: Design System Monorepo Structure

## Decision 1: Use a layer-first repository taxonomy

**Decision**: Define top-level directories by constitutional concern:
`foundation/`, `spec/`, `pen/`, `docs/`, `testing/`, `platforms/`, `apps/`, and
`tools/`.

**Rationale**: The constitution requires explicit separation between foundation,
specification, visual source of truth, implementation, documentation, and
testing. A layer-first root makes those responsibilities obvious and keeps
contributors from inventing product-oriented folder groupings.

**Alternatives considered**:

- Group by platform at the repository root.
  Rejected because it would duplicate foundation, docs, and testing concerns
  across platforms and weaken source-of-truth separation.
- Group by component first.
  Rejected because component-first storage hides cross-cutting authorities such
  as tokens, parity metadata, and visual references.

## Decision 2: Reserve all supported platform areas before implementation

**Decision**: Reserve explicit platform roots for React, Tauri, SwiftUI, Kotlin,
and Windows under `platforms/`.

**Rationale**: The spec requires multi-platform growth without repeated
reorganization. Pre-reserving these areas communicates supported scope and
prevents contributors from creating ad hoc platform homes later.

**Alternatives considered**:

- Create platform directories only when the first implementation lands.
  Rejected because directory shape would drift incrementally and reviews would
  need to renegotiate repository structure repeatedly.
- Merge Tauri directly into the React tree.
  Rejected because Tauri needs its own shell-specific area even though it is not
  an independent design language.

## Decision 3: Treat Tauri as a shell-adjacent platform area

**Decision**: Place Tauri under `platforms/tauri/` and constrain its intended use
to shell-specific or desktop-only patterns.

**Rationale**: The constitution requires Tauri to remain a React-adjacent desktop
shell extension layer rather than a separate visual language. A dedicated but
scoped location supports that rule cleanly.

**Alternatives considered**:

- Give Tauri full parity with other component implementation packages.
  Rejected because it would imply an independent UI language and encourage
  divergence from React.
- Omit Tauri from the initial structure.
  Rejected because Tauri is explicitly in supported scope.

## Decision 4: Preserve empty required directories with `.gitkeep`

**Decision**: Use `.gitkeep` files to keep required but empty canonical
directories tracked in version control.

**Rationale**: This is the lowest-friction way to preserve planned structure
through clean checkouts and early repository stages. It matches the feature's
stated requirement and avoids introducing extra repository-specific tooling.

**Alternatives considered**:

- Leave empty directories untracked.
  Rejected because the required structure would disappear from the repository.
- Use README placeholders in every empty directory.
  Rejected because it adds more noise than the current requirement needs.
