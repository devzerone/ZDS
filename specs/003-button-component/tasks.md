# Tasks: 버튼 컴포넌트

**Input**: Design documents from `/specs/003-button-component/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include executable validation, React behavior checks, accessibility review, and visual review tasks because the plan and constitution require tests before the component is releasable.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the shared artifact scaffolds and validation entry points for the button lifecycle

- [X] T001 Create button artifact scaffolds in `spec/components/button/button.spec.json`, `packages/foundation/tokens/components/button.json`, `pen/components/button/button.pen`, and `apps/docs/components/button.md`
- [X] T002 Create React button scaffold files in `packages/react/components/button/Button.tsx`, `packages/react/components/button/Button.test.tsx`, and `packages/react/components/button/index.ts`
- [X] T003 [P] Create validation scaffold files in `testing/spec/validate-button-spec.mjs`, `testing/accessibility/button-accessibility-checklist.md`, and `testing/visual/button-visual-checklist.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared contract, token namespace, and validation wiring required before any story-specific implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Define the base button JSON contract skeleton with shared slots, shared states, accessibility metadata, and parity placeholders in `spec/components/button/button.spec.json`
- [X] T005 Define the base button component-token skeleton for variant, size, state, and dimension namespaces in `packages/foundation/tokens/components/button.json`
- [X] T006 Extend token validation to recognize button component tokens in `testing/tokens/validate-tokens.mjs`
- [X] T007 Add button spec validation logic and package entry scripts in `testing/spec/validate-button-spec.mjs` and `package.json`

**Checkpoint**: Foundation ready - user story implementation can now begin in priority order or in parallel if staffed

---

## Phase 3: User Story 1 - 핵심 액션 버튼 사용 (Priority: P1) 🎯 MVP

**Goal**: Deliver a text-led core action button that is recognizable, consistently named, and independently testable

**Independent Test**: Reviewers can inspect the primary button contract, React implementation, docs, and validation outputs and confirm that a labeled core action button is visually consistent and usable on its own

### Tests for User Story 1

- [X] T008 [P] [US1] Add base contract coverage for label-required, primary variant, and medium size rules in `testing/spec/validate-button-spec.mjs`
- [X] T009 [P] [US1] Add core action interaction tests for labeled buttons in `packages/react/components/button/Button.test.tsx`
- [X] T010 [P] [US1] Add labeled primary-button accessibility checks in `testing/accessibility/button-accessibility-checklist.md`

### Implementation for User Story 1

- [X] T011 [P] [US1] Add `primary` variant and `medium` size definitions to `spec/components/button/button.spec.json`
- [X] T012 [P] [US1] Add `primary` default and disabled token mappings to `packages/foundation/tokens/components/button.json`
- [X] T013 [US1] Implement the text-led core button and public export in `packages/react/components/button/Button.tsx` and `packages/react/components/button/index.ts`
- [X] T014 [US1] Create the primary button anatomy and baseline visual board in `pen/components/button/button.pen`
- [X] T015 [US1] Document core action usage, anatomy, and naming guidance in `apps/docs/components/button.md`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 상황별 버튼 변형 선택 (Priority: P2)

**Goal**: Add variant hierarchy and size options so teams can choose the correct emphasis for different actions and layouts

**Independent Test**: Reviewers can compare primary, secondary, tertiary, and destructive buttons across small, medium, and large sizes and consistently choose the correct option for a given UI scenario

### Tests for User Story 2

- [X] T016 [P] [US2] Add variant and size contract coverage in `testing/spec/validate-button-spec.mjs`
- [X] T017 [P] [US2] Add React coverage for variant hierarchy and size rendering in `packages/react/components/button/Button.test.tsx`
- [X] T018 [P] [US2] Add visual review criteria for variant hierarchy and size comparisons in `testing/visual/button-visual-checklist.md`

### Implementation for User Story 2

- [X] T019 [P] [US2] Add `secondary`, `tertiary`, `destructive`, `small`, and `large` definitions to `spec/components/button/button.spec.json`
- [X] T020 [P] [US2] Add variant and size token mappings for emphasis, padding, typography, and destructive treatment to `packages/foundation/tokens/components/button.json`
- [X] T021 [US2] Expand React styling and size handling for variant hierarchy in `packages/react/components/button/Button.tsx`
- [X] T022 [US2] Expand the `.pen` board to show 4 variants across 3 sizes in `pen/components/button/button.pen`
- [X] T023 [US2] Document variant selection, size guidance, and repeated-primary misuse rules in `apps/docs/components/button.md`

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently

---

## Phase 5: User Story 3 - 상태와 보조 요소 대응 (Priority: P3)

**Goal**: Add loading, focus, disabled, and icon-support behavior so button state meaning remains clear in real product scenarios

**Independent Test**: Reviewers can compare active, disabled, loading, and icon-bearing buttons and correctly identify each state without extra explanation

### Tests for User Story 3

- [X] T024 [P] [US3] Add loading, focus, disabled, and icon slot contract coverage in `testing/spec/validate-button-spec.mjs`
- [X] T025 [P] [US3] Add React tests for loading lock, focus-visible treatment, disabled behavior, and leading/trailing icons in `packages/react/components/button/Button.test.tsx`
- [X] T026 [P] [US3] Add accessibility and visual review scenarios for focus, loading, disabled, and icon usage in `testing/accessibility/button-accessibility-checklist.md` and `testing/visual/button-visual-checklist.md`

### Implementation for User Story 3

