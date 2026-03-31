# ZDS Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-31

## Active Technologies
- TypeScript 5.9, React 19.2, Next.js 15 App Router, MDX, JSON contracts, JSON design tokens, Markdown planning artifacts + pnpm workspace, Turbo repo orchestration, `@zds/tokens`, `@zds/react`, existing docs shell components, Storybook 10 preview pipeline (006-breadcrumb-component)
- repository files under `specs/006-breadcrumb-component/`, `spec/components/breadcrumb/`, `packages/tokens/data/components/`, `pen/components/breadcrumb/`, `packages/react/src/primitives/breadcrumb/`, `packages/react/src/components/breadcrumb/`, `apps/docs/`, and `testing/` (006-breadcrumb-component)
- Shared repository conventions: JSON component contracts under `spec/`, JSON design tokens under `packages/tokens/data/`, Pencil baselines under `pen/`, validation scripts under `testing/`, and workspace packages `@zds/tokens`, `@zds/react`, `@zds/foundation`, plus placeholder platform roots for SwiftUI, Kotlin, and Windows parity planning

## Project Structure

Read the repository in two layers first: product structure and operations structure.

```text
Product structure
apps/
  docs/                  Official documentation site
.storybook/              Storybook preview configuration
packages/
  foundation/            Brand and shared foundation assets
  tokens/                Design token sources and build outputs
  react/                 React implementation package
    src/primitives/      Low-level/headless React building blocks
    src/components/      Public tokenized React components
  swiftui/               SwiftUI implementation root
  kotlin/                Kotlin implementation root
  windows/               Windows implementation root
pen/
  components/            Pencil component baselines
  site/                  Pencil site baselines
  patterns/              Pencil pattern baselines
spec/
  components/            Publishable component contracts and component-scoped parity metadata
  patterns/              Publishable pattern contracts and pattern-scoped parity metadata
  metadata/parity/       Shared parity registries, rollups, and cross-artifact exception metadata
specs/                   Feature planning artifacts
testing/
  docs-system/           Docs and Storybook system validation
  spec/                  Contract validation
  tokens/                Token validation
  accessibility/         Accessibility review artifacts
  visual/                Visual review artifacts
tools/
  config/                Repo automation config
  scripts/               Repo automation scripts
```

```text
Operations structure
.agents/                 Local agent skills and workflows
.claude/                 Local Claude command configuration
.serena/                 Serena local cache and memories
.specify/                spec-kit templates and automation scripts
.github/                 CI/CD workflows
```

## Commands

- `pnpm build`
- `pnpm dev`
- `pnpm clean`
- `pnpm docs:dev`
- `pnpm docs:build`
- `pnpm storybook`
- `pnpm storybook:build`
- `pnpm validate:tokens`
- `pnpm validate:button-spec`
- `pnpm test:button-react`
- `pnpm validate:button`
- `pnpm validate:docs-system`

## Code Style

- Keep design-system source-of-truth ownership intact: `spec/` for contracts,
  `packages/tokens/` for reusable values, `pen/` for visual baselines, package
  roots for implementation, `apps/docs/` and Storybook for communication
- Prefer semantic naming over raw-value naming in tokens, specs, and docs
- Update validation alongside user-facing or contract changes
- In React, keep `src/primitives/` for low-level/headless behavior and
  `src/components/` for public tokenized APIs
- Use Radix UI only when a React primitive needs non-trivial headless behavior;
  prefer native semantic HTML when it already satisfies the contract

## Recent Changes
- 006-breadcrumb-component: Added TypeScript 5.9, React 19.2, Next.js 15 App Router, MDX, JSON contracts, JSON design tokens, Markdown planning artifacts + pnpm workspace, Turbo repo orchestration, `@zds/tokens`, `@zds/react`, existing docs shell components, Storybook 10 preview pipeline

- 004-next-docs-storybook: Added Next.js docs, Storybook previews, and docs
  validation workflows
- 003-button-component: Added Button contract, React implementation, docs, and
  validation coverage
  validation tooling

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
