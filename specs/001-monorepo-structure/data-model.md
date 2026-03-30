# Data Model: Design System Monorepo Structure

## Entity: RepositoryLayer

**Description**: A top-level repository area aligned to one constitutional
responsibility.

**Fields**:

- `name`: Stable layer identifier such as `foundation` or `testing`
- `purpose`: What kind of artifacts belong in the layer
- `allowed_artifacts`: Artifact categories permitted inside the layer
- `forbidden_artifacts`: Artifact categories that must not be stored in the layer
- `owner_scope`: Whether the layer is shared, platform-specific, or governance-only

**Validation Rules**:

- `name` MUST use semantic naming aligned with the constitution.
- `purpose` MUST map to exactly one primary concern.
- `allowed_artifacts` and `forbidden_artifacts` MUST not overlap.

## Entity: CanonicalDirectory

**Description**: A required directory whose presence communicates where future
work belongs, even when no implementation file exists yet.

**Fields**:

- `path`: Repository-relative directory path
- `layer`: Parent `RepositoryLayer`
- `required`: Whether the directory must exist at all times
- `tracked_when_empty`: Whether the directory must remain in version control when
  empty
- `preservation_strategy`: Mechanism used to retain the directory, such as
  `.gitkeep`

**Validation Rules**:

- `path` MUST be unique within the repository contract.
- `required` directories MUST define a `preservation_strategy` if they may be
  empty.
- `tracked_when_empty` MUST be true for reserved platform areas and planned
  governance locations.

## Entity: PlatformArea

**Description**: A reserved location for design-system implementation work on a
repository-owned UI platform.

**Fields**:

- `platform_name`: React, SwiftUI, Kotlin Compose, or Windows Native UI
- `root_path`: Repository-relative platform root
- `intended_scope`: Description of what may be implemented there
- `parity_role`: How the platform participates in parity tracking
- `exception_rules`: Platform-specific limitations or governance notes

**Validation Rules**:

- `platform_name` MUST be one of the repository-owned implementation platforms in
  this feature.
- `root_path` MUST live under `platforms/`.
- `parity_role` MUST not redefine the shared component contract.

## Entity: ConsumerEnvironment

**Description**: A framework or runtime that consumes shared React UI without
becoming its own repository-owned implementation root.

**Fields**:

- `environment_name`: Next.js or Tauri
- `consumes_from`: Shared React implementation source
- `application_owned_concerns`: Runtime integration concerns handled outside the
  design-system repository
- `optional_adapter_scope`: Shared adapter boundary if the repository later
  chooses to publish one

**Validation Rules**:

- `environment_name` MUST NOT create a required top-level repository root in this
  feature.
- `application_owned_concerns` MUST remain outside the design-system source-of-
  truth hierarchy unless a future feature explicitly elevates a shared adapter.

## Relationships

- A `RepositoryLayer` contains many `CanonicalDirectory` entries.
- A `PlatformArea` is a specialized `CanonicalDirectory` anchored under the
  implementation concern of the repository.
- A `ConsumerEnvironment` consumes from the React implementation layer without
  becoming a `PlatformArea`.
- Structural reviews validate that every required `CanonicalDirectory` exists and
  that every `PlatformArea` and `ConsumerEnvironment` remains within its allowed
  scope.
