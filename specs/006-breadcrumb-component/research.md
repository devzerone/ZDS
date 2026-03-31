# Research: 브레드크럼프 컴포넌트

## Decision 1: React breadcrumb는 네이티브 navigation semantics를 기본으로 한다

**Decision**: React 구현은 `nav`, ordered list 구조, 링크 항목, 현재 위치 표시를
중심으로 설계하고, 추가 headless dependency는 도입하지 않는다.

**Rationale**: 브레드크럼프의 핵심은 복합 위젯 제어보다 현재 위치와 상위 경로
의미 전달이다. 저장소의 constitution도 native semantic HTML이 계약을 충분히
만족할 때는 기본 선택으로 삼도록 요구하고 있다. 버튼 구현처럼 public
component와 low-level primitive를 나누되, primitive 자체는 네이티브 semantics를
보존하는 얇은 계층이면 충분하다.

**Alternatives considered**:

- Radix 또는 roving tabindex 기반 composite widget: 브레드크럼프는 roving
  focus가 필요한 패턴이 아니며 복잡도만 높인다.
- `div` 기반 커스텀 탐색 구조: 현재 위치와 링크 의미를 DOM semantics가 대신
  전달해주는 장점을 잃는다.

## Decision 2: 브레드크럼프 contract는 button feature와 같은 source-of-truth 체인을 따른다

**Decision**: canonical contract는 `spec/components/breadcrumb/breadcrumb.spec.json`,
visual meaning은 `packages/tokens/data/components/breadcrumb.json`, review baseline은
`pen/components/breadcrumb/breadcrumb.pen`, downstream communication은 docs와
Storybook으로 분리한다.

**Rationale**: 현재 저장소는 버튼 feature에서 contract -> tokens -> pen ->
implementation -> docs/testing 흐름을 이미 검증했다. 브레드크럼프도 같은 패턴을
따라야 후속 검증 스크립트와 docs linking 규칙을 일관되게 재사용할 수 있다.

**Alternatives considered**:

- docs page를 사실상 source-of-truth로 사용하는 방식: constitution의
  source-of-truth chain을 위반한다.
- React props 문서를 contract 대신 사용하는 방식: 플랫폼 parity와 검증 스크립트
  기준을 공통으로 유지하기 어렵다.

## Decision 3: 긴 경로 대응은 축약 policy를 contract에 포함하되 dropdown 확장은 제외한다

**Decision**: v1 contract는 constrained-width path에서 시작점과 현재 위치 보존,
중간 단계 축약 허용, separator 비상호작용 규칙을 포함한다. 그러나 dropdown이
결합된 overflow navigator나 arbitrary path picker는 범위에서 제외한다.

**Rationale**: spec은 긴 경로 대응을 요구하지만 동시에 복합 네비게이션 패턴은
제외한다. 따라서 계획 단계에서는 축약된 표현을 지원하는 정책은 필요하지만,
복잡한 interaction surface를 수반하는 확장 패턴은 후속 feature로 분리하는 것이
가장 일관적이다.

**Alternatives considered**:

- 긴 경로를 전혀 다루지 않는 단순 path-only contract: spec의 FR-007, FR-008을
  충족하지 못한다.
- 즉시 dropdown overflow를 포함하는 확장형 contract: 현재 범위를 넘어가고
  headless/accessibility complexity를 크게 높인다.

## Decision 4: validation은 breadcrumb 전용 spec 검증과 docs-preview 연결 검증을 추가한다

**Decision**: `testing/spec/validate-breadcrumb-spec.mjs`를 신설하고, 기존 docs
validation과 preview-link validation 패턴을 breadcrumb까지 확장한다. token
validation도 breadcrumb component token 파일을 포함하도록 확장한다.

**Rationale**: 현재 저장소는 button feature에서 contract completeness, docs
references, preview path consistency를 자동화하고 있다. 브레드크럼프도 같은
방식으로 검증해야 source artifact drift를 조기에 발견할 수 있다.

**Alternatives considered**:

- 수동 체크리스트만 추가하는 방식: 계약 누락과 docs/story mismatch를 자동으로
  막지 못한다.
- React test만으로 충분하다고 보는 방식: docs, spec, token, preview alignment를
  검증할 수 없다.

## Decision 5: 초기 parity metadata는 React ready, 나머지 플랫폼은 not-started로 기록한다

**Decision**: 브레드크럼프 contract에는 React를 최초 ready surface로 기록하고,
SwiftUI, Kotlin, Windows는 shared metadata에 `not-started` 상태로 표현한다.

**Rationale**: constitution은 placeholder platform roots가 이미 존재하는 이상
parity planning이 shared metadata에 드러나야 한다고 요구한다. 실제 구현이
없더라도 플랫폼을 침묵으로 남겨두지 않고 shared contract에서 기대와 상태를
명시하는 편이 이후 확장에 유리하다.

**Alternatives considered**:

- React만 명시하고 다른 플랫폼을 아예 생략: parity planning 규칙에 어긋난다.
- 모든 플랫폼 구현을 이번 feature에 포함: 현재 spec 범위를 넘어선다.
