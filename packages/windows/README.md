# @zds/windows

WinUI 3 parity package for the shared ZDS Button contract.

## Scope

- Preserves shared button variant names: `primary`, `secondary`, `tertiary`, `destructive`
- Preserves shared size names: `small`, `medium`, `large`
- Preserves shared state model including `hover` and `pressed`
- Keeps label-required, loading lock, and disabled discoverability aligned with the shared contract

## Local Build

```sh
cd packages/windows
dotnet build ZDS.Windows.csproj
```

## CI

Validated in `.github/workflows/button-native-validation.yml` on `windows-latest`.
