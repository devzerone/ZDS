# Token Definition Contract

This contract defines the minimum artifact and naming rules for the
brand-differentiated foundation token set in ZDS.

## Required Token Domains

| Domain | Required Outcome | Notes |
|--------|------------------|-------|
| Color | Raw palette families, semantic color tokens, and theme mappings | Must include 1 primary, 2 secondary, 1 neutral, and 4 state families |
| Component Token Scaffold | Placeholder component-token layer referencing semantic tokens | Must reserve structure for future component specs without bypassing semantic tokens |
| Typography | Role-based text tokens | Must cover title, body, caption, and supporting text roles |
| Spacing | Reusable layout spacing scale | Must provide ordered scale values |
| Radius | Reusable corner radius scale | Must provide ordered scale values |

## Color Contract

1. The primary brand family MUST anchor to `#5e6ad2`.
2. The color hierarchy MUST preserve raw palette tokens separate from semantic
   consumption tokens.
3. Semantic tokens MUST cover foreground, background, border, accent, inverse,
   disabled, and the required state meanings.
4. Light and dark theme mappings MUST both exist for every required semantic
   color token.
5. Downstream platform packages MUST consume semantic or theme tokens, not raw
   palette tokens, unless a documented foundation-layer exception exists.
6. Component-token scaffolds MUST reference semantic tokens rather than raw
   palette tokens.

## Naming Contract

1. Token identifiers MUST use English semantic names.
2. Token identifiers MUST NOT use platform names, framework names, or raw visual
   nicknames such as `purpleHover` or `gray200`.
3. Explanatory guidance and usage notes for contributors MUST be written in Korean.

## Documentation Contract

1. Foundation documentation for this feature MUST explain raw palette,
   semantic tokens, and theme mappings separately.
2. Documentation MUST describe intended usage and misuse boundaries for key
   semantic color groups.
3. Documentation MUST explain how light and dark themes preserve the same token
   meaning.

## Validation Contract

1. Token review MUST verify that all required token domains exist.
2. Token review MUST verify that both themes are complete.
3. Validation MUST check accessibility-sensitive semantic token pairings for
   contrast regressions.
4. Validation MUST confirm that the primary family variations remain visually
   continuous with `#5e6ad2`.
5. Validation MUST include an executable check path, not only a written checklist.
6. Validation MUST include a documented review that the resulting palette is
   visually distinct from the Seed reference.
