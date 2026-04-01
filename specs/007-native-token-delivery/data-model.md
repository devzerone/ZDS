# Data Model: 네이티브 토큰 전달 구조

## Entity: SharedTokenSource

**Description**: The canonical source of semantic, foundation, theme, and
component token data used to derive all downstream token artifacts.

**Fields**:

- `source_root`: Stable repository path under `packages/tokens/data/`
- `token_domains`: Foundation and component token groupings such as color,
  spacing, radius, typography, themes, and components
- `semantic_references`: References from semantic tokens or component tokens to
  lower-level values
- `source_version`: Reviewable revision state of the source artifacts

**Validation Rules**:

- Shared token meaning MUST originate from `packages/tokens/data/`.
- No native package may redefine the same token domains as an upstream source.
- Component token references MUST resolve through the shared token chain.

## Entity: NormalizedTokenGraph

**Description**: A platform-agnostic resolved representation of the shared token
source used as the basis for platform-native artifact generation.

**Fields**:

- `foundation_tokens`: Resolved color, spacing, radius, and typography values
- `theme_profiles`: Light and dark token mappings where applicable
- `component_tokens`: Resolved component token groups such as Button and Breadcrumb
- `semantic_aliases`: Shared semantic names preserved for downstream generation
- `source_trace`: Mapping back to original source token names for reviewability

**Validation Rules**:

- Every generated platform artifact MUST be traceable to a normalized token entry.
- Semantic names MUST remain stable relative to the shared token source.
- Theme and component relationships MUST not be dropped during normalization.

## Entity: PlatformTokenArtifact

**Description**: A generated token surface for one platform package, expressed
in the idiomatic format of that platform.

**Fields**:

- `platform_name`: Stable identifier such as `swiftui`, `kotlin`, or `windows`
- `artifact_path`: Repository location of the generated token artifact
- `artifact_kind`: Platform-native representation type such as source file,
  resource file, or theme dictionary
- `included_domains`: Token domains included in the artifact
- `generation_status`: Current synchronization state relative to the shared source

**Validation Rules**:

- Each target native platform MUST have an explicit artifact location.
- `artifact_path` MUST be owned by the token delivery workflow and documented.
- Generated artifacts MUST not become manual source-of-truth files.

## Entity: NativeTokenConsumer

**Description**: A native package module or component file that consumes
platform token artifacts to render UI behavior and styling.

**Fields**:

- `package_root`: One of `packages/swiftui/`, `packages/kotlin/`, or `packages/windows/`
- `consumer_surface`: The specific component or module consuming tokens
- `artifact_dependencies`: Platform token artifacts required by the consumer
- `manual_edit_boundary`: Description of what maintainers may edit directly

**Validation Rules**:

- Consumers MUST reference approved platform token artifacts rather than CSS files.
- Consumers MUST avoid introducing new raw shared design values when an approved token exists.
- Manual edit boundaries MUST distinguish generated token files from authored component code.

## Entity: TokenDeliveryRule

**Description**: A repository rule describing how shared tokens move from source
to normalized model to platform-native artifact to consuming package.

**Fields**:

- `source_scope`: The token source paths included in the rule
- `generation_scope`: The scripts or build layer responsible for transformation
- `target_platforms`: Platforms covered by the rule
- `validation_scope`: Checks ensuring the rule remains satisfied
- `exception_policy`: Reference to how parity exceptions are tracked

**Validation Rules**:

- Every supported native platform MUST be covered by at least one token delivery rule.
- Generation rules MUST preserve source-of-truth ownership.
- Validation scope MUST detect missing or stale generated artifacts.

## Entity: ArtifactFreshnessRecord

**Description**: A validation-facing record that indicates whether generated
platform token artifacts are synchronized with the current shared token source.

**Fields**:

- `artifact_path`: Generated artifact under review
- `source_paths`: Shared source files relevant to the artifact
- `status`: Fresh, stale, missing, or unknown
- `last_verified_by`: Validation command or reviewer-facing process
- `resolution_action`: Expected remediation path when status is not fresh

**Validation Rules**:

- Every generated platform artifact MUST have a detectable freshness state.
- Missing artifacts MUST fail validation rather than silently passing.
- Resolution guidance MUST point maintainers back to the approved generation path.

## Relationships

- `SharedTokenSource` feeds one `NormalizedTokenGraph`.
- `NormalizedTokenGraph` produces many `PlatformTokenArtifact` records.
- Each `PlatformTokenArtifact` is consumed by one or more `NativeTokenConsumer` surfaces.
- `TokenDeliveryRule` governs the movement from `SharedTokenSource` through `PlatformTokenArtifact`.
- `ArtifactFreshnessRecord` validates whether each `PlatformTokenArtifact` remains aligned with the `SharedTokenSource`.
