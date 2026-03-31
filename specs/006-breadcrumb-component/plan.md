# Implementation Plan: 브레드크럼프 컴포넌트

**Branch**: `006-breadcrumb-component` | **Date**: 2026-03-31 | **Spec**: [/home/choiho/zerone/ZDS/specs/006-breadcrumb-component/spec.md](/home/choiho/zerone/ZDS/specs/006-breadcrumb-component/spec.md)  
**Input**: Feature specification from `/specs/006-breadcrumb-component/spec.md`

## Summary

브레드크럼프를 ZDS의 첫 navigation 계열 공통 컴포넌트로 추가한다. 계획은
`spec/components/breadcrumb/`의 shared contract를 기준으로 breadcrumb
component tokens, `.pen` 기준선, React primitive/public component, docs,
Storybook, validation을 함께 설계해 현재 위치 인지, 상위 경로 복귀, 긴 경로
대응, 접근성 의미가 같은 언어로 전달되도록 만드는 데 초점을 둔다.

## Scope Classification

**Work Type**: component / navigation-ui / contract-first / documentation  
**Affected Platforms**: React reference implementation, plus initial `not-started` parity profiles for SwiftUI / Kotlin / Windows  
**Affected Consumer Environments**: Next.js docs site, Storybook preview  
**Artifact Layers**: spec / tokens / pen / implementation / docs / testing  
**Parity Impact**: React를 기준선으로 하는 첫 브레드크럼프 계약을 도입하고, 후속 플랫폼 확장을 위한 shared parity metadata 출발점을 만든다.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19.2, Next.js 15 App Router, MDX, JSON contracts, JSON design tokens, Markdown planning artifacts  
**Primary Dependencies**: pnpm workspace, Turbo repo orchestration, `@zds/tokens`, `@zds/react`, existing docs shell components, Storybook 10 preview pipeline  
**Storage**: repository files under `specs/006-breadcrumb-component/`, `spec/components/breadcrumb/`, `packages/tokens/data/components/`, `pen/components/breadcrumb/`, `packages/react/src/primitives/breadcrumb/`, `packages/react/src/components/breadcrumb/`, `apps/docs/`, and `testing/`  
**Testing**: dedicated breadcrumb spec validation, shared token validation updates, React component tests, Storybook/docs consistency checks, accessibility checklist updates, visual checklist updates  
**Target Platform**: shared design-system artifacts consumed first by React and communicated through the Next.js docs site and Storybook  
**Project Type**: design-system component addition inside a pnpm monorepo  
**Performance Goals**: reviewers can identify current location and available ancestor steps from canonical examples in a single scan, and canonical examples should remain legible across the standard, single-step, and constrained-width paths defined in the shared contract  
**Constraints**: must preserve the contract -> token -> pen -> implementation -> docs lifecycle; last breadcrumb item must remain the current location, not a normal navigation target; separator meaning must remain decorative; overflow handling must not depend on a dropdown pattern in v1; React primitive/component split must stay intact; no new Radix usage is justified because native navigation semantics satisfy the base contract  
**Scale/Scope**: one new breadcrumb contract, one new component token file, one `.pen` baseline, one React primitive layer, one public React component, one Storybook story file, one docs route plus MDX content and preview sandbox, and matching validation artifacts

**Spec Location**: `/home/choiho/zerone/ZDS/specs/006-breadcrumb-component/spec.md`  
**JSON Contract Source**: `spec/components/breadcrumb/breadcrumb.spec.json` becomes the canonical breadcrumb contract and parity metadata source  
**Token Sources**: `packages/tokens/data/components/breadcrumb.json` becomes the breadcrumb-level token map for step spacing, separator presentation, and current/interactive state styling, with `packages/tokens/src/components/breadcrumb.ts` and `packages/tokens/src/index.ts` exposing the token entry point  
**Pen Sources**: `pen/components/breadcrumb/breadcrumb.pen` becomes the baseline visual artifact for standard, single-step, and constrained-width review  
**Docs Location**: `apps/docs/content/components/breadcrumb.mdx` and `apps/docs/app/components/breadcrumb/page.tsx` become the official communication surface  
**Implementation Packages**: `packages/react/src/primitives/breadcrumb/`, `packages/react/src/components/breadcrumb/`, plus public exports in `packages/react/src/index.ts` and `packages/react/src/breadcrumb.ts`  
**Execution Note**: this plan assumes breadcrumb will follow the repository's established component pattern: contract and tokens first, then React implementation, then docs and validation alignment

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Work stays within ZDS design-system scope and names every planned repository path.
      Planned paths: `spec/components/breadcrumb/breadcrumb.spec.json`, `packages/tokens/data/components/breadcrumb.json`, `packages/tokens/src/components/breadcrumb.ts`, `packages/tokens/src/index.ts`, `pen/components/breadcrumb/breadcrumb.pen`, `packages/react/src/primitives/breadcrumb/`, `packages/react/src/components/breadcrumb/`, `packages/react/src/index.ts`, `packages/react/src/breadcrumb.ts`, `packages/react/package.json`, `packages/react/tsup.config.ts`, `apps/docs/content/components/breadcrumb.mdx`, `apps/docs/app/components/breadcrumb/page.tsx`, `apps/docs/components/breadcrumb/`, `apps/docs/app/components/page.tsx`, `apps/docs/components/navigation/site-nav.ts`, `apps/docs/components/navigation/DocsTopbar.tsx`, and `testing/spec/`, `testing/docs-system/`, `testing/accessibility/`, `testing/visual/`, `testing/tokens/`.
