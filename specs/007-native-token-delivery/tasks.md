# Tasks: 네이티브 토큰 전달 구조

**Input**: Design documents from `/specs/007-native-token-delivery/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Validation tasks are REQUIRED because this feature changes token delivery, native implementation behavior, contributor docs, and package-level verification flow.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the feature path map and scaffold the token delivery work area

- [X] T001 Confirm feature path map across `spec/components/button/button.spec.json`, `packages/tokens/data/components/button.json`, `packages/tokens/src/components/button.ts`, `packages/tokens/scripts/`, `packages/swiftui/components/Button.swift`, `packages/kotlin/components/Button.kt`, `packages/windows/components/Button.xaml`, `apps/docs/content/foundation/tokens.mdx`, and `testing/`
- [X] T002 Scaffold the generator entrypoints in `packages/tokens/scripts/build-platform-tokens.mjs`, `packages/tokens/scripts/platform/normalize-tokens.mjs`, `packages/tokens/scripts/platform/render-swiftui.mjs`, `packages/tokens/scripts/platform/render-kotlin.mjs`, and `packages/tokens/scripts/platform/render-windows.mjs`
- [X] T003 [P] Scaffold generated artifact targets in `packages/tokens/generated/swiftui/.gitkeep`, `packages/tokens/generated/kotlin/.gitkeep`, and `packages/tokens/generated/windows/.gitkeep`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared ownership, build hooks, and validation boundaries that block all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Update native token delivery metadata and first-slice proof-path references in `spec/components/button/button.spec.json`
- [X] T004A [P] Align the native token delivery contract with artifact ownership, generation path, consumer boundaries, and validation expectations in `specs/007-native-token-delivery/contracts/native-token-delivery-contract.md`
- [X] T005 [P] Add build and export wiring for native token artifacts in `packages/tokens/package.json`, `packages/tokens/scripts/build-package.mjs`, and `package.json`
- [X] T006 [P] Add native package artifact inclusion hooks in `packages/swiftui/Package.swift`, `packages/kotlin/build.gradle.kts`, and `packages/windows/ZDS.Windows.csproj`
- [X] T007 [P] Configure generated-artifact validation scaffolding in `testing/tokens/validate-tokens.mjs`
- [X] T008 Configure docs-system validation scaffolding for native token delivery guidance in `testing/docs-system/validate-docs-build.mjs` and `testing/docs-system/validate-docs-system.mjs`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Standardize Native Token Consumption (Priority: P1) 🎯 MVP

**Goal**: Define one approved generation path under `packages/tokens/` and make all three native Button implementations consume generated platform-native artifacts

**Independent Test**: Run the shared token validation plus native package builds and confirm `Button` token artifacts are generated under `packages/tokens/` and consumed by SwiftUI, Kotlin, and Windows without CSS input

### Validation for User Story 1 ⚠️

- [X] T009 [P] [US1] Add failing missing/stale/manual-edit artifact checks for `Button` outputs in `testing/tokens/validate-tokens.mjs`
- [X] T010 [P] [US1] Add native token generation and consumption verification entrypoints in `packages/swiftui/package.json`, `packages/kotlin/package.json`, and `packages/windows/package.json`

### Implementation for User Story 1

- [X] T011 [P] [US1] Implement shared token normalization for native delivery in `packages/tokens/scripts/platform/normalize-tokens.mjs`
- [X] T012 [P] [US1] Implement SwiftUI, Kotlin, and Windows artifact renderers in `packages/tokens/scripts/platform/render-swiftui.mjs`, `packages/tokens/scripts/platform/render-kotlin.mjs`, and `packages/tokens/scripts/platform/render-windows.mjs`
- [X] T013 [US1] Wire the native token generation command in `packages/tokens/scripts/build-platform-tokens.mjs`, `packages/tokens/package.json`, and `package.json`
- [X] T014 [US1] Generate first-slice Button token artifacts in `packages/tokens/generated/swiftui/ZDSButtonTokens.swift`, `packages/tokens/generated/kotlin/ZDSButtonTokens.kt`, and `packages/tokens/generated/windows/ButtonTokens.xaml`
- [X] T015 [US1] Update native Button consumers to read generated Button artifacts in `packages/swiftui/components/Button.swift`, `packages/kotlin/components/Button.kt`, `packages/windows/components/Button.xaml`, and `packages/windows/components/Button.xaml.cs`
- [ ] T016 [US1] Verify User Story 1 independently with `pnpm validate:tokens` and `pnpm validate:native`

**Checkpoint**: User Story 1 delivers the MVP token delivery path for `Button`

---

## Phase 4: User Story 2 - Preserve Shared Semantics Across Platforms (Priority: P2)

**Goal**: Ensure generated native artifacts preserve shared semantic names, state meaning, and foundation token intent for `Button`

**Independent Test**: Validate that generated artifacts and native Button consumers preserve shared variant/state naming and no longer rely on newly introduced raw shared values

### Validation for User Story 2 ⚠️

- [X] T017 [P] [US2] Extend parity validation for native token delivery metadata in `testing/spec/validate-button-spec.mjs`
- [X] T018 [P] [US2] Extend semantic/state mapping checks for generated native token artifacts in `testing/tokens/validate-tokens.mjs`

### Implementation for User Story 2

- [X] T019 [P] [US2] Update shared Button token delivery semantics in `packages/tokens/data/components/button.json` and `packages/tokens/src/components/button.ts`
- [X] T020 [P] [US2] Generate shared foundation token artifacts for native consumers in `packages/tokens/generated/swiftui/ZDSFoundationTokens.swift`, `packages/tokens/generated/kotlin/ZDSFoundationTokens.kt`, and `packages/tokens/generated/windows/FoundationTokens.xaml`
- [X] T021 [US2] Refactor native Button consumers to use generated semantic and foundation tokens without raw shared values in `packages/swiftui/components/Button.swift`, `packages/kotlin/components/Button.kt`, `packages/windows/components/Button.xaml`, and `packages/windows/components/Button.xaml.cs`
- [X] T022 [US2] Align shared button parity metadata and native token delivery references in `spec/components/button/button.spec.json`
- [X] T022A [P] [US2] Define and validate the fallback handling for shared token categories or semantic values without approved native representations in `spec/components/button/button.spec.json`, `specs/007-native-token-delivery/spec.md`, and `testing/spec/validate-button-spec.mjs`
- [ ] T023 [US2] Verify User Story 2 independently with `pnpm validate:button-spec`, `pnpm validate:tokens`, and `pnpm validate:native`

**Checkpoint**: User Stories 1 and 2 now preserve one shared token vocabulary across native platforms

---

## Phase 5: User Story 3 - Improve Native Package Onboarding (Priority: P3)

**Goal**: Document where generated artifacts live, how native packages consume them, and how contributors validate freshness

**Independent Test**: Build docs and run docs-system validation to confirm contributors can find the token source, generated artifact paths, native consumer boundaries, and refresh workflow

### Validation for User Story 3 ⚠️

- [X] T024 [P] [US3] Add docs-system checks for native token delivery guidance in `testing/docs-system/validate-docs-build.mjs` and `testing/docs-system/validate-docs-system.mjs`
- [X] T025 [P] [US3] Add source-reference and navigation validation for native token delivery docs in `testing/docs-system/validate-preview-links.mjs`

### Implementation for User Story 3

- [X] T026 [P] [US3] Add contributor-facing native token delivery guidance in `apps/docs/content/foundation/tokens.mdx` and `apps/docs/app/foundation/tokens/page.tsx`
- [X] T027 [US3] Add navigation and discovery links for native token delivery guidance in `apps/docs/components/navigation/site-nav.ts` and `apps/docs/app/foundation/page.tsx`
- [X] T028 [US3] Document the generated-artifact workflow in `testing/docs-system/README.md` and `specs/007-native-token-delivery/quickstart.md`
- [X] T029 [US3] Verify User Story 3 independently with `pnpm docs:build`, `node testing/docs-system/validate-docs-build.mjs`, `node testing/docs-system/validate-preview-links.mjs`, and `node testing/docs-system/validate-docs-system.mjs`

**Checkpoint**: All user stories are independently understandable and verifiable

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final alignment, regression coverage, and full validation

- [X] T030 [P] Final artifact-path alignment across `specs/007-native-token-delivery/spec.md`, `specs/007-native-token-delivery/plan.md`, and `apps/docs/content/foundation/tokens.mdx`
- [X] T031 [P] Add regression coverage for generated artifact ownership, manual-edit detection, and parity references in `testing/tokens/validate-tokens.mjs` and `testing/spec/validate-button-spec.mjs`
- [ ] T032 Run the required validation commands from `package.json` and `specs/007-native-token-delivery/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on User Story 1 completion because semantic preservation builds on the generated delivery path
- **User Story 3 (Phase 5)**: Depends on User Story 1 completion and should follow User Story 2 for final terminology alignment
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - MVP for the feature
- **User Story 2 (P2)**: Depends on User Story 1’s generator and artifact flow
- **User Story 3 (P3)**: Depends on the approved delivery path and is safest after semantic alignment is complete

