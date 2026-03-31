# Data Model: 브레드크럼프 컴포넌트

## Entity: BreadcrumbSpec

**Description**: The authoritative shared breadcrumb contract covering path
semantics, overflow policy, accessibility expectations, and parity status.

**Fields**:

- `component_name`: Stable component identifier, fixed to `breadcrumb`
- `description`: Human-readable summary of breadcrumb purpose
- `items`: Shared `BreadcrumbItemRule` records
- `separator`: Shared `BreadcrumbSeparatorRule`
- `overflow_policy`: Shared `BreadcrumbOverflowPolicy`
- `accessibility`: Shared `BreadcrumbAccessibilityProfile`
- `parity_profiles`: Collection of `PlatformParityProfile` records

**Validation Rules**:

- `component_name` MUST remain stable across spec, tokens, pen, docs, and implementations.
- The contract MUST preserve a clear distinction between interactive ancestor steps and the current-page step.
- Overflow behavior MUST not require a dropdown interaction in this version.
- Every planned platform MUST have an explicit parity profile.

## Entity: BreadcrumbItemRule

**Description**: A shared rule describing one breadcrumb step in a path.

**Fields**:

- `role_name`: Stable role such as `ancestor`, `current`, or `collapsed-summary`
- `label_required`: Whether visible or announced labeling is required
- `href_allowed`: Whether the role may expose a navigation destination
- `interactive`: Whether the role can be directly activated
- `usage_notes`: Guidance for when the role should appear

**Validation Rules**:

- `ancestor` items MUST allow navigation targets.
- `current` MUST remain the last step and MUST NOT be treated as a normal navigation target.
- `collapsed-summary` MUST never become the authoritative source of path meaning in v1.

## Entity: BreadcrumbSeparatorRule

**Description**: A shared rule for the visual delimiter placed between
breadcrumb steps.

**Fields**:

- `style_name`: Semantic separator style name
- `decorative`: Whether the separator is decorative rather than a destination
- `announced_behavior`: Expected assistive interpretation
- `spacing_ref`: Shared token reference for separator spacing

**Validation Rules**:

- The separator MUST remain non-interactive.
- The separator MUST not be treated as the primary content of the component.

## Entity: BreadcrumbOverflowPolicy

**Description**: The shared rule set for handling constrained width or deep
paths.

**Fields**:

- `mode`: Overflow approach such as `wrap`, `truncate`, or `collapse-middle`
- `preserve_start`: Whether the first step remains visible
- `preserve_current`: Whether the current step remains visible
- `max_visible_steps_guidance`: Human-readable guidance for common review cases
- `notes`: Additional overflow or truncation guidance

**Validation Rules**:

- `preserve_current` MUST always be true.
- At least one strategy MUST preserve the first step when collapsing is used.
- Overflow policy MUST not require a dropdown or arbitrary path picker in this feature.

## Entity: BreadcrumbAccessibilityProfile

**Description**: Shared accessibility expectations for keyboard and assistive
technology use.

**Fields**:

- `navigation_landmark_required`: Whether breadcrumb must expose navigation semantics
- `current_page_announced`: Whether current location meaning must be announced
- `interactive_steps_focusable`: Whether only interactive ancestor steps receive tab stops
- `separator_decorative`: Whether separators are excluded from interaction and primary reading
- `misuse_patterns`: Known anti-patterns reviewers should reject

**Validation Rules**:

- Navigation semantics MUST be present in the public component.
- Current-page meaning MUST remain distinguishable from ancestor navigation.
- Separators MUST remain decorative.

## Entity: PlatformParityProfile

**Description**: The tracked parity status of one platform relative to the
shared breadcrumb contract.

**Fields**:

- `platform_name`: Stable platform identifier such as `react`, `swiftui`, `kotlin`, or `windows`
- `status`: Readiness state such as `ready` or `not-started`
- `gap_summary`: Human-readable summary of missing capability or pending work
- `owner`: Responsible team or owner
- `remediation_target`: Follow-up release or milestone reference

**Validation Rules**:

- Each planned platform MUST have exactly one parity profile.
- `react` cannot be marked `ready` unless the shared path, separator, overflow, and accessibility rules are represented in implementation and docs.
- `not-started` platforms MUST still name their gap and follow-up target.

## Entity: BreadcrumbDocumentationEntry

**Description**: Contributor-facing documentation guidance published through
docs or review artifacts.

**Fields**:

- `topic`: Subject such as hierarchy meaning, overflow handling, accessibility, or parity status
- `audience`: Designer, engineer, reviewer, QA, or cross-functional stakeholder
- `guidance`: Primary explanation
- `evidence_sources`: Artifact references that support the guidance

**Validation Rules**:

- Guidance MUST explain current-location meaning before visual styling details.
- At least one entry MUST cover long-path handling and one MUST cover accessibility expectations.

## Relationships

- `BreadcrumbSpec` owns many `BreadcrumbItemRule` records and exactly one `BreadcrumbSeparatorRule`, `BreadcrumbOverflowPolicy`, and `BreadcrumbAccessibilityProfile`.
- `BreadcrumbSpec` owns one `PlatformParityProfile` per supported platform.
- `BreadcrumbDocumentationEntry` explains behavior derived from `BreadcrumbSpec` and references spec, tokens, pen, docs, or React artifacts.
- Component tokens mirror the semantic roles in `BreadcrumbSpec` without redefining the contract.
