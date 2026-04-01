# Feature Specification: Breadcrumb Platform Expansion

**Feature Branch**: `008-breadcrumb-platform-expand`
**Created**: 2026-03-31
**Status**: Draft
**Input**: User description: "브레드크럼프 플랫폼 별로 확장"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navigate hierarchy via native breadcrumb (iOS) (Priority: P1)

An iOS app user views a deeply nested screen (e.g., product detail within a category) and sees a breadcrumb trail at the top. The user taps an ancestor step to navigate back to that level, and sees the current screen label rendered as non-interactive text at the end of the trail.

**Why this priority**: iOS is a primary mobile platform and establishing the first native breadcrumb implementation validates the shared contract translates cleanly to a mobile navigation paradigm.

**Independent Test**: Can be fully tested by navigating a 4-level deep hierarchy in a SwiftUI preview or simulator and verifying ancestor taps navigate correctly while the current step is non-interactive.

**Acceptance Scenarios**:

1. **Given** a 4-level breadcrumb path is displayed, **When** the user taps the second ancestor, **Then** the app navigates to that level and the breadcrumb updates to reflect the new hierarchy.
2. **Given** a breadcrumb trail is visible, **When** the user inspects the final item, **Then** it is displayed as non-interactive text with no tap target.
3. **Given** a breadcrumb trail with more than 5 items, **When** space is constrained, **Then** the middle items collapse into a single collapsed summary preserving the first and last two visible items.

---

### User Story 2 - Navigate hierarchy via native breadcrumb (Android) (Priority: P1)

An Android app user views a deeply nested screen and sees a breadcrumb trail at the top. The user taps an ancestor step to navigate back, and the current screen label appears as non-interactive text.

**Why this priority**: Android is co-equal with iOS as a primary mobile platform; both P1 stories validate the shared contract against two distinct UI frameworks simultaneously.

**Independent Test**: Can be fully tested by navigating a 4-level deep hierarchy in a Compose preview or emulator and verifying ancestor taps and current-item styling.

**Acceptance Scenarios**:

1. **Given** a 4-level breadcrumb path is displayed, **When** the user taps the second ancestor, **Then** the app navigates to that level and the breadcrumb updates to reflect the new hierarchy.
2. **Given** a breadcrumb trail is visible, **When** the user inspects the final item, **Then** it is displayed as non-interactive text with distinct visual styling from ancestor steps.
3. **Given** a breadcrumb trail exceeds the visible threshold, **When** rendered on a narrow screen, **Then** the collapse-middle strategy preserves the first item, a collapsed summary, and the last two visible items.

---

### User Story 3 - Navigate hierarchy via native breadcrumb (Windows) (Priority: P1)

A Windows desktop app user views a settings sub-page and sees a breadcrumb trail showing the navigation path. The user clicks an ancestor to navigate back to a parent section.

**Why this priority**: Windows is the designated desktop platform; implementing alongside mobile ensures all three deferred platforms are addressed in a single coordinated release.

**Independent Test**: Can be fully tested by navigating a multi-level settings hierarchy in a WinUI preview and verifying ancestor clicks and overflow behavior.

**Acceptance Scenarios**:

1. **Given** a multi-level breadcrumb path is displayed, **When** the user clicks an ancestor step, **Then** the app navigates to that section and the breadcrumb updates.
2. **Given** a breadcrumb trail is visible, **When** the user inspects the final item, **Then** it is displayed as non-interactive text.
3. **Given** a long breadcrumb trail in a narrow window, **When** the path exceeds the visible threshold, **Then** overflow collapses the middle items while preserving the first and last two items.

---

### User Story 4 - Accessibility across all platforms (Priority: P2)

A user relying on assistive technology (VoiceOver on iOS, TalkBack on Android, Narrator on Windows) navigates a breadcrumb trail. The user hears the hierarchy announced correctly, with the current page distinguished and separators treated as decorative.

**Why this priority**: Accessibility is a core contract requirement but depends on each platform's native rendering being correct first.

**Independent Test**: Can be fully tested by enabling each platform's screen reader and verifying that the breadcrumb navigation landmark, ancestor focusability, and current-page announcement meet the shared accessibility contract.

**Acceptance Scenarios**:

1. **Given** VoiceOver is active on iOS, **When** the user swipes through the breadcrumb, **Then** ancestor items are announced as navigation targets and the current page is announced as the current location.
2. **Given** TalkBack is active on Android, **When** the user swipes through the breadcrumb, **Then** separators are not focusable and do not interrupt the navigation flow.
3. **Given** Narrator is active on Windows, **When** the user navigates to the breadcrumb region, **Then** it is announced as a navigation landmark containing the hierarchy.

---

### User Story 5 - Overflow and long paths (Priority: P2)

A user encounters a breadcrumb with many hierarchy levels across any platform. The breadcrumb collapses the middle of the path to preserve readability and context.

**Why this priority**: Overflow is a critical usability concern for deep hierarchies but is secondary to the basic rendering and navigation functionality.

**Independent Test**: Can be fully tested by rendering a breadcrumb with 8+ items on each platform and verifying the collapse-middle strategy produces the expected visible items.

**Acceptance Scenarios**:

1. **Given** a breadcrumb with 8 items, **When** displayed on any platform, **Then** only the first item, a collapsed summary, and the last two items remain visible.
2. **Given** a single-step breadcrumb path, **When** displayed on any platform, **Then** it renders without redundant decoration or separators.
3. **Given** a breadcrumb with exactly 4 items (matching minVisibleItems), **When** displayed on any platform, **Then** all items remain visible without collapse.

---

### Edge Cases

- What happens when a breadcrumb receives only a single item (no ancestors)? → FR-009: renders without separators
- How does the breadcrumb behave when the path is empty or undefined? → FR-015: throws descriptive error
- What happens when the collapsed summary is tapped or clicked? → FR-006: non-interactive, no response
- How does the breadcrumb handle very long labels that exceed the available width? → Platform default text truncation with ellipsis
- What happens when the navigation target for an ancestor is not available (no route)? → Renders as non-interactive text (degraded but valid)
- How does the breadcrumb behave under dynamic locale or right-to-left text direction changes? → Follows platform default RTL behavior (assumption)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each native platform (SwiftUI, Kotlin/Compose, Windows/WinUI) MUST render a breadcrumb component following the shared semantics contract defined in `spec/components/breadcrumb/breadcrumb.spec.json`.
- **FR-002**: Ancestor items on each platform MUST be interactive navigation targets that invoke a per-item callback handler (`onNavigate`) to allow users to navigate to a previous hierarchy level. The breadcrumb component MUST NOT perform navigation directly — the consuming application handles routing.
- **FR-003**: The current-page item on each platform MUST be rendered as non-interactive text with distinct visual styling.
- **FR-004**: Separators on each platform MUST be decorative chevrons and MUST NOT be focusable or interactive.
- **FR-005**: Each platform MUST implement the collapse-middle overflow strategy preserving the first item, a collapsed summary, and the last two visible items when the path exceeds the configured threshold.
- **FR-006**: The collapsed summary on each platform MUST display the fixed label "..." and MUST NOT be localizable, overridable, or act as a dropdown trigger or expandable control.
- **FR-007**: Each platform MUST expose navigation landmark semantics through its native accessibility API (e.g., AccessibilityTraits on SwiftUI, Semantics on Compose, AutomationProperties on WinUI) so that assistive technologies identify the breadcrumb as a navigation region.
- **FR-008**: Each platform MUST distinguish the current page from ancestor items via native accessibility traits, roles, or properties so that assistive technologies announce it distinctly.
- **FR-014**: Accessibility compliance on each native platform MUST be verified through a platform-specific manual accessibility checklist (screen reader operation, landmark detection, focus order), not automated tooling alone.
- **FR-009**: Single-step breadcrumb paths MUST render without redundant separators or decoration on all platforms.
- **FR-010**: Each native implementation MUST consume the shared design tokens from `packages/tokens/data/components/breadcrumb.json` through its platform-specific generated token layer.
- **FR-011**: Platform parity status in `spec/components/breadcrumb/breadcrumb.spec.json` MUST be updated from "not-started" to "ready" for each completed platform.
- **FR-012**: Each platform implementation MUST follow the established component pattern used by the Button component on that platform (file structure, token consumption, export conventions).
- **FR-013**: Each platform MUST support configurable `maxVisibleItems` to control when overflow collapse activates.
- **FR-015**: The breadcrumb component MUST throw a descriptive error when the items array is empty or undefined. Single-item paths are valid and MUST render without separators.

## Artifact Impact & Parity *(mandatory)*

### Source-of-Truth Updates