- [X] T027 [P] [US3] Add loading precedence and icon slot rules to `spec/components/button/button.spec.json`
- [X] T028 [P] [US3] Add focus, loading, disabled, and icon-gap token mappings to `packages/foundation/tokens/components/button.json`
- [X] T029 [US3] Implement loading lock, focus-visible styling, and leading/trailing icon rendering in `packages/react/components/button/Button.tsx`
- [X] T030 [US3] Expand the `.pen` board with loading, disabled, focus, dark-surface, and icon examples in `pen/components/button/button.pen`
- [X] T031 [US3] Document state precedence, accessibility behavior, and icon usage boundaries in `apps/docs/components/button.md`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalize parity guidance, validation commands, and release readiness across all stories

- [X] T032 [P] Record parity status, platform gaps, owners, and remediation targets for React, SwiftUI, Kotlin, and Windows in `spec/components/button/button.spec.json` and `apps/docs/components/button.md`
- [X] T033 [P] Validate parity metadata against the implemented React surface and unresolved platform gaps in `testing/spec/validate-button-spec.mjs`
- [X] T034 [P] Wire button validation commands into the workspace scripts in `package.json`
- [X] T035 Run the full quickstart validation flow against `spec/components/button/button.spec.json`, `packages/foundation/tokens/components/button.json`, `pen/components/button/button.pen`, `apps/docs/components/button.md`, `packages/react/components/button/Button.tsx`, `testing/spec/validate-button-spec.mjs`, `testing/accessibility/button-accessibility-checklist.md`, and `testing/visual/button-visual-checklist.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational - defines the MVP core action button
- **User Story 2 (P2)**: Starts after Foundational - builds on shared contract and token infrastructure while remaining independently testable
- **User Story 3 (P3)**: Starts after Foundational - builds on shared contract and token infrastructure while remaining independently testable

### Within Each User Story

- Validation tasks should be implemented before or alongside the story implementation and must pass before the story is considered complete
- Contract and token updates come before React implementation
- React implementation comes before `.pen` and docs final alignment for the same story
- Story-specific docs and visual baselines must reflect the implemented contract before the story checkpoint is complete

### Parallel Opportunities

- `T003` can run in parallel with `T001` and `T002`
- In Phase 2, `T006` and `T007` can proceed in parallel after `T004` and `T005` begin defining the shared structures
- In each user story, validation checklist work marked `[P]` can run in parallel with contract/token authoring tasks on separate files
- Shared files such as `spec/components/button/button.spec.json`, `packages/foundation/tokens/components/button.json`, `packages/react/components/button/Button.tsx`, `pen/components/button/button.pen`, and `apps/docs/components/button.md` should be edited in priority order rather than true parallel execution

---

## Parallel Example: User Story 1

```bash
# Launch User Story 1 validation work together:
Task: "Add base contract coverage for label-required, primary variant, and medium size rules in testing/spec/validate-button-spec.mjs"
Task: "Add core action interaction tests for labeled buttons in packages/react/components/button/Button.test.tsx"
Task: "Add labeled primary-button accessibility checks in testing/accessibility/button-accessibility-checklist.md"

# Launch User Story 1 contract/token authoring together:
Task: "Add primary variant and medium size definitions to spec/components/button/button.spec.json"
Task: "Add primary default and disabled token mappings to packages/foundation/tokens/components/button.json"
```

---

## Parallel Example: User Story 2

```bash
# Launch User Story 2 validation work together:
Task: "Add variant and size contract coverage in testing/spec/validate-button-spec.mjs"
Task: "Add React coverage for variant hierarchy and size rendering in packages/react/components/button/Button.test.tsx"
Task: "Add visual review criteria for variant hierarchy and size comparisons in testing/visual/button-visual-checklist.md"

# Launch User Story 2 contract/token authoring together:
Task: "Add secondary, tertiary, destructive, small, and large definitions to spec/components/button/button.spec.json"
Task: "Add variant and size token mappings for emphasis, padding, typography, and destructive treatment to packages/foundation/tokens/components/button.json"
```

---

## Parallel Example: User Story 3

```bash
# Launch User Story 3 validation work together:
Task: "Add loading, focus, disabled, and icon slot contract coverage in testing/spec/validate-button-spec.mjs"
Task: "Add React tests for loading lock, focus-visible treatment, disabled behavior, and leading/trailing icons in packages/react/components/button/Button.test.tsx"
Task: "Add accessibility and visual review scenarios for focus, loading, disabled, and icon usage in testing/accessibility/button-accessibility-checklist.md and testing/visual/button-visual-checklist.md"

# Launch User Story 3 contract/token authoring together:
Task: "Add loading precedence and icon slot rules to spec/components/button/button.spec.json"
Task: "Add focus, loading, disabled, and icon-gap token mappings to packages/foundation/tokens/components/button.json"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the base button contract, React implementation, docs, and checks
5. Stop for review if the team wants an MVP release slice

### Incremental Delivery

1. Complete Setup + Foundational to establish the shared contract and validation path
2. Add User Story 1 for the text-led core action button
3. Add User Story 2 for variant hierarchy and size coverage
4. Add User Story 3 for states and icon support
5. Finish with parity/readiness polish and full quickstart validation

### Parallel Team Strategy

1. One contributor owns the shared foundation work in Phases 1-2
2. After Foundational completion:
   Developer A can drive shared-file implementation for US1 first
   Developer B can prepare US2 validation and visual review assets while US1 shared-file edits are in progress
   Developer C can prepare US3 accessibility and state-focused validation assets while waiting for shared-file handoff
3. Merge shared-file work in priority order so the MVP stays releasable and merge conflicts stay low

---

## Notes

- [P] tasks = different files or low-conflict parallel work
- [Story] label maps each story task back to a specific user story
- Each user story remains independently reviewable at its checkpoint
- The constitution's done criteria require spec, tokens, `.pen`, docs, implementation, tests, and parity guidance before the component is considered complete
