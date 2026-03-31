# Release Environment Variables

This file documents the environment variables used by the ZDS release workflows.

## Local `.env`

Copy `.env.example` to `.env` when you need to run publish steps manually.

```sh
cp .env.example .env
```

## Required Variables

### `NPM_TOKEN`

- Used by: JS package publishing workflow
- Required for:
  - `@zds/tokens`
  - `@zds/react`
  - `@zds/foundation`

### `GITHUB_ACTOR`

- Used by: Kotlin GitHub Packages publish flow
- Required when publishing to GitHub Packages outside GitHub Actions

### `GITHUB_TOKEN`

- Used by:
  - Kotlin Maven publish
  - Windows NuGet publish
- In GitHub Actions this is provided automatically as `${{ secrets.GITHUB_TOKEN }}`

### `PACKAGE_VERSION`

- Used by:
  - Kotlin publish
- Optional for local workflows when you want to override the version manually

## CI Secrets

### Repository secrets to create

- `NPM_TOKEN`

### Built-in GitHub Actions tokens already used

- `GITHUB_TOKEN`

## Notes

- SwiftUI release does not require a package registry token because it is delivered through Git tags and GitHub Releases.
- Kotlin and Windows releases currently target GitHub Packages, so repository access and package permissions must be enabled.
