# Button Platform Parity Contract

This contract defines the minimum cross-platform artifact and behavior
expectations for the ZDS button component after parity expansion beyond React.

## Required Artifacts

| Artifact Layer | Required Outcome | Planned Location |
|----------------|------------------|------------------|
| JSON Spec | Canonical button contract plus readiness, ownership, and exception metadata for all planned platforms | `spec/components/button/button.spec.json` |
| Component Tokens | Shared button token mappings consumed consistently across platforms | `packages/tokens/data/components/button.json` |
| `.pen` Visual Reference | Cross-platform review baseline for variant, size, state, and exception comparison | `pen/components/button/` |
| Documentation | Public explanation of parity status, approved exceptions, and platform support boundaries | `apps/docs/content/components/button.mdx`, `apps/docs/app/components/button/page.tsx` |
| React Implementation | Existing reference implementation aligned to the shared contract | `packages/react/src/components/button/`, `packages/react/src/primitives/button/` |
| Native Platform Implementations | First platform-owned button surfaces for SwiftUI, Kotlin, and Windows | `packages/swiftui/components/`, `packages/kotlin/components/`, `packages/windows/components/` |
| Validation | Contract, docs, accessibility, visual, and parity consistency checks | `testing/spec/`, `testing/docs-system/`, `testing/accessibility/`, `testing/visual/` |

## Shared Naming Contract

1. All platforms MUST use the shared names `primary`, `secondary`, `tertiary`,
   and `destructive` for variants.
2. All platforms MUST use the shared names `small`, `medium`, and `large` for
   sizes.
3. All platforms MUST use the shared state model `default`, `hover`,
   `pressed`, `focus`, `disabled`, and `loading`.
4. All platforms MUST preserve `label`, `leading-icon`, and `trailing-icon`
   slot meanings without introducing icon-only support into this base contract.

## Platform Support Contract

1. React remains the first production-ready implementation and MUST continue to
   match the shared contract without redefining it.
2. SwiftUI, Kotlin, and Windows MUST each have an explicit readiness profile in
   shared metadata, even when implementation is partial or not yet started.
3. A platform MUST NOT be described as ready unless all shared variants, sizes,
   required states, label requirements, and accessibility expectations are met.
4. Partial support MUST identify missing states, unsupported affordances, or
   planned follow-up work in the shared parity metadata.

## State and Exception Contract

1. `default`, `focus`, `disabled`, and `loading` are required parity states for
   every planned platform.
2. `hover` and `pressed` remain part of the shared contract and MUST either be
   implemented directly or documented as approved exceptions when the platform
   input model differs.
3. `loading` MUST block repeated activation on every platform.
4. `disabled` MUST preserve discoverability as an unavailable action, not make
   the button disappear.
5. Every approved exception MUST record scope, rationale, user impact, and a
   follow-up condition in shared metadata before merge.

## Token and Visual Contract

1. Platforms MUST consume the shared button token meaning and MUST NOT invent
   platform-local semantic variants or raw-value shortcuts.
2. The `.pen` baseline MUST remain sufficient for reviewers to compare variant
   hierarchy, state meaning, and known exceptions.
3. Documentation and visual review material MUST not contradict the shared
   readiness metadata.

## React Boundary Contract

1. React low-level behavior remains in `packages/react/src/primitives/button/`.
2. React public tokenized API remains in `packages/react/src/components/button/`.
3. No new Radix dependency is justified for this feature because native button
   semantics already satisfy the base interaction model.

## Review Contract

1. A button parity change is incomplete until the shared contract, docs,
   validation, and affected platform profiles are updated together.
2. Reviewers MUST reject platform work that silently renames shared semantics or
   omits parity metadata for known gaps.
3. Storybook and docs MAY communicate parity status, but MUST NOT become the
   authoritative source for support decisions.
