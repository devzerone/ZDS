# Repository Layout Contract

This contract defines the canonical directory layout for the ZDS monorepo.
Contributors MUST place new work inside the defined areas and MUST NOT invent new
top-level categories for normal design-system growth.

## Required Top-Level Directories

| Directory | Contract Purpose | Must Remain Tracked When Empty |
|-----------|------------------|--------------------------------|
| `apps/` | Design-system-owned surfaces such as docs or sandboxes | Yes |
| `foundation/` | Tokens, icons, and shared assets | Yes |
| `spec/` | Component and pattern contracts plus parity metadata | Yes |
| `pen/` | Visual source-of-truth artifacts and pattern references | Yes |
| `docs/` | Published system documentation and governance material | Yes |
| `testing/` | Validation assets for spec, tokens, visual checks, and accessibility | Yes |
| `platforms/` | Platform-native implementation areas | Yes |
| `tools/` | Shared configuration and repository automation | Yes |

## Required Platform Reservations

| Platform | Required Root | Scope Constraint |
|----------|---------------|------------------|
| React | `platforms/react/` | Shared web implementation surface |
| Tauri | `platforms/tauri/` | Shell-specific or desktop-only extensions adjacent to React ownership |
| SwiftUI | `platforms/swiftui/` | Apple-native implementation surface |
| Kotlin | `platforms/kotlin/` | Compose-style implementation surface |
| Windows | `platforms/windows/` | Windows-native implementation surface |

## Structural Rules

1. Work that defines visual values MUST live under `foundation/`, not under
   platform directories.
2. Work that defines component or pattern contract MUST live under `spec/`.
3. Visual references for components or patterns MUST live under `pen/`.
4. Platform implementations MUST live under `platforms/` and MUST NOT redefine
   shared system meaning.
5. Product runtime code MUST NOT be introduced under any directory defined by
   this contract.
6. Empty but required directories MUST be preserved with `.gitkeep` or an
   equivalent documented mechanism.
