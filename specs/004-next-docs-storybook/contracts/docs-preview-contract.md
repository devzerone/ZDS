# Docs And Preview Contract

This contract defines the minimum shared expectations for the deployable ZDS
documentation site and the Storybook preview surface.

## Responsibility Split

1. The docs site is the canonical human-readable destination for design-system
   guidance, including purpose, usage, accessibility, token relationships, and
   parity summaries.
2. Storybook is the canonical interactive inspection surface for supported
   React component inputs, states, and visual combinations.
3. Neither surface may redefine the component contract or invent behavior that
   is not present in the canonical design-system artifacts.

## Source-Of-Truth Contract

1. `spec/` remains the authority for component contract and parity metadata.
2. `pen/` remains the authority for visual composition and comparison
   baselines.
3. `packages/foundation/tokens/` remains the authority for reusable visual
   values.
4. `packages/react/components/` remains the authority for React API shape and
   rendering behavior.
5. Docs pages and stories are consumer representations of these layers and must
   link back to them when appropriate.

## Documentation Contract

1. The docs site MUST provide a stable home page and navigable sections for
   foundation guidance and component guidance.
2. The button documentation page MUST explain purpose, variants, sizes, states,
   accessibility expectations, token dependencies, and current parity status.
3. Canonical authored docs content MUST live under `apps/docs/content/`, while
   route files in `apps/docs/app/` consume that content rather than becoming a
   second long-form source.
4. The docs site MUST provide a header light/dark theme toggle and preserve
   readable navigation and prose in both modes.
5. Reference component documentation MUST provide a path to the related preview
   surface.
6. Docs content MUST avoid copy-pasting component implementation logic into the
   page layer.

## Preview Contract

1. Storybook MUST render the exported shared React component rather than a
   separate demo-only implementation.
2. The button preview MUST expose supported variants, sizes, and key visual
   states through controls or curated stories.
3. The preview surface SHOULD provide matching light and dark viewing modes for
   review.
4. Each reference component preview MUST provide a path back to the canonical
   docs page.
5. Story args and examples MUST stay within the supported shared component
   contract.

## Build And Release Contract

1. The repository MUST provide root-level commands for docs development, docs
   build, Storybook development, Storybook build, and combined validation.
2. Turbo configuration MUST include build tasks for both publishing surfaces.
3. Continuous integration MUST run docs build validation and Storybook build
   validation on push and pull request before merge.
4. Release readiness for this feature requires two publishable artifacts: one
   for the docs site and one for Storybook.
5. The docs artifact path MUST remain `apps/docs/dist`, and the Storybook
   artifact path MUST remain `dist/storybook` unless the contract is updated.

## Extensibility Contract

1. New components such as Input or Badge MUST be able to adopt the same pattern
   without introducing a second docs architecture or a second preview
   architecture.
2. Stories SHOULD be colocated with the owned React component so future
   components inherit the same ownership model.
3. New docs pages MUST follow the same navigation and cross-linking rules as
   the button reference page.
