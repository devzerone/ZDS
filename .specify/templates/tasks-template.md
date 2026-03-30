---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED. Every feature MUST include tasks for the relevant
validation types defined in the specification and plan.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Use real monorepo paths from `plan.md`.
- Separate tasks by artifact layer: spec, tokens, `.pen`, docs, implementations,
  and tests.
- Keep platform-specific tasks scoped to the exact package or directory.

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

## Phase 1: Scope and Contract

**Purpose**: Establish the contract and artifact scope before implementation.

- [ ] T001 Define or update JSON spec in [path]
- [ ] T002 Define or update token requirements and mapping in [path]
- [ ] T003 [P] Record affected platforms and parity expectations in [path]

---

## Phase 2: Visual Definition and Docs

**Purpose**: Create visual references and documentation before platform work.

**⚠️ CRITICAL**: Platform implementation MUST NOT begin until this phase is complete.

- [ ] T004 Create or update `.pen` artifact in [path]
- [ ] T005 [P] Update component or pattern docs in [path]
- [ ] T006 [P] Define accessibility expectations in [path]
- [ ] T007 Record documented exceptions and remediation target in [path]

**Checkpoint**: Contract, token mapping, `.pen`, and docs are ready for platform implementation.

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 ⚠️

> **NOTE: Add validation tasks before marking implementation complete**

- [ ] T008 [P] [US1] Spec validation test in [path]
- [ ] T009 [P] [US1] Token validation test in [path]
- [ ] T010 [P] [US1] Visual regression test in [path]
- [ ] T011 [P] [US1] Accessibility test in [path]

### Implementation for User Story 1

- [ ] T012 [P] [US1] Implement React package changes in [path]
- [ ] T013 [P] [US1] Implement SwiftUI package changes in [path]
- [ ] T014 [P] [US1] Implement Kotlin Compose package changes in [path]
- [ ] T015 [P] [US1] Implement Windows Native UI package changes in [path]
- [ ] T016 [US1] Implement Tauri shell-specific changes or confirm React reuse in [path]
- [ ] T017 [US1] Update parity metadata in [path]

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 ⚠️

- [ ] T018 [P] [US2] Spec validation test in [path]
- [ ] T019 [P] [US2] Visual regression or accessibility test in [path]

### Implementation for User Story 2

- [ ] T020 [P] [US2] Update affected platform package in [path]
- [ ] T021 [US2] Update docs, `.pen`, or tokens if required by the story in [path]
- [ ] T022 [US2] Update parity metadata in [path]
- [ ] T023 [US2] Verify no undocumented exceptions remain

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 ⚠️

- [ ] T024 [P] [US3] Required validation tasks in [path]
- [ ] T025 [P] [US3] Required platform-specific test tasks in [path]

### Implementation for User Story 3

- [ ] T026 [P] [US3] Update affected platform package in [path]
- [ ] T027 [US3] Update tokens, spec, or `.pen` if the story changes contract in [path]
- [ ] T028 [US3] Update parity metadata and release checklist in [path]

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Final documentation sweep in [path]
- [ ] TXXX Run full validation suite for spec, tokens, visual regression, and accessibility
- [ ] TXXX Verify parity status for every affected platform
- [ ] TXXX Confirm breaking change notes and migration guidance if applicable
- [ ] TXXX Run release eligibility checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Scope and Contract (Phase 1)**: No dependencies - starts immediately
- **Visual Definition and Docs (Phase 2)**: Depends on Phase 1 - BLOCKS all platform implementation
- **User Stories (Phase 3+)**: All depend on Phase 2 completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Phase 2 - Must preserve independent testability
- **User Story 3 (P3)**: Can start after Phase 2 - Must preserve independent testability

### Within Each User Story

- Validation tasks MUST exist before implementation is considered complete
- Contract, tokens, and `.pen` changes MUST stay synchronized with implementation
- Parity metadata MUST be updated before the story closes
- Story complete before moving to next priority unless work is explicitly parallelized

### Parallel Opportunities

- Phase 1 tasks marked [P] can run in parallel
- Phase 2 tasks marked [P] can run in parallel
- Platform implementation tasks for different packages can run in parallel
- Validation tasks for the same story can run in parallel
- Different user stories can be worked on in parallel if artifact ownership is clear

---

## Parallel Example: User Story 1

```bash
# Launch validation tasks for User Story 1 together:
Task: "Spec validation test in [path]"
Task: "Token validation test in [path]"
Task: "Visual regression test in [path]"
Task: "Accessibility test in [path]"

# Launch platform implementation tasks together:
Task: "Implement React package changes in [path]"
Task: "Implement SwiftUI package changes in [path]"
Task: "Implement Kotlin Compose package changes in [path]"
Task: "Implement Windows Native UI package changes in [path]"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Scope and Contract
2. Complete Phase 2: Visual Definition and Docs
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Phase 1 + Phase 2 → contract and artifacts ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Phase 1 + Phase 2 together
2. Once shared artifacts are done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Always include tasks for spec, tokens, `.pen`, docs, implementation, and tests when affected
- Record parity and exceptions explicitly
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
