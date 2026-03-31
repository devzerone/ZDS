# Breadcrumb Component Contract

This contract defines the minimum artifact, behavior, and communication
expectations for the ZDS breadcrumb component.

## Required Artifacts

| Artifact Layer | Required Outcome | Planned Location |
|----------------|------------------|------------------|
| JSON Spec | Canonical breadcrumb semantics, accessibility rules, overflow policy, and parity status | `spec/components/breadcrumb/breadcrumb.spec.json` |
| Component Tokens | Shared visual token mappings for ancestor steps, current step, separator, and constrained-path handling | `packages/tokens/data/components/breadcrumb.json` |
| `.pen` Visual Reference | Review baseline for single-step, standard multi-step, and constrained-width breadcrumb layouts | `pen/components/breadcrumb/breadcrumb.pen` |
| React Primitive | Low-level breadcrumb path rendering and semantic structure | `packages/react/src/primitives/breadcrumb/` |
| React Public Component | Tokenized breadcrumb API aligned to the shared contract | `packages/react/src/components/breadcrumb/` |
| Documentation | Public explanation of breadcrumb purpose, path rules, overflow guidance, accessibility, and source references | `apps/docs/content/components/breadcrumb.mdx`, `apps/docs/app/components/breadcrumb/page.tsx` |
| Storybook | Interactive preview of canonical breadcrumb combinations | `packages/react/src/components/breadcrumb/Breadcrumb.stories.tsx` |
| Validation | Contract, token, docs, accessibility, visual, and React behavior checks | `testing/spec/`, `testing/tokens/`, `testing/docs/`, `testing/accessibility/`, `testing/visual/`, `packages/react/src/components/breadcrumb/` |

## Shared Semantics Contract

1. Every breadcrumb path MUST preserve ordered hierarchy from ancestor to current page.
2. The final breadcrumb step MUST represent the current page.
3. Ancestor steps MAY expose navigation targets.
4. The current-page step MUST NOT be styled or described as a normal navigation target.
5. Separators MUST indicate sequence only and MUST remain decorative.

## Overflow Contract

1. The contract MUST define how constrained-width paths preserve meaning.
2. Current page visibility MUST be preserved in constrained-width review examples.
3. The start of the path SHOULD remain visible when a collapsed-middle strategy is used.
4. V1 MUST NOT require dropdown-based overflow recovery or arbitrary path-picking interactions.

## Accessibility Contract

1. The public breadcrumb MUST expose navigation semantics.
2. Only interactive ancestor steps may participate in keyboard navigation order.
3. Current-page meaning MUST remain distinguishable to assistive technologies.
4. Separators MUST NOT become keyboard targets or primary announced content.

## React Boundary Contract

1. Low-level structure and semantic rendering remain in `packages/react/src/primitives/breadcrumb/`.
2. Public tokenized API, sizing, and style application remain in `packages/react/src/components/breadcrumb/`.
3. No new Radix dependency is justified for this feature because native navigation semantics satisfy the base interaction model.

## Parity Contract

1. React is the first ready implementation surface for the shared breadcrumb contract.
2. SwiftUI, Kotlin, and Windows MUST still appear in shared parity metadata, even when implementation is deferred.
3. Docs and Storybook MAY communicate parity status, but MUST NOT become the authoritative source for it.

## Review Contract

1. A breadcrumb change is incomplete until spec, tokens, pen, React, docs/Storybook, and validation updates remain synchronized.
2. Reviewers MUST reject breadcrumb work that hides long-path behavior, current-page semantics, or platform readiness gaps outside shared metadata.
3. Docs prose and interactive previews MUST reference the same canonical contract terms used in spec and tokens.
