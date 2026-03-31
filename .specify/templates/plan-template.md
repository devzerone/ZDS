# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [e.g., library/cli/web-service/mobile-app/compiler/desktop-app or NEEDS CLARIFICATION]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Confirm the feature stays within ZDS design-system scope and names every
  repository path it will touch.
- Confirm source-of-truth ownership remains intact across `spec/`,
  `packages/tokens/`, `pen/`, implementation packages, docs, Storybook, and
  `testing/`.
- Confirm docs and Storybook impacts are identified for every user-consumable
  component, pattern, or foundation artifact.
- Confirm parity metadata updates or explicit "no parity change" rationale for
  impacted platform surfaces.
- Confirm validation coverage changes are planned for every contract, token,
  visual, accessibility, docs, or preview behavior change.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Keep only the paths relevant to the planned change set and
  extend them with concrete files or subdirectories when helpful.
-->

```text
apps/
└── docs/                # Official docs site (Next.js App Router, MDX content)
.storybook/             # Storybook preview configuration
packages/
├── foundation/         # Brand and shared foundation assets
├── tokens/             # Token sources, build scripts, generated outputs
├── react/              # React implementation package
├── swiftui/            # SwiftUI implementation surface or placeholder
├── kotlin/             # Kotlin implementation surface or placeholder
└── windows/            # Windows implementation surface or placeholder
pen/
├── components/         # Pencil component baselines
├── docs/               # Pencil docs baselines
└── patterns/           # Pencil pattern baselines
spec/
├── components/         # Publishable component contracts
├── patterns/           # Publishable pattern contracts
└── metadata/parity/    # Shared parity and exception metadata
testing/
├── tokens/             # Token validation
├── spec/               # Contract validation
├── docs/               # Docs and Storybook validation
├── accessibility/      # Accessibility review artifacts
└── visual/             # Visual review artifacts
tools/
├── config/             # Repo automation config
└── scripts/            # Repo automation scripts
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
