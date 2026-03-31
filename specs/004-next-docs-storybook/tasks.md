# Tasks: Design System Docs And Preview

**Input**: Design documents from `/specs/004-next-docs-storybook/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Build validation and repository verification are required for this feature because the specification explicitly requires automated docs and preview build checks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. `US1`, `US2`, `US3`)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add the baseline workspace dependencies and package metadata needed for a deployable docs app and Storybook preview surface

- [X] T001 Add Next.js docs app scripts and dependencies in /home/choiho/zerone/ZDS/apps/docs/package.json
- [X] T002 Add Storybook, shared docs-system scripts, and root workspace commands in /home/choiho/zerone/ZDS/package.json
- [X] T003 [P] Add docs workspace TypeScript and Next environment files in /home/choiho/zerone/ZDS/apps/docs/tsconfig.json
- [X] T004 [P] Add docs workspace TypeScript and Next environment files in /home/choiho/zerone/ZDS/apps/docs/next-env.d.ts
- [X] T005 [P] Add docs workspace Next configuration in /home/choiho/zerone/ZDS/apps/docs/next.config.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared docs-site and Storybook scaffolding that every user story depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create the Next.js App Router shell and global layout in /home/choiho/zerone/ZDS/apps/docs/app/layout.tsx
- [X] T007 [P] Create shared docs site styling tokens, light/dark theme variables, and base styles in /home/choiho/zerone/ZDS/apps/docs/app/globals.css
- [X] T008 [P] Create documentation navigation data and section metadata in /home/choiho/zerone/ZDS/apps/docs/components/navigation/site-nav.ts
- [X] T009 [P] Create reusable docs prose rendering component in /home/choiho/zerone/ZDS/apps/docs/components/prose/DocsProse.tsx
- [X] T010 [P] Create reusable docs preview link component in /home/choiho/zerone/ZDS/apps/docs/components/preview-link/PreviewLink.tsx
- [X] T011 Create root Storybook configuration and component story discovery in /home/choiho/zerone/ZDS/.storybook/main.ts
- [X] T012 [P] Create shared Storybook preview decorators and global parameters in /home/choiho/zerone/ZDS/.storybook/preview.ts
- [X] T013 [P] Create Storybook UI metadata and docs-branding shell in /home/choiho/zerone/ZDS/.storybook/manager.ts
- [X] T014 Add shared docs-system Turbo tasks for docs and Storybook builds in /home/choiho/zerone/ZDS/turbo.json
- [X] T015 Create docs theme provider, header toggle, and persisted light/dark mode wiring in /home/choiho/zerone/ZDS/apps/docs/components/theme/ThemeProvider.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in priority order

---

## Phase 3: User Story 1 - Find trusted guidance fast (Priority: P1) 🎯 MVP

**Goal**: Deliver a navigable documentation site where contributors can find foundation guidance and button guidance without opening source files

**Independent Test**: Run the docs app locally, navigate from the landing page to foundation guidance and the button page, and confirm purpose, token references, accessibility notes, and parity details are present in one place

### Validation for User Story 1

- [X] T016 [P] [US1] Add docs validation for route rendering, canonical content ownership, source refs, and required button state coverage in /home/choiho/zerone/ZDS/testing/docs-system/validate-docs-build.mjs
- [X] T017 [P] [US1] Add canonical foundation token docs content in /home/choiho/zerone/ZDS/apps/docs/content/foundation/tokens.mdx
- [X] T018 [P] [US1] Add canonical button docs content in /home/choiho/zerone/ZDS/apps/docs/content/components/button.mdx

### Implementation for User Story 1

- [X] T019 [US1] Create the docs home page with primary navigation entry points in /home/choiho/zerone/ZDS/apps/docs/app/page.tsx
- [X] T020 [US1] Create the foundation index route in /home/choiho/zerone/ZDS/apps/docs/app/foundation/page.tsx
- [X] T021 [US1] Create the foundation tokens route backed by canonical docs content in /home/choiho/zerone/ZDS/apps/docs/app/foundation/tokens/page.tsx
- [X] T022 [US1] Create the components index route in /home/choiho/zerone/ZDS/apps/docs/app/components/page.tsx
- [X] T023 [US1] Create the button documentation route with default, disabled, loading, focus, hover, and pressed state guidance, source-of-truth refs, and parity summary in /home/choiho/zerone/ZDS/apps/docs/app/components/button/page.tsx
- [X] T024 [US1] Add docs navigation rendering, header theme toggle integration, and section ordering in /home/choiho/zerone/ZDS/apps/docs/components/navigation/DocsSidebar.tsx
- [X] T025 [US1] Archive or remove superseded legacy foundation Markdown after MDX migration in /home/choiho/zerone/ZDS/apps/docs/foundation/tokens.md
- [X] T026 [US1] Archive or remove superseded legacy button Markdown after MDX migration in /home/choiho/zerone/ZDS/apps/docs/components/button.md

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Inspect live component behavior (Priority: P2)

**Goal**: Deliver a Storybook preview that renders the real React Button component with controllable variants, sizes, and states

**Independent Test**: Run Storybook, open the Button stories, change controls for variant, size, and state, and confirm the preview matches the supported button contract while linking back to canonical docs

### Validation for User Story 2

- [X] T027 [P] [US2] Add Storybook build verification for the button preview surface in /home/choiho/zerone/ZDS/testing/docs-system/validate-storybook-build.mjs
- [X] T028 [P] [US2] Add Storybook validation for docs backlinks, required state coverage, and token/spec source refs in /home/choiho/zerone/ZDS/testing/docs-system/validate-preview-links.mjs

### Implementation for User Story 2

- [X] T029 [US2] Export any missing Button metadata needed by docs and stories from /home/choiho/zerone/ZDS/packages/react/components/button/index.ts
- [X] T030 [US2] Add Button Storybook stories for default, disabled, loading, focus, hover, and pressed states using the shared React component plus canonical docs backlinks in /home/choiho/zerone/ZDS/packages/react/components/button/Button.stories.tsx
- [X] T031 [US2] Add Storybook light/dark viewing mode controls in /home/choiho/zerone/ZDS/.storybook/preview.ts
- [X] T032 [US2] Add a preview entry link from the button docs page to Storybook in /home/choiho/zerone/ZDS/apps/docs/app/components/button/page.tsx
- [X] T033 [US2] Add a stable Storybook landing or index reference for component previews in /home/choiho/zerone/ZDS/apps/docs/app/components/page.tsx

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently

---

## Phase 5: User Story 3 - Keep docs and previews release-ready (Priority: P3)

**Goal**: Make docs and Storybook buildable, publishable, and automatically validated before merge

**Independent Test**: Run the root validation command and confirm docs build, Storybook build, and their CI workflow all pass while clearly identifying the failing surface if one breaks

### Validation for User Story 3

- [X] T034 [P] [US3] Add a combined docs-system validation entrypoint covering docs build, Storybook build, variant/size/state alignment, link integrity, and token/spec refs in /home/choiho/zerone/ZDS/testing/docs-system/validate-docs-system.mjs
- [X] T035 [P] [US3] Add documentation for local docs-system verification steps in /home/choiho/zerone/ZDS/testing/docs-system/README.md

### Implementation for User Story 3

- [X] T036 [US3] Wire docs build, Storybook build, and combined validation scripts in /home/choiho/zerone/ZDS/package.json
- [X] T037 [US3] Add docs workspace publish artifact configuration for a single stable docs output directory and related deploy metadata in /home/choiho/zerone/ZDS/apps/docs/package.json
- [X] T038 [US3] Update Turbo build outputs for docs and Storybook artifacts in /home/choiho/zerone/ZDS/turbo.json
- [X] T039 [US3] Add CI workflow for docs-system validation in /home/choiho/zerone/ZDS/.github/workflows/docs-system-validation.yml
- [X] T040 [US3] Document deployable docs and Storybook artifact expectations in /home/choiho/zerone/ZDS/specs/004-next-docs-storybook/quickstart.md

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, migration cleanup, and release-readiness updates across the whole feature

- [X] T041 [P] Normalize AGENTS context after final docs-system decisions in /home/choiho/zerone/ZDS/AGENTS.md
- [X] T042 Reconcile docs and preview contract wording with implemented paths and theme behavior in /home/choiho/zerone/ZDS/specs/004-next-docs-storybook/contracts/docs-preview-contract.md
- [X] T043 [P] Run quickstart validation and capture final command set in /home/choiho/zerone/ZDS/specs/004-next-docs-storybook/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational completion and should consume the button docs route created in US1 for canonical backlinking
- **User Story 3 (Phase 5)**: Depends on US1 and US2 because build validation and CI need both surfaces to exist
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - this is the MVP slice
- **User Story 2 (P2)**: Can start after Foundational (Phase 2), but it should integrate with the canonical button docs page from US1
- **User Story 3 (P3)**: Depends on both the docs surface from US1 and the preview surface from US2

### Within Each User Story

- Validation tasks should be written before or alongside the corresponding implementation surface
- Content sources before route composition when a page depends on authored content
- Shared component export alignment before final story controls
- Root scripts and CI wiring after local build commands are defined

### Parallel Opportunities

- Setup tasks `T003` to `T005` can run in parallel after dependency decisions are made
- Foundational tasks `T007` to `T013` can run in parallel because they touch separate docs and Storybook scaffolding files
- User Story 1 content-source tasks `T016` to `T018` can run in parallel
- User Story 2 validation tasks `T027` and `T028` can run in parallel
- User Story 3 validation and documentation tasks `T034`, `T035`, and `T040` can run in parallel once local build commands exist

---

## Parallel Example: User Story 1

```bash
# Launch docs-source preparation together:
Task: "Add docs build verification for route rendering in testing/docs-system/validate-docs-build.mjs"
Task: "Add docs content source records for foundation tokens in apps/docs/content/foundation/tokens.mdx"
Task: "Add docs content source records for button guidance in apps/docs/content/components/button.mdx"
```

---

## Parallel Example: User Story 2

```bash
# Launch preview verification tasks together:
Task: "Add Storybook build verification in testing/docs-system/validate-storybook-build.mjs"
Task: "Add preview validation for docs backlinks, required state coverage, and token/spec refs in testing/docs-system/validate-preview-links.mjs"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Confirm the docs site independently delivers foundation and button guidance
5. Demo the docs site before expanding to Storybook

### Incremental Delivery

1. Complete Setup + Foundational → docs-platform base ready
2. Add User Story 1 → Validate docs site navigation and button guidance → Demo
3. Add User Story 2 → Validate Storybook preview and cross-linking → Demo
4. Add User Story 3 → Validate local build, artifact generation, and CI workflow → Release-ready review

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 docs routes and content
   - Developer B: User Story 2 Storybook stories and preview wiring
   - Developer C: User Story 3 validation scripts and CI after both surfaces are available

---

## Notes

- All tasks follow the required checklist format with task ID and exact file path
- `[P]` tasks were limited to changes in separate files to reduce merge conflicts
- User Story 1 is the recommended MVP because it creates the first usable design-system destination
- User Story 2 adds live component inspection without redefining the button contract
- User Story 3 completes deployment readiness by wiring validation and CI around both publishing surfaces
