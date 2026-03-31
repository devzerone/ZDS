# Tasks: 브레드크럼프 컴포넌트

**Input**: Design documents from `/specs/006-breadcrumb-component/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Validation**: Validation tasks are REQUIRED because this feature changes shared contracts, tokens, visual baselines, React runtime behavior, docs surfaces, Storybook previews, and accessibility review behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm changed paths and create the breadcrumb feature scaffolds required by the implementation plan

- [X] T001 Confirm the breadcrumb feature path map across `spec/components/breadcrumb/`, `packages/tokens/data/components/`, `packages/tokens/src/components/`, `pen/components/breadcrumb/`, `packages/react/src/primitives/breadcrumb/`, `packages/react/src/components/breadcrumb/`, `apps/docs/content/components/`, `apps/docs/app/components/breadcrumb/`, `apps/docs/components/breadcrumb/`, and `testing/`
- [X] T002 Create breadcrumb scaffold files in `spec/components/breadcrumb/breadcrumb.spec.json`, `packages/tokens/data/components/breadcrumb.json`, `packages/tokens/src/components/breadcrumb.ts`, `pen/components/breadcrumb/breadcrumb.pen`, `packages/react/src/primitives/breadcrumb/index.ts`, `packages/react/src/components/breadcrumb/index.ts`, `apps/docs/content/components/breadcrumb.mdx`, `apps/docs/app/components/breadcrumb/page.tsx`, `apps/docs/components/breadcrumb/BreadcrumbPreviewSandbox.tsx`, `testing/spec/validate-breadcrumb-spec.mjs`, `testing/accessibility/breadcrumb-accessibility-checklist.md`, and `testing/visual/breadcrumb-visual-checklist.md`
- [X] T003 [P] Prepare React export and packaging entry points for breadcrumb in `packages/react/src/breadcrumb.ts`, `packages/react/src/index.ts`, `packages/react/package.json`, and `packages/react/tsup.config.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared breadcrumb contract, token meaning, baseline visuals, docs discoverability hooks, and validation plumbing before any user story work

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create the canonical breadcrumb contract with item roles, separator rules, overflow policy, accessibility flags, and initial parity profiles in `spec/components/breadcrumb/breadcrumb.spec.json`
- [X] T005 [P] Create breadcrumb component token definitions and source export wiring in `packages/tokens/data/components/breadcrumb.json`, `packages/tokens/src/components/breadcrumb.ts`, and `packages/tokens/src/index.ts`
- [X] T006 [P] Create breadcrumb visual baseline frames for single-step, standard multi-step, and constrained-width review in `pen/components/breadcrumb/breadcrumb.pen`
- [X] T007 [P] Extend shared token validation for breadcrumb component tokens in `testing/tokens/validate-tokens.mjs`
- [X] T008 [P] Add breadcrumb spec validation for roles, overflow rules, accessibility flags, and parity profiles in `testing/spec/validate-breadcrumb-spec.mjs`
- [X] T009 Configure docs and preview discovery plumbing for breadcrumb in `apps/docs/app/components/page.tsx`, `apps/docs/components/navigation/site-nav.ts`, `apps/docs/components/navigation/DocsTopbar.tsx`, `testing/docs-system/validate-docs-system.mjs`, `testing/docs-system/validate-docs-build.mjs`, and `testing/docs-system/validate-preview-links.mjs`

**Checkpoint**: Foundation ready - user story implementation can now begin in priority order or in parallel if staffed

---

## Phase 3: User Story 1 - 현재 위치를 빠르게 파악 (Priority: P1) 🎯 MVP

**Goal**: Deliver a canonical breadcrumb path that clearly shows hierarchy, distinguishes ancestor links from the current page, and works as the first React reference implementation

**Independent Test**: Reviewers can render a standard breadcrumb example and identify every ancestor step plus the final current-page step without opening source files

### Validation for User Story 1 ⚠️

- [X] T010 [P] [US1] Add React behavior tests for ancestor links, current-page rendering, and label-required breadcrumb items in `packages/react/src/components/breadcrumb/Breadcrumb.test.tsx`
- [X] T011 [P] [US1] Extend docs and preview consistency checks for the canonical breadcrumb example in `testing/docs-system/validate-docs-system.mjs` and `testing/docs-system/validate-preview-links.mjs`

