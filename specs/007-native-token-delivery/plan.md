# Implementation Plan: 네이티브 토큰 전달 구조

**Branch**: `007-native-token-delivery` | **Date**: 2026-03-31 | **Spec**: [/home/choiho/zerone/ZDS/specs/007-native-token-delivery/spec.md](/home/choiho/zerone/ZDS/specs/007-native-token-delivery/spec.md)  
**Input**: Feature specification from `/specs/007-native-token-delivery/spec.md`

## Summary

공유 JSON token source를 기준으로 SwiftUI, Kotlin, Windows가 각각
플랫폼 네이티브 token artifact를 소비하도록 전달 구조를 정의한다. 계획은
`packages/tokens/`에 platform generation 책임을 두고, 각 native package는
생성된 artifact만 소비하도록 경계를 나누며, parity exception은 기존 spec
metadata에 남기고 raw 값이나 CSS 의존이 native package에 새로 스며들지 않게
하는 데 초점을 둔다.

## Scope Classification

**Work Type**: token-delivery-architecture / native-platform-enablement / documentation / validation  
**Affected Platforms**: SwiftUI / Kotlin JVM UI package / Windows Native UI / React as comparison baseline  
**Affected Consumer Environments**: Native package maintainers and design-system reviewers  
**Artifact Layers**: spec / tokens / implementation / docs / testing  
**Parity Impact**: 플랫폼 parity 의미는 유지하고, token delivery 경로를 표준화해 native drift를 줄임

## Technical Context

**Language/Version**: TypeScript 5.9 build scripts, JSON token sources, Swift 5.9 package surface, Kotlin 2.0/JVM 17 package surface, and .NET 8 WinUI package surface  
**Primary Dependencies**: pnpm workspace, Turbo repo orchestration, `@zds/tokens`, existing JSON token files in `packages/tokens/data/`, native package roots in `packages/swiftui/`, `packages/kotlin/`, and `packages/windows/`  
**Storage**: repository files under `specs/007-native-token-delivery/`, `packages/tokens/`, `packages/swiftui/`, `packages/kotlin/`, `packages/windows/`, `apps/docs/`, and `testing/`  
**Testing**: token validation, native package build validation, docs-system guidance validation, and architecture-level checks for generated artifact presence and freshness  
**Target Platform**: shared design-system token sources consumed by SwiftUI, Kotlin, and Windows-native UI packages  
**Project Type**: cross-platform design-system architecture feature inside a pnpm monorepo  
**Performance Goals**: maintainers can map one shared token change to all native token artifact outputs in a single review pass, and native packages can consume tokens without CSS dependency or repeated raw-value entry  
**Constraints**: must preserve `spec/` and `packages/tokens/` as upstream authority; native packages must not become new token sources; CSS remains a web-only delivery surface; parity exceptions stay in shared metadata instead of platform-local token renames; docs changes are contributor-facing rather than end-user feature announcements  
**Scale/Scope**: one token delivery architecture spanning 3 native package roots, shared foundation token categories, and currently implemented shared component tokens with Button as the first end-to-end proof path

**Spec Location**: `/home/choiho/zerone/ZDS/specs/007-native-token-delivery/spec.md`  
**Token Source of Truth**: `packages/tokens/data/` remains the canonical semantic and component token source  
**Token Build Layer**: `packages/tokens/scripts/` and `packages/tokens/src/` are the planned home for normalized token reading and platform artifact generation logic  
**Native Delivery Targets**: `packages/swiftui/`, `packages/kotlin/`, and `packages/windows/` remain the only package roots allowed to consume generated native token artifacts  
**Docs Location**: `apps/docs/` may add contributor-facing guidance for native token delivery architecture  
**Validation Location**: `testing/tokens/` and native package validation entrypoints will verify artifact generation, package consumption, and staleness detection  
**Execution Note**: this plan defines architecture and artifact contracts first so `/speckit.tasks` can sequence implementation work without letting platform packages invent their own delivery formats

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Work stays within ZDS design-system scope and names every planned repository path.
      Planned paths: `packages/tokens/data/`, `packages/tokens/src/`, `packages/tokens/scripts/`, `packages/swiftui/`, `packages/kotlin/`, `packages/windows/`, `apps/docs/`, `testing/tokens/`, and native package validation entrypoints. `spec/components/button/button.spec.json` may receive parity metadata references if delivery rules need them.
- [x] Source-of-truth ownership remains intact across spec, tokens, implementation packages, docs, and testing.
      Shared token meaning remains in `packages/tokens/data/`; native packages only consume generated outputs.
- [x] Docs impacts are identified for this contributor-facing architecture feature.
      `apps/docs/` may publish delivery guidance; no new Storybook preview contract is required in this planning slice.
- [x] Platform parity rationale is explicit.
      This feature standardizes token delivery and does not introduce new parity behavior differences; existing approved exceptions remain in shared metadata.
- [x] React implementation boundaries remain explicit and unchanged.
      No new React primitive or Radix work is required; React stays a comparison baseline while native packages become delivery consumers.
- [x] Validation coverage changes are planned for all affected artifact layers.
      Token generation, artifact freshness, native package consumption, and contributor-facing guidance validation are all in scope.

## Project Structure

### Documentation (this feature)

```text
specs/007-native-token-delivery/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── native-token-delivery-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
packages/
├── tokens/
│   ├── data/
│   │   ├── color/
│   │   ├── spacing/
│   │   ├── radius/
│   │   ├── typography/
│   │   └── components/
│   ├── src/
│   └── scripts/
├── swiftui/
│   ├── components/
│   └── Package.swift
├── kotlin/
│   ├── components/
│   └── build.gradle.kts
└── windows/
    ├── components/
    └── ZDS.Windows.csproj

spec/
└── components/
    └── button/
        └── button.spec.json

apps/
└── docs/

testing/
├── tokens/
└── docs-system/
```

**Structure Decision**: Keep shared token ownership centralized in
`packages/tokens/` and add platform-native artifact generation there instead of
duplicating token logic inside each native package root. SwiftUI, Kotlin, and
Windows stay as consumption surfaces, while docs and testing explain and verify
the delivery path rather than redefining it.

## Delivery Plan

1. Record planning decisions for native token delivery, generated artifact ownership, and validation boundaries.
2. Define the normalized token entities needed to translate shared source tokens into platform-native artifacts.
3. Publish a delivery contract that specifies source paths, generated artifact expectations, consumer responsibilities, and parity metadata boundaries.
4. Write a quickstart that sequences contract review, token generator work, native package adoption, and validation updates.
5. Update agent context so future tasks inherit the new native token delivery conventions.
6. Hand off to `/speckit.tasks` for dependency-ordered implementation work across `packages/tokens/`, native packages, docs, and validation.

## Complexity Tracking

> Fill ONLY if Constitution Check has violations that must be justified

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | No constitutional exception required for this planning feature | N/A |
