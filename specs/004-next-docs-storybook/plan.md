# Implementation Plan: Design System Docs And Preview

**Branch**: `004-next-docs-storybook` | **Date**: 2026-03-30 | **Spec**: [/home/choiho/zerone/ZDS/specs/004-next-docs-storybook/spec.md](/home/choiho/zerone/ZDS/specs/004-next-docs-storybook/spec.md)  
**Input**: Feature specification from `/specs/004-next-docs-storybook/spec.md`

## Summary

기존 Markdown 문서와 React 버튼 구현을 배포 가능한 문서 경험으로 연결한다.
`apps/docs`는 Next.js App Router 기반 디자인 시스템 문서 사이트로 계획하고,
Storybook은 `packages/react`의 실제 컴포넌트를 직접 소비하는 별도 프리뷰
환경으로 계획한다. 두 표면은 `spec/`, `pen/`,
`packages/tokens/data/`, `packages/react/components/`를 공통
source of truth로 유지하며, 버튼을 첫 end-to-end reference component로
연결한다. docs 사이트는 헤더 light/dark theme toggle을 제공하고,
Storybook은 matching theme view를 제공한다. 검증 범위에는 docs build,
storybook build, Turbo pipeline, CI 자동 실행, 배포 artifact 준비가
포함된다.

## Scope Classification

**Work Type**: documentation-platform / component-preview / monorepo-build / ci-validation  
**Affected Platforms**: React documentation consumers, Storybook preview reviewers  
**Affected Consumer Environments**: Next.js docs site / standalone Storybook site  
**Artifact Layers**: spec / pen / tokens / docs / implementation / testing / ci  
**Parity Impact**: no new parity platform; React remains the reusable UI layer and Next.js stays a consumer environment

## Technical Context

**Language/Version**: TypeScript 5.9, React 19.2, Markdown/MDX documentation assets, JSON design-system artifacts in a pnpm monorepo  
**Primary Dependencies**: Next.js App Router for `apps/docs`, Storybook for React component preview, pnpm workspace, Turbo repo orchestration, `@zds/react` component exports, existing spec and token validation scripts  
**Storage**: repository files under `apps/docs/`, `.storybook/` or `apps/storybook/` planning scope, `packages/react/components/`, `spec/`, `pen/`, `packages/tokens/data/`, `testing/`, and `.github/workflows/`  
**Testing**: repository validation commands for docs build, Storybook build, existing token/spec/component checks, plus CI execution on push and pull request  
**Target Platform**: static or deployable web documentation surfaces consumed by design system contributors and reviewers  
**Project Type**: design-system documentation application plus component preview tooling in a monorepo  
**Performance Goals**: a contributor can reach button guidance and preview in one session, and maintainers can detect broken docs or preview output before merge  
**Constraints**: docs and preview must not duplicate button implementation logic; both surfaces must consume the shared React component contract; `spec/`, `pen/`, tokens, and React package remain the only authorities for their respective layers; docs theme switching must remain a consumer-experience concern rather than a separate component contract; work must stay focused on design-system documentation rather than product marketing  
**Scale/Scope**: one docs app, one Storybook setup, one reference component flow for Button, one foundation token section, shared scripts/Turbo tasks/CI validation, docs light/dark theme support, and deployment-ready build outputs for both publishing surfaces

**Planned Docs App**: `apps/docs` becomes a Next.js App Router site with content routes for foundation and components  
**Planned Preview Surface**: Storybook is configured as a standalone preview environment that reads stories from `packages/react/components/**`  
**Content Sources**: existing `apps/docs/components/button.md` and `apps/docs/foundation/*.md` are normalized into routes or MDX-backed pages rather than duplicated in separate content systems  
**Source of Truth Layers**: `spec/components/`, `pen/components/`, `packages/tokens/data/`, and `packages/react/components/` remain canonical; docs and stories are consumer representations only  
**Planned Docs Artifact**: static docs build output is planned around a single deployable export directory for `apps/docs` so CI and hosting can consume one stable path  
**Planned Storybook Artifact**: Storybook static build output is planned as a separate deployable directory with a stable root path for hosting and cross-linking  
**Execution Note**: this plan is explicitly deployment-oriented, so scripts, Turbo tasks, CI, publish artifact locations, and theme review behavior are part of the initial architecture rather than post-implementation polish

## Constitution Check

*GATE: Must pass before research, design, or implementation. Re-check before merge.*

- [x] Work stays within design system scope and does not introduce product business logic.
- [x] JSON spec, tokens, `.pen`, docs, and platform implementation remain separate authorities; docs and Storybook are planned as consumer surfaces, not replacement sources of truth.
- [x] Existing button JSON spec, token mapping, `.pen`, docs, implementation, tests, and parity metadata remain the baseline for the new experience.
- [x] React remains the reusable JavaScript implementation layer; Next.js is treated as a consumer environment and Storybook as a preview tool, not as new parity platforms.
- [x] Documentation updates are planned to cover purpose, usage, accessibility, token relationships, and parity information.
- [x] Validation expands repository checks without bypassing the existing token/spec/component lifecycle.
- [x] No new constitutional exception is required to add deployable documentation and preview surfaces.

## Artifact Plan

### Feature Documentation

```text
specs/004-next-docs-storybook/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── docs-preview-contract.md
└── tasks.md
```

### Repository Paths

```text
apps/
└── docs/
    ├── app/
    │   ├── page.tsx
    │   ├── foundation/
    │   └── components/
    ├── content/
    │   ├── foundation/
    │   └── components/
    ├── components/
    │   ├── navigation/
    │   ├── prose/
    │   └── preview-link/
    └── package.json

.storybook/
├── main.ts
├── preview.ts
└── manager.ts

packages/
├── react/
│   └── components/
│       └── button/
│           ├── Button.tsx
│           ├── Button.test.tsx
│           ├── Button.stories.tsx
│           └── index.ts
└── foundation/
    └── tokens/

spec/
└── components/

pen/
└── components/

testing/
├── spec/
├── accessibility/
├── visual/
└── docs/

.github/
└── workflows/
```

**Structure Decision**: Keep design-system authority in `spec/`, `pen/`,
`packages/tokens/data/`, and `packages/react/components/`, then add two
consumer surfaces on top: a Next.js docs app in `apps/docs` and a root
Storybook configuration that reads stories colocated with React components.
This keeps route content, component stories, and build validation close to the
artifacts they explain while avoiding duplicated demo implementations.

## Delivery Plan

1. Confirm the documentation-platform split: docs site for guidance and navigation, Storybook for controllable component preview.
2. Capture research decisions for Next docs structure, Storybook placement, content ownership, build outputs, and CI/deployment strategy.
3. Define entities and contracts for docs pages, preview stories, navigation links, and publish artifacts so Button can flow end-to-end without duplicating examples.
4. Plan Next docs routes and content locations that can absorb existing Markdown artifacts while staying expandable for Input, Badge, and future components.
5. Plan Storybook story colocation under `packages/react/components/` so each component owns its live preview next to its implementation.
6. Add scripts and Turbo tasks for local docs dev/build, Storybook dev/build, and combined validation suitable for CI.
7. Update agent context so later tasks inherit the docs-vs-preview responsibility split and deployment-ready constraints.
8. Hand off to `/speckit.tasks` for implementation sequencing across docs app setup, Storybook setup, Button integration, validation, and CI.

## Exceptions and Justification

> Fill only when requesting a documented exception to the constitution.

| Exception | Justification | Scope | Remediation / Expiration |
|-----------|---------------|-------|---------------------------|
| None | No constitutional exception required for this planning feature | N/A | N/A |
