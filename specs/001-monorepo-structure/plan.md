# Implementation Plan: Design System Monorepo Structure

**Branch**: `001-monorepo-structure` | **Date**: 2026-03-30 | **Spec**: [/home/choiho/zerone/ZDS/specs/001-monorepo-structure/spec.md](/home/choiho/zerone/ZDS/specs/001-monorepo-structure/spec.md)  
**Input**: Feature specification from `/specs/001-monorepo-structure/spec.md`

## Summary

Define the canonical repository layout for the ZDS design-system monorepo so that
foundation artifacts, specs, `.pen` references, docs, validation assets, and
platform implementation areas have stable homes before component work begins.

## Scope Classification

**Work Type**: documentation / release governance  
**Affected Platforms**: React / SwiftUI / Kotlin Compose / Windows Native UI  
**Affected Consumer Environments**: Next.js consumer apps / Tauri consumer apps  
**Artifact Layers**: spec / docs / implementations / tests  
**Parity Impact**: no impact

## Technical Context

**Spec Location**: `/home/choiho/zerone/ZDS/specs/001-monorepo-structure/spec.md`  
**Token Sources**: None for this feature; no reusable visual values are being defined  
**Pen Sources**: None for this feature; no visual component or pattern is being defined  
**Docs Location**: `/home/choiho/zerone/ZDS/specs/001-monorepo-structure/`  
**Implementation Packages**: This feature defines placement for `packages/`
(grouping `foundation/` and platform implementations under a single monorepo
package root), `apps/`, `spec/`, `pen/`, `docs/`, `testing/`, and `tools/`
without creating product or component implementations or consumer-owned Tauri
shell layers  
**Testing Strategy**: specification review, structure contract review, clean-checkout
directory preservation review  
**Target Platforms**: React, SwiftUI, Kotlin Compose, Windows Native UI  
**Target Consumer Environments**: Next.js consumer apps, Tauri consumer apps  
**Project Type**: design-system monorepo  
**Constraints**: Must remain inside design-system scope; must preserve separation
of concerns; must treat Next.js and Tauri as React consumer environments; must
not introduce product runtime ownership

## Constitution Check

*GATE: Must pass before research, design, or implementation. Re-check before
merge.*

- [x] Work stays within design system scope and does not add product or runtime
      logic.
- [x] JSON spec exists or is updated before implementation work begins.
- [x] Token mapping exists for every reusable visual decision.
      Not applicable: this feature defines repository structure only and does not
      introduce visual decisions.
- [x] `.pen` artifact exists or is updated for every visual component or pattern
      affected.
      Not applicable: this feature does not define or modify a visual component
      or pattern.
- [x] Documentation updates cover purpose, anatomy, variants, states,
      accessibility, token dependencies, and platform differences.
      Adapted for this feature: documentation must cover repository purpose,
      directory intent, platform placement, and structural constraints.
- [x] Platform parity impact is recorded, including documented exceptions.
      No parity delta is introduced; repository-owned implementation platforms
      receive reserved top-level placement and consumer environments are handled
      by consumption rules.
- [x] Tests cover token correctness, spec correctness, visual regression,
      accessibility, and affected platform behavior as applicable.
      Adapted for this feature: validation is limited to structure and checkout
      preservation because no component behavior or visual surface changes.
- [x] Tauri changes reuse React UI artifacts unless the work is shell-specific.
      This plan keeps Tauri shell integration in the consuming application rather
      than as a repository-owned structure.

## Artifact Plan

### Feature Documentation

```text
specs/001-monorepo-structure/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── repository-layout-contract.md
└── tasks.md
```

### Repository Paths

```text
/
├── apps/
│   └── docs/
│       ├── foundation/
│       ├── components/
│       ├── patterns/
│       ├── platforms/
│       └── governance/
├── packages/
│   ├── foundation/
│   │   ├── tokens/
│   │   ├── icons/
│   │   └── assets/
│   ├── react/
│   ├── swiftui/
│   ├── kotlin/
│   └── windows/
├── spec/
│   ├── components/
│   ├── patterns/
│   └── metadata/
│       └── parity/
├── pen/
│   ├── components/
│   └── patterns/
├── testing/
│   ├── spec/
│   ├── tokens/
│   ├── visual/
│   └── accessibility/
└── tools/
    ├── config/
    └── scripts/
```

**Structure Decision**: Use a packages-grouped layout where `packages/`
consolidates foundation and platform implementation areas as monorepo packages.
Design-system authoring sources (`spec/`, `pen/`, `docs/`, `testing/`) remain as
separate top-level concerns. `apps/` is reserved only for design-system-owned
surfaces such as documentation or sandboxes, not product applications. Next.js
and Tauri are handled as consumer environments of the shared React layer, not as
separate repository-owned platform roots.

## Delivery Plan

1. Confirm structural requirements in spec.
2. Document research decisions for root taxonomy and consumer-environment handling.
3. Define repository layout entities and validation rules.
4. Publish a contributor-facing repository layout contract.
5. Write a quickstart for applying and validating the directory structure.
6. Re-check constitution alignment before implementation work begins.
7. Hand off to `/speckit.tasks` for actionable creation tasks.

## Exceptions and Justification

> Fill only when requesting a documented exception to the constitution.

| Exception | Justification | Scope | Remediation / Expiration |
|-----------|---------------|-------|---------------------------|
| None | No constitutional exception required for this planning feature | N/A | N/A |
