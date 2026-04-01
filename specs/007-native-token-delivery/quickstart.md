# Quickstart: 네이티브 토큰 전달 구조

## Goal

공유 JSON token source를 유지하면서 SwiftUI, Kotlin, Windows package가 각자
플랫폼 네이티브 token artifact를 소비하도록 전달 구조를 정의하고 검증 기준을
명확히 한다.

## Planned Artifact Order

1. `specs/007-native-token-delivery/spec.md`, `plan.md`, `research.md`에서 source ownership, generation path, validation boundary를 먼저 확정한다.
2. `packages/tokens/data/`에서 native delivery에 필요한 foundation token과 component token 범위를 확인한다.
3. `packages/tokens/scripts/`와 필요 시 `packages/tokens/src/`에서 shared token normalization 및 platform artifact generation 구조를 정의한다.
4. `packages/swiftui/`, `packages/kotlin/`, `packages/windows/`에서 generated artifact를 소비할 package boundary와 수동 편집 경계를 정한다. native package의 `.generated/` 디렉터리는 동기화 산출물이며 source of truth가 아니다.
5. `apps/docs/`에 contributor-facing native token delivery guidance가 필요한지 판단하고 필요한 경우 반영한다.
6. `testing/tokens/`와 native package validation entrypoints에 artifact freshness 및 consumption 검증 흐름을 추가한다.

## Implementation Checklist

### 1. Source ownership first

- `packages/tokens/data/`를 계속 단일 source of truth로 유지한다.
- native package가 upstream token source처럼 동작하지 않도록 경계를 분명히 한다.
- CSS는 web delivery surface로만 취급하고 native token source로 승격하지 않는다.

### 2. Generation boundary

- semantic resolution 로직을 플랫폼마다 복제하지 않고 shared normalization 단계로 모은다.
- generated artifact 위치와 manual edit 위치를 분명히 구분한다.
- Button을 첫 end-to-end proof path로 사용해 architecture를 검증한다.

### 3. Native consumer rules

- SwiftUI, Kotlin, Windows component는 generated artifact를 기준으로 값을 읽는다.
- component 코드에 raw shared value를 새로 추가하지 않는다.
- platform syntax adaptation은 허용하되 semantic naming fork는 금지한다.

### 4. Exception handling

- parity exception은 `spec/components/...` metadata에 남긴다.
- platform-specific token naming으로 exception을 숨기지 않는다.
- hover, pressed 같은 기존 승인 예외 정책은 delivery architecture 밖으로 밀어내지 않는다.

### 5. Verification

- token validation이 generated artifact 존재 여부와 freshness를 확인하도록 확장한다.
- stale하거나 수동 수정된 generated artifact는 validation failure로 처리한다.
- native package validation이 generated artifact consumption 경로를 확인하도록 확장한다.
- contributor가 어떤 파일을 수정해야 하는지 docs 또는 feature artifact에서 바로 찾을 수 있어야 한다.

## Handoff to `/speckit.tasks`

다음 단계에서는 `packages/tokens/`의 generation 레이어를 선행 의존성으로 두고,
그 다음 native package adoption, docs guidance, validation 확장 작업을 나누는
순서가 적합하다. 공통 소스와 generator 파일은 병렬 수정보다 순차 편집이
안전하다.
