# @zds/kotlin

Kotlin parity package for the shared ZDS Button contract.

## Scope

- Preserves shared button variant names: `primary`, `secondary`, `tertiary`, `destructive`
- Preserves shared size names: `small`, `medium`, `large`
- Guarantees core parity states: `default`, `focus`, `disabled`, `loading`
- Documents touch-first exceptions for `hover` and `pressed`

## Local Build

```sh
cd packages/kotlin
gradle --no-daemon build
```

## CI

Validated in `.github/workflows/button-native-validation.yml` on `ubuntu-latest`.
