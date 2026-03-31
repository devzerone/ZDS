# Tasks: 버튼 플랫폼 확장

**Input**: Design documents from `/specs/005-button-platform-parity/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Validation**: Validation tasks are REQUIRED because this feature changes shared contracts, token interpretation, visual baselines, platform implementations, docs surfaces, and parity review behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the feature scaffolds and package entry points needed for cross-platform button parity work

- [X] T001 Confirm the parity feature path map in `spec/components/button/button.spec.json`, `packages/tokens/data/components/button.json`, `pen/components/button/button.pen`, `packages/react/src/components/button/`, `packages/react/src/primitives/button/`, `packages/swiftui/components/`, `packages/kotlin/components/`, `packages/windows/components/`, `apps/docs/content/components/button.mdx`, `apps/docs/app/components/button/page.tsx`, and `testing/`
- [X] T002 Create button parity scaffold files in `packages/swiftui/components/Button.swift`, `packages/kotlin/components/Button.kt`, `packages/windows/components/Button.xaml`, and `packages/windows/components/Button.xaml.cs`
- [X] T003 [P] Create parity validation scaffold updates in `testing/spec/validate-button-spec.mjs`, `testing/docs/validate-docs-system.mjs`, `testing/accessibility/button-accessibility-checklist.md`, and `testing/visual/button-visual-checklist.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared parity contract, token guidance, visual baseline expectations, and validation wiring before any user story work

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Update the shared button parity schema, platform profile skeleton, and known platform exception skeleton in `spec/components/button/button.spec.json`
- [X] T005 Update shared button token guidance for cross-platform consumption in `packages/tokens/data/components/button.json`
- [X] T006 [P] Add parity baseline annotations and review areas to `pen/components/button/button.pen`
- [X] T007 [P] Extend button spec validation for platform profiles, readiness states, and exception completeness in `testing/spec/validate-button-spec.mjs`
- [X] T008 [P] Extend docs validation plumbing for parity status consistency in `testing/docs/validate-docs-system.mjs` and `testing/docs/validate-docs-build.mjs`

**Checkpoint**: Foundation ready - user story implementation can now begin in priority order or in parallel if staffed

---

## Phase 3: User Story 1 - 플랫폼별 동일 의미 전달 (Priority: P1) 🎯 MVP

**Goal**: Deliver a shared button contract and first platform-owned implementations that preserve the same variant, size, state, and label semantics beyond React

**Independent Test**: Reviewers can compare the shared contract with React, SwiftUI, Kotlin, and Windows button artifacts and confirm that the same variant, size, state, and label rules are preserved without platform-local renaming

### Validation for User Story 1 ⚠️

- [X] T009 [P] [US1] Add validation coverage for shared variant, size, and state naming parity in `testing/spec/validate-button-spec.mjs`
- [X] T010 [P] [US1] Add platform-facing button behavior checks or platform checklist coverage for `primary`, `secondary`, `tertiary`, `destructive`, `small`, `medium`, `large`, `default`, `focus`, `disabled`, `loading`, loading lock, and disabled discoverability in `packages/react/src/components/button/Button.test.tsx`, `packages/swiftui/components/Button.swift`, `packages/kotlin/components/Button.kt`, `packages/windows/components/Button.xaml`, and `packages/windows/components/Button.xaml.cs`
- [X] T011 [P] [US1] Add accessibility review coverage for label-required, loading lock, and disabled discoverability parity in `testing/accessibility/button-accessibility-checklist.md`

### Implementation for User Story 1

- [X] T012 [US1] Update `spec/components/button/button.spec.json` with required cross-platform variant, size, state, slot, and accessibility parity expectations
- [X] T013 [US1] Update cross-platform button token meaning and platform consumption notes in `packages/tokens/data/components/button.json`
- [X] T014 [US1] Align the React public button API with the shared parity contract in `packages/react/src/components/button/Button.tsx` and `packages/react/src/components/button/index.ts`
- [X] T015 [US1] Align low-level React button behavior with the shared parity contract in `packages/react/src/primitives/button/PrimitiveButton.tsx` and `packages/react/src/primitives/button/index.ts`
- [X] T016 [P] [US1] Implement the SwiftUI button in `packages/swiftui/components/Button.swift` with shared `primary`/`secondary`/`tertiary`/`destructive`, `small`/`medium`/`large`, `default`/`focus`/`disabled`/`loading`, label-required, loading lock, and disabled discoverability behavior
- [X] T017 [P] [US1] Implement the Kotlin button in `packages/kotlin/components/Button.kt` with shared `primary`/`secondary`/`tertiary`/`destructive`, `small`/`medium`/`large`, `default`/`focus`/`disabled`/`loading`, label-required, loading lock, and disabled discoverability behavior
- [X] T018 [P] [US1] Implement the WinUI 3 button in `packages/windows/components/Button.xaml` and `packages/windows/components/Button.xaml.cs` with shared `primary`/`secondary`/`tertiary`/`destructive`, `small`/`medium`/`large`, `default`/`focus`/`disabled`/`loading`, label-required, loading lock, and disabled discoverability behavior
- [X] T019 [US1] Update the shared visual baseline for cross-platform meaning comparison in `pen/components/button/button.pen`
- [X] T020 [US1] Verify User Story 1 independently with the required validation commands covering `testing/spec/validate-button-spec.mjs`, package-level button tests, and platform artifact review

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 플랫폼별 사용 가능 상태 추적 (Priority: P2)

