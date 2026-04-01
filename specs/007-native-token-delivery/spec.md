# Feature Specification: Native Token Delivery Architecture

**Feature Branch**: `[007-native-token-delivery]`  
**Created**: 2026-03-31  
**Status**: Draft  
**Input**: User description: "Define the tokens-to-platform delivery architecture for SwiftUI, Kotlin, and WinUI so native packages consume generated platform token artifacts instead of CSS or hardcoded values."

## Clarifications

### Session 2026-03-31

- Q: 생성된 플랫폼 토큰 아티팩트는 어디에 두어야 하는가? → A: `packages/tokens/` 아래에서 생성하고 네이티브 패키지가 소비한다.
- Q: 첫 적용 범위는 어디까지여야 하는가? → A: `Button`만 첫 적용 범위에 포함하고 나머지는 이후 확장 대상으로 둔다.
- Q: 생성 산출물이 없거나 stale할 때 검증은 어떻게 동작해야 하는가? → A: 생성된 플랫폼 토큰 아티팩트가 없거나 stale이면 validation이 실패해야 한다.
- Q: 플랫폼 산출물 형식은 어떻게 가져가야 하는가? → A: 공통 normalization 이후 SwiftUI, Kotlin, Windows별 네이티브 형식으로 각각 생성한다.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Standardize Native Token Consumption (Priority: P1)

As a design-system maintainer, I want SwiftUI, Kotlin, and Windows packages to consume platform-native token artifacts generated from the shared token source so native implementations stay aligned with the same semantic design decisions as web surfaces.

**Why this priority**: Without a shared delivery path from token source to native packages, parity work becomes manual, drifts over time, and forces maintainers to duplicate design decisions in each platform package.

**Independent Test**: Can be fully tested by defining the required token delivery contract and verifying that each native package has a documented, consumable platform token surface derived from shared tokens rather than direct CSS imports or hand-copied raw values.

**Acceptance Scenarios**:

1. **Given** shared design tokens exist under the token source of truth, **When** a maintainer updates a token used by native components, **Then** the architecture defines how that change is propagated into SwiftUI, Kotlin, and Windows-native token artifacts.
2. **Given** a native package needs color, spacing, typography, or component token values, **When** maintainers implement or review that package, **Then** they can identify a single approved platform token surface to consume instead of reading CSS files or re-entering raw values.

---

### User Story 2 - Preserve Shared Semantics Across Platforms (Priority: P2)

As a component maintainer, I want component-level tokens such as Button to preserve shared semantic names and state models across native platforms so parity reviews compare equivalent concepts instead of platform-specific reinterpretations.

**Why this priority**: Shared parity becomes much easier to review when platforms speak the same token language for variants, states, spacing, and emphasis roles.

**Independent Test**: Can be tested independently by validating that the architecture defines how semantic token names, component token structures, and approved platform exceptions are represented consistently in platform-native outputs.

**Acceptance Scenarios**:

1. **Given** a component token model such as Button variant and state tokens, **When** platform artifacts are generated, **Then** the architecture preserves the shared semantic meaning of those states for SwiftUI, Kotlin, and Windows consumers.
2. **Given** a platform has an approved interaction exception, **When** maintainers review parity expectations, **Then** the exception remains documented in parity metadata rather than being silently baked into unrelated token names.

---

### User Story 3 - Improve Native Package Onboarding (Priority: P3)

As a contributor working on native packages, I want the repository to clearly document where platform token artifacts come from, where they are consumed, and how they are validated so I can extend native components without reverse-engineering token flow.

**Why this priority**: Once a delivery pipeline exists, contributor clarity determines whether the system stays maintainable or falls back to ad hoc updates.

**Independent Test**: Can be tested independently by checking that repository guidance and validation references clearly describe the token delivery path for native packages and the expected maintenance workflow.

**Acceptance Scenarios**:

1. **Given** a contributor is adding or updating a native component, **When** they consult repository documentation and feature artifacts, **Then** they can identify the source token files, generated platform artifacts, package consumption points, and validation expectations without inspecting unrelated packages.

---

### Edge Cases

