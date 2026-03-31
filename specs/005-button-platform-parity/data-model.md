# Data Model: 버튼 플랫폼 확장

## Entity: ButtonParitySpec

**Description**: The authoritative shared button contract extended with
cross-platform parity expectations.

**Fields**:

- `component_name`: Stable component identifier, fixed to `button`
- `description`: Human-readable summary of button purpose
- `variants`: Shared `ButtonVariantProfile` records
- `sizes`: Shared `ButtonSizeProfile` records
- `states`: Shared `ButtonStateProfile` records
- `slots`: Shared `ButtonSlotProfile` records
- `accessibility`: Common accessibility expectations
- `state_precedence`: Ordered state resolution list
- `parity_profiles`: Collection of `PlatformParityProfile` records
- `platform_exceptions`: Collection of `PlatformExceptionRecord` entries when parity is incomplete

**Validation Rules**:

- `component_name` MUST remain stable across spec, tokens, pen, docs, and implementations.
- Shared variants, sizes, states, and slots MUST not differ in name by platform.
- `parity_profiles` MUST include React, SwiftUI, Kotlin, and Windows.
- Any missing capability MUST be reflected either in a platform status or an exception record.

## Entity: ButtonVariantProfile

**Description**: A semantic button intent that every platform implementation
must preserve.

**Fields**:

- `name`: Shared variant name such as `primary`, `secondary`, `tertiary`, or `destructive`
- `intent`: User-facing action meaning
- `priority_level`: Relative emphasis in a surface
- `allowed_states`: Shared state names supported by the variant
- `usage_notes`: Usage guidance and anti-pattern boundaries

**Validation Rules**:

- Names MUST remain semantic and platform-neutral.
- `destructive` MUST remain distinct in meaning from other variants.
- Allowed states MUST reference shared state identifiers only.

## Entity: ButtonSizeProfile

**Description**: A size tier that preserves a recognizable interaction target
across platforms.

**Fields**:

- `name`: Shared size name such as `small`, `medium`, or `large`
- `min_hit_area`: Minimum target expectation
- `padding_ref`: Shared spacing reference
- `gap_ref`: Shared label/icon spacing reference
- `label_text_ref`: Shared typography reference
- `icon_size`: Expected icon scale for the size tier

**Validation Rules**:

- Sizes MUST increase monotonically in interaction target or visual emphasis.
- Size names MUST match across spec, token data, docs, and implementations.
- Platforms MAY adapt exact renderer units, but MUST preserve the relative tier meanings.

## Entity: ButtonStateProfile

**Description**: A shared button state with user-facing meaning and interaction
impact.

**Fields**:

- `name`: Shared state identifier such as `default`, `hover`, `pressed`, `focus`, `disabled`, or `loading`
- `interaction_allowed`: Whether activation is permitted
- `announced_meaning`: User-facing explanation of the state
- `platform_expectation`: Summary of how the state should appear or behave cross-platform

**Validation Rules**:

- `disabled` and `loading` MUST block activation.
- `focus` MUST remain perceivable without relying on hover-only cues.
- `hover` and `pressed` MAY require platform exception records when a platform lacks direct equivalents.

## Entity: ButtonSlotProfile

**Description**: A supported content region inside the button.

**Fields**:

- `name`: Slot identifier such as `label`, `leading-icon`, or `trailing-icon`
- `required`: Whether the slot must exist
- `content_type`: Expected content kind
- `notes`: Usage or misuse guidance

**Validation Rules**:

- `label` MUST remain required.
- Icon slots MUST remain optional and supplemental.
- No platform may interpret the base contract as icon-only capable.

## Entity: PlatformParityProfile

**Description**: The tracked parity status of one platform relative to the
shared button contract.

**Fields**:

- `platform_name`: Stable platform identifier such as `react`, `swiftui`, `kotlin`, or `windows`
- `status`: Readiness state such as `ready`, `partial`, or `not-started`
- `supported_variants`: Shared variant names currently available
- `supported_sizes`: Shared size names currently available
- `supported_states`: Shared state names currently available
- `gap_summary`: Human-readable summary of missing or divergent capability
- `owner`: Responsible team or owner
- `remediation_target`: Follow-up release or milestone reference

**Validation Rules**:

- Each platform MUST have exactly one parity profile.
- `status` MUST align with the completeness of supported variants, sizes, and states.
- `gap_summary` MUST be explicit when `status` is not `ready`.

## Entity: PlatformExceptionRecord

**Description**: A documented platform-specific difference that preserves shared
meaning while acknowledging implementation reality.

**Fields**:

- `platform_name`: Affected platform
- `scope`: The specific state, slot, size, or behavior affected
- `difference`: What differs from the shared expectation
- `user_impact`: How the difference affects end users or reviewers
- `rationale`: Why the exception is currently accepted
- `follow_up_condition`: What must happen for the exception to be removed

**Validation Rules**:

- Exceptions MUST never rename shared semantics.
- Every exception MUST define both rationale and follow-up condition.
- Hidden differences are invalid; any known divergence MUST have a record here or in equivalent shared metadata.

## Entity: ButtonParityDocumentationEntry

**Description**: Contributor-facing parity guidance published through docs or
review artifacts.

**Fields**:

- `topic`: Subject area such as parity status, exception policy, state behavior, or implementation boundary
- `audience`: Designer, engineer, reviewer, QA, or cross-functional stakeholder
- `guidance`: Primary explanation
- `evidence_sources`: Artifact references that support the guidance

**Validation Rules**:

- Guidance MUST explain shared meaning before platform-specific nuance.
- At least one entry MUST describe parity status and one MUST describe approved exceptions.

## Relationships

- `ButtonParitySpec` owns many `ButtonVariantProfile`, `ButtonSizeProfile`, `ButtonStateProfile`, and `ButtonSlotProfile` records.
- `ButtonParitySpec` owns one `PlatformParityProfile` per supported platform.
- `PlatformExceptionRecord` is linked to one `PlatformParityProfile` and one or more shared button capabilities.
- `ButtonParityDocumentationEntry` explains parity status and exception rules derived from `ButtonParitySpec`.
- Downstream platform implementations consume `ButtonParitySpec` and the existing token meaning without changing shared naming.
