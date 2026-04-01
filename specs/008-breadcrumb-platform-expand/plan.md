# Implementation Plan: Breadcrumb Platform Expansion

**Branch**: `008-breadcrumb-platform-expand` | **Date**: 2026-03-31 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/008-breadcrumb-platform-expand/spec.md`

## Summary

Extend the existing React breadcrumb component (feature 006) to three native platforms — SwiftUI (iOS), Kotlin/Compose (Android), and Windows/WinUI — following each platform's established Button component patterns. Each platform implements the shared semantics contract including hierarchy rendering, collapse-middle overflow, per-item `onNavigate` callbacks, decorative separators, and full accessibility support verified through manual checklists.

## Technical Context

**Language/Version**: Swift 5.9+ (SwiftUI), Kotlin 1.9+ (Jetpack Compose), C# 11+ / WinUI 3
**Primary Dependencies**: SwiftUI framework, Jetpack Compose UI, Microsoft WinUI 3
**Storage**: N/A
**Testing**: XCTest Previews (SwiftUI), Compose Preview / instrumented tests (Kotlin), WinUI XAML Hot Reload / manual verification (Windows)
**Target Platform**: iOS 15+, Android API 26+ (Compose), Windows 10 1809+ (WinUI 3)
**Project Type**: Design system library (cross-platform component delivery)
**Performance Goals**: No measurable rendering overhead vs. platform-native navigation components
**Constraints**: Must follow Button component patterns per FR-012; must consume shared tokens via generated layer per FR-010
**Scale/Scope**: 3 new platform implementations, each with ~1 component file + generated tokens + accessibility checklist

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Scope**: Feature stays within ZDS design-system scope. All repository paths are named in spec (Artifact Impact & Parity section).
- [x] **Source-of-truth ownership**: `spec/` owns contract and parity metadata. `packages/tokens/` owns token sources. No ownership migration into platform packages.
- [x] **Docs/Storybook impacts identified**: `apps/docs/content/components/breadcrumb.mdx` — update parity status table. No Storybook changes needed (Storybook is React-only).
- [x] **Parity metadata updates planned**: `spec/components/breadcrumb/breadcrumb.spec.json` — update swiftui, kotlin, windows parity status from "not-started" to "ready". Explicit rationale: completing deferred platform translations.
- [x] **React boundary**: No React changes. Feature only adds native implementations. React primitive/component boundary remains unchanged.
- [x] **Validation coverage**: Manual accessibility checklists planned for each platform under `testing/accessibility/`. Contract validation via existing `testing/spec/validate-breadcrumb-spec.mjs`.

**Post-Phase 1 re-check**: All gates still pass. Design artifacts (data-model, contracts, quickstart) align with constitutional requirements. No violations detected.

## Project Structure

### Documentation (this feature)

```text
specs/008-breadcrumb-platform-expand/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0: research decisions
├── data-model.md        # Phase 1: entity definitions
├── quickstart.md        # Phase 1: implementation guide
├── contracts/
│   └── breadcrumb-component-contract.md  # Phase 1: native platform contract
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2: task list (created by /speckit.tasks)
```

### Source Code (repository root)

```text
packages/
├── tokens/
│   └── scripts/
│       └── build-platform-tokens.mjs    # Token generation pipeline (existing)
├── swiftui/
│   ├── .generated/
│   │   └── ZDSBreadcrumbTokens.swift    # NEW: generated breadcrumb tokens
│   └── components/
│       └── Breadcrumb.swift             # NEW: SwiftUI breadcrumb component
├── kotlin/
│   ├── .generated/
│   │   └── ZDSBreadcrumbTokens.kt       # NEW: generated breadcrumb tokens
│   └── components/
│       └── Breadcrumb.kt                # NEW: Kotlin breadcrumb component
├── windows/
│   ├── .generated/
│   │   └── BreadcrumbTokens.xaml        # NEW: generated breadcrumb tokens
│   └── components/
│       ├── Breadcrumb.xaml              # NEW: WinUI breadcrumb XAML
│       └── Breadcrumb.xaml.cs           # NEW: WinUI breadcrumb code-behind
spec/
└── components/
    └── breadcrumb/
        └── breadcrumb.spec.json         # UPDATE: parity status → ready
apps/
└── docs/
    └── content/
        └── components/
            └── breadcrumb.mdx           # UPDATE: parity table
testing/
├── accessibility/
│   ├── breadcrumb-accessibility-checklist-swiftui.md   # NEW
│   ├── breadcrumb-accessibility-checklist-kotlin.md     # NEW
│   └── breadcrumb-accessibility-checklist-windows.md    # NEW
└── spec/
    └── validate-breadcrumb-spec.mjs     # Existing (may need minor update)
```

**Structure Decision**: Follows the established monorepo topology exactly. Each platform package receives a new component file and generated token file in their standard locations. No structural innovations — pure pattern replication from Button.

## Complexity Tracking

> No constitutional violations detected. No complexity justifications needed.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | — | — |
