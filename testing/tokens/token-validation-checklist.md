# Token Validation Checklist

## Structural Checks

- [x] Raw palette file exists
- [x] Semantic color file exists
- [x] Component token scaffold file exists
- [x] Theme files exist for light and dark
- [x] Typography, spacing, and radius token files exist

## Validation Execution

- [x] Run `node testing/tokens/validate-tokens.mjs`
- [x] Confirm all semantic tokens referenced by themes are present
- [x] Confirm component scaffold references semantic tokens only
- [x] Confirm no forbidden token names appear

## Brand Review

- [x] Review Seed differentiation notes against the current palette
- [x] Confirm the palette remains visually continuous with `#5e6ad2`
- [x] Review contrast-sensitive pairings for primary text, inverse text, and status foregrounds

## Notes

- Seed differentiation baseline: Seed 구조는 참고하되, 현재 palette는 `#5e6ad2` 중심의 인디고 계열을 기반으로 teal/amber 보조 색을 추가해 브랜드 인상을 분리한다.
- Validation result: `node testing/tokens/validate-tokens.mjs` passed with 8 validated files, 24 semantic tokens, and 8 palette families.
- Contrast-sensitive review: `color.fg.primary`, `color.fg.inverse`, and all `color.status.*.fg` tokens were mapped to stronger palette steps in each theme.
