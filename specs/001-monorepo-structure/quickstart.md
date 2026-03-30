# Quickstart: Apply the Design System Monorepo Structure

## Goal

Create the canonical directory layout for the ZDS design-system monorepo while
preserving required empty directories in version control.

## Steps

1. Review [spec.md](/home/choiho/zerone/ZDS/specs/001-monorepo-structure/spec.md),
   [plan.md](/home/choiho/zerone/ZDS/specs/001-monorepo-structure/plan.md), and
   [repository-layout-contract.md](/home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md).
2. Create the required top-level directories: `apps`, `packages`, `spec`,
   `pen`, `testing`, and `tools`.
3. Create the required package subdirectories for foundation and platform
   implementations under `packages/`.
4. Create the documentation site with content subdirectories under `apps/docs/`.
4. Add `.gitkeep` to any required directory that is intentionally empty.
5. Verify that no directory implies product runtime ownership outside the design
   system scope.
6. Confirm that Next.js and Tauri are documented as React consumer environments
   and do not require dedicated repository-owned roots.

## Validation Checklist

- Every constitutional layer has a top-level home.
- Foundation and platform packages are grouped under `packages/`.
- Documentation is consolidated under `apps/docs/`.
- Every repository-owned implementation platform has a reserved package directory.
- Next.js and Tauri do not introduce new root categories.
- Empty required directories are tracked intentionally.
- No extra top-level product-oriented directories were introduced.
- The resulting layout matches the repository layout contract.
