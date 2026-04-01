# Tasks: Breadcrumb Platform Expansion

**Feature Branch**: `008-breadcrumb-platform-expand`
**Created**: 2026-03-31
**Plan**: [plan.md](plan.md)

---

## Phase 1: Setup

**Goal**: Generate platform-specific breadcrumb tokens and verify the token pipeline produces correct outputs for all three native platforms.

- [x] T001 [P] Generate SwiftUI breadcrumb tokens by running `node packages/tokens/scripts/build-platform-tokens.mjs --platform swiftui --sync-consumer-root packages/swiftui --sync-subdir .generated` producing `packages/swiftui/.generated/ZDSBreadcrumbTokens.swift`
- [x] T002 [P] Generate Kotlin breadcrumb tokens by running `node packages/tokens/scripts/build-platform-tokens.mjs --platform kotlin --sync-consumer-root packages/kotlin --sync-subdir .generated` producing `packages/kotlin/.generated/ZDSBreadcrumbTokens.kt`
- [x] T003 [P] Generate Windows breadcrumb tokens by running `node packages/tokens/scripts/build-platform-tokens.mjs --platform windows --sync-consumer-root packages/windows --sync-subdir .generated` producing `packages/windows/.generated/BreadcrumbTokens.xaml`
- [x] T004 Verify all three generated token files contain breadcrumb layout tokens (itemGap, separatorGap, wrapGap, paddingY), typography tokens (itemLabel, summaryLabel), and item role color tokens (ancestor, current, collapsed-summary, separator)

---

## Phase 2: Foundational

**Goal**: Create shared overflow collapse algorithm documentation and accessibility checklist templates that all three platform implementations will reference. Verify generated tokens against the shared token source.

- [x] T005 Verify generated token files in `.generated/` match `packages/tokens/data/components/breadcrumb.json` source-of-truth — run `node packages/tokens/scripts/build-platform-tokens.mjs --validate-consumer` per platform
- [x] T006 Create manual accessibility checklist for SwiftUI in `testing/accessibility/breadcrumb-accessibility-checklist-swiftui.md` covering VoiceOver navigation landmark, ancestor focusability, current-page announcement, decorative separators, and collapsed summary
- [x] T007 [P] Create manual accessibility checklist for Kotlin in `testing/accessibility/breadcrumb-accessibility-checklist-kotlin.md` covering TalkBack semantics, ancestor clickability, current-page role, separator clearing, and collapsed summary
- [x] T008 [P] Create manual accessibility checklist for Windows in `testing/accessibility/breadcrumb-accessibility-checklist-windows.md` covering Narrator landmark type, ancestor HyperlinkButton, current TextBlock, separator accessibility view, and collapsed summary

**Checkpoint**: Token pipeline validated. Accessibility checklists ready for each platform.

---

## Phase 3: User Story 1 - Navigate hierarchy via native breadcrumb (iOS) (Priority: P1) 🎯 MVP

**Goal**: Implement the SwiftUI breadcrumb component that renders a hierarchy trail, supports ancestor tap navigation via `onNavigate` callback, displays the current page as non-interactive text, and uses decorative chevron separators.

**Independent Test**: Navigate a 4-level deep hierarchy in a SwiftUI Preview or simulator. Tap the second ancestor and verify navigation. Verify the final item is non-interactive text.

### Implementation for User Story 1

- [x] T009 [US1] Create `packages/swiftui/components/Breadcrumb.swift` implementing `ZDSBreadcrumb` view with: item model (`ZDSBreadcrumbItem` with label, onNavigate callback, navigationId), overflow collapse function, HStack layout with ForEach rendering ancestor items as Button (with `onNavigate` callback), current item as Text with fontWeight emphasis, collapsed summary as Text("..."), and chevron.right SF Symbol separators between items
- [x] T010 [US1] Add navigation landmark accessibility in `packages/swiftui/components/Breadcrumb.swift` — wrap breadcrumb in a Group with `.accessibilityElement(children: .contain)` and `.accessibilityAddTraits(.isNavigationMarker)`, set `.accessibilityHidden(true)` on separators, set `.accessibilityLabel` on collapsed summary, and announce current item distinctly from ancestors
- [x] T011 [US1] Apply generated breadcrumb tokens from `ZDSGeneratedBreadcrumbTokens` in `packages/swiftui/components/Breadcrumb.swift` for item gap spacing, separator gap, typography (itemLabel font), and per-role colors (ancestor foreground/interactive/focus, current emphasis, collapsed-summary foreground, separator foreground) with dark mode support via `@Environment(\.colorScheme)`
- [x] T012 [US1] Implement collapse-middle overflow logic in `packages/swiftui/components/Breadcrumb.swift` — add `collapseBreadcrumbItems` function matching React algorithm: when item count exceeds `maxVisibleItems` (>= 4), return [first, CollapsedSummary("..."), last (maxVisibleItems-2) items]; otherwise return all items
- [x] T013 [US1] Verify SwiftUI breadcrumb in Preview with test cases: 1-item path (no separators), 4-item path (all visible), 8-item path with maxVisibleItems=5 (first + "..." + last 3), verify ancestor tap invokes `onNavigate` callback, verify dark mode colors match token variants, and verify RTL layout follows platform defaults