- What happens when a shared token category exists for web today but has no approved native representation yet?
- How does the system handle a component token that references semantic values supported on one platform but unavailable or intentionally exceptioned on another?
- What happens when a generated platform artifact is stale relative to the current token source?
- Generated platform artifacts가 없거나 stale한 경우 validation은 경고가 아니라 실패로 처리되어야 한다.
- How does the architecture prevent native packages from mixing generated token artifacts with newly introduced raw values?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST define a canonical token delivery path from shared token source files to platform-native token artifacts for SwiftUI, Kotlin, and Windows packages.
- **FR-002**: The system MUST ensure native packages consume approved platform-native token artifacts rather than CSS assets as their primary styling input.
- **FR-003**: The system MUST define how foundation token categories used by native packages are represented for each supported native platform, including color, spacing, radius, and typography, using platform-native output formats after a shared normalization step.
- **FR-004**: The system MUST define how component-level token data is delivered to native packages for shared components, starting with `Button` as the first end-to-end delivery proof path.
- **FR-005**: The system MUST preserve shared semantic token names and shared component token concepts across generated platform outputs unless a platform exception is explicitly approved in parity metadata.
- **FR-006**: The system MUST identify the repository locations where generated platform token artifacts are produced, stored, and consumed for each native package, with generated artifacts owned under `packages/tokens/`.
- **FR-007**: The system MUST define validation expectations that fail when platform token artifacts are missing, stale, or inconsistent relative to the shared token source.
- **FR-008**: The system MUST allow native package maintainers to determine which artifacts are generated and which files are intended for manual editing.
- **FR-009**: The system MUST document how approved platform-specific interaction exceptions remain tracked in parity metadata without fragmenting the shared token vocabulary.
- **FR-011**: The system MUST define how shared token categories or semantic values without an approved native representation are handled, either by recording an explicit parity exception in shared metadata or by treating the capability as unsupported until approved.
- **FR-010**: The system MUST preserve the existing design-system source-of-truth ordering, with `spec/` and `packages/tokens/` remaining authoritative over native implementation packages.

## Artifact Impact & Parity *(mandatory)*

### Source-of-Truth Updates

- **Spec Artifacts**: `spec/components/button/button.spec.json` may require updates if token delivery rules introduce new parity metadata references; `spec/metadata/parity/` remains available only if a shared registry becomes necessary.
- **Token / Foundation Artifacts**: `packages/tokens/data/`, `packages/tokens/src/`, and `packages/tokens/scripts/` are expected to gain platform token generation and delivery definitions, with generated platform token artifacts stored under `packages/tokens/`.
- **Pencil Baselines**: None.

### Delivery Surface Updates

- **Implementation Packages**: `packages/swiftui/`, `packages/kotlin/`, and `packages/windows/` are directly impacted as consumers of generated platform token artifacts for `Button`. `packages/react/` is not a primary delivery target but may serve as a comparison baseline.
- **Docs / Preview Surfaces**: `apps/docs/` may require contributor-facing documentation for the native token delivery workflow. Storybook changes are not required for the initial architecture definition.
- **Validation Artifacts**: `testing/tokens/` and native package validation entrypoints are expected to expand so token generation and package consumption stay synchronized.

### Platform Parity & Exceptions

- **Parity Impact**: This feature does not change the product-facing parity goal; it changes how parity-relevant token data reaches native implementations so parity can be maintained more consistently.
- **Approved Exceptions**: Existing approved platform interaction exceptions for native platforms remain valid; this feature does not introduce new behavior exceptions by itself.
- **Parity Metadata Location**: Canonical parity metadata remains in component-level `spec/components/...` artifacts unless a future shared registry under `spec/metadata/parity/` is justified for cross-component delivery rules.
- **Primitive / Headless Strategy**: React primitive strategy is unchanged. This feature primarily governs token delivery into native implementation packages rather than introducing new React primitive behavior.

### Key Entities *(include if feature involves data)*

- **Shared Token Source**: The authoritative semantic, foundation, theme, and component token data maintained under `packages/tokens/data/`.
- **Platform Token Artifact**: A generated, platform-native representation of shared tokens intended for direct consumption by a single native package, with format chosen per platform rather than forced into one shared runtime format.
- **Native Token Consumer**: A SwiftUI, Kotlin, or Windows package file or module that reads platform token artifacts to render component styling and state.
- **Parity Exception Record**: Approved metadata describing where a native platform intentionally diverges from shared interaction semantics without redefining token meaning.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Maintainers can identify one documented token source, one documented platform artifact location, and one documented consumption path for each of SwiftUI, Kotlin, and Windows without relying on CSS assets.
- **SC-002**: Shared foundation token categories required by currently supported native components are represented in the architecture for all three native platforms.
- **SC-003**: `Button` can be described end-to-end through the defined token delivery path from shared source to each native package as the first implementation proof path.
- **SC-004**: Repository guidance and validation expectations make it possible for a contributor to determine whether native token artifacts are missing, stale, or manually edited in an unsupported way, and those conditions cause validation failure.

## Assumptions

- The existing token JSON files under `packages/tokens/data/` remain the sole authoritative source for shared design values.
- Generated platform token artifacts are owned and produced under `packages/tokens/`, then consumed by native packages from that shared delivery layer.
- Initial scope focuses on defining the delivery architecture and its artifact boundaries, not full parity implementation for every future component.
- `Button` is the only required first-slice component for validating the architecture because it already exists across all targeted native packages.
- Native packages are expected to consume generated artifacts in forms idiomatic to their platforms rather than sharing a single cross-platform binary format.
- A shared normalization step may exist before generation, but final token artifacts are emitted in platform-native formats for SwiftUI, Kotlin, and Windows respectively.
- Existing approved platform interaction exceptions remain documented in component spec metadata and do not need to be redefined by this feature unless the delivery architecture requires additional metadata references.
