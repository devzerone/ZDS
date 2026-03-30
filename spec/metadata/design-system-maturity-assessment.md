# 디자인 시스템 성숙도 평가

최종 업데이트: 2026-03-30

## 목적

이 문서는 현재 ZDS 레포를 프로덕션 수준의 디자인 시스템 모노레포 관점에서 평가하고, 패키지 구조를 실제 배포 가능하고 확장 가능하며 운영하기 쉬운 형태로 발전시키기 위한 구체적인 개선안을 제안합니다.

## 현재 요약

ZDS는 이미 디자인 시스템 레포다운 뼈대를 잘 갖추고 있습니다.

- `packages/foundation`: 브랜드 자산과 foundation 레이어 관리
- `packages/tokens`: 디자인 토큰 관리
- `packages/react`: React 컴포넌트 구현
- `apps/docs`: 공식 문서 사이트
- `spec/`: 배포 가능한 컴포넌트 계약
- `pen/`: Pencil 기준선
- `testing/`: 검증 스크립트

현재의 핵심 격차는 폴더 이름이나 레이아웃 자체가 아닙니다. 진짜 차이는 패키지 경계의 성숙도에 있습니다.

지금 레포는 내부 모노레포 기준선으로는 잘 동작하지만, 아직 진짜로 배포 가능한 패키지 생태계 구조라고 보기는 어렵습니다. 우선순위가 높은 이슈는 다음과 같습니다.

- 컴포넌트 코드가 안정적인 패키지 export 대신 워크스페이스 상대경로로 foundation 토큰을 직접 참조하고 있음
- `foundation`과 `react`가 배포용 산출물 체계를 충분히 갖추지 못함
- 패키지 엔트리포인트가 현재 버튼 예제를 넘어서 확장하기엔 너무 좁음
- 첫 컴포넌트 기준의 검증은 잘 되어 있지만, 시스템 전체 확장을 위한 일반화는 아직 부족함

## 목표 상태

권장하는 목표 구조는 계층이 분명한 배포 가능한 패키지 모델입니다.

1. `@zds/tokens`
   원본 토큰 소스, 생성 산출물, 안정적인 공개 export를 책임집니다.
2. `@zds/foundation`
   브랜드 자산, foundation 레이어 자산, 향후 비토큰 기초 자산을 책임집니다.
3. `@zds/docs`
   실제 배포 패키지를 쓰는 방식으로 소비하며, 공식 소비자이자 문서 앱 역할을 합니다.
4. `@zds/react`
   React 컴포넌트만 책임지며, 내부 경로가 아니라 `@zds/tokens`의 공개 export를 통해 토큰을 사용합니다.
5. `spec/`
   기계가 읽을 수 있는 제품 계약과 parity 메타데이터를 관리합니다.
6. `pen/`
   시각 기준선과 디자인 참조를 관리하며, 런타임 의존 경로가 되지 않습니다.

## 권장 배포형 패키지 구조

```text
apps/
  docs/
packages/
  foundation/
    assets/
    icons/
    package.json
  tokens/
    src/
      index.ts
      tokens/
        index.ts
        color.ts
        spacing.ts
        radius.ts
        typography.ts
    dist/
    tokens/
    scripts/
    package.json
    tsconfig.json
  react/
    src/
      index.ts
      components/
        button/
          Button.tsx
          index.ts
    dist/
    package.json
    tsconfig.json
spec/
  components/
  metadata/
pen/
testing/
```

## 공개 API 원칙

### `@zds/tokens`

다음과 같은 안정적인 엔트리포인트를 제공해야 합니다.

- `@zds/tokens/tokens.css`
- `@zds/tokens`
- `@zds/tokens/color`
- `@zds/tokens/semantic`
- `@zds/tokens/spacing`
- `@zds/tokens/radius`
- `@zds/tokens/typography`

또한 다음을 소유해야 합니다.

- 원본 JSON 토큰 소스
- 생성된 CSS 변수 산출물
- 생성된 TypeScript 토큰 맵
- React 외 소비자를 위한 선택적 JSON 번들

소비자가 `packages/tokens/data/...` 같은 내부 경로를 직접 참조하게 만들면 안 됩니다.

### `@zds/foundation`

이 패키지는 토큰이 아니라 브랜드 자산과 foundation 레이어의 비토큰 자산을 담당하는 방향이 더 적절합니다.

### `@zds/react`

다음과 같은 엔트리포인트를 제공해야 합니다.

- `@zds/react`
- `@zds/react/button`

그리고 오직 `@zds/tokens`의 공개 export만 사용해야 합니다.

아래처럼 상대경로로 토큰 JSON을 직접 import 하는 패턴은 지양해야 합니다.

```ts
@zds/tokens/color
```

이 패턴은 패키지 내부 구조를 강하게 결합시키고, 깔끔한 배포를 어렵게 만듭니다.

## 개선 계획

### 1단계. 패키지 경계 강화

목표: 워크스페이스 상대경로가 아니라 안정적인 공개 export를 통해 패키지를 소비하도록 바꿉니다.

