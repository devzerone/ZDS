---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Validation**: Validation tasks are REQUIRED whenever the feature changes
contracts, tokens, visuals, accessibility behavior, docs, previews, or runtime
behavior. Only pure governance or copy-only changes may omit runtime tests, and
they MUST still include the relevant verification task.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Docs**: `apps/docs/`
- **Storybook config**: `.storybook/`
- **Foundation assets**: `packages/foundation/`
- **Tokens**: `packages/tokens/`
- **React implementation**: `packages/react/`
- **React primitives**: `packages/react/src/primitives/`
- **React public components**: `packages/react/src/components/`
- **Other platform implementations**: `packages/swiftui/`, `packages/kotlin/`, `packages/windows/`
- **Visual baselines**: `pen/`
- **Contracts and parity metadata**: `spec/`
- **Validation**: `testing/`
- **Automation**: `tools/`

## Constitution-Aligned Task Rules

- Include explicit tasks for every affected owned layer: source-of-truth
  artifacts, implementation, docs/previews, and validation.
- Include parity metadata tasks whenever platform expectations, lag, or
  exceptions change.
- When React implementation changes, include explicit tasks for primitive-layer
  and public-component-layer updates when both are affected, and record any
  Radix adoption or native-element decision in the relevant task descriptions.
- Treat docs and Storybook as separate delivery surfaces when either one is
  user-visible for the changed artifact.
- Reference exact file paths in every task description.

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and changed-path scaffolding

- [ ] T001 Confirm feature path map across `spec/`, `packages/`, `pen/`, `apps/docs/`, `.storybook/`, and `testing/`
- [ ] T002 Initialize or scaffold any new files required by the implementation plan
- [ ] T003 [P] Update repository automation or config in `tools/` when the feature requires new checks or scripts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Create or update shared contract files in `spec/`
- [ ] T005 [P] Create or update token or foundation asset files in `packages/tokens/` or `packages/foundation/`
- [ ] T006 [P] Create or update Pencil baseline files in `pen/`
- [ ] T007 Record parity metadata or approved exceptions in `spec/metadata/parity/`
- [ ] T008 Configure docs or preview plumbing in `apps/docs/` or `.storybook/`
- [ ] T009 Configure validation scripts or fixtures in `testing/` or `tools/`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Validation for User Story 1 ⚠️

> **NOTE: Write the relevant failing validation first whenever the feature
> changes behavior, visuals, accessibility, docs, or previews**

- [ ] T010 [P] [US1] Update or add contract validation in `testing/spec/` for the changed artifact
- [ ] T011 [P] [US1] Update or add implementation, accessibility, visual, docs, or preview validation in the relevant `testing/` path

### Implementation for User Story 1

- [ ] T012 [P] [US1] Update source-of-truth files in `spec/`, `packages/tokens/`, `packages/foundation/`, or `pen/`
- [ ] T013 [P] [US1] Implement the user-facing change in the relevant package under `packages/`
- [ ] T014 [US1] Update official docs content in `apps/docs/`
- [ ] T015 [US1] Update Storybook stories or preview config in `.storybook/` or `packages/react/src/components/`
- [ ] T016 [US1] Record any parity metadata changes in `spec/metadata/parity/`
- [ ] T017 [US1] Run and verify the required validation commands for user story 1

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Validation for User Story 2 ⚠️

- [ ] T018 [P] [US2] Update required validation coverage in the relevant `testing/` paths
- [ ] T019 [P] [US2] Add or update docs or preview verification for the changed surface

### Implementation for User Story 2

- [ ] T020 [P] [US2] Update the required source-of-truth files for user story 2
- [ ] T021 [US2] Implement the required package changes for user story 2
- [ ] T022 [US2] Update docs, Storybook, or parity metadata for user story 2
- [ ] T023 [US2] Verify user story 2 independently with its required validation commands

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Validation for User Story 3 ⚠️

- [ ] T024 [P] [US3] Update required validation coverage in the relevant `testing/` paths
- [ ] T025 [P] [US3] Add or update docs or preview verification for the changed surface

### Implementation for User Story 3

- [ ] T026 [P] [US3] Update the required source-of-truth files for user story 3
- [ ] T027 [US3] Implement the required package changes for user story 3
- [ ] T028 [US3] Verify user story 3 independently with its required validation commands

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Final docs and Storybook alignment updates in `apps/docs/` and `.storybook/`
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Validate parity metadata completeness in `spec/metadata/parity/`
- [ ] TXXX [P] Additional regression coverage in `testing/`
- [ ] TXXX Run the required validation commands from `quickstart.md` or package scripts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Required validation MUST be written or updated before implementation when the
  feature changes behavior or visuals
- Source-of-truth updates before downstream implementation
- Implementation before final docs or preview polish
- Validation must pass before story completion
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All validation tasks for a user story marked [P] can run in parallel
- Independent source-of-truth updates within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all required validation work for User Story 1 together:
Task: "Update contract validation in testing/spec/"
Task: "Update docs or preview validation in testing/docs/"

# Launch source-of-truth updates for User Story 1 together:
Task: "Update contract files in spec/"
Task: "Update token files in packages/tokens/"
Task: "Update Pencil baseline in pen/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify required validation fails before implementing when applicable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