- [x] Source-of-truth ownership remains intact across spec, tokens, pen, implementation packages, docs, and testing.
      The breadcrumb JSON spec remains authoritative; tokens express reusable visual meaning; `.pen`, React, docs, and Storybook consume or explain those upstream artifacts.
- [x] Docs and Storybook impacts are identified for this user-consumable component.
      The official docs page, docs navigation surfaces, preview sandbox, and Storybook stories are all part of scope.
- [x] Platform parity metadata is addressed with an explicit initial-status plan.
      React is the first ready surface; SwiftUI, Kotlin, and Windows will be represented in shared metadata as `not-started` rather than silently omitted.
- [x] React implementation boundaries remain explicit and do not require new headless dependencies.
      Low-level path rendering and semantics live in `packages/react/src/primitives/breadcrumb/`; tokenized public API lives in `packages/react/src/components/breadcrumb/`. Native semantic navigation structure is sufficient, so no new Radix usage is planned.
- [x] Validation coverage changes are planned for every affected artifact layer.
      Spec, token, docs preview links, React tests, accessibility review, and visual review updates are all in scope.

**Post-Design Re-check**: PASS. The planned artifacts still preserve source-of-truth ownership, include docs and Storybook surfaces, keep React primitive/public boundaries explicit, and record parity as shared metadata rather than implementation-local knowledge.

## Project Structure

### Documentation (this feature)

```text
specs/006-breadcrumb-component/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── breadcrumb-component-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
spec/
└── components/
    └── breadcrumb/
        └── breadcrumb.spec.json

packages/
├── tokens/
│   ├── data/
│   │   └── components/
│   │       └── breadcrumb.json
│   └── src/
│       ├── index.ts
│       └── components/
│           └── breadcrumb.ts
└── react/
    ├── tsup.config.ts
    ├── package.json
    └── src/
        ├── index.ts
        ├── breadcrumb.ts
        ├── primitives/
        │   └── breadcrumb/
        └── components/
            └── breadcrumb/

pen/
└── components/
    └── breadcrumb/
        └── breadcrumb.pen

apps/
└── docs/
    ├── app/
    │   └── components/
    │       ├── page.tsx
    │       └── breadcrumb/
    │           └── page.tsx
    ├── components/
    │   ├── breadcrumb/
    │   └── navigation/
    └── content/
        └── components/
            └── breadcrumb.mdx

testing/
├── spec/
│   └── validate-breadcrumb-spec.mjs
├── docs/
│   ├── validate-docs-build.mjs
│   ├── validate-docs-system.mjs
│   └── validate-preview-links.mjs
├── tokens/
│   └── validate-tokens.mjs
├── accessibility/
│   └── breadcrumb-accessibility-checklist.md
└── visual/
    └── breadcrumb-visual-checklist.md
```

**Structure Decision**: Keep the canonical breadcrumb contract and parity
metadata in `spec/components/breadcrumb/`, preserve reusable visual meaning in
`packages/tokens/data/components/`, capture review baselines in
`pen/components/breadcrumb/`, implement React semantics and public API under the
existing primitive/public split, and expose breadcrumb guidance through the docs
site and Storybook without making those surfaces the source of truth.

## Delivery Plan

1. Record planning decisions for breadcrumb semantics, overflow policy boundaries, and validation expectations in `research.md`.
2. Model breadcrumb path items, separators, overflow behavior, accessibility rules, and parity status in `data-model.md`.
3. Publish a breadcrumb-specific contract that defines required artifact layers, step semantics, current-page behavior, and initial parity expectations.
4. Write a quickstart that sequences contract and token work ahead of React, docs, and verification work, while keeping package-script changes optional unless dedicated breadcrumb commands are justified.
5. Update agent context so later tasks inherit the current breadcrumb component conventions.
6. Hand off to `/speckit.tasks` for dependency-ordered implementation work across shared artifacts, React surfaces, docs, and validation.

## Complexity Tracking

> Fill ONLY if Constitution Check has violations that must be justified

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | No constitutional exception required for this planning feature | N/A |
