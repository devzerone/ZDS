# Token Validation

이 디렉터리는 ZDS foundation token 검증 자산을 담습니다.

## 검증 범위

- 필수 토큰 파일 존재 여부
- semantic token 참조 무결성
- 라이트/다크 테마 완전성
- component scaffold의 semantic 참조 여부
- 네이밍 규칙 위반 여부

## 실행 방법

```bash
node testing/tokens/validate-tokens.mjs
```

성공 시 검증 요약이 출력되고, 실패 시 누락이나 잘못된 참조를 에러로 반환합니다.