### Within Each User Story

- Required validation MUST be written or updated before implementation when the feature changes behavior or verification flow
- Source-of-truth updates before downstream implementation
- Generator and artifact ownership before native consumer refactors
- Documentation after the underlying delivery path is stable
- Validation must pass before story completion

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- Foundational tasks T005, T006, and T007 can run in parallel
- In User Story 1, T011 and T012 can run in parallel after validation scaffolding starts
- In User Story 2, T019 and T020 can run in parallel
- In User Story 3, T024 and T025 can run in parallel, and T026 can begin while navigation work in T027 is prepared

---

## Parallel Example: User Story 1

```bash
# Launch validation preparation for User Story 1 together:
Task: "Add failing missing/stale artifact checks in testing/tokens/validate-tokens.mjs"
Task: "Add native token generation and consumption verification entrypoints in native package package.json files"

# Launch generator implementation for User Story 1 together:
Task: "Implement shared token normalization in packages/tokens/scripts/platform/normalize-tokens.mjs"
Task: "Implement platform artifact renderers in packages/tokens/scripts/platform/render-swiftui.mjs, render-kotlin.mjs, and render-windows.mjs"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Run `pnpm validate:tokens` and `pnpm validate:native`
5. Demo the first end-to-end `Button` token delivery path

### Incremental Delivery

1. Complete Setup + Foundational
2. Add User Story 1 to establish generated native token delivery for `Button`
3. Add User Story 2 to preserve semantic/state meaning across native platforms
4. Add User Story 3 to document and validate contributor workflow
5. Finish with cross-cutting polish and regression validation

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 generator and artifact flow
   - Developer B: User Story 2 semantic/parity alignment after US1 lands
   - Developer C: User Story 3 docs and validation guidance after US1 artifact paths stabilize

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps each task to a specific user story
- `Button` is the first required proof path; additional components are explicitly out of the first slice
- Generated artifacts are owned under `packages/tokens/`, not inside native package roots
- Missing or stale generated artifacts must fail validation, not warn only