실행 항목:

- `packages/tokens`에 `src/` 엔트리포인트 추가
- `@zds/tokens`에서 TypeScript 토큰 엔트리포인트를 생성하거나 직접 구성
- `packages/react`가 `@zds/tokens` 공개 export만 import 하도록 변경
- `packages/react`에 `src/index.ts`를 추가하고 컴포넌트 모듈을 재수출하도록 정리
- 버튼 파일 자체를 루트 패키지 엔트리처럼 취급하는 구조를 중단

성공 기준:

- React 컴포넌트가 `packages/tokens/...` 내부 파일을 상대경로로 import 하지 않음
- docs 앱이 오직 패키지 export만 사용해서 빌드됨
- Storybook도 오직 패키지 export만 사용해서 빌드됨

### 2단계. 실제 빌드 산출물 추가

목표: 각 패키지가 독립적으로 빌드 가능하고 배포 가능한 상태가 되도록 만듭니다.

실행 항목:

- `@zds/tokens`, `@zds/foundation`, `@zds/react`에 `build` 스크립트 추가
- `dist/` 기준의 JS 및 `.d.ts` 파일 산출
- 패키지 `exports`가 소스 파일이 아니라 빌드 산출물을 가리키도록 변경
- `main`, `module`, `types`, 명시적인 `exports` 정의
- `files`에는 실제 배포해야 하는 산출물만 포함

성공 기준:

- `turbo build`가 `tokens`, `foundation`, `react`, `docs` 모두에 대해 의미 있는 빌드를 수행함
- 소비자가 소스 트랜스파일 편법 없이도 패키지를 설치하고 사용할 수 있음

### 3단계. 컴포넌트 확장 패턴 일반화

목표: 레포가 버튼 하나가 아니라 여러 컴포넌트를 감당할 수 있는 구조가 되도록 만듭니다.

실행 항목:

- `packages/react/src/components/<component>/` 아래에 컴포넌트 구조를 표준화
- 스토리, 테스트, spec 링크, docs 페이지, pen 기준선에 대한 공통 규칙 정의
- 공개 컴포넌트를 모아 재수출하는 패키지 루트 export 파일 추가
- `spec/metadata/parity/`를 플랫폼 간 커버리지 추적용으로 준비

성공 기준:

- 새 컴포넌트를 추가할 때 반복 가능한 한 가지 경로를 따를 수 있음
- 루트 export가 컴포넌트 수가 늘어나도 예측 가능하게 유지됨

### 4단계. 거버넌스와 검증 강화

목표: 소스 오브 트루스 체인이 시스템이 커져도 자동으로 유지되도록 만듭니다.

실행 항목:

- 버튼 전용 검증을 넘어서는 범용 검증 스크립트로 일반화
- 모든 공개 컴포넌트에 docs와 stories가 존재하는지 검사
- 모든 컴포넌트에 계약, 토큰, 테스트, docs가 있는지 검사
- 토큰, spec, 컴포넌트, docs, Storybook 검증을 함께 돌리는 CI 워크플로 도입
- 점진적으로 TypeScript 엄격 모드 상향 검토

성공 기준:

- `spec`, 토큰, 구현, docs 간 드리프트를 자동으로 탐지할 수 있음
- 필수 산출물 없이 컴포넌트를 추가하면 검증이 실패함

## 다음으로 권장하는 구체적 파일 변경

### 패키지 매니페스트

- `packages/tokens/package.json`에 `build`, `typecheck`, 필요 시 `lint` 스크립트 추가
- `packages/foundation/package.json`에는 자산 패키지 역할에 맞는 최소 스크립트만 유지 또는 보강
- `packages/react/package.json`에 `build`, `typecheck`, 명시적인 루트 엔트리포인트 추가
- `exports`가 소스 파일이 아니라 빌드 산출물을 가리키도록 변경

### Tokens 패키지

- `packages/tokens/src/index.ts` 추가
- `packages/tokens/src/` 아래에 토큰 재수출 모듈 추가
- JSON 토큰은 저작 원본으로 유지하되, 런타임 친화적인 생성 모듈도 함께 배포

### React 패키지

- `packages/react/src/components/button/Button.tsx` 구조로 이동
- `packages/react/src/index.ts` 추가
- `packages/react/src/components/button/index.ts` 추가
- stories와 tests를 컴포넌트 가까이에 두거나, 분리할 경우 명확한 규칙을 문서화

### 레포 설정

- Turbo task를 확장해 `foundation`과 `react`가 `build`에 실질적으로 참여하도록 설정
- 패키지별 `tsconfig.json` 도입 검토
- 루트 TypeScript 설정을 점진적으로 더 엄격하게 조정

## 권장 성숙도 점수표

점수 기준:

- `0`: 없음
- `1`: 매우 초기
- `2`: 기본 수준
- `3`: 안정적
- `4`: 강함
- `5`: 프로덕션 수준

### 1. 레포 정보 구조

