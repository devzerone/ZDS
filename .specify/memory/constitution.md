<!--
Sync Impact Report
- Version change: 1.2.0 -> 1.3.0
- Modified principles:
  - I. Repository Identity -> I. Repository Scope and Artifact Topology
  - II. Source-of-Truth Hierarchy -> II. Source-of-Truth Chain and Promotion Rules
  - III. Token Architecture -> III. Token and Asset Architecture
  - IV. Contract-First Artifact Lifecycle -> IV. Contract-to-Preview Delivery Lifecycle
  - V. Cross-Platform Parity and Controlled Exceptions -> V. Platform Parity and Exception Metadata
- Added sections:
  - Repository Topology
  - Delivery Workflow
- Removed sections:
  - Operational Rules
  - Naming Rules
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ updated: .specify/templates/spec-template.md
  - ✅ updated: .specify/templates/tasks-template.md
  - ✅ updated: README.md
  - ✅ updated: AGENTS.md
  - ⚠ pending: .specify/templates/commands/*.md (directory not present in this repository; active command files live under .claude/commands/)
- Deferred TODOs:
  - None
-->
# ZDS Constitution

This constitution defines binding operating rules for the ZDS design system
monorepo. These rules govern every spec, token, preview, implementation,
documentation page, validation script, and platform handoff in this repository.

## Core Principles

### I. Repository Scope and Artifact Topology
ZDS MUST exist only to define, document, implement, validate, and distribute the
design system itself. Repository contents MUST stay inside design-system scope:
component contracts, parity metadata, foundation assets, design tokens, Pencil
baselines, platform UI packages, docs surfaces, Storybook previews, and
supporting validation or automation tooling.

The repository topology is authoritative. Shared artifacts MUST live in their
owned locations: `spec/` for publishable contracts and parity metadata,
`packages/tokens/` for token sources and generated token outputs,
`packages/foundation/` for brand and shared foundation assets, `pen/` for visual
baselines, `packages/react/` plus other platform package roots for implementation,
`apps/docs/` for official documentation, `.storybook/` for preview configuration,
`testing/` for validation, and `tools/` for repository automation. Product
features, backend logic, app-specific state, and consumer runtime code MUST NOT
be added here.

### II. Source-of-Truth Chain and Promotion Rules
ZDS has a mandatory source-of-truth chain:

1. `spec/` defines contract, roles, states, accessibility rules, parity intent,
   and approved exceptions.
2. `packages/tokens/data/` defines reusable visual values and semantic meaning.
3. `pen/` defines visual composition, anatomy, and review baselines.
4. Platform packages translate the contract into framework-native code.
5. `apps/docs/` and Storybook expose the approved system to humans.

No downstream layer MAY promote itself to an upstream authority. Docs and
Storybook explain the system but MUST NOT define contract or visual values.
Implementations MUST NOT invent variants, states, or token values that are not
already represented in spec, tokens, or approved parity metadata. Every merged
change touching a user-facing component or pattern MUST keep all affected
upstream sources in sync.

### III. Token and Asset Architecture
All reusable visual decisions MUST be expressed as tokens or owned foundation
assets before they are consumed by implementations. Token architecture MUST
follow the progression from primitive values to semantic values to component-
level values. Raw palette values MAY exist as source material, but shared UI
implementations MUST consume semantic or component tokens by default.

`packages/foundation/` is the only home for reusable brand or shared foundation
assets such as logos, icons, and future illustration primitives. `packages/tokens/`
is the only home for reusable design values. Platform packages, docs, and
Storybook MUST NOT embed hard-coded brand assets or repeated visual constants
when a foundation asset or token should exist instead. If a reusable visual
decision cannot yet be modeled cleanly, the gap MUST be tracked as a design-
system defect or as an explicitly documented temporary exception.

### IV. Contract-to-Preview Delivery Lifecycle
Every official component, pattern, or foundation surface MUST move through a
complete lifecycle before it is considered done:

1. Contract or foundation intent is recorded in `spec/` or other owned metadata.
2. Required tokens or foundation assets are added or confirmed.
3. `pen/` baselines are created or updated.
4. Platform implementation work is added in the relevant package roots.
5. Official docs in `apps/docs/` and interactive previews in Storybook are added
   or updated when the artifact is user-consumable.
6. Validation is added or updated in `testing/` and related scripts.
7. Parity metadata and known exceptions are recorded when more than one platform
   surface exists or is planned.

Skipping an owned layer is prohibited when that layer is part of the feature's
contract. A component change is incomplete if code ships without updated source
artifacts, previews, docs, or validation that the contract now requires.

### V. Platform Parity and Exception Metadata
Parity in ZDS means preserved contract, semantics, states, accessibility
expectations, and design intent across supported platform surfaces. It does not
mean pixel-for-pixel equality across renderers.

`packages/react/` is the current production implementation surface. The presence
of `packages/swiftui/`, `packages/kotlin/`, and `packages/windows/` means parity
planning MUST already be represented in shared contracts and metadata even if
those package roots are still placeholders. `apps/docs/` and Storybook are
communication surfaces, not independent parity platforms. Framework consumers
such as Next.js or shell environments such as Tauri MAY add integration-specific
adapters, but those consumers MUST NOT fork the shared design language.

Any platform difference MUST be recorded in shared metadata before merge. Hidden
divergence is a defect. Temporary lag is allowed only when parity metadata names
the missing capability, the affected platform, the user impact, and the intended
follow-up release or removal condition.

## Repository Topology

1. `apps/docs/` MUST contain the official documentation experience and any
   repository-owned MDX or markdown content that explains the system.
2. `.storybook/` MUST configure interactive preview behavior for supported React
   stories and MUST stay aligned with the same public contracts documented in
   `apps/docs/`.
3. `packages/react/`, `packages/swiftui/`, `packages/kotlin/`, and
   `packages/windows/` MUST remain implementation roots only; contract or token
   ownership MUST NOT migrate into them.
4. `spec/components/`, `spec/patterns/`, and `spec/metadata/parity/` MUST hold
   publishable component, pattern, and parity metadata respectively.
5. `testing/` MUST reflect the validation strategy by artifact type such as
   tokens, specs, docs, accessibility, and visual review.
6. `tools/` MUST contain repository automation or configuration support and MUST
   NOT become a backdoor place to redefine design-system contract.

## Delivery Workflow

1. Every feature plan MUST name the exact repository paths it will modify across
   spec, tokens, pen, implementations, docs, previews, and validation.
2. Every feature spec MUST list source-of-truth updates, downstream delivery
   surfaces, and any parity exceptions or confirm that none are needed.
3. Every task list MUST include work for each affected owned layer; validation
   work is mandatory whenever user-facing behavior, visual output, tokens, or
   contracts change.
4. Pull requests MUST be reviewed against source-of-truth ownership, lifecycle
   completeness, and parity metadata completeness, not only against runtime code.
5. Release readiness for a component or pattern requires synced contract,
   tokens or assets, pen baseline, implementation, docs or preview coverage, and
   validation evidence for the changed surface.

## Governance

This constitution supersedes undocumented team habits and local review
preferences. Every plan, spec, task list, pull request, and release review MUST
explicitly check constitutional compliance.

Amendment rules:

1. Amendments MUST update this file and every affected dependent template or
   guidance document in the same change set.
2. Amendments that add a new binding rule or materially expand repository scope
   require a MINOR version increment.
3. Amendments that remove, weaken, or redefine an existing binding rule require
   a MAJOR version increment.
4. Amendments that only clarify wording without changing enforcement require a
   PATCH version increment.

Compliance rules:

1. Reviewers MUST reject changes that violate source-of-truth ownership, skip a
   required lifecycle artifact, or hide parity differences.
2. Releases MUST block artifacts whose required docs, preview coverage, or
   validation updates are missing.
3. Exceptions MAY be merged only when they are documented in shared metadata
   with scope, justification, and a follow-up condition.
4. Any discovered drift between `spec/`, tokens, `pen/`, implementation, docs,
   or Storybook MUST be treated as a tracked defect until resolved.

**Version**: 1.3.0 | **Ratified**: 2026-03-30 | **Last Amended**: 2026-03-31
