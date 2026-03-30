# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]  
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

## Summary

[Summarize the design-system change, affected artifacts, and targeted platforms.]

## Scope Classification

**Work Type**: [foundation token change / component / pattern / documentation /
testing / platform parity / release governance]  
**Affected Platforms**: [React / Tauri / SwiftUI / Kotlin Compose / Windows Native
UI]  
**Artifact Layers**: [spec / tokens / .pen / docs / implementations / tests]  
**Parity Impact**: [new surface / contract change / visual alignment / no impact]

## Technical Context

**Spec Location**: [path or NEEDS CLARIFICATION]  
**Token Sources**: [path or NEEDS CLARIFICATION]  
**Pen Sources**: [path or NEEDS CLARIFICATION]  
**Docs Location**: [path or NEEDS CLARIFICATION]  
**Implementation Packages**: [paths by platform or NEEDS CLARIFICATION]  
**Testing Strategy**: [spec validation / token validation / visual regression /
accessibility / platform tests]  
**Target Platforms**: [list exact platforms in scope]  
**Project Type**: design-system monorepo  
**Constraints**: [platform-native fidelity, token-only visual values, parity
recording, or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before research, design, or implementation. Re-check before
merge.*

- [ ] Work stays within design system scope and does not add product or runtime
      logic.
- [ ] JSON spec exists or is updated before implementation work begins.
- [ ] Token mapping exists for every reusable visual decision.
- [ ] `.pen` artifact exists or is updated for every visual component or pattern
      affected.
- [ ] Documentation updates cover purpose, anatomy, variants, states,
      accessibility, token dependencies, and platform differences.
- [ ] Platform parity impact is recorded, including documented exceptions.
- [ ] Tests cover token correctness, spec correctness, visual regression,
      accessibility, and affected platform behavior as applicable.
- [ ] Tauri changes reuse React UI artifacts unless the work is shell-specific.

## Artifact Plan

### Feature Documentation

```text
specs/[###-feature]/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Repository Paths

```text
[List the actual monorepo paths for tokens, spec, .pen, docs, platform packages,
and tests. Remove unrelated paths.]
```

**Structure Decision**: [Explain how the work maps cleanly onto foundation, spec,
pen, docs, implementation, and testing layers.]

## Delivery Plan

1. Define or amend contract in spec.
2. Define or amend token requirements and mapping.
3. Create or update `.pen` artifacts.
4. Update documentation.
5. Implement affected platform packages.
6. Add or update tests.
7. Record parity status and exceptions.
8. Verify release eligibility.

## Exceptions and Justification

> Fill only when requesting a documented exception to the constitution.

| Exception | Justification | Scope | Remediation / Expiration |
|-----------|---------------|-------|---------------------------|
| [e.g., native control behavior mismatch] | [why parity requires exception] | [platform/component] | [release or follow-up] |
