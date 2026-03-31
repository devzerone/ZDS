# ZDS Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-31

## Active Technologies

- TypeScript 5.9, React 19.2, Next.js App Router, MDX, Storybook, pnpm workspace,
  and Turbo repo orchestration
- JSON component contracts under `spec/`, JSON design tokens under
  `packages/tokens/data/`, Pencil baselines under `pen/`, and validation scripts
  under `testing/`
- Workspace packages `@zds/tokens`, `@zds/react`, `@zds/foundation`, and
  placeholder platform roots for SwiftUI, Kotlin, and Windows parity planning

## Project Structure

```text
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
  docs/                  Pencil docs baselines
  patterns/              Pencil pattern baselines
spec/
  components/            Publishable component contracts
  patterns/              Publishable pattern contracts
  metadata/parity/       Shared parity and exception metadata
specs/                   Feature planning artifacts
testing/
  docs/                  Docs and Storybook validation
  spec/                  Contract validation
  tokens/                Token validation
  accessibility/         Accessibility review artifacts
  visual/                Visual review artifacts
tools/
  config/                Repo automation config
  scripts/               Repo automation scripts
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

- 004-next-docs-storybook: Added Next.js docs, Storybook previews, and docs
  validation workflows
- 003-button-component: Added Button contract, React implementation, docs, and
  validation coverage
- 002-define-design-tokens: Added token source files, token schemas, and token
  validation tooling

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