**Goal**: Expose platform readiness, gaps, owners, and approved exceptions clearly through the shared contract and official docs surfaces

**Independent Test**: Reviewers can read the button contract and docs surfaces and explain the readiness level, remaining gaps, and approved exceptions for React, SwiftUI, Kotlin, and Windows without inspecting implementation source

### Validation for User Story 2 ⚠️

- [X] T021 [P] [US2] Add validation for parity readiness fields, owner metadata, and remediation targets in `testing/spec/validate-button-spec.mjs`
- [X] T022 [P] [US2] Add documentation parity consistency checks in `testing/docs/validate-docs-system.mjs` and `testing/docs/validate-preview-links.mjs`

### Implementation for User Story 2

- [X] T023 [US2] Update platform readiness profiles, gap summaries, owners, and remediation targets in `spec/components/button/button.spec.json`
- [X] T024 [US2] Document platform support status, approved exceptions, and review guidance in `apps/docs/content/components/button.mdx` and `apps/docs/app/components/button/page.tsx`
- [X] T026 [US2] Add parity-oriented annotation or comparison frames for platform readiness review in `pen/components/button/button.pen`
- [X] T027 [US2] Verify User Story 2 independently with the required validation commands covering `testing/spec/validate-button-spec.mjs`, `testing/docs/validate-docs-system.mjs`, and `testing/docs/validate-preview-links.mjs`

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently

---

## Phase 5: User Story 3 - 공통 검증 흐름으로 회귀 방지 (Priority: P3)

**Goal**: Make parity drift visible through repeatable validation and review artifacts so platform support cannot silently diverge from the shared contract

**Independent Test**: Reviewers can intentionally compare incomplete or changed platform support against the shared contract and see the mismatch called out in validation or review artifacts

### Validation for User Story 3 ⚠️

- [X] T028 [P] [US3] Extend spec validation to detect missing platform states, unsupported variants, and undocumented exceptions in `testing/spec/validate-button-spec.mjs`
- [X] T029 [P] [US3] Extend visual and accessibility review criteria for cross-platform state and exception comparison in `testing/visual/button-visual-checklist.md` and `testing/accessibility/button-accessibility-checklist.md`
- [X] T030 [P] [US3] Add docs/build verification for parity review content and source references in `testing/docs/validate-docs-build.mjs`

### Implementation for User Story 3

- [X] T031 [US3] Refine the shared contract with explicit exception records and state expectation notes that support automated parity checks in `spec/components/button/button.spec.json`
- [X] T032 [US3] Update platform implementation review notes alongside `packages/swiftui/components/Button.swift`, `packages/kotlin/components/Button.kt`, `packages/windows/components/Button.xaml`, and `packages/windows/components/Button.xaml.cs` so validation evidence maps to the shared contract
- [X] T033 [US3] Update the official button docs with parity review workflow and exception interpretation guidance in `apps/docs/content/components/button.mdx`
- [X] T034 [US3] Verify User Story 3 independently with the required validation commands covering `testing/spec/validate-button-spec.mjs`, `testing/docs/validate-docs-build.mjs`, `testing/accessibility/button-accessibility-checklist.md`, and `testing/visual/button-visual-checklist.md`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final alignment, cleanup, and full validation across all stories

- [X] T035 [P] Finalize any package export or workspace script updates needed for cross-platform button parity in `package.json`, `packages/react/package.json`, and other relevant package manifests under `packages/`
- [X] T036 [P] Perform final docs alignment for parity terminology in `apps/docs/content/components/button.mdx` and `apps/docs/app/components/button/page.tsx`
- [X] T037 Validate final parity metadata completeness and artifact synchronization across `spec/components/button/button.spec.json`, `packages/tokens/data/components/button.json`, `pen/components/button/button.pen`, `packages/react/src/components/button/`, `packages/swiftui/components/`, `packages/kotlin/components/`, `packages/windows/components/`, `apps/docs/`, and `testing/`
- [X] T038 Run the required validation commands from the quickstart flow for the full feature across `testing/spec/`, `testing/docs/`, `testing/accessibility/`, `testing/visual/`, and package-level button tests

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational and defines the MVP parity slice
- **User Story 2 (P2)**: Starts after Foundational and depends on US1 artifacts existing enough to describe real platform readiness
- **User Story 3 (P3)**: Starts after Foundational and is strongest after US1 and US2 have established platform surfaces and readiness metadata

