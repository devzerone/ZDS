# Quickstart: Apply the Design System Monorepo Structure

## Goal

Create the canonical directory layout for the ZDS design-system monorepo while
preserving required empty directories in version control.

## Steps

1. Review [spec.md](/home/choiho/zerone/ZDS/specs/001-monorepo-structure/spec.md),
   [plan.md](/home/choiho/zerone/ZDS/specs/001-monorepo-structure/plan.md), and
   [repository-layout-contract.md](/home/choiho/zerone/ZDS/specs/001-monorepo-structure/contracts/repository-layout-contract.md).
2. Create the required top-level directories: `apps`, `foundation`, `spec`,
   `pen`, `docs`, `testing`, `platforms`, and `tools`.
3. Create the required reserved subdirectories for platform and layer ownership.
4. Add `.gitkeep` to any required directory that is intentionally empty.
5. Verify that no directory implies product runtime ownership outside the design
   system scope.
6. Confirm that Tauri space is reserved only for shell-specific or desktop-only
   work.

## Validation Checklist

- Every constitutional layer has a top-level home.
- Every supported platform has a reserved directory.
- Empty required directories are tracked intentionally.
- No extra top-level product-oriented directories were introduced.
- The resulting layout matches the repository layout contract.
