# Research: Breadcrumb Platform Expansion

**Feature Branch**: `008-breadcrumb-platform-expand`
**Date**: 2026-03-31

## Decision 1: Navigation callback pattern for native platforms

**Decision**: Per-item `onNavigate` callback handler pattern.

**Rationale**: Native platforms (SwiftUI, Compose, WinUI) do not use URL-based routing. The React breadcrumb uses `href` on ancestor items, but native apps navigate programmatically. A callback handler lets the consuming screen control routing while keeping the breadcrumb purely presentational. This matches the Button pattern where `onPress` is a callback.

**Alternatives considered**:
- Route/destination objects on each item: Would couple the breadcrumb to a specific navigation framework, violating the "component MUST NOT perform navigation directly" requirement.
- Event emission: Over-engineered for a simple tap-to-navigate interaction; callback is more idiomatic across all three platforms.

## Decision 2: Accessibility verification approach

**Decision**: Platform-specific manual accessibility checklists.

**Rationale**: Screen reader behavior (VoiceOver, TalkBack, Narrator) is difficult to automate reliably. Each platform has unique accessibility APIs and announcement behaviors. Manual checklists ensure real-world usability. The existing React breadcrumb already has a manual checklist at `testing/accessibility/breadcrumb-accessibility-checklist.md`.

**Alternatives considered**:
- Automated accessibility testing: Useful for structural checks (landmark presence, focus order) but cannot verify announcement quality or screen reader UX.
- Hybrid approach: Adds complexity without proportional benefit at this stage; can be added later.

## Decision 3: Token generation pipeline

**Decision**: Use the existing `build-platform-tokens.mjs` pipeline which already reads `packages/tokens/data/components/breadcrumb.json` and generates platform-specific artifacts via `renderSwiftUIArtifacts`, `renderKotlinArtifacts`, and `renderWindowsArtifacts`.

**Rationale**: The breadcrumb token file (`breadcrumb.json`) already exists and defines layout, typography, item role colors, and separator colors. The build pipeline already handles converting these into platform-specific generated files (Swift structs, Kotlin data classes, XAML ResourceDictionary). No new tokens are needed; the pipeline just needs to be run with breadcrumb tokens included.

**Alternatives considered**:
- Custom token generation per platform: Rejected because the existing pipeline is the established pattern used by Button and must be followed per FR-012.

## Decision 4: File structure per platform

**Decision**: Follow the Button component pattern exactly:

| Platform | Component file | Generated tokens file |
|----------|---------------|----------------------|
| SwiftUI | `packages/swiftui/components/Breadcrumb.swift` | `packages/swiftui/.generated/ZDSBreadcrumbTokens.swift` |
| Kotlin | `packages/kotlin/components/Breadcrumb.kt` | `packages/kotlin/.generated/ZDSBreadcrumbTokens.kt` |
| Windows | `packages/windows/components/Breadcrumb.xaml` + `Breadcrumb.xaml.cs` | `packages/windows/.generated/BreadcrumbTokens.xaml` |

**Rationale**: FR-012 requires following the established Button pattern. This ensures consistency for developers familiar with the codebase.

**Alternatives considered**:
- None — this is a constitutional requirement.

## Decision 5: Overflow logic placement

**Decision**: Each platform implements its own `collapseBreadcrumbItems` equivalent following the same algorithm as React (preserve first item, insert collapsed summary, preserve last N-2 items). The logic is lightweight enough that platform-native implementation is cleaner than a shared cross-platform utility.

**Rationale**: The collapse algorithm is simple (slice, insert, return) and benefits from using native collection APIs. Sharing it across platforms would require a shared format or serialization layer that adds unnecessary complexity.

**Alternatives considered**:
- Shared overflow logic in a common format: Would require a shared data format and parser on each platform, adding dependencies for minimal logic.

## Decision 6: Separator rendering

**Decision**: Each platform renders a chevron-right icon as a decorative separator using native drawing primitives (SF Symbols on SwiftUI, Compose Icon on Kotlin, WinUI FontIcon/PathIcon on Windows).

**Rationale**: The spec requires decorative chevrons. Each platform has its own icon system that integrates with accessibility frameworks to mark decorative elements as hidden from assistive technology.

**Alternatives considered**:
- Text-based "›" character: Less visually consistent across platforms and harder to control sizing/alignment.
