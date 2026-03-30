# Quickstart: 버튼 컴포넌트

## Goal

버튼 컴포넌트를 ZDS constitution이 요구하는 전체 라이프사이클 산출물과 함께
구현하고 검증한다.

## Planned Artifact Order

1. `spec/components/button/button.spec.json`에 canonical button contract를 작성한다.
2. `packages/foundation/tokens/components/button.json`에 variant, size, state별 component token 매핑을 추가한다.
3. `pen/components/button/`에 `.pen` 시각 기준선과 상태/크기 비교 아트를 만든다.
4. `apps/docs/components/button.md`에 목적, anatomy, variants, sizes, states, accessibility, misuse를 문서화한다.
5. `packages/react/components/button/`에 첫 구현을 추가한다.
6. `testing/spec/`, `testing/accessibility/`, `testing/visual/`에 검증 자산을 추가한다.

## Implementation Checklist

### 1. Contract first

- spec의 variant, size, state, slot 이름을 먼저 확정한다.
- React 구현 전에 JSON spec이 모든 이름의 기준이 되는지 확인한다.
- icon-only control이 base button 범위에 들어오지 않도록 scope를 유지한다.

### 2. Token mapping

- raw token 직접 참조를 피하고 semantic token 또는 component token 경로로만 연결한다.
- variant마다 background, foreground, border, focus treatment를 정의한다.
- size마다 padding, height, label typography, icon spacing 규칙을 정의한다.
- loading과 disabled 상태가 동일하지 않도록 상태별 의미 차이를 반영한다.

### 3. Visual reference

- `.pen` 아트보드에는 최소 4 variants x 3 sizes x 주요 states 비교가 보여야 한다.
- 강한 배경과 약한 배경 모두에서 가독성을 확인할 수 있는 frame을 포함한다.
- misuse 예시를 넣을지 여부는 docs와 시각 기준선의 중복을 고려해 정한다.

### 4. React implementation

- shared contract 이름을 그대로 사용한다.
- label을 기본 슬롯으로 강제하고 leading/trailing icon은 선택 슬롯으로 둔다.
- loading 상태에서는 중복 activation이 일어나지 않는 동작을 보장한다.
- focus-visible 경험이 hover와 독립적으로 드러나게 한다.

### 5. Verification

- spec completeness 검증을 `testing/spec/`에 추가한다.
- accessibility 검증에는 focus visibility, disabled meaning, loading announcement, readable label contrast 확인이 포함되어야 한다.
- visual 검증에는 variant/state baseline 비교가 포함되어야 한다.
- 기존 token validation 흐름과 충돌하지 않도록 버튼 component token 검증 범위를 확장한다.

## Handoff to `/speckit.tasks`

다음 단계에서는 위 산출물 순서를 기준으로 의존성 있는 작업을 쪼개고,
foundation contract/tokens 작업이 React 구현보다 먼저 오도록 task ordering을
설계한다.
