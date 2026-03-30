# Data Model: 버튼 컴포넌트

## Entity: ButtonSpec

**Description**: The authoritative JSON contract for the shared button
component.

**Fields**:

- `component_name`: Stable component identifier, fixed to `button`
- `description`: Human-readable summary of component purpose
- `variants`: Supported `ButtonVariant` records
- `sizes`: Supported `ButtonSize` records
- `states`: Supported `ButtonState` records
- `slots`: Supported `ButtonSlot` records
- `accessibility`: Shared accessibility expectations
- `platform_exceptions`: Explicitly documented deviations by platform when needed

**Validation Rules**:

- `component_name` MUST remain stable across spec, tokens, `.pen`, docs, and implementations.
- `variants`, `sizes`, and `states` MUST all be non-empty.
- `platform_exceptions` MUST be empty unless a documented parity exception exists.

## Entity: ButtonVariant

**Description**: A role-based definition of button importance and meaning.

**Fields**:

- `name`: Semantic variant name such as `primary`, `secondary`, `tertiary`, or `destructive`
- `intent`: User-facing meaning for the variant
- `priority_level`: Relative action emphasis within a screen
- `allowed_states`: States supported by the variant
- `token_refs`: Component-token references for background, foreground, border, and focus treatment
- `usage_notes`: Recommended usage and anti-pattern guidance

**Validation Rules**:

- `name` MUST be semantic and platform-neutral.
- `token_refs` MUST resolve only to component tokens.
- `destructive` intent MUST remain visually distinguishable from non-destructive actions.

## Entity: ButtonSize

**Description**: A reusable size profile for the button component.

**Fields**:

- `name`: Size identifier such as `small`, `medium`, or `large`
- `min_hit_area`: Minimum target size expectation
- `padding_ref`: Component-token reference for inset spacing
- `gap_ref`: Component-token reference for icon/text spacing
- `label_text_ref`: Typography token reference for the label
- `icon_size_ref`: Icon size token reference when icons are present

**Validation Rules**:

- Every size MUST preserve a consistent interactive target expectation.
- Padding and typography references MUST remain semantically named.
- Sizes MUST increase monotonically in target area and spacing emphasis.

## Entity: ButtonState

**Description**: A visual and behavioral state applied to a button instance.

**Fields**:

- `name`: State identifier such as `default`, `hover`, `pressed`, `focus`, `disabled`, or `loading`
- `interaction_allowed`: Whether user activation is permitted
- `visual_delta`: What visibly changes from the default presentation
- `announced_meaning`: User-facing meaning conveyed by the state
- `precedence_order`: Resolution order when multiple states compete

**Validation Rules**:

- `disabled` and `loading` MUST set `interaction_allowed` to false.
- `focus` MUST remain distinguishable without relying on hover or pressed visuals.
- State precedence MUST define how loading overrides hover and pressed when both could apply.

## Entity: ButtonSlot

**Description**: A content region inside the button.

**Fields**:

- `name`: Slot identifier such as `label`, `leading-icon`, or `trailing-icon`
- `required`: Whether the slot is mandatory
- `content_type`: Expected content kind
- `visibility_rules`: Conditions when the slot may appear
- `notes`: Guidance for composition or misuse avoidance

**Validation Rules**:

- `label` MUST be required for the base button contract.
- Icon slots MUST be optional and MUST NOT replace the required label slot.
- Slot names MUST align with implementation and documentation names.

## Entity: ButtonTokenMapping

**Description**: A component-token contract that maps button roles to semantic
token consumption.

**Fields**:

- `variant_name`: Associated `ButtonVariant`
- `size_name`: Associated `ButtonSize` when dimensional values differ
- `state_name`: Associated `ButtonState`
- `background_ref`: Semantic or component-token reference for background
- `foreground_ref`: Semantic or component-token reference for text/icon color
- `border_ref`: Semantic or component-token reference for outline treatment
- `focus_ref`: Semantic or component-token reference for focus indication
- `dimension_refs`: Padding, gap, radius, and height references

**Validation Rules**:

- All visual references MUST ultimately resolve through the token hierarchy.
- No mapping MAY point directly to raw palette tokens.
- Every supported variant and state combination MUST have a documented token path.

## Entity: ButtonDocumentationEntry

**Description**: Contributor-facing guidance for a button rule, example, or anti-pattern.

**Fields**:

- `topic`: Subject area such as anatomy, variants, states, accessibility, or misuse
- `audience`: Designer, engineer, reviewer, or cross-functional
- `guidance`: Primary explanation in Korean
- `do_examples`: Approved usage patterns
- `dont_examples`: Rejected usage patterns

**Validation Rules**:

- Guidance MUST explain intent before implementation detail.
- At least one entry MUST exist for variants, states, accessibility, and misuse patterns.

## Relationships

- `ButtonSpec` owns many `ButtonVariant`, `ButtonSize`, `ButtonState`, and `ButtonSlot` records.
- Each `ButtonVariant` consumes one or more `ButtonTokenMapping` records.
- `ButtonSize` and `ButtonState` refine how token mappings are applied.
- `ButtonDocumentationEntry` explains one or more rules defined in `ButtonSpec`.
- Downstream platform implementations translate `ButtonSpec` and `ButtonTokenMapping`
  without renaming the shared contract.
