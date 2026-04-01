# Research: 네이티브 토큰 전달 구조

## Decision 1: Keep shared token JSON as the only visual authority

**Decision**: Continue using `packages/tokens/data/` as the sole authoritative
source for shared semantic, foundation, theme, and component token meaning
across web and native platforms.

**Rationale**: The constitution requires token ownership to stay in
`packages/tokens/`. Native packages are implementation layers and should not
become alternate token sources. Preserving one shared source prevents platform
drift and keeps parity review anchored in the same vocabulary used by web.

**Alternatives considered**:

- Create platform-specific source token files inside each native package.
  Rejected because ownership would drift downward into implementation layers.
- Treat `tokens.css` as the portable token source.
  Rejected because CSS is a web delivery format, not a cross-platform source of
  truth.

## Decision 2: Generate platform-native artifacts from one normalized token model

**Decision**: Add a normalization step in `packages/tokens/scripts/` that reads
shared token JSON and produces platform-native token artifacts for SwiftUI,
Kotlin, and Windows from one shared intermediate model.

**Rationale**: Each native platform needs an idiomatic token surface, but the
meaning behind colors, spacing, typography, and component states should only be
resolved once. A normalized model avoids re-implementing semantic resolution
logic three times.

**Alternatives considered**:

- Let each platform package parse raw JSON independently.
  Rejected because duplicated resolution logic would drift.
- Generate only web-friendly outputs and manually transcribe them into native
  code.
  Rejected because manual transcription would reintroduce raw-value duplication.

## Decision 3: Keep generated artifacts inside the token delivery workflow, not as hand-edited native code

**Decision**: Treat platform token artifacts as generated outputs with clear
ownership and manual-edit boundaries, and require native packages to consume
those artifacts rather than embedding new raw token values in component files.

**Rationale**: The feature goal is not just portability but maintainability.
Reviewers need to know which files are generated and which files are safe for
manual editing. Clear separation also allows validation to detect stale or
missing outputs.

**Alternatives considered**:

- Store example token values directly inside native component files.
  Rejected because implementation files would become unofficial token sources.
- Check in only documentation about the intended mapping.
  Rejected because documentation alone cannot prevent drift.

## Decision 4: Preserve parity exceptions in spec metadata rather than platform token forks

**Decision**: Continue recording approved platform exceptions in shared spec
metadata and avoid expressing those exceptions by renaming or forking token
structures per platform.

**Rationale**: Parity differences are review metadata, not new token meanings.
Keeping exception policy in spec metadata lets generated artifacts preserve the
shared vocabulary while still allowing native packages to represent approved
platform differences.

**Alternatives considered**:

- Encode exceptions directly into platform-specific token names.
  Rejected because it fragments the shared design language.
- Ignore exception handling until full native support exists.
  Rejected because hidden divergence is explicitly disallowed by the constitution.

## Decision 5: Prove the architecture first with current shared components and validation hooks

**Decision**: Use the existing shared components, especially Button, as the
first end-to-end proof path for native token delivery, and expand validation so
artifact generation and consumption can be checked before broader rollout.

**Rationale**: Button already exists in all native package roots, making it the
lowest-risk surface for defining the delivery path. Validation-first planning
also ensures future native work inherits a measurable workflow instead of a
purely conceptual design.

**Alternatives considered**:

- Design for all future components before validating with a current one.
  Rejected because the plan would remain abstract and harder to review.
- Implement native token delivery with no validation until later.
  Rejected because stale or partial generated artifacts would be hard to detect.
