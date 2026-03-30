# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`  
**Created**: [DATE]  
**Status**: Draft  
**Input**: User description: "$ARGUMENTS"

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

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently - e.g., "Can be fully tested by [specific action] and delivers [specific value]"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- What happens when a target platform cannot express the shared contract exactly?
- How is a tokenized visual decision handled when a platform-native API exposes
  only approximate values?
- What happens when an existing `.pen` artifact, token mapping, and implementation
  disagree?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST define or update the JSON spec before implementation.
- **FR-002**: System MUST define token usage and mapping for every reusable visual
  decision in scope.
- **FR-003**: System MUST provide or update a `.pen` artifact for every visual
  component or pattern in scope.
- **FR-004**: System MUST define expected parity behavior across affected
  platforms, including documented exceptions.
- **FR-005**: System MUST define required documentation and test coverage before
  release.

*Example of marking unclear requirements:*

- **FR-006**: System MUST support [NEEDS CLARIFICATION: exact variants, states, or
  slots not specified]
- **FR-007**: System MUST document [NEEDS CLARIFICATION: allowed platform
  exceptions or parity limitations not specified]

### Key Entities *(include if feature involves data)*

- **Component Contract**: Spec-defined component or pattern API, including
  variants, states, slots, accessibility, and parity metadata.
- **Token Mapping**: Relationship between semantic or component tokens and the
  contract states they drive.
- **Parity Record**: Per-platform status of contract support, exceptions, and
  remediation target.

## Artifact Impact *(mandatory)*

- **Spec**: [new / update / none]
- **Tokens**: [new / update / none]
- **.pen**: [new / update / none]
- **Docs**: [new / update / none]
- **Implementations**: [list affected platforms]
- **Tests**: [list required validation types]

## Platform Parity *(mandatory)*

- **Shared Intent**: [what must remain equivalent across platforms]
- **Platform Differences**: [allowed native differences]
- **Documented Exceptions**: [none or list]
- **Tauri Strategy**: [reuse React artifacts / shell-only addition / N/A]

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Spec, token mapping, `.pen`, docs, implementation, and tests are all
  present for the scoped change.
- **SC-002**: Parity status is recorded for every affected platform before
  release.
- **SC-003**: No scoped platform implementation uses undocumented hard-coded
  reusable visual values.
- **SC-004**: Visual regression and accessibility checks pass for all required
  surfaces in scope.

## Assumptions

- This repository is a design-system monorepo and excludes product runtime logic.
- Platforms not listed in `Implementations` are out of scope for this feature.
- Tauri inherits the React design language unless shell-only behavior is required.
- Any undocumented exception discovered during implementation blocks release until
  recorded.
