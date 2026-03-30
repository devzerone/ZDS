# 버튼 컴포넌트 가이드

## 목적

버튼은 화면의 액션 우선순위를 명확하게 전달하는 ZDS의 공통 액션 컴포넌트입니다.
기본 계약은 텍스트 레이블 중심이며, 아이콘은 보조 요소로만 사용합니다.

## Anatomy

- `label`
  버튼 의미를 전달하는 필수 슬롯입니다.
- `leading-icon`
  레이블을 보조하는 선택 슬롯입니다.
- `trailing-icon`
  보조 방향성을 주는 선택 슬롯입니다.

## Variants

### `primary`

- 가장 중요한 액션에 사용합니다.
- 한 액션 그룹에서 반복 사용하지 않습니다.

### `secondary`

- primary를 보조하는 액션에 사용합니다.
- 취소, 대체 경로, 보조 동작에 적합합니다.

### `tertiary`

- 낮은 강조가 필요한 액션에 사용합니다.
- 밀도 높은 리스트나 유틸리티 액션에 적합합니다.

### `destructive`

- 삭제, 초기화, 해제처럼 되돌리기 어려운 액션에 사용합니다.
- 일반 액션 대체용으로 사용하지 않습니다.

## Sizes

- `small`
  조밀한 툴바나 보조 액션 영역에 사용합니다.
- `medium`
  기본 선택지입니다.
- `large`
  주요 CTA나 시각적 여유가 있는 영역에 사용합니다.

## States

- `default`
  바로 실행 가능한 상태입니다.
- `hover`
  포인터 탐색 중임을 보여줍니다.
- `pressed`
  실제 활성화를 시도하는 피드백입니다.
- `focus`
  키보드나 보조기술 포커스를 드러냅니다.
- `disabled`
  현재 실행할 수 없지만 존재는 유지해야 하는 상태입니다.
- `loading`
  진행 중임을 나타내며 중복 실행을 막습니다.

### State precedence

`disabled -> loading -> pressed -> focus -> hover -> default`

`disabled`와 `loading`은 다른 시각 의미를 가져야 합니다.
`loading`은 진행 상태를 보여주고, `disabled`는 비활성 이유가 있는 상태를 뜻합니다.

## Accessibility

- 버튼은 항상 텍스트 레이블을 포함해야 합니다.
- icon-only 버튼은 이 base contract 범위에 포함하지 않습니다.
- focus ring은 hover 없이도 보여야 합니다.
- loading 상태에서는 `aria-busy`와 비활성 상호작용이 함께 제공되어야 합니다.
- disabled 상태는 숨김이 아니라 “지금은 실행 불가”라는 의미를 유지해야 합니다.

## Token dependency

- raw palette 직접 소비는 금지합니다.
- semantic token이 기본 소비층입니다.
- button component token은 semantic token을 참조합니다.
- 구현은 `packages/foundation/tokens/components/button.json`을 기준으로 해야 합니다.

## Platform differences

### Current parity status

| Platform | Status | Gap | Owner | Remediation Target |
|----------|--------|-----|-------|--------------------|
| React | ready | None planned for initial release | design-system-web | 003-button-component |
| SwiftUI | not-started | Platform translation pending after React reference is finalized | design-system-ios | future-release |
| Kotlin | not-started | Compose translation pending after React reference is finalized | design-system-android | future-release |
| Windows | not-started | Windows translation pending after React reference is finalized | design-system-windows | future-release |

Next.js와 Tauri는 별도 parity platform이 아니라 React 소비 환경으로 취급합니다.

## Misuse

- 한 영역에 primary 버튼을 여러 개 반복 배치하지 않습니다.
- 아이콘만으로 의미를 전달하지 않습니다.
- 레이블 없는 액션 버튼을 기본 버튼으로 사용하지 않습니다.
- destructive 스타일을 단순 강조용으로 사용하지 않습니다.

## Selection guide

1. 가장 중요한 액션이면 `primary`
2. primary를 보조하면 `secondary`
3. 낮은 강조의 보조 동작이면 `tertiary`
4. 파괴적 의미가 있으면 `destructive`

문서와 `.pen` 기준선을 함께 보면 각 variant의 우선순위를 일관되게 구분할 수 있어야 합니다.
