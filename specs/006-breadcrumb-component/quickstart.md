# Quickstart: 브레드크럼프 컴포넌트

## Goal

현재 위치 인지, 상위 경로 복귀, 긴 경로 대응, 접근성 의미를 공통 규칙으로 갖는
브레드크럼프 컴포넌트를 ZDS에 추가한다.

## Planned Artifact Order

1. `spec/components/breadcrumb/breadcrumb.spec.json`에서 path item semantics, current-page rule, separator behavior, overflow policy, parity status를 먼저 확정한다.
2. `packages/tokens/data/components/breadcrumb.json`과 `packages/tokens/src/components/breadcrumb.ts`에서 ancestor step, current step, separator, spacing, constrained-path visual meaning을 정의한다.
3. `pen/components/breadcrumb/breadcrumb.pen`에서 single-step, standard multi-step, constrained-width baseline을 준비한다.
4. `packages/react/src/primitives/breadcrumb/`에서 semantic structure를 만들고 `packages/react/src/components/breadcrumb/`에서 tokenized public API를 구성한다.
5. `packages/react/src/index.ts`, `packages/react/src/breadcrumb.ts`, `packages/react/package.json`, `packages/react/tsup.config.ts`에서 public export surface를 연결한다.
6. `packages/react/src/components/breadcrumb/Breadcrumb.stories.tsx`와 docs preview sandbox를 만들어 canonical examples를 노출한다.
7. `apps/docs/content/components/breadcrumb.mdx`, `apps/docs/app/components/breadcrumb/page.tsx`, `apps/docs/app/components/page.tsx`, `apps/docs/components/navigation/`를 업데이트해 breadcrumb를 discoverable하게 만든다.
8. `testing/spec/validate-breadcrumb-spec.mjs`, `testing/tokens/validate-tokens.mjs`, `testing/docs/`, `testing/accessibility/`, `testing/visual/`, React tests를 업데이트한다.

## Implementation Checklist

### 1. Contract first

- current page는 항상 마지막 항목으로 유지한다.
- ancestor item과 current item은 같은 시각 계열 안에서도 다른 의미를 전달해야 한다.
- parity metadata에는 React 외 플랫폼도 생략하지 않고 기록한다.

### 2. Overflow policy

- 시작점과 현재 위치를 함께 보존하는 constrained-width 예시를 최소 하나 포함한다.
- separator는 overflow policy에서도 상호작용 대상으로 만들지 않는다.
- dropdown overflow navigation은 이번 범위에 넣지 않는다.

### 3. Artifact sync

- docs와 Storybook 안내 문구가 shared spec 용어와 동일한지 확인한다.
- docs source references가 spec, tokens, pen, React component를 모두 가리키는지 확인한다.
- React API 이름이 docs와 story controls에서 같은 명칭으로 드러나는지 확인한다.

### 4. Validation expectations

- breadcrumb spec validator는 item roles, accessibility flags, parity profiles를 확인해야 한다.
- docs validation은 breadcrumb docs page, preview links, source references를 확인해야 한다.
- accessibility and visual checklist는 single-step, current-page distinction, separator decorativeness, constrained-width path readability를 포함해야 한다.

## Suggested Validation Flow

1. `pnpm validate:tokens`
2. `node testing/spec/validate-breadcrumb-spec.mjs`
3. `node --import tsx --test packages/react/src/components/breadcrumb/Breadcrumb.test.tsx`
4. `pnpm docs:build`
5. `node testing/docs/validate-docs-build.mjs`
6. `node testing/docs/validate-preview-links.mjs`
7. `node testing/docs/validate-docs-system.mjs`

## Handoff Note

다음 `/speckit.tasks` 단계에서는 shared files인 spec, tokens, pen, docs source를
우선순위로 묶고, React primitive/public component 및 docs preview 구현을 그
다음 slice로 배치하는 것이 충돌을 줄이기 가장 쉽다.
