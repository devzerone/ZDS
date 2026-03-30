# Quickstart: Design System Docs And Preview

## Goal

버튼을 첫 reference component로 사용해, 배포 가능한 docs 사이트와 Storybook
preview를 같은 source of truth 위에서 연결한다.

## Planned Artifact Order

1. `apps/docs`를 Next.js App Router 문서 사이트 구조로 정리한다.
2. 기존 `apps/docs/foundation/*.md`, `apps/docs/components/button.md` 내용을 route-backed content로 옮긴다.
3. `.storybook/`과 `packages/react/components/button/Button.stories.tsx`를 추가해 실제 React 버튼 컴포넌트를 preview에 연결한다.
4. docs 페이지에서 preview로, preview에서 docs 페이지로 이동 가능한 링크를 만든다.
5. 루트 `package.json`, `turbo.json`, CI workflow에 docs build와 storybook build 검증을 추가한다.
6. publish artifact 경로와 로컬 실행 흐름을 문서화한다.

## Local Workflow

### 1. Docs app setup

- `apps/docs/package.json`에 docs 개발과 빌드 명령을 추가한다.
- docs 홈, foundation route, components route, button route를 먼저 만든다.
- 기존 Markdown 자산은 content source로 유지하되, 최종 소비는 docs route가 담당하게 정리한다.

### 2. Storybook setup

- root Storybook config를 추가한다.
- story 파일은 `packages/react/components/` 아래에 colocate한다.
- button story는 `@zds/react`의 실제 Button export를 직접 사용한다.

### 3. Linking rules

- docs의 button 페이지에는 preview 진입 링크가 있어야 한다.
- story 또는 Storybook docs 패널에는 canonical button 문서 링크가 있어야 한다.
- docs와 preview는 같은 variant, size, state 이름을 사용해야 한다.

### 4. Validation commands

- `pnpm docs:dev`
- `pnpm docs:build`
- `pnpm storybook`
- `pnpm storybook:build`
- `pnpm validate:docs-system`
- `pnpm validate:button`

`validate:docs-system`은 최소한 docs build와 Storybook build를 함께 검증하고,
기존 button/token validation 흐름과 조합 가능한 형태로 잡는다.

### 5. Deployment readiness

- docs build artifact 경로는 `apps/docs/dist`로 고정한다.
- Storybook build artifact 경로는 `dist/storybook`으로 고정한다.
- CI에서는 push와 pull request마다 두 build가 모두 성공해야 한다.
- 실패 시 어떤 표면이 깨졌는지 로그에서 바로 구분 가능해야 한다.
- docs route는 `apps/docs/content/**/*.mdx`를 canonical authored content로 사용한다.
- docs 헤더에서는 light/dark theme toggle이 동작해야 하고, Storybook preview도 matching theme view를 제공해야 한다.

## Handoff to `/speckit.tasks`

다음 단계에서는 다음 순서로 태스크를 쪼개는 것이 좋다.

1. docs app 기반 구조 추가
2. Storybook 기반 구조 추가
3. Button docs route와 Button story 연결
4. docs-preview cross link 추가
5. build scripts, Turbo, CI 연결
6. validation 및 배포 readiness 검증