### Implementation for User Story 1

- [X] T012 [US1] Finalize the shared breadcrumb item and current-page contract in `spec/components/breadcrumb/breadcrumb.spec.json`
- [X] T013 [US1] Implement low-level semantic breadcrumb structure in `packages/react/src/primitives/breadcrumb/PrimitiveBreadcrumb.tsx` and `packages/react/src/primitives/breadcrumb/index.ts`
- [X] T014 [US1] Implement the tokenized public breadcrumb API and render model in `packages/react/src/components/breadcrumb/Breadcrumb.tsx`, `packages/react/src/components/breadcrumb/index.ts`, `packages/react/src/breadcrumb.ts`, and `packages/react/src/index.ts`
- [X] T015 [P] [US1] Add canonical Storybook stories for standard breadcrumb paths in `packages/react/src/components/breadcrumb/Breadcrumb.stories.tsx`
- [X] T016 [US1] Build the docs preview sandbox and canonical docs page for the standard breadcrumb example in `apps/docs/components/breadcrumb/BreadcrumbPreviewSandbox.tsx`, `apps/docs/content/components/breadcrumb.mdx`, and `apps/docs/app/components/breadcrumb/page.tsx`
- [X] T017 [US1] Verify User Story 1 independently with `pnpm validate:tokens`, `node testing/spec/validate-breadcrumb-spec.mjs`, `node --import tsx --test packages/react/src/components/breadcrumb/Breadcrumb.test.tsx`, `pnpm docs:build`, `node testing/docs-system/validate-preview-links.mjs`, and `node testing/docs-system/validate-docs-system.mjs`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 일관된 항목 구성과 길이 처리 사용 (Priority: P2)

**Goal**: Support consistent breadcrumb composition across single-step, deep-path, and constrained-width examples while preserving first-step and current-page meaning

**Independent Test**: Reviewers can compare single-step, deep-path, and constrained-width breadcrumb examples and explain which steps remain interactive, which step is current, and how overflow preserves meaning

### Validation for User Story 2 ⚠️

- [X] T018 [P] [US2] Extend React and spec validation for constrained-width and collapsed-middle breadcrumb behavior in `packages/react/src/components/breadcrumb/Breadcrumb.test.tsx` and `testing/spec/validate-breadcrumb-spec.mjs`
- [X] T019 [P] [US2] Extend visual review and docs-build validation for single-step and long-path examples in `testing/visual/breadcrumb-visual-checklist.md` and `testing/docs-system/validate-docs-build.mjs`

### Implementation for User Story 2

- [X] T020 [US2] Update overflow policy, collapsed-summary behavior, and long-path guidance in `spec/components/breadcrumb/breadcrumb.spec.json`
- [X] T021 [US2] Add breadcrumb token support for separator spacing, current-step emphasis, and constrained-width presentation in `packages/tokens/data/components/breadcrumb.json` and `packages/tokens/src/components/breadcrumb.ts`
- [X] T022 [US2] Implement public breadcrumb handling for single-step and constrained-width paths in `packages/react/src/components/breadcrumb/Breadcrumb.tsx` and `packages/react/src/components/breadcrumb/Breadcrumb.stories.tsx`
- [X] T023 [US2] Expand `.pen` review baselines and docs examples for single-step, long-label, and constrained-width paths in `pen/components/breadcrumb/breadcrumb.pen`, `apps/docs/components/breadcrumb/BreadcrumbPreviewSandbox.tsx`, `apps/docs/content/components/breadcrumb.mdx`, and `apps/docs/app/components/breadcrumb/page.tsx`
- [X] T024 [US2] Verify User Story 2 independently with `pnpm validate:tokens`, `node testing/spec/validate-breadcrumb-spec.mjs`, `node --import tsx --test packages/react/src/components/breadcrumb/Breadcrumb.test.tsx`, `pnpm docs:build`, and `node testing/docs-system/validate-docs-build.mjs`

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently

---

## Phase 5: User Story 3 - 접근 가능한 탐색 보조 수단 제공 (Priority: P3)

**Goal**: Ensure breadcrumb semantics remain accessible to keyboard and assistive technology users, with separators staying decorative and current-page meaning staying distinct

**Independent Test**: Reviewers can inspect the React component, docs guidance, and accessibility checklist and confirm that only interactive ancestor steps receive keyboard focus while the current page is announced as current location

### Validation for User Story 3 ⚠️

- [X] T025 [P] [US3] Extend React tests and breadcrumb spec validation for navigation landmark semantics, current-page announcement, and non-interactive separators in `packages/react/src/components/breadcrumb/Breadcrumb.test.tsx` and `testing/spec/validate-breadcrumb-spec.mjs`
- [X] T026 [P] [US3] Add breadcrumb accessibility checklist coverage and docs consistency checks in `testing/accessibility/breadcrumb-accessibility-checklist.md` and `testing/docs-system/validate-docs-system.mjs`

### Implementation for User Story 3

- [X] T027 [US3] Finalize accessibility rules and misuse patterns in `spec/components/breadcrumb/breadcrumb.spec.json`
- [X] T028 [US3] Implement accessibility-focused breadcrumb semantics in `packages/react/src/primitives/breadcrumb/PrimitiveBreadcrumb.tsx` and `packages/react/src/components/breadcrumb/Breadcrumb.tsx`
- [X] T029 [US3] Document accessibility behavior, keyboard expectations, and parity status in `apps/docs/content/components/breadcrumb.mdx`, `apps/docs/app/components/breadcrumb/page.tsx`, and `packages/react/src/components/breadcrumb/Breadcrumb.stories.tsx`
- [X] T030 [US3] Verify User Story 3 independently with `node testing/spec/validate-breadcrumb-spec.mjs`, `node --import tsx --test packages/react/src/components/breadcrumb/Breadcrumb.test.tsx`, `pnpm docs:build`, `node testing/docs-system/validate-docs-system.mjs`, and checklist review in `testing/accessibility/breadcrumb-accessibility-checklist.md`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final alignment, repository script polish, and full-feature regression verification

- [X] T031 [P] If dedicated breadcrumb package commands are justified, add public package export and build polish in `packages/react/package.json`, `packages/react/tsup.config.ts`, and `package.json`
- [X] T032 [P] Finalize docs navigation and source-reference alignment for breadcrumb in `apps/docs/app/components/page.tsx`, `apps/docs/components/navigation/site-nav.ts`, `apps/docs/components/navigation/DocsTopbar.tsx`, and `apps/docs/app/components/breadcrumb/page.tsx`
- [X] T033 [P] Finalize cross-artifact visual and accessibility review criteria in `testing/visual/breadcrumb-visual-checklist.md` and `testing/accessibility/breadcrumb-accessibility-checklist.md`
- [X] T034 Validate final breadcrumb artifact synchronization across `spec/components/breadcrumb/breadcrumb.spec.json`, `packages/tokens/data/components/breadcrumb.json`, `pen/components/breadcrumb/breadcrumb.pen`, `packages/react/src/primitives/breadcrumb/`, `packages/react/src/components/breadcrumb/`, `apps/docs/content/components/breadcrumb.mdx`, `apps/docs/app/components/breadcrumb/page.tsx`, and `testing/`
- [X] T035 Run the full breadcrumb validation flow from `specs/006-breadcrumb-component/quickstart.md` and updated package scripts in `package.json`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational and delivers the MVP breadcrumb slice
- **User Story 2 (P2)**: Starts after Foundational and depends on US1’s base breadcrumb API and docs surface existing enough to extend with constrained-width behavior
- **User Story 3 (P3)**: Starts after Foundational and is strongest after US1 semantics and US2 examples exist, but remains independently testable as an accessibility-focused increment

### Within Each User Story

- Validation tasks should be implemented before or alongside story implementation and must pass before the story is complete
- Source-of-truth updates come before downstream React and docs updates
- React primitive updates come before or alongside public component API updates
- Docs and Storybook examples follow the shared contract and implementation
- Story-specific verification must pass before advancing to the next checkpoint

