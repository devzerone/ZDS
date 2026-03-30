# Quickstart: Define the Brand-Differentiated Token Set

## Goal

Create the first ZDS foundation token set with a raw-to-semantic-to-component
hierarchy, light and dark themes, and a primary brand family anchored to
`#5e6ad2`.

## Steps

1. Review [spec.md](/home/choiho/zerone/ZDS/specs/002-define-design-tokens/spec.md),
   [plan.md](/home/choiho/zerone/ZDS/specs/002-define-design-tokens/plan.md), and
   [token-definition-contract.md](/home/choiho/zerone/ZDS/specs/002-define-design-tokens/contracts/token-definition-contract.md).
2. Define raw palette families in `packages/foundation/tokens/`, starting with
   the primary family anchored to `#5e6ad2`, then the two secondary families,
   neutral family, and four state families.
3. Define semantic color tokens that map foreground, background, border, accent,
   inverse, disabled, and state meanings to palette steps.
4. Create component-token scaffolds that reserve semantic references for future
   component specs.
5. Create light and dark theme mappings for every required semantic color token.
6. Define typography, spacing, and radius token scales using English identifiers.
7. Add Korean guidance in `apps/docs/foundation/` explaining token intent,
   usage rules, and raw-versus-semantic boundaries.
8. Add or update executable validation assets in `testing/tokens/` for
   completeness, theme coverage, naming, and key contrast-sensitive pairings.
9. Record a Seed differentiation review showing how the resulting palette
   remains visually distinct from the reference.

## Validation Checklist

- Raw palette and semantic token layers are separated.
- Component-token scaffold exists and references semantic tokens.
- The primary family is clearly anchored to `#5e6ad2`.
- Light and dark themes both map all required semantic tokens.
- Token identifiers use English semantic naming only.
- Contributor-facing explanations are written in Korean.
- Typography, spacing, and radius tokens exist alongside color tokens.
- Validation covers executable token completeness checks and critical contrast-sensitive usages.

## Completion Notes

- Foundation token files were created under `packages/foundation/tokens/`.
- Contributor-facing documentation was added under `apps/docs/foundation/`.
- Executable validation is available via `node testing/tokens/validate-tokens.mjs`.
- Initial validation passed for file presence, semantic/theme coverage, and component scaffold references.
