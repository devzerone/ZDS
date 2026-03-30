<!--
Sync Impact Report
- Version change: 1.1.0 -> 1.2.0
- Modified principles:
  - Principle slot 1 -> I. Repository Identity
  - Principle slot 2 -> II. Source-of-Truth Hierarchy
  - Principle slot 3 -> III. Token Architecture
  - Principle slot 4 -> IV. Contract-First Artifact Lifecycle
  - Principle slot 5 -> V. Cross-Platform Parity and Controlled Exceptions
- Added sections:
  - Naming Rules
  - Operational Rules
  - Governance
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ updated: .specify/templates/spec-template.md
  - ✅ updated: .specify/templates/tasks-template.md
  - ⚠ pending: .specify/templates/agent-file-template.md
  - ⚠ pending: .specify/templates/commands/*.md (directory not present in this repository)
- Deferred TODOs:
  - None
-->
# ZDS Constitution

This document defines mandatory operating rules for the ZDS design system
monorepo. These rules are binding for design, engineering, review, and release.

## Core Principles

### I. Repository Identity
This repository MUST exist only to define, document, implement, and verify a
single cross-platform design system. It MUST NOT contain product business logic,
application runtime logic, backend logic, device runtime logic, or app-specific
state, service, or feature behavior outside UI system scope.

Repository contents MUST be limited to foundation assets, token definitions,
component and pattern specifications, `.pen` visual references, platform UI
packages, documentation, and validation tooling. Platform-specific product code
MUST live outside this repository.

### II. Source-of-Truth Hierarchy
This repository defines four non-substitutable source-of-truth layers:

1. JSON Spec is the only authority for component contract, variants, sizes,
   states, slots, interaction rules, accessibility requirements, behavior
   expectations, platform exceptions, parity expectations, and lifecycle
   metadata.
2. Design Tokens are the only authority for visual values, including color,
   spacing, typography, radius, elevation, opacity, motion, duration, easing,
   stroke, border width, icon size, semantic theme values, and component token
   values.
3. `.pen` files are the only authority for visual composition, anatomy, states,
   themed appearance, pattern assembly, and visual comparison baselines.
4. Platform UI packages are the only authority for platform-native API shape,
   rendering translation, interaction translation, and framework-specific
   implementation details.

No layer MAY replace another layer. No implementation MAY invent contract outside
spec. No visual style MAY bypass tokens. No visual component MAY exist without
corresponding spec and `.pen` artifacts. No implementation MAY treat only one of
spec, tokens, or `.pen` as sufficient input. Every released implementation MUST
conform to the intersection of spec, tokens, and `.pen`.

### III. Token Architecture
All reusable visual decisions MUST be encoded as tokens. Token architecture MUST
follow a strict hierarchy:

1. Primitive or raw tokens define base values.
2. Semantic tokens define UI meaning and role.
3. Component tokens define final component-level visual contracts.

This hierarchy MUST apply to color, typography, spacing, radius, elevation,
opacity, motion, duration, easing, stroke, border width, icon size, and layout
size.

Palette or raw tokens MUST be treated as low-level foundation inputs. Product UI
and component implementations MUST NOT consume palette tokens directly except in
documented foundation or token-composition layers. Semantic tokens MUST be the
default consumption layer for UI meaning. Component tokens MUST reference
semantic tokens unless a documented exception exists. Hard-coded reusable visual
values in implementation are prohibited unless the exception is explicitly
documented in spec or parity metadata.

Any reusable visual decision that cannot be expressed as a token MUST be treated
as a system design defect until resolved or explicitly exempted.

### IV. Contract-First Artifact Lifecycle
Every component and pattern MUST begin with a JSON spec before implementation.
Spec-less implementation is prohibited. The required lifecycle is:

1. Spec proposal
2. Token requirements defined
3. `.pen` visual definition created
4. Documentation draft created
5. Platform implementation added
6. Tests added
7. Parity status recorded
8. Release eligibility checked

An item that has not completed this lifecycle MUST NOT be marked done.
Visual approval without `.pen` is prohibited. Release without token mapping is
prohibited.

Repository structure MUST preserve separation of concerns between foundation,
spec, pen, platform implementations, docs, and testing. Each layer MUST NOT
carry responsibilities that belong to another layer.

### V. Cross-Platform Parity and Controlled Exceptions
Parity in this repository means contract equivalence and design intent
preservation across platforms. It does NOT mean pixel-perfect duplication.

React, Tauri, SwiftUI, Kotlin Compose, and Windows Native UI implementations
MUST preserve the same role, state model, semantic meaning, accessibility
expectations, and interaction contract unless a documented exception exists.
Platform-native differences in typography, rendering, accessibility convention,
input modality, or desktop/mobile behavior MAY exist only when they preserve the
defined design intent.

Silent divergence is prohibited. If a platform cannot satisfy the shared
contract, the team MUST either amend the contract or document the exception in
spec and parity metadata before merge. Unrecorded platform differences are
defects.

Next.js MUST NOT be treated as a first-class parity platform. Next.js is a React
consumer environment. React UI packages in this repository MUST be usable from
Next.js when they stay within documented React execution boundaries. Next.js-
specific routing, server integration, image handling, and runtime composition
MUST be handled by the consuming Next.js application or by explicit adapters,
not by redefining the design system contract.

Tauri MUST NOT be treated as an independent design language. Tauri is a React
consumer environment with desktop shell integration needs. General components
such as Button, Input, or Dialog MUST NOT fork into a Tauri-only visual
language. Shell integration concerns such as window control, menu wiring, tray
integration, filesystem bridges, global shortcuts, and app-specific desktop
layout orchestration MUST be implemented in the consuming Tauri application, not
as mandatory design-system-owned structure in this repository.

## Operational Rules

1. Architecture
   Foundation, spec, pen, platform implementations, docs, and testing MUST be
   stored as separate concerns. Cross-layer duplication of authority is
   prohibited.
2. Documentation
   Every foundation artifact, component, and pattern MUST include documentation
   covering purpose, anatomy, variants, states, accessibility, token
   dependencies, and platform differences.
3. Testing
   The repository MUST provide verifiable checks for token correctness, spec
   correctness, parity tracking, visual regression, and accessibility
   requirements. A component without tests is not releasable.
4. Naming
   Semantic names MUST take precedence over raw visual names. Names for the same
   component MUST align across spec, tokens, `.pen`, docs, and implementations.
   Tokens MUST NOT encode platform names, implementation names, or theme-state
   hacks such as `iosButtonBlue`, `reactSidebarPadding`, or `gray200Hover`.
5. New Components
   A new component MUST NOT be considered official until spec, token mapping,
   `.pen`, documentation, and at least one platform implementation exist.
6. Existing Component Changes
   Any change to an existing component MUST update spec, token mapping, `.pen`,
   docs, affected platform implementations, and parity metadata in the same
   change set.
7. Breaking Changes
   Breaking changes MUST be declared explicitly and MUST NOT merge without
   updated documentation, release notes, and migration guidance.
8. Platform Lag
   Platform implementations MAY temporarily lag only if parity metadata records
   the exact gap, affected contract surface, owning platform, target remediation
   release, and user impact. Unbounded lag is prohibited.
9. Experimental Scope
   Experimental components or patterns MUST be isolated from stable artifacts and
   MUST NOT implicitly alter stable contracts, tokens, or naming semantics.
10. Done Criteria
    A component is done only when spec, token mapping, `.pen`, documentation,
    at least one platform implementation, tests, and recorded parity status all
    exist. If any item is missing, the component is not done.
11. React Consumer Strategy
    React is the reusable UI implementation layer for JavaScript consumers.
    Consumer-specific runtime concerns MUST be layered outside the shared React
    contract when they do not change the design-system meaning.
12. Next.js Consumption
    Next.js support MUST be treated as React consumption, not as a separate
    parity platform. Server or client execution boundaries, routing concerns, and
    framework integrations MAY be handled by adapters, but they MUST NOT create a
    separate design language or token namespace.
13. Tauri Consumption
    Tauri support MUST be treated as application-side consumption of shared React
    UI plus app-owned desktop shell integration. This repository MUST NOT require
    a dedicated Tauri shell-integration structure for concerns better owned by
    the consuming application.

## Naming Rules

1. General Rules
   Names MUST express role, intent, state, hierarchy, or contract meaning before
   raw appearance. Shared names MUST remain consistent across spec, tokens,
   `.pen`, docs, and platform implementations.
2. Token Rules
   Tokens MUST NOT contain platform names, framework names, renderer names,
   product names, or local implementation details. Tokens MUST NOT encode theme
   handling as ad hoc suffixes when the same distinction belongs in semantic or
   component-token structure.
3. Component Rules
   Component names MUST be stable system names, not product feature names. Slot,
   variant, size, and state names MUST come from the component contract and MUST
   NOT diverge by platform.
4. Required Pattern
   Prefer names such as `surface.primary`, `text.muted`,
   `color.fg.neutral-muted`, `action.primary.background`, and
   `button.primary.background`.
5. Prohibited Pattern
   Names such as `gray200Hover`, `iosButtonBlue`, `reactSidebarPadding`,
   `cardBorderLightMode`, and `windowsPrimaryTextColor` are prohibited because
   they encode raw values, platform identity, or implementation leakage instead
   of system meaning.
6. Enforcement
   Reviewers MUST reject names that expose platform meaning where shared system
   meaning exists. Renames required for constitutional compliance MUST be treated
   as mandatory cleanup, not optional polish.

## Governance

This constitution supersedes local practice, review preference, and undocumented
team convention. Every plan, spec, task list, pull request, and release review
MUST include a constitution compliance check.

Amendment rules:

1. Amendments MUST update this file and any affected templates in the same
   change.
2. Amendments that add or materially expand binding rules require a MINOR
   version increment.
3. Amendments that remove, weaken, or redefine existing binding rules require a
   MAJOR version increment.
4. Amendments that only clarify wording without changing enforcement require a
   PATCH version increment.

Compliance rules:

1. Reviewers MUST reject changes that violate repository identity, source of
   truth hierarchy, token architecture, lifecycle requirements, or parity rules.
2. Releases MUST block components that fail done criteria, hide parity status,
   or rely on undocumented exceptions.
3. Exceptions MAY be merged only when recorded in spec and parity metadata with
   justification, scope, and expiration or remediation criteria.
4. Hidden divergence, undocumented raw values, or spec-less implementations MUST
   be treated as defects and tracked to closure.

**Version**: 1.2.0 | **Ratified**: 2026-03-30 | **Last Amended**: 2026-03-30
