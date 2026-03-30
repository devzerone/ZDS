# Data Model: Design System Docs And Preview

## Entity: DocsPage

**Description**: A canonical documentation page rendered by the docs site for a
foundation topic or a component.

**Fields**:

- `slug`: Stable route segment such as `foundation/tokens` or `components/button`
- `title`: User-facing page title
- `section`: Top-level grouping such as `foundation` or `components`
- `summary`: Short description shown in navigation or index pages
- `content_source`: Backing content asset or page composition source
- `source_refs`: Links to related `spec`, `.pen`, token, or implementation artifacts
- `preview_link`: Optional link to a related interactive preview
- `parity_snapshot`: Current platform coverage summary when relevant

**Validation Rules**:

- `slug` MUST remain stable enough for durable documentation links.
- `section` MUST map to a visible documentation navigation group.
- `source_refs` MUST point only to canonical design-system artifacts.
- `preview_link` MUST be present for documented reference components that have interactive previews.

## Entity: PreviewStory

**Description**: A Storybook story that exposes a supported component state or
usage pattern using the shared React implementation.

**Fields**:

- `story_id`: Stable story identifier
- `component_name`: Shared React component name, initially `Button`
- `story_kind`: Example category such as playground, variants, or states
- `args_surface`: Exposed controls for user-adjustable inputs
- `source_component_ref`: Path to the real component export being previewed
- `docs_link`: Canonical link back to the docs page
- `coverage_notes`: What part of the contract the story demonstrates

**Validation Rules**:

- `source_component_ref` MUST target the shared React component, not a duplicate demo implementation.
- `args_surface` MUST only expose supported contract inputs.
- `docs_link` MUST resolve to the canonical documentation page for reference components.

## Entity: NavigationEntry

**Description**: A discoverable path that connects users to documentation and
preview destinations.

**Fields**:

- `label`: User-facing navigation text
- `destination`: Docs route or preview URL
- `entry_type`: Site navigation, in-page related link, or preview backlink
- `audience`: Designer, engineer, reviewer, or shared
- `order`: Display order within its navigation group

**Validation Rules**:

- Every `NavigationEntry` MUST lead to a valid destination.
- Component docs entries MUST remain discoverable from primary site navigation.
- Reference component docs MUST include at least one path to preview and one path back to docs.

## Entity: PublishArtifact

**Description**: A build output that can be deployed for a documentation or
preview surface.

**Fields**:

- `name`: Artifact name such as `docs-site` or `storybook`
- `surface`: Publishing surface it represents
- `build_command`: Repository command used to generate it
- `output_path`: Expected build output directory
- `deployment_unit`: Where or how it is published
- `validation_owner`: Repository validation command that confirms it builds

**Validation Rules**:

- Each publishing surface MUST map to exactly one `PublishArtifact`.
- `build_command` and `validation_owner` MUST be executable from the repository root.
- `output_path` MUST be stable enough for CI and deployment automation.

## Entity: DocumentationPreviewLink

**Description**: A relationship record that keeps docs and preview surfaces in
sync for a single reference component.

**Fields**:

- `component_name`: Stable shared component identifier
- `docs_slug`: Canonical documentation route
- `story_id`: Canonical preview story
- `shared_source_refs`: Canonical spec, token, pen, and component paths that both surfaces rely on
- `sync_expectation`: What content must remain consistent across docs and preview

**Validation Rules**:

- `docs_slug` and `story_id` MUST refer to the same shared component contract.
- `shared_source_refs` MUST include the component implementation and at least one non-implementation source-of-truth layer.
- `sync_expectation` MUST describe user-visible consistency, not internal tool behavior.

## Relationships

- `DocsPage` may reference one `DocumentationPreviewLink`.
- `PreviewStory` participates in one `DocumentationPreviewLink`.
- `NavigationEntry` points users to `DocsPage` and `PreviewStory` destinations.
- `PublishArtifact` exists for the docs site and for Storybook.
- `DocumentationPreviewLink` enforces that both surfaces stay anchored to the
  same canonical component artifacts.