### Parallel Opportunities

- `T003` can run in parallel with `T001` and `T002`
- In Phase 2, `T005`, `T006`, `T007`, and `T008` can run in parallel once the breadcrumb path map is confirmed
- In US1, `T010` and `T011` can run in parallel, and `T015` can run separately from `T016` after the public component API stabilizes
- In US2, `T018` and `T019` can run in parallel, and `T021` can proceed separately from docs/pen updates once overflow rules are fixed
- In US3, `T025` and `T026` can run in parallel on separate validation artifacts
- In Phase 6, `T031`, `T032`, and `T033` can run in parallel on separate files

---

## Parallel Example: User Story 1

```bash
# Launch User Story 1 validation work together:
Task: "Add React behavior tests in packages/react/src/components/breadcrumb/Breadcrumb.test.tsx"
Task: "Extend docs and preview consistency checks in testing/docs-system/validate-docs-system.mjs and testing/docs-system/validate-preview-links.mjs"

# Launch downstream communication work after the shared API is in place:
Task: "Add canonical breadcrumb stories in packages/react/src/components/breadcrumb/Breadcrumb.stories.tsx"
Task: "Build the docs preview sandbox and docs page in apps/docs/components/breadcrumb/ and apps/docs/app/components/breadcrumb/"
```

---

## Parallel Example: User Story 2

```bash
# Launch User Story 2 validation work together:
Task: "Extend constrained-width validation in packages/react/src/components/breadcrumb/Breadcrumb.test.tsx and testing/spec/validate-breadcrumb-spec.mjs"
Task: "Extend visual/docs-build validation in testing/visual/breadcrumb-visual-checklist.md and testing/docs-system/validate-docs-build.mjs"

# Launch presentation updates after overflow rules are locked:
Task: "Add constrained-width token support in packages/tokens/data/components/breadcrumb.json"
Task: "Expand pen baseline and docs examples in pen/components/breadcrumb/breadcrumb.pen and apps/docs/"
```

---

## Parallel Example: User Story 3

```bash
# Launch User Story 3 validation work together:
Task: "Extend landmark/current-page/separator validation in packages/react/src/components/breadcrumb/Breadcrumb.test.tsx and testing/spec/validate-breadcrumb-spec.mjs"
Task: "Add accessibility review coverage in testing/accessibility/breadcrumb-accessibility-checklist.md and testing/docs-system/validate-docs-system.mjs"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate User Story 1 independently
5. Stop for review if the team wants the first releasable breadcrumb slice

### Incremental Delivery

1. Complete Setup + Foundational to establish breadcrumb contract, tokens, baseline visuals, and validation wiring
2. Add User Story 1 to deliver the standard breadcrumb path and current-page semantics
3. Add User Story 2 to support single-step and constrained-width path handling
4. Add User Story 3 to harden accessibility semantics and review guidance
5. Finish with repository polish and the full validation flow

### Parallel Team Strategy

1. One contributor owns shared-file work in `spec/`, `packages/tokens/`, and `pen/`
2. After Foundational completion:
   Developer A: React primitive/public component work in `packages/react/src/primitives/breadcrumb/` and `packages/react/src/components/breadcrumb/`
   Developer B: Docs page, preview sandbox, and Storybook story work in `apps/docs/` and `packages/react/src/components/breadcrumb/Breadcrumb.stories.tsx`
   Developer C: Validation work in `testing/spec/`, `testing/docs-system/`, `testing/accessibility/`, and `testing/visual/`

---

## Notes

- [P] tasks = different files or low-conflict parallel work
- [Story] labels map each story task back to a specific user story
- Each user story remains independently reviewable at its checkpoint
- Validation coverage is mandatory because this feature changes contracts, visuals, docs, and runtime behavior
- Shared files such as `spec/components/breadcrumb/breadcrumb.spec.json`, `packages/tokens/data/components/breadcrumb.json`, `pen/components/breadcrumb/breadcrumb.pen`, and `apps/docs/content/components/breadcrumb.mdx` should be edited in priority order rather than true parallel execution