- **Spec Artifacts**: `spec/components/breadcrumb/breadcrumb.spec.json` — update parity status for swiftui, kotlin, and windows from "not-started" to "ready"
- **Token / Foundation Artifacts**: `packages/tokens/data/components/breadcrumb.json` — already exists; native token generation pipelines must include breadcrumb tokens
- **Pencil Baselines**: None — existing `pen/components/breadcrumb/breadcrumb.pen` covers cross-platform visual reference

### Delivery Surface Updates

- **Implementation Packages**:
  - `packages/swiftui/components/Breadcrumb.swift` — new file
  - `packages/kotlin/components/Breadcrumb.kt` — new file
  - `packages/windows/components/Breadcrumb.xaml` — new file
  - `packages/windows/components/Breadcrumb.xaml.cs` — new file
- **Docs / Preview Surfaces**: `apps/docs/content/components/breadcrumb.mdx` — update parity status table
- **Validation Artifacts**: Platform-specific validation following the pattern established by `testing/spec/validate-breadcrumb-spec.mjs`; plus per-platform manual accessibility checklists under `testing/accessibility/`

### Platform Parity & Exceptions

- **Parity Impact**: Completes the deferred platform translations, moving all three native platforms from "not-started" to parity with the React reference implementation
- **Approved Exceptions**: None — all three platforms must fulfill the full shared semantics contract including overflow and accessibility
- **Parity Metadata Location**: `spec/components/breadcrumb/breadcrumb.spec.json` under the `parity` key
- **Primitive / Headless Strategy**: No Radix dependency; each native platform uses its own framework primitives (SwiftUI native views, Compose layout components, WinUI XAML controls) to satisfy the semantic contract

### Key Entities

- **Breadcrumb Item**: Represents a single step in the hierarchy. Has a label (required), an optional navigation target, and a role (ancestor, current, or collapsed-summary).
- **Breadcrumb Path**: An ordered collection of breadcrumb items from the root ancestor to the current page.
- **Overflow State**: The collapsed representation of a breadcrumb path when it exceeds the visible threshold, containing a collapsed-summary item in place of hidden middle items.
- **Platform Token Mapping**: The generated platform-specific token layer that translates shared design tokens into native framework values (Swift token constants, Compose token objects, WinUI XAML resources).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can navigate to any ancestor level in a 5-level deep hierarchy with a single tap/click on all three native platforms.
- **SC-002**: Each native breadcrumb renders correctly for paths ranging from 1 to 10 items without layout breakage or text truncation.
- **SC-003**: Users relying on VoiceOver, TalkBack, or Narrator can complete a full breadcrumb navigation task on the first attempt without external help.
- **SC-004**: All three native platform implementations pass the shared contract validation without parity gaps.
- **SC-005**: The overflow collapse activates consistently across all platforms when item count exceeds the configured threshold, producing identical visible item counts.
- **SC-006**: Component API consistency across platforms — developers familiar with the Button pattern on any platform can adopt the Breadcrumb with no additional learning curve beyond breadcrumb-specific props.

## Clarifications

### Session 2026-03-31

- Q: 네이티브 플랫폼에서 상위 항목 탭/클릭 시 탐색 트리거 방식 → A: 콜백 핸들러 — 소비 앱이 항목별로 `onNavigate` 콜백을 제공하고, 브레드크럼이 상위 항목 탭 시 이를 호출
- Q: 네이티브 플랫폼 브레드크럼 접근성 검증 방식 → A: 수동 접근성 체크리스트 — 각 플랫폼별 체크리스트 항목을 수동으로 검증 (스크린 리더 직접 조작)

## Assumptions

- The existing React breadcrumb implementation is the authoritative reference for behavior, overflow strategy, and accessibility semantics.
- Each native platform already has the foundational build tooling and token generation pipeline established by the Button component.
- The shared token file (`packages/tokens/data/components/breadcrumb.json`) contains all tokens needed by native platforms; no new tokens will be introduced.
- Navigation on native platforms is handled by the consuming application through explicit per-item callback handlers (`onNavigate`) rather than URL-based routing (unlike React's href model). When an ancestor item is tapped or clicked, the breadcrumb invokes the provided callback with the item's identity, and the consuming screen performs the actual navigation.
- The collapsed summary in v1 remains a non-interactive indicator, consistent with the shared contract — dropdown-based overflow recovery is explicitly out of scope.
- Right-to-left (RTL) layout support will follow each platform's default framework behavior without custom mirroring logic in v1.
- Each platform team owns its implementation but follows the same code review and validation process established during the Button component delivery.
