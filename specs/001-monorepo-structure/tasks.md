# Tasks: Design System Monorepo Structure

**Input**: Design documents from `/specs/001-monorepo-structure/`  
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

## Phase 1: Scope and Contract

**Purpose**: Establish the contract and artifact scope before implementation.

- [x] T001 Confirm repository structure scope in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/spec.md
- [x] T002 Align structure decisions and constitutional constraints in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/plan.md
- [x] T003 [P] Finalize repository taxonomy decisions in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/research.md
- [x] T004 [P] Finalize repository layout entities and validation rules in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/data-model.md
- [x] T005 [P] Finalize contributor-facing layout rules in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md

---

## Phase 2: Visual Definition and Docs

**Purpose**: Create structural references and guidance before repository changes.

**⚠️ CRITICAL**: Repository layout changes MUST NOT begin until this phase is complete.

- [x] T006 Finalize execution and validation steps in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/quickstart.md
- [x] T007 [P] Record required top-level and reserved platform directories in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md
- [x] T008 [P] Record `.gitkeep` preservation rules in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/data-model.md
- [x] T009 Record Next.js and Tauri consumer-environment rules in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/research.md

**Checkpoint**: Structure contract, validation rules, and quickstart are ready for repository implementation.

---

## Phase 3: User Story 1 - Locate System Artifacts Reliably (Priority: P1) 🎯 MVP

**Goal**: Create a stable top-level repository layout so contributors can place
design-system artifacts without inventing new root categories.

**Independent Test**: A maintainer can inspect the repository root and identify
where tokens, specs, `.pen` files, docs, tests, and platform work belong.

### Tests for User Story 1 ⚠️

> **NOTE: Add validation tasks before marking implementation complete**

- [x] T010 [P] [US1] Add repository structure review checklist to /home/choiho/zerone/ZDS/specs/001-monorepo-structure/quickstart.md
- [x] T011 [P] [US1] Verify root directory contract coverage against /home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md

### Implementation for User Story 1

- [x] T012 [P] [US1] Create /home/choiho/zerone/ZDS/apps and reserved docs and sandbox subdirectories
- [x] T013 [P] [US1] Create /home/choiho/zerone/ZDS/foundation with tokens, icons, and assets subdirectories
- [x] T014 [P] [US1] Create /home/choiho/zerone/ZDS/spec with components, patterns, and metadata/parity subdirectories
- [x] T015 [P] [US1] Create /home/choiho/zerone/ZDS/pen with components and patterns subdirectories
- [x] T016 [P] [US1] Create /home/choiho/zerone/ZDS/docs with foundation, components, patterns, platforms, and governance subdirectories
- [x] T017 [P] [US1] Create /home/choiho/zerone/ZDS/testing with spec, tokens, visual, and accessibility subdirectories
- [x] T018 [US1] Validate root layout against /home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md

**Checkpoint**: At this point, contributors should be able to locate all primary artifact layers from the repository root.

---

## Phase 4: User Story 2 - Preserve Empty Canonical Directories (Priority: P2)

**Goal**: Keep required but empty directories tracked so the layout survives clean clones and new branches.

**Independent Test**: After a clean checkout, the canonical empty directories still exist and remain ready for future artifacts.

### Tests for User Story 2 ⚠️

- [x] T019 [P] [US2] Add empty-directory preservation validation steps to /home/choiho/zerone/ZDS/specs/001-monorepo-structure/quickstart.md
- [x] T020 [P] [US2] Verify preservation strategy requirements in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/data-model.md

### Implementation for User Story 2

- [x] T021 [P] [US2] Add .gitkeep files to empty directories under /home/choiho/zerone/ZDS/apps
- [x] T022 [P] [US2] Add .gitkeep files to empty directories under /home/choiho/zerone/ZDS/foundation
- [x] T023 [P] [US2] Add .gitkeep files to empty directories under /home/choiho/zerone/ZDS/spec and /home/choiho/zerone/ZDS/pen
- [x] T024 [P] [US2] Add .gitkeep files to empty directories under /home/choiho/zerone/ZDS/docs and /home/choiho/zerone/ZDS/testing
- [x] T025 [P] [US2] Add .gitkeep files to empty directories under /home/choiho/zerone/ZDS/platforms and /home/choiho/zerone/ZDS/tools
- [x] T026 [US2] Verify all required empty directories remain tracked per /home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md

**Checkpoint**: Required empty directories should now be intentionally preserved in version control.

---

## Phase 5: User Story 3 - Support Cross-Environment Growth Without Reorganization (Priority: P3)

**Goal**: Reserve repository-owned implementation areas so future cross-platform
component work can land without renegotiating repository structure, while keeping
React consumer environments out of the root taxonomy.

**Independent Test**: A contributor can map React, Next.js-consuming React apps,
SwiftUI, Kotlin Compose, Windows Native UI, and Tauri-consuming React apps
without creating new root categories.

### Tests for User Story 3 ⚠️