- 점수: `4/5`
- 상태: 디자인 시스템의 주요 관심사가 잘 분리되어 있음
- 근거: `apps/docs`, `packages/foundation`, `packages/tokens`, `packages/react`, `spec`, `pen`, `testing`
- 격차: 일부 디렉터리는 아직 플레이스홀더 수준이라 구조가 실제 구현 깊이보다 앞서 있음

### 2. Source of Truth 정의

- 점수: `4/5`
- 상태: 문서화가 명확하고 순서도 논리적임
- 근거: README에서 `spec -> tokens -> pen -> react -> docs` 흐름을 정의
- 격차: 향후 여러 컴포넌트에 대해 이 체인을 강제하는 검증은 아직 충분히 일반화되지 않음

### 3. 패키지 경계 규율

- 점수: `2/5`
- 상태: 패키지 이름은 분리되어 있지만 런타임 경계는 아직 느슨함
- 근거: 토큰을 별도 패키지로 분리하기 전에는 React가 워크스페이스 상대경로로 토큰 JSON을 import 했음
- 격차: 소비자는 내부 파일 구조가 아니라 공개 패키지 API에 의존해야 함

### 4. 배포 가능성

- 점수: `2/5`
- 상태: 패키지 이름과 분리는 적절하지만 실제 배포 산출물 중심 구조는 아직 아님
- 근거: `@zds/tokens`, `@zds/foundation`, `@zds/react`가 아직 실질적인 배포용 출력물을 충분히 만들지 않음
- 격차: `exports`가 아직 소스 파일을 가리키거나, 너무 좁은 범위만 공개함

### 5. 컴포넌트 확장성

- 점수: `3/5`
- 상태: 첫 컴포넌트에 대한 경로는 명확함
- 근거: `Button`은 spec, tokens, docs, Storybook, tests를 모두 갖춤
- 격차: 현재 패턴은 사실상 버튼 전용 수작업 흐름에 가까움

### 6. 토큰 시스템 준비도

- 점수: `4/5`
- 상태: 토큰 카테고리와 CSS 생성 기반이 잘 시작되어 있음
- 근거: palette, semantic, spacing, radius, typography, themes, schemas, CSS generator 존재
- 격차: 런타임 소비를 위한 공개 토큰 export는 아직 얇음

### 7. 문서 아키텍처

- 점수: `4/5`
- 상태: docs 앱은 유효한 공식 소비자 역할을 하고 있고 정적 export도 동작함
- 근거: Next.js docs build 및 validation 통과
- 격차: 현재 docs 패키지는 실제 릴리스 패키지 소비보다는 워크스페이스 동작에 더 기대고 있음

### 8. 프리뷰와 개발자 경험

- 점수: `4/5`
- 상태: Storybook이 연결돼 있고 현재 컴포넌트 범위에서는 충분히 유용함
- 근거: Storybook build 통과, 버튼의 상태와 variant가 stories에 잘 반영됨
- 격차: 향후 컴포넌트 추가를 위한 일반화된 preview 거버넌스는 아직 없음

### 9. 검증과 QA 자동화

- 점수: `3/5`
- 상태: 의미 있는 검증 체계가 이미 존재함
- 근거: 토큰 검증, 버튼 spec 검증, React 테스트, docs 및 Storybook 검증 존재
- 격차: 아직은 시스템 전체라기보다 개별 케이스 중심 검증에 가까움

### 10. 타입 안정성과 빌드 엄격성

- 점수: `2/5`
- 상태: 기본적인 TypeScript 사용은 갖춰져 있음
- 근거: TS 설정이 존재하고 앱 레벨 검증은 Next build를 통해 수행됨
- 격차: 루트 설정이 엄격하지 않고 패키지별 빌드 계약도 아직 약함

## 전체 성숙도

- 총점: `32/50`
- 대략적 단계: `기반 구축 단계`

해석:

- ZDS는 이미 디자인 시스템 레포다운 형태를 갖추고 있습니다.
- 하지만 아직 완전한 배포형 디자인 시스템 패키지 플랫폼이라고 보기는 어렵습니다.
- 다음 단계 성숙도 상승의 핵심은 패키지 경계 강화, 실제 빌드 산출물 도입, 거버넌스 일반화입니다.

## 권장 우선순위

1. 패키지 간 상대경로 import를 제거하고 `@zds/tokens` 공개 export로 대체
2. `tokens`, `foundation`, `react`에 실제 `build` 파이프라인과 `dist` 산출물 추가
3. `@zds/react`의 안정적인 루트 엔트리포인트 정리
4. 버튼 전용 검증을 컴포넌트 전반 검증으로 일반화
5. 패키지 경계 정리가 끝난 뒤 TypeScript 및 CI 엄격성 강화

## 최종 판단

현재 레포는 디자인 시스템 모노레포의 기반으로는 적절합니다.

다만 추가적인 패키지 경계 정리 없이 장기적으로 배포 가능한 패키지 아키텍처라고 보기는 어렵습니다.

즉, 구조 자체는 좋습니다. 이제 성숙시켜야 하는 쪽은 패키지 간 계약과 공개 경계입니다.
