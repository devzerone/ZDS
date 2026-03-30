# ZDS Foundation

이 디렉터리는 ZDS의 foundation 자산 문서를 담습니다.

현재 범위:

- 디자인 토큰 구조
- 토큰 사용 규칙
- 플랫폼 소비자 handoff 요약

하위 문서:

- `tokens.md`: 토큰 구조, 의미, 사용 가이드

## 플랫폼 소비자 handoff 요약

- React, SwiftUI, Kotlin, Windows 패키지는 raw palette가 아니라 semantic/theme token을 기본 소비 지점으로 사용합니다.
- component token scaffold는 후속 component spec 및 플랫폼 구현이 연결될 토큰 인터페이스 역할을 합니다.
- 라이트/다크 분기는 theme mapping에서 해결하고, 플랫폼별 별도 토큰 네임스페이스는 만들지 않습니다.
