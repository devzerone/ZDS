# 브랜드 차별화 토큰 가이드

## 목적

이 문서는 ZDS의 foundation 토큰 구조와 사용 원칙을 설명합니다.
토큰 식별자는 영어로 유지하고, 설명은 한국어로 제공합니다.

## 토큰 계층

1. Raw palette tokens
   브랜드, 보조, 중립, 상태 색상의 기초 단계입니다.
2. Semantic tokens
   텍스트, 배경, 테두리, 강조, 상태 같은 UI 의미를 나타냅니다.
3. Component token scaffold
   후속 컴포넌트 명세가 semantic token을 안정적으로 참조할 수 있도록 준비된 계층입니다.
4. Theme mappings
   라이트/다크 문맥에서 semantic token을 일관되게 소비하는 테마 매핑입니다.

## Seed 참고 구조와 차별화 방향

- 구조는 Seed Design의 foundation token 분류 방식을 참고했습니다.
- 색상 정체성은 Seed의 기본 브랜드 톤을 그대로 따르지 않고 `#5e6ad2` 중심의 차분한 블루-인디고 축으로 재구성했습니다.
- 보조 색상은 teal과 amber 계열을 사용해 정보성과 온기를 함께 확보했습니다.

## 도메인별 범위

### Color

- Raw palette families
  - `brand`
  - `secondary-teal`
  - `secondary-amber`
  - `neutral`
  - `info`, `success`, `warning`, `danger`
- Semantic colors
  - foreground: `color.fg.*`
  - background: `color.bg.*`
  - border: `color.border.*`
  - accent: `color.accent.*`
  - status: `color.status.*`

### Typography

- `font.title.*`
- `font.body.*`
- `font.caption.*`
- `font.label.*`

### Dimensions

- spacing: `space.*`
- radius: `radius.*`

### Component scaffold

- `button`
- `input`
- `surface`

## 사용 원칙

### Do

- UI 의미 표현에는 raw palette 대신 semantic token을 우선 사용합니다.
- 라이트/다크 전환이 필요한 경우 theme mapping을 기준으로 소비합니다.
- 컴포넌트 수준 토큰은 semantic token을 참조하도록 유지합니다.
- 한국어 문서에서는 토큰의 목적과 사용 맥락을 먼저 설명합니다.

### Avoid

- `gray200`, `purpleHover` 같은 raw 시각 이름을 직접 노출하지 않습니다.
- 플랫폼 이름이나 프레임워크 이름을 토큰 식별자에 넣지 않습니다.
- raw palette를 제품 UI에서 직접 소비하지 않습니다.
- inverse 문맥을 ad hoc suffix로 처리하지 않습니다.

## 스키마

- 각 토큰 JSON은 `packages/foundation/tokens/schemas/` 아래의 로컬 JSON Schema를 참조합니다.
- 이 스키마는 에디터 자동완성, 구조 검토, 향후 CI 검증 확장을 위한 기반입니다.
- 현재 실행형 검증은 `testing/tokens/validate-tokens.mjs`가 담당하고, schema는 형식 계약의 기준점 역할을 합니다.

## 라이트/다크 테마 해석

- 라이트 테마는 neutral 기반 읽기성과 brand 중심 강조를 기본으로 합니다.
- 다크 테마는 깊은 neutral surface 위에 밝은 foreground와 완화된 brand/emphasis를 배치합니다.
- 같은 semantic 의미는 두 테마에서 유지되고, 실제 참조 step만 달라집니다.

## 플랫폼 소비자 handoff 요약

- React, SwiftUI, Kotlin, Windows 소비자는 semantic/theme layer를 기본 소비 지점으로 삼아야 합니다.
- component token scaffold는 후속 component spec과 platform 구현이 연결될 인터페이스 역할을 합니다.
- raw palette는 foundation 조합 레이어에서만 직접 참조하는 것을 원칙으로 합니다.
