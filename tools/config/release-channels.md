# Release Channels

This document defines the default deployment target for each ZDS delivery surface.

## JavaScript Packages

- `@zds/tokens`
- `@zds/react`
- `@zds/foundation`

**Deploy Target**: npm registry  
**Tag Pattern**: `js-vX.Y.Z`  
**Auth**: `NPM_TOKEN`

These packages are published as public scoped npm packages so React and token consumers can install them without GitHub Package registry remapping.

## SwiftUI Package

- `@zds/swiftui` workspace package
- Swift package product: `ZDSSwiftUI`

**Deploy Target**: Git tag + GitHub Release for Swift Package Manager consumption  
**Tag Pattern**: `swiftui-vX.Y.Z`

Swift Package Manager consumes the repository directly from Git tags. The release workflow validates `swift build` on macOS before creating the GitHub release.

## Kotlin Package

- `@zds/kotlin` workspace package

**Deploy Target**: GitHub Packages Maven registry  
**Tag Pattern**: `kotlin-vX.Y.Z`

Published artifact coordinates:

- Group: `dev.zerone.zds`
- Artifact: `zds-kotlin`

## Windows Package

- `@zds/windows` workspace package

**Deploy Target**: GitHub Packages NuGet registry  
**Tag Pattern**: `windows-vX.Y.Z`

Published package metadata:

- Package ID: `ZDS.Windows`

## Documentation

- `@zds/docs`

**Deploy Target**: static-site hosting  
**Current Workflow**: validation only inside the repository  

If docs deployment is needed later, prefer a dedicated GitHub Pages or Vercel workflow separate from the package release channels above.
