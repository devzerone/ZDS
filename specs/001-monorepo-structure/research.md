# Research: Design System Monorepo Structure

## Decision 1: Use a layer-first repository taxonomy

**Decision**: Define top-level directories by constitutional concern, grouping
buildable packages under `packages/`:
`packages/` (containing `foundation/`, `react/`, `swiftui/`, `kotlin/`,
`windows/`), `spec/`, `pen/`, `docs/`, `testing/`, `apps/`, and `tools/`.

**Rationale**: The constitution requires explicit separation between foundation,
specification, visual source of truth, implementation, documentation, and
testing. A packages-grouped layout keeps buildable artifacts together while
maintaining clear top-level separation for non-buildable concerns. Contributors
can immediately distinguish between packages (published artifacts) and
repository resources (specs, docs, tests, tools).

**Alternatives considered**:

- Group by platform at the repository root.
  Rejected because it would duplicate foundation, docs, and testing concerns
  across platforms and weaken source-of-truth separation.
- Group by component first.
  Rejected because component-first storage hides cross-cutting authorities such
  as tokens, parity metadata, and visual references.

## Decision 2: Reserve repository-owned implementation areas before implementation

**Decision**: Reserve explicit implementation roots for React, SwiftUI, Kotlin,
and Windows under `packages/`, while treating Next.js and Tauri as React
consumer environments rather than repository-owned roots. Foundation tokens,
icons, and assets are also grouped under `packages/foundation/`.

**Rationale**: The spec requires multi-platform growth without repeated
reorganization. Pre-reserving repository-owned implementation areas communicates
supported scope while avoiding consumer-environment roots that belong to
applications rather than the design system.

**Alternatives considered**:

- Create implementation directories only when the first implementation lands.
  Rejected because directory shape would drift incrementally and reviews would
  need to renegotiate repository structure repeatedly.
- Reserve separate roots for Next.js or Tauri.
  Rejected because both are React consumer environments and their runtime or
  shell integration concerns belong to consuming applications unless shared
  adapters are intentionally introduced later.

## Decision 3: Treat Next.js and Tauri as consumer environments

**Decision**: Keep Next.js and Tauri out of the repository-owned platform root
set. Shared React UI is the reusable implementation layer. Next.js routing,
server composition, and runtime integration remain in consuming Next.js
applications or explicit adapters. Tauri shell integration remains in consuming
Tauri applications.

**Rationale**: The constitution defines Next.js and Tauri as React consumer
environments, not separate design languages. Keeping them out of the repository's
owned platform roots prevents shell or framework runtime concerns from leaking
into the design-system source-of-truth hierarchy.

**Alternatives considered**:

- Give Next.js or Tauri their own repository-owned platform roots.
  Rejected because it would imply first-class parity ownership for framework or
  application runtime concerns rather than shared UI implementation.
- Collapse all JavaScript concerns into one undocumented React area.
  Rejected because the consumer strategy must still be documented explicitly even
  when it does not create new root categories.

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
