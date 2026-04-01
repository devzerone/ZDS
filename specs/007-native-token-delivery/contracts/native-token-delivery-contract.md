# Native Token Delivery Contract

This contract defines the minimum repository and artifact expectations for
delivering shared design tokens into SwiftUI, Kotlin, and Windows-native
packages.

## Required Artifacts

| Artifact Layer | Required Outcome | Planned Location |
|----------------|------------------|------------------|
| Shared Token Source | Canonical semantic, foundation, theme, and component token ownership | `packages/tokens/data/` |
| Token Build Layer | Shared normalization and platform token generation workflow | `packages/tokens/scripts/`, `packages/tokens/src/` |
| Platform Token Artifacts | Platform-native token outputs for SwiftUI, Kotlin, and Windows | `packages/tokens/generated/swiftui/`, `packages/tokens/generated/kotlin/`, `packages/tokens/generated/windows/` |
| Native Package Consumers | Package-owned components that read generated token artifacts | `packages/swiftui/`, `packages/kotlin/`, `packages/windows/` |
| Documentation | Contributor-facing guidance for token source, generation, consumption, and validation | `apps/docs/` |
| Validation | Checks for artifact generation, staleness, and native-package adoption | `testing/tokens/` and native package validation entrypoints |

## Source Ownership Contract

1. Shared design token meaning MUST continue to originate from `packages/tokens/data/`.
2. Native packages MUST NOT introduce new upstream token authorities for shared design values.
3. CSS assets MAY remain a web delivery format but MUST NOT become the primary token input for native packages.

## Generation Contract

1. The repository MUST define one approved generation path from shared token source to platform-native token artifacts.
2. The generation path MUST preserve shared semantic token names and component token concepts unless a platform exception is already approved in shared metadata.
3. Generated artifacts MUST have clear repository locations and clear ownership boundaries distinguishing generated files from manually authored files. Package-local sync directories such as `Generated/` or `.generated/` are sync outputs, not ownership roots.

## Native Consumption Contract

1. SwiftUI, Kotlin, and Windows packages MUST consume approved platform-native token artifacts for shared design values.
2. Native component code MUST NOT rely on copied CSS variable definitions as its primary styling input.
3. Native component code MUST avoid introducing raw shared design constants when an approved generated token artifact exists.

## Parity and Exception Contract

1. Approved platform exceptions remain part of shared parity metadata, not platform-local token vocabularies.
2. A token delivery feature MUST preserve the shared meaning of component variants, states, and emphasis roles even when platforms render them differently.
3. Generated token artifacts MAY adapt platform syntax, but MUST NOT fork the shared semantic naming model.

## Validation Contract

1. Validation MUST detect missing generated token artifacts for supported native platforms.
2. Validation MUST detect stale artifacts when shared token source files change without corresponding generation updates.
3. Documentation and validation guidance MUST make it obvious to contributors which files are generated and how to refresh them.

## Review Contract

1. Reviewers MUST reject native token delivery work that moves token authority into implementation packages.
2. Reviewers MUST reject delivery work that hides parity exceptions inside platform-specific token renames.
3. A token delivery change is incomplete until source ownership, generated artifacts, consumer boundaries, and validation expectations are updated together.
