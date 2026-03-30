# Button Component Contract

This contract defines the minimum shared artifact and behavior expectations for
the ZDS button component.

## Required Artifacts

| Artifact Layer | Required Outcome | Planned Location |
|----------------|------------------|------------------|
| JSON Spec | Canonical contract for variants, sizes, states, slots, accessibility, and parity exceptions | `spec/components/button/button.spec.json` |
| Component Tokens | Button-level token mappings that consume semantic tokens | `packages/tokens/data/components/button.json` |
| `.pen` Visual Reference | Visual anatomy, variants, sizes, and state baselines | `pen/components/button/` |
| Documentation | Public explanation of usage, anatomy, accessibility, and anti-patterns | `apps/docs/components/button.md` |
| React Implementation | First reusable platform implementation | `packages/react/components/button/` |
| Tests | Spec validation, accessibility, visual, and implementation checks | `testing/spec/`, `testing/accessibility/`, `testing/visual/` |

## Variant Contract

1. The shared contract MUST support at least `primary`, `secondary`,
   `tertiary`, and `destructive` button variants.
2. Each variant MUST have a documented action intent and usage boundary.
3. Exactly one primary action emphasis SHOULD be recommended per major screen
   section unless the spec documents an exception.
4. Destructive actions MUST remain semantically and visually distinct from
   non-destructive actions.

## Size Contract

1. The shared contract MUST support at least `small`, `medium`, and `large`
   sizes.
2. Each size MUST preserve a clear interactive target and a stable label/icon
   relationship.
3. Size names MUST remain semantic and MUST match across spec, tokens, `.pen`,
   docs, and implementation.

## State Contract

1. The shared contract MUST define `default`, `hover`, `pressed`, `focus`,
   `disabled`, and `loading` states.
2. `loading` MUST block repeated activation and communicate in-progress status.
3. `disabled` MUST communicate unavailable action without appearing as a hidden
   or removed control.
4. Focus indication MUST remain visible without relying on hover.
5. State precedence MUST document how `loading` and `disabled` interact with
   other states.

## Content Contract

1. The base button contract MUST require a text label.
2. Leading and trailing icons MAY be supported as optional slots.
3. Icon-only controls MUST NOT be treated as part of this base button contract.
4. Icons MUST support the label rather than replace the label's meaning.

## Token Contract

1. Button component tokens MUST define at least background, foreground, border,
   focus, padding, gap, radius, and icon size mappings where applicable.
2. Button component tokens MUST reference semantic tokens or higher-level token
   abstractions, never raw palette values directly.
3. Variant, size, and state combinations MUST have deterministic token mapping.

## Accessibility Contract

1. The contract MUST preserve text-led action identification.
2. The contract MUST define expectations for focus visibility, disabled meaning,
   loading meaning, and readable label contrast.
3. The contract MUST document misuse patterns that would weaken action clarity,
   such as repeated primary emphasis or missing labels.

## Parity Contract

1. React is the first implementation layer for JavaScript consumers and MUST
   not redefine the shared contract.
2. SwiftUI, Kotlin Compose, and Windows Native UI translations MUST preserve
   the same variant names, size names, state model, and semantic meaning unless
   a documented exception is recorded.
3. Next.js and Tauri are consumer environments, not separate button platforms.

## Review Contract

1. A button change is not done until JSON spec, component tokens, `.pen`, docs,
   at least one platform implementation, tests, and parity status all exist.
2. Reviewers MUST reject button work that adds undocumented states, hard-coded
   reusable values, or implementation-only naming.