### Within Each User Story

- Validation tasks should be implemented before or alongside story implementation and must pass before the story is complete
- Shared contract and token updates come before downstream platform or docs updates
- Platform implementation updates come before final visual/doc parity alignment for the same story
- Story-specific verification must pass before advancing to the next checkpoint

### Parallel Opportunities

- `T003` can run in parallel with `T001` and `T002`
- In Phase 2, `T006`, `T007`, and `T008` can run in parallel after `T004` and `T005` define the shared parity structure
- In US1, `T009`, `T010`, and `T011` can run in parallel, and `T016`, `T017`, and `T018` can run in parallel once the shared contract is updated
- In US2, `T021` and `T022` can run in parallel, and docs prose can proceed separately from pen parity annotation when files do not overlap
- In US3, `T028`, `T029`, and `T030` can run in parallel on separate validation files
- Shared files such as `spec/components/button/button.spec.json`, `packages/tokens/data/components/button.json`, `pen/components/button/button.pen`, and `apps/docs/content/components/button.mdx` should be edited in priority order rather than true parallel execution

---

## Parallel Example: User Story 1

```bash
# Launch User Story 1 validation work together:
Task: "Add validation coverage for shared variant, size, and state naming parity in testing/spec/validate-button-spec.mjs"
Task: "Add platform-facing button behavior checks or platform checklist coverage in packages/react/src/components/button/Button.test.tsx, packages/swiftui/components/, packages/kotlin/components/, and packages/windows/components/"
Task: "Add accessibility review coverage for label-required, loading lock, and disabled discoverability parity in testing/accessibility/button-accessibility-checklist.md"

# Launch platform implementation work together after shared contract updates:
Task: "Implement the first SwiftUI button surface in packages/swiftui/components/"
Task: "Implement the first Kotlin button surface in packages/kotlin/components/"
Task: "Implement the first Windows button surface in packages/windows/components/"
```

---

## Parallel Example: User Story 2

```bash
# Launch User Story 2 validation work together:
Task: "Add validation for parity readiness fields, owner metadata, and remediation targets in testing/spec/validate-button-spec.mjs"
Task: "Add documentation parity consistency checks in testing/docs/validate-docs-system.mjs and testing/docs/validate-preview-links.mjs"

# Launch user-facing parity communication work on separate files:
Task: "Document platform support status in apps/docs/content/components/button.mdx and apps/docs/app/components/button/page.tsx"
Task: "Add parity-oriented annotation or comparison frames in pen/components/button/button.pen"
```

---

## Parallel Example: User Story 3

```bash
# Launch User Story 3 validation work together:
Task: "Extend spec validation to detect missing platform states, unsupported variants, and undocumented exceptions in testing/spec/validate-button-spec.mjs"
Task: "Extend visual and accessibility review criteria in testing/visual/button-visual-checklist.md and testing/accessibility/button-accessibility-checklist.md"
Task: "Add docs/build verification for parity review content in testing/docs/validate-docs-build.mjs"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate shared parity semantics across React and the first native platform surfaces
5. Stop for review if the team wants an MVP parity slice

### Incremental Delivery

1. Complete Setup + Foundational to establish parity metadata and validation wiring
2. Add User Story 1 to deliver shared semantics and first platform surfaces
3. Add User Story 2 to expose readiness and exceptions clearly in user-facing docs
4. Add User Story 3 to harden drift detection and repeatable parity review
5. Finish with final validation and cross-cutting cleanup

### Parallel Team Strategy

1. One contributor owns shared-file foundation work in `spec/`, `packages/tokens/`, and `pen/`
2. After Foundational completion:
   Developer A: React parity alignment and shared-file edits for US1
   Developer B: SwiftUI and Windows platform surfaces for US1
   Developer C: Kotlin platform surface plus docs/validation preparation for US2 and US3
3. Merge shared-file work in priority order to reduce conflicts and preserve a releasable MVP slice

---

## Notes

- [P] tasks = different files or low-conflict parallel work
- [Story] label maps each story task back to a specific user story
- Each user story remains independently reviewable at its checkpoint
- Validation coverage is mandatory because this feature changes contracts, docs, visuals, and platform behavior
- Avoid silent platform divergence by keeping parity metadata and validation in the same delivery slice as implementation
