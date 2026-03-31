# Implementation Plan: 버튼 플랫폼 확장

**Branch**: `005-button-platform-parity` | **Date**: 2026-03-31 | **Spec**: [/home/choiho/zerone/ZDS/specs/005-button-platform-parity/spec.md](/home/choiho/zerone/ZDS/specs/005-button-platform-parity/spec.md)  
**Input**: Feature specification from `/specs/005-button-platform-parity/spec.md`

## Summary

기존 React 기준 버튼 계약을 SwiftUI, Kotlin, Windows까지 확장 가능한
공통 parity 컴포넌트로 승격한다. 계획은 `spec/components/button/`의 shared
contract를 중심으로 parity metadata를 강화하고, component token 소비 기준,
`.pen` 기준선, 플랫폼 구현 루트, 문서, 검증 흐름을 함께 정리해 플랫폼별
드리프트를 방지하는 데 초점을 둔다.

## Scope Classification

**Work Type**: component-parity / contract-expansion / documentation / cross-platform-ui  
**Affected Platforms**: React / SwiftUI / Kotlin Compose / Windows Native UI  
**Affected Consumer Environments**: Next.js docs site  
**Artifact Layers**: spec / tokens / pen / docs / implementation / testing  
**Parity Impact**: React-only ready status에서 4개 플랫폼 공통 버튼 parity 계획과 구현 기준선으로 확장

## Technical Context

**Language/Version**: TypeScript 5.9, React 19.2, Next.js App Router, MDX, JSON contracts, JSON design tokens, Markdown planning artifacts, plus platform package placeholders for SwiftUI, Kotlin, and Windows  
**Primary Dependencies**: pnpm workspace, Turbo repo orchestration, `@zds/tokens`, `@zds/react`, existing button contract in `spec/components/button/button.spec.json`, existing button docs surfaces  
**Storage**: repository files under `specs/005-button-platform-parity/`, `spec/components/button/`, `packages/tokens/data/components/`, `pen/components/button/`, `packages/react/src/components/button/`, `packages/swiftui/components/`, `packages/kotlin/components/`, `packages/windows/components/`, `apps/docs/`, and `testing/`  
**Testing**: spec validation, token validation, docs consistency checks, platform parity checklist updates, accessibility review artifacts, visual review artifacts, and platform implementation tests where each package supports them  
**Target Platform**: shared design-system artifacts consumed by React, SwiftUI, Kotlin Compose, and Windows Native UI implementations  
**Project Type**: cross-platform design-system component enhancement inside a pnpm monorepo  
**Performance Goals**: reviewers can determine current platform support and exceptions in a single review pass, and platform implementers can map the shared button contract without inventing platform-local semantics  
**Constraints**: must preserve the contract -> token -> pen -> implementation -> docs lifecycle; must not let any platform rename shared variants, sizes, or states; docs surfaces must reflect the same parity status as the contract; React primitive/component split must stay intact; no new Radix usage is justified because button semantics already work with native HTML  
**Scale/Scope**: one existing button contract expanded to 4 platforms, 4 shared variants, 3 shared sizes, 6 shared interaction states, parity metadata, platform exception rules, first non-React implementation scaffolds, and matching docs and validation coverage

**Spec Location**: `/home/choiho/zerone/ZDS/specs/005-button-platform-parity/spec.md`  
**JSON Contract Source**: `spec/components/button/button.spec.json` remains the canonical button contract and parity metadata source  
**Token Sources**: `packages/tokens/data/components/button.json` remains the button-level token map consumed across platforms  
**Pen Sources**: `pen/components/button/button.pen` remains the baseline visual artifact for cross-platform comparison and review  
**Docs Location**: `apps/docs/content/components/button.mdx` and `apps/docs/app/components/button/page.tsx` remain the official communication surface for parity status  
**Implementation Packages**: `packages/react/src/components/button/`, `packages/swiftui/components/`, `packages/kotlin/components/`, and `packages/windows/components/`  
**Execution Note**: this plan prepares the full parity lifecycle and expects the follow-up task list to sequence shared contract updates before platform-specific implementation work

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Work stays within ZDS design-system scope and names every planned repository path.
      Planned paths: `spec/components/button/button.spec.json`, `packages/tokens/data/components/button.json`, `pen/components/button/button.pen`, `packages/react/src/components/button/`, `packages/swiftui/components/`, `packages/kotlin/components/`, `packages/windows/components/`, `apps/docs/content/components/button.mdx`, `apps/docs/app/components/button/page.tsx`, and `testing/spec/`, `testing/docs-system/`, `testing/accessibility/`, `testing/visual/`.
- [x] Source-of-truth ownership remains intact across spec, tokens, pen, implementation packages, docs, and testing.
      The JSON contract remains authoritative; downstream layers only translate or explain it.
- [x] Docs impacts are identified for this user-consumable component.
      Official docs will expose parity status as the communication layer for this feature.
- [x] Platform parity metadata updates are explicitly required.
      React, SwiftUI, Kotlin, and Windows readiness, gaps, owners, and remediation targets remain part of the shared button contract.
- [x] React implementation boundaries remain explicit and do not require new headless dependencies.
      Public tokenized API stays in `packages/react/src/components/button/`; any low-level behavior remains in `packages/react/src/primitives/button/`. Native semantic HTML remains sufficient, so no new Radix usage is planned.
- [x] Validation coverage changes are planned for every affected artifact layer.
      Contract, docs, visual, accessibility, and parity review updates are all in scope.

## Project Structure

### Documentation (this feature)

```text
specs/005-button-platform-parity/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── button-platform-parity-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
spec/
└── components/
    └── button/
        └── button.spec.json

packages/
├── tokens/
│   └── data/
│       └── components/
│           └── button.json
├── react/
│   └── src/
│       ├── primitives/
│       │   └── button/
│       └── components/
│           └── button/
├── swiftui/
│   └── components/
├── kotlin/
│   └── components/
└── windows/
    └── components/

pen/
└── components/
    └── button/
        └── button.pen

apps/
└── docs/
    ├── app/
    │   └── components/
    │       └── button/
    │           └── page.tsx
    └── content/
        └── components/
            └── button.mdx

testing/
├── spec/
├── docs/
├── accessibility/
└── visual/
```

**Structure Decision**: Keep the canonical button contract and parity metadata in
`spec/components/button/`, preserve button token ownership in
`packages/tokens/data/components/`, keep visual review baselines in
`pen/components/button/`, expose parity guidance through `apps/docs/`, and
implement each platform only inside its package root.
React keeps the primitive/public split, while SwiftUI, Kotlin, and Windows gain
their first button implementation surfaces under existing placeholder
directories.

## Delivery Plan

1. Record planning decisions for cross-platform parity scope, approved state exceptions, and validation boundaries.
2. Update the button data model to represent platform parity profiles, exceptions, and artifact synchronization rules.
3. Publish a parity-specific contract that defines minimum artifact, naming, and support expectations for React, SwiftUI, Kotlin, and Windows.
4. Write a quickstart that sequences shared contract updates before platform-specific implementation and verification work.
5. Update agent context so later tasks inherit the current cross-platform button parity conventions.
6. Hand off to `/speckit.tasks` for dependency-ordered implementation work across shared artifacts and platform packages.

## Complexity Tracking

> Fill ONLY if Constitution Check has violations that must be justified

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | No constitutional exception required for this planning feature | N/A |