- [x] T027 [P] [US3] Add platform reservation and consumer-environment validation steps for React, Next.js, Tauri, SwiftUI, Kotlin Compose, and Windows Native UI to /home/choiho/zerone/ZDS/specs/001-monorepo-structure/quickstart.md
- [x] T028 [P] [US3] Verify consumer-environment and platform scope rules in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md

### Implementation for User Story 3

- [x] T029 [P] [US3] Create /home/choiho/zerone/ZDS/platforms/react/primitives and /home/choiho/zerone/ZDS/platforms/react/components reserved directories
- [x] T030 [P] [US3] Create /home/choiho/zerone/ZDS/platforms/swiftui/components reserved directories
- [x] T031 [P] [US3] Create /home/choiho/zerone/ZDS/platforms/kotlin/components reserved directories for Kotlin Compose work
- [x] T032 [P] [US3] Create /home/choiho/zerone/ZDS/platforms/windows/components reserved directories for Windows Native UI work
- [x] T033 [P] [US3] Document Next.js consumption through the shared React implementation in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md
- [x] T034 [US3] Verify platform placement and consumer-environment rules against /home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md

**Checkpoint**: All supported platforms should now have reserved repository locations with constitutional constraints intact.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T035 [P] Reconcile created directories with /home/choiho/zerone/ZDS/specs/001-monorepo-structure/plan.md
- [x] T036 Run a clean-checkout verification by comparing the created directories with the validation checklist in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/quickstart.md and the contract in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md
- [x] T037 Verify no top-level product-oriented directories were introduced outside /home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md
- [x] T038 Confirm Next.js and Tauri remain documented as React consumer environments in /home/choiho/zerone/ZDS/specs/001-monorepo-structure/research.md
- [x] T039 Run release eligibility review against /home/choiho/zerone/ZDS/.specify/memory/constitution.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Scope and Contract (Phase 1)**: No dependencies - starts immediately
- **Visual Definition and Docs (Phase 2)**: Depends on Phase 1 - BLOCKS all repository implementation
- **User Stories (Phase 3+)**: All depend on Phase 2 completion
  - User stories can then proceed in parallel where directory ownership does not overlap
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Phase 3 because `.gitkeep` preservation depends on created directories
- **User Story 3 (P3)**: Can start after Phase 3 - Must preserve the established root taxonomy and keep consumer environments out of new roots

### Within Each User Story

- Validation tasks MUST exist before implementation is considered complete
- Contract, quickstart, and implemented directories MUST stay synchronized
- Story complete before moving to next priority unless work is explicitly parallelized

### Parallel Opportunities

- Phase 1 tasks marked [P] can run in parallel
- Phase 2 tasks marked [P] can run in parallel
- Root directory creation tasks for different top-level areas can run in parallel
- `.gitkeep` preservation tasks for different directory groups can run in parallel
- Platform reservation tasks can run in parallel by platform
- Consumer-environment documentation tasks can run in parallel with non-overlapping platform directory work

---

## Parallel Example: User Story 1

```bash
# Launch validation tasks for User Story 1 together:
Task: "Add repository structure review checklist to /home/choiho/zerone/ZDS/specs/001-monorepo-structure/quickstart.md"
Task: "Verify root directory contract coverage against /home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md"

# Launch root directory creation tasks together:
Task: "Create /home/choiho/zerone/ZDS/apps and reserved docs and sandbox subdirectories"
Task: "Create /home/choiho/zerone/ZDS/foundation with tokens, icons, and assets subdirectories"
Task: "Create /home/choiho/zerone/ZDS/spec with components, patterns, and metadata/parity subdirectories"
Task: "Create /home/choiho/zerone/ZDS/pen with components and patterns subdirectories"
Task: "Create /home/choiho/zerone/ZDS/docs with foundation, components, patterns, platforms, and governance subdirectories"
Task: "Create /home/choiho/zerone/ZDS/testing with spec, tokens, visual, and accessibility subdirectories"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Scope and Contract
2. Complete Phase 2: Visual Definition and Docs
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify contributors can locate every primary design-system layer
5. Commit the root taxonomy if ready

### Incremental Delivery

1. Complete Phase 1 + Phase 2 → structure contract and guidance ready
2. Add User Story 1 → Validate root taxonomy → Commit
3. Add User Story 2 → Validate empty-directory preservation → Commit
4. Add User Story 3 → Validate platform reservations → Commit
5. Finish with Polish → Commit final structure contract implementation

### Parallel Team Strategy

With multiple developers:

1. Team completes Phase 1 + Phase 2 together
2. Once shared documents are locked:
   - Developer A: User Story 1 root-layer creation
   - Developer B: User Story 2 `.gitkeep` preservation
   - Developer C: User Story 3 platform reservations
3. Merge after each story passes its independent validation

---

## Notes

- [P] tasks = different files or directory groups, no blocking dependency
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Always include tasks for spec, docs, contracts, implementation, and validation when affected
- Record any deviation from the layout contract before merge
- Stop at each checkpoint to validate the story independently
- Avoid: vague tasks, unnamed directories, silent platform divergence, product-oriented top-level folders
