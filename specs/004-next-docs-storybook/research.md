# Research: Design System Docs And Preview

## Decision 1: Use Next.js App Router as the primary documentation surface

**Decision**: Convert `apps/docs` into a Next.js App Router-based documentation
site that owns design-system navigation, foundation guidance, component
guidance, accessibility notes, and parity summaries.

**Rationale**: The repository already has human-readable documentation content
under `apps/docs/`, but it is not yet deployable or navigable as a site. A
single documentation app provides a stable entry point for contributors and
keeps long-form guidance separate from implementation packages.

**Alternatives considered**:

- Keep `apps/docs` as raw Markdown files only.
  Rejected because raw files are not a deployable documentation experience and
  do not satisfy the feature's publishable-build requirement.
- Put all documentation directly into Storybook docs mode.
  Rejected because the feature needs broader design-system information such as
  foundation tokens, parity context, and navigation beyond component previews.

## Decision 2: Keep Storybook as a separate preview surface that consumes the real React package

**Decision**: Add Storybook as a standalone preview environment that reads
stories colocated with the React components in `packages/react/components/**`
and renders the exported shared implementation rather than hand-built demo
copies.

**Rationale**: Storybook is strongest as an interactive inspection tool for
component APIs and state combinations. Keeping it separate from the docs app
preserves that role and prevents the docs site from becoming the only place to
test live component behavior.

**Alternatives considered**:

- Embed all previews directly inside the docs app with custom demo pages.
  Rejected because it would blur the responsibilities of docs and preview and
  encourage duplicated example wiring.
- Create a separate `apps/storybook` project that re-exports every component.
  Rejected because colocated stories in `packages/react/components/` make
  ownership clearer and scale better as more components are added.

## Decision 3: Treat existing Markdown files as content sources, not final delivery format

**Decision**: Reuse the current Markdown documentation under `apps/docs/` as
source material, but normalize it into route-backed content owned by the docs
app so navigation, linking, and deployable builds stay consistent.

**Rationale**: The repository already has useful component and foundation
writing, especially for Button. Reusing those materials protects previous work
while allowing a structured documentation information architecture.

**Alternatives considered**:

- Rewrite all docs content from scratch as page components only.
  Rejected because it discards existing content and raises the cost of adding
  the first documentation site.
- Keep Markdown files outside the docs app and link to them from the site.
  Rejected because split ownership would create broken navigation and reduce
  deployment reliability.

## Decision 4: Publish docs and Storybook as separate build artifacts with cross-links

**Decision**: Plan for two publishable outputs: a docs build artifact for the
documentation site and a Storybook build artifact for component preview. The
docs site links out to the relevant Storybook story, and Storybook links back
to canonical docs guidance for the component.

**Rationale**: The feature explicitly asks for deployable structure. Separate
artifacts let each surface keep its purpose while still forming one discovery
journey for users.

**Alternatives considered**:

- Force docs and Storybook into one shared build output.
  Rejected because the tools have different runtime assumptions and build
  products.
- Ship Storybook only for internal review and leave it out of the release flow.
  Rejected because the feature requires preview build validation and release
  readiness.

## Decision 5: Add repository-level validation commands and CI gates for both surfaces

**Decision**: Introduce package and turbo scripts for docs build, Storybook
build, and a combined validation command that CI can run on pushes and pull
requests alongside existing token/spec/component checks.

**Rationale**: Documentation quality degrades quickly when build failures are
not part of the normal release gate. A single repository-level validation path
makes maintainership practical.

**Alternatives considered**:

- Validate docs and Storybook manually before release.
  Rejected because the feature explicitly calls for automated CI checks.
- Depend only on component tests and assume docs and preview stay valid.
  Rejected because navigation, MDX content, and preview configuration can break
  independently of component unit tests.
