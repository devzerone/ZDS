# Quickstart: 버튼 플랫폼 확장

## Goal

기존 React 기준 버튼 계약을 유지하면서 SwiftUI, Kotlin, Windows까지 같은
사용자 의미와 parity metadata를 갖는 공통 버튼 컴포넌트 체계로 확장한다.

## Planned Artifact Order

1. `spec/components/button/button.spec.json`에서 플랫폼 parity profile, 예외, readiness 기준을 먼저 확정한다.
2. `packages/tokens/data/components/button.json`에서 모든 플랫폼이 소비할 공통 button token 의미를 검토하고 필요한 parity 설명을 보강한다.
3. `pen/components/button/button.pen`에서 cross-platform review에 필요한 variant, state, exception annotation을 보완한다.
4. `apps/docs/content/components/button.mdx`와 `apps/docs/app/components/button/page.tsx`에 플랫폼별 지원 범위와 예외를 반영한다.
5. `packages/react/src/components/button/`와 필요 시 `packages/react/src/primitives/button/`에서 기존 React 기준선을 parity 관점으로 정리한다.
6. `packages/swiftui/components/`, `packages/kotlin/components/`, `packages/windows/components/`에 shared contract를 따르는 첫 버튼 구현 또는 scaffold를 추가한다.
7. `testing/spec/`, `testing/docs/`, `testing/accessibility/`, `testing/visual/`에 parity 확인 흐름과 누락 감지 기준을 추가한다.

## Implementation Checklist

### 1. Contract first

- shared variant, size, state, slot 이름을 플랫폼별로 재명명하지 않는다.
- React 상태를 기준선으로 삼되 React 전용 용어를 새 계약에 스며들게 하지 않는다.
- readiness, gap, owner, remediation target이 모든 대상 플랫폼에 대해 기록되는지 확인한다.

### 2. Exception policy

- 플랫폼 차이는 hidden divergence가 아니라 documented exception으로 다룬다.
- `hover`와 `pressed`는 계약에서 삭제하지 말고 입력 방식 차이를 예외로 설명한다.
- icon-only button, button group, 플랫폼별 독자 variant는 이번 범위에 넣지 않는다.

### 3. Artifact sync

- docs와 Storybook 안내가 shared spec의 parity 상태와 같은 내용을 말하는지 확인한다.
- `.pen` 기준선이 상태 의미와 예외 검토에 충분한지 검토한다.
- token 의미가 platform-local naming 없이 재사용되는지 확인한다.

### 4. Platform implementation

- React는 `src/primitives/`와 `src/components/` 경계를 유지한다.
- SwiftUI, Kotlin, Windows는 공통 variant/size/state 이름을 그대로 따른다.
- 로딩 잠금, 비활성 discoverability, label-required 규칙은 모든 플랫폼에서 유지한다.

### 5. Verification

- spec validation이 플랫폼 parity profile의 completeness를 확인하도록 확장한다.
- docs validation이 문서 표면의 parity 설명과 shared spec의 상태가 일치하는지 확인하도록 확장한다.
- accessibility 및 visual review artifact에 플랫폼 예외와 상태 의미 비교 항목을 추가한다.
- 플랫폼 구현이 부분 지원 상태라면 누락 항목이 검증 결과에서 드러나야 한다.

## Handoff to `/speckit.tasks`

다음 단계에서는 shared contract 업데이트를 선행 의존성으로 두고, 그 뒤에
docs/visual/validation 정렬 작업과 플랫폼별 구현 작업을 분리해 task ordering을
설계한다. 공통 파일인 `spec/components/button/button.spec.json`과
`packages/tokens/data/components/button.json`은 병렬 수정보다 우선순위 순차 편집이
적합하다.
