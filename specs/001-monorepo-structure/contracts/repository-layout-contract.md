# Repository Layout Contract

This contract defines the canonical directory layout for the ZDS monorepo.
Contributors MUST place new work inside the defined areas and MUST NOT invent new
top-level categories for normal design-system growth.

## Required Top-Level Directories

| Directory | Contract Purpose | Must Remain Tracked When Empty |
|-----------|------------------|--------------------------------|
| `apps/` | Design-system-owned surfaces (documentation site) | Yes |
| `packages/` | Foundation and platform implementation packages | Yes |
| `spec/` | Component and pattern contracts plus parity metadata | Yes |
| `pen/` | Visual source-of-truth artifacts and pattern references | Yes |
| `testing/` | Validation assets for spec, tokens, visual checks, and accessibility | Yes |
| `tools/` | Shared configuration and repository automation | Yes |

## Required Package Reservations

| Package | Required Path | Scope Constraint |
|---------|---------------|------------------|
| Foundation | `packages/foundation/` | Tokens, icons, and shared assets |
| React | `packages/react/` | Shared web implementation surface |
| SwiftUI | `packages/swiftui/` | Apple-native implementation surface |
| Kotlin Compose | `packages/kotlin/` | Compose-style implementation surface |
| Windows Native UI | `packages/windows/` | Windows-native implementation surface |

## Consumer Environment Rules

| Environment | Repository Root | Ownership Rule |
|-------------|-----------------|----------------|
| Next.js | No dedicated top-level root required | Consume shared React UI; keep framework runtime integration in the consuming app or explicit adapters |
| Tauri | No dedicated top-level root required | Consume shared React UI; keep shell integration and desktop orchestration in the consuming app |

## Structural Rules

1. Work that defines visual values MUST live under `packages/foundation/`, not
   under platform directories.
2. Work that defines component or pattern contract MUST live under `spec/`.
3. Visual references for components or patterns MUST live under `pen/`.
4. Repository-owned platform implementations MUST live under `packages/` and
   MUST NOT redefine shared system meaning.
5. Documentation content and the documentation application MUST live under
   `apps/docs/`.
6. Product runtime code MUST NOT be introduced under any directory defined by
   this contract.
5. Product runtime code MUST NOT be introduced under any directory defined by
   this contract.
6. Empty but required directories MUST be preserved with `.gitkeep` or an
   equivalent documented mechanism.
7. Next.js and Tauri MUST NOT require dedicated repository-owned top-level roots
   for this feature.