**Checkpoint**: SwiftUI breadcrumb renders hierarchy, supports ancestor navigation via callback, shows current item as non-interactive, handles overflow collapse, and has accessibility landmarks.

---

## Phase 4: User Story 2 - Navigate hierarchy via native breadcrumb (Android) (Priority: P1)

**Goal**: Implement the Kotlin/Compose breadcrumb component with the same semantics as SwiftUI — ancestor navigation via callback, non-interactive current item, decorative separators, and collapse-middle overflow.

**Independent Test**: Navigate a 4-level deep hierarchy in a Compose Preview or emulator. Tap the second ancestor and verify navigation. Verify the final item is non-interactive text with distinct styling.

### Implementation for User Story 2

- [x] T014 [US2] Create `packages/kotlin/components/Breadcrumb.kt` implementing `ZDSBreadcrumbItem` data class (label, onNavigate lambda, navigationId), `ZDSBreadcrumbModel` (items, maxVisibleItems, ariaLabel), `ZDSBreadcrumbStyle` data class for resolved tokens, and `zdsBreadcrumb` composable function using Row with forEach rendering ancestors as ClickableText, current item as Text with fontWeight emphasis, collapsed summary as Text("..."), and Compose Icon (chevron right) separators
- [x] T015 [US2] Add accessibility semantics in `packages/kotlin/components/Breadcrumb.kt` — add `semantics` modifier with contentDescription for the breadcrumb container, `Role.Button` for ancestors, `Role.Text` for current item, `clearAndSetSemantics { }` on separators to hide from TalkBack, and descriptive label on collapsed summary
- [x] T016 [US2] Apply generated breadcrumb tokens from `ZDSBreadcrumbTokens` in `packages/kotlin/components/Breadcrumb.kt` for layout spacing (itemGap, separatorGap), typography (itemLabel), and per-role colors (ancestor foreground/interactiveForeground/focus, current emphasis, collapsed-summary foreground, separator foreground) with light/dark hex variants
- [x] T017 [US2] Implement collapse-middle overflow logic in `packages/kotlin/components/Breadcrumb.kt` — add `collapseBreadcrumbItems` function matching React algorithm: when item count exceeds `maxVisibleItems` (>= 4), return [first, CollapsedSummary("..."), last (maxVisibleItems-2) items]; otherwise return all items
- [x] T018 [US2] Verify Kotlin breadcrumb in Compose Preview with test cases: 1-item path (no separators), 4-item path (all visible), 8-item path with maxVisibleItems=5 (first + "..." + last 3), verify ancestor tap invokes `onNavigate` callback, verify dark mode colors match token variants, and verify RTL layout follows platform defaults

**Checkpoint**: Kotlin/Compose breadcrumb renders hierarchy, supports ancestor navigation via callback, shows current item as non-interactive, handles overflow collapse, and has accessibility semantics.

---

## Phase 5: User Story 3 - Navigate hierarchy via native breadcrumb (Windows) (Priority: P1)

**Goal**: Implement the WinUI 3 breadcrumb component with ancestor click navigation, non-interactive current item, decorative chevron separators, and collapse-middle overflow.

**Independent Test**: Navigate a multi-level settings hierarchy in a WinUI Preview or desktop app. Click an ancestor and verify navigation. Verify the final item is non-interactive text.

### Implementation for User Story 3

- [x] T019 [US3] Create `packages/windows/components/Breadcrumb.xaml` defining horizontal StackPanel layout with: HyperlinkButton elements for ancestor items (bound to onNavigate via Click event), TextBlock for current item (with bold font weight), TextBlock for collapsed summary ("..."), and FontIcon (chevron right) separators between items; merge `BreadcrumbTokens.xaml` resource dictionary
- [x] T020 [US3] Create `packages/windows/components/Breadcrumb.xaml.cs` code-behind with: dependency properties (Items as ObservableCollection, MaxVisibleItems, AriaLabel), `CollapseBreadcrumbItems` method matching React algorithm, `ApplyGeneratedTokens` method resolving tokens from resource dictionary, and Click handler that invokes the item's onNavigate callback
- [x] T021 [US3] Add accessibility in `packages/windows/components/Breadcrumb.xaml` and `Breadcrumb.xaml.cs` — set `AutomationProperties.LandmarkType="Navigation"` on container, `AutomationProperties.Name` on ancestor HyperlinkButton elements, `AutomationProperties.HelpText="Current page"` on current TextBlock, `AutomationProperties.AccessibilityView="Raw"` on separator icons, and `AutomationProperties.Name="Collapsed breadcrumb path"` on collapsed summary
- [x] T022 [US3] Apply generated breadcrumb tokens from `BreadcrumbTokens.xaml` in `packages/windows/components/Breadcrumb.xaml.cs` via `ApplyGeneratedTokens` method — resolve layout spacing (itemGap, separatorGap), typography (itemLabel font size), and per-role colors (ancestor foreground/interactive/focus, current emphasis, collapsed-summary foreground, separator foreground)
- [x] T023 [US3] Verify Windows breadcrumb with test cases: 1-item path (no separators), 4-item path (all visible), 8-item path with maxVisibleItems=5 (first + "..." + last 3), verify ancestor click invokes onNavigate callback, verify dark mode colors match token variants, and verify RTL layout follows platform defaults

**Checkpoint**: WinUI breadcrumb renders hierarchy, supports ancestor navigation via callback, shows current item as non-interactive, handles overflow collapse, and has accessibility landmarks.

---

## Phase 6: User Story 4 - Accessibility across all platforms (Priority: P2)

**Goal**: Complete manual accessibility verification across all three platforms using the checklists created in Phase 2. Fix any issues discovered during verification.

**Independent Test**: Enable each platform's screen reader (VoiceOver, TalkBack, Narrator) and complete a full breadcrumb navigation task without external help.

### Implementation for User Story 4

- [ ] T024 [US4] Execute manual SwiftUI accessibility checklist from `testing/accessibility/breadcrumb-accessibility-checklist-swiftui.md` in VoiceOver — verify navigation landmark announcement, ancestor focusability and link role, current page distinct announcement, separator hidden, and collapsed summary label
- [ ] T025 [P] [US4] Execute manual Kotlin accessibility checklist from `testing/accessibility/breadcrumb-accessibility-checklist-kotlin.md` in TalkBack — verify breadcrumb semantics traversal, ancestor clickability announcement, current item text role, separator hidden from TalkBack, and collapsed summary announcement
- [ ] T026 [P] [US4] Execute manual Windows accessibility checklist from `testing/accessibility/breadcrumb-accessibility-checklist-windows.md` in Narrator — verify navigation landmark detection, ancestor HyperlinkButton announcement, current page TextBlock indication, separator hidden from UIA tree, and collapsed summary announcement
- [x] T027 [US4] Fix any accessibility issues discovered during manual verification in the respective platform component files (`Breadcrumb.swift`, `Breadcrumb.kt`, `Breadcrumb.xaml`/`Breadcrumb.xaml.cs`)

**Checkpoint**: All three platforms pass manual accessibility verification with their respective screen readers.

---

## Phase 7: User Story 5 - Overflow and long paths (Priority: P2)

**Goal**: Verify and refine the collapse-middle overflow behavior across all platforms for consistency with the React reference implementation. Handle edge cases: single-item paths, exact threshold, and very deep hierarchies.

**Independent Test**: Render breadcrumbs with 1, 3, 4, 5, 8, and 10 items on each platform. Verify collapse activates at the correct threshold and produces identical visible item counts.

### Implementation for User Story 5

- [x] T028 [US5] Verify overflow consistency across all three platforms by testing with item counts 1, 3, 4, 5, 8, and 10 with maxVisibleItems=5 — confirm: 1-5 items render fully, 8 items show [first + "..." + last 3], 10 items show [first + "..." + last 3], single-item paths render without separators
- [x] T029 [US5] Verify edge case: empty items array throws/returns error on each platform (matching React behavior of throwing "ZDS Breadcrumb requires at least one item")
- [x] T030 [US5] Verify edge case: collapsed summary is non-interactive (no tap/click response) on all three platforms
- [x] T031 [US5] Verify edge case: very long labels that exceed available width — confirm items truncate gracefully with ellipsis without breaking layout on all platforms
- [x] T032 [US5] Fix any overflow or edge case inconsistencies discovered across platforms in respective component files

**Checkpoint**: All platforms produce identical overflow behavior for all item counts and edge cases.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Update parity metadata, documentation, and run final validation.

- [x] T033 [P] Update parity status in `spec/components/breadcrumb/breadcrumb.spec.json` — for each platform that has passed its verification (T013/T018/T023), change status from "not-started" to "ready" and set `remediationTarget` to "008-breadcrumb-platform-expand". Only update platforms with completed verification
- [x] T034 [P] Update parity status table in `apps/docs/content/components/breadcrumb.mdx` to show SwiftUI, Kotlin, and Windows as "ready"
- [x] T034a [P] Compare public API shape across all three platforms — verify `items`, `maxVisibleItems`, `ariaLabel/accessibilityLabel`, `onNavigate` callback exist with consistent semantics on SwiftUI (`ZDSBreadcrumb`), Kotlin (`ZDSBreadcrumb`), and Windows (`Breadcrumb`). Document any intentional platform-specific naming differences
- [x] T035 Run existing contract validation `testing/spec/validate-breadcrumb-spec.mjs` and verify it passes with updated parity metadata
- [x] T036 Validate parity metadata completeness — confirm no hidden divergence between platforms, all approved exceptions documented in `spec/components/breadcrumb/breadcrumb.spec.json`, and token consumption verified per platform

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion
- **US1 - iOS (Phase 3)**: Depends on Phase 2 — MVP
- **US2 - Android (Phase 4)**: Depends on Phase 2 — parallel with US1, US3
- **US3 - Windows (Phase 5)**: Depends on Phase 2 — parallel with US1, US2
- **US4 - Accessibility (Phase 6)**: Depends on Phases 3, 4, 5 completion
- **US5 - Overflow (Phase 7)**: Depends on Phases 3, 4, 5 completion — parallel with US4
- **Polish (Phase 8)**: Depends on all user stories

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 only — no cross-story dependency
- **US2 (P1)**: Depends on Phase 2 only — no cross-story dependency
- **US3 (P1)**: Depends on Phase 2 only — no cross-story dependency
- **US4 (P2)**: Depends on US1, US2, US3 (needs all platforms implemented to verify)
- **US5 (P2)**: Depends on US1, US2, US3 (needs all platforms implemented to verify)

### Within Each User Story

- Token application before rendering
- Component structure before accessibility
- Overflow logic before verification
- Verification before checkpoint

### Parallel Opportunities

- T001, T002, T003: Token generation for all 3 platforms (Phase 1)
- T006, T007, T008: Accessibility checklists for all 3 platforms (Phase 2)
- Phase 3 (US1), Phase 4 (US2), Phase 5 (US3): All three platform implementations
- T024, T025, T026: Accessibility verification for all 3 platforms (Phase 6)
- T033, T034: Parity metadata and docs updates (Phase 8)

---

## Parallel Example: Platform Implementation

```bash
# After Phase 2 completes, launch all three platform implementations in parallel:
Developer A: "Implement SwiftUI Breadcrumb.swift (US1, T009-T013)"
Developer B: "Implement Kotlin Breadcrumb.kt (US2, T014-T018)"
Developer C: "Implement Windows Breadcrumb.xaml + .xaml.cs (US3, T019-T023)"

# After all platforms complete, launch accessibility verification in parallel:
Task: "Execute VoiceOver checklist for SwiftUI (T024)"
Task: "Execute TalkBack checklist for Kotlin (T025)"
Task: "Execute Narrator checklist for Windows (T026)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (token generation)
2. Complete Phase 2: Foundational (token validation + accessibility checklists)
3. Complete Phase 3: SwiftUI Breadcrumb (US1)
4. **STOP and VALIDATE**: Test iOS breadcrumb independently
5. Demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (SwiftUI) → Test independently → MVP Demo
3. Add US2 (Kotlin) → Test independently → Android Demo
4. Add US3 (Windows) → Test independently → Windows Demo
5. Add US4 (Accessibility) → Cross-platform verification
6. Add US5 (Overflow) → Edge case consistency
7. Polish → Parity metadata + docs

### Parallel Team Strategy

With three developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (SwiftUI)
   - Developer B: US2 (Kotlin)
   - Developer C: US3 (Windows)
3. All three complete independently, then converge on US4 + US5

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- React breadcrumb is the authoritative reference — match its overflow algorithm exactly
