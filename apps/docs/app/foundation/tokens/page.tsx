import DocsProse from "../../../components/prose/DocsProse";
import TokensContent from "../../../content/foundation/tokens.mdx";
import DocsPropsTable from "../../../components/docs/DocsPropsTable";
import DocsPropertyList from "../../../components/docs/DocsPropertyList";
import DocsRail, { DocsRailCard } from "../../../components/docs/DocsRail";

const tokenHierarchy = [
  [
    "Raw palette",
    "기초 색상 스케일과 원시 값입니다. 직접 UI에 연결하기보다 semantic layer의 재료로 사용합니다."
  ],
  [
    "Semantic tokens",
    "텍스트, 배경, 보더, 상태처럼 UI 의미를 먼저 표현하는 기본 소비 계층입니다."
  ],
  [
    "Component mapping",
    "버튼이나 입력창처럼 특정 컴포넌트가 semantic token을 어떻게 소비하는지 정의하는 얇은 계약층입니다."
  ]
] as const;

const tokenExamples = [
  {
    name: "color.bg.brand-soft",
    swatch: "var(--color-bg-brand-soft)",
    description: "부드러운 브랜드 강조 배경으로 안내 카드나 선택 상태에 적합합니다."
  },
  {
    name: "color.fg.primary",
    swatch: "var(--color-fg-primary)",
    description: "가장 읽기 중요한 본문과 제목에 사용하는 기본 전경색입니다."
  },
  {
    name: "color.border.default",
    swatch: "var(--color-border-default)",
    description: "카드, 구분선, 입력 테두리 같은 기본 경계 표현에 사용합니다."
  }
] as const;

const tokenTable = [
  ["naming", "토큰 식별자는 영어로 유지하고 설명 문장은 한국어로 제공합니다."],
  ["consumption", "UI 구현에서는 raw palette보다 semantic token을 먼저 소비합니다."],
  ["theme", "light / dark는 같은 semantic 의미를 유지한 채 참조 step만 바뀝니다."]
] as const;

export default function FoundationTokensPage() {
  return (
    <div className="docs-page">
      <section className="docs-hero docs-hero--component">
        <h1>Foundation tokens</h1>
        <p>
          ZDS token layer는 raw palette, semantic meaning, component mapping 순서로 읽히도록 설계합니다.
          구현에서는 semantic token을 우선 소비하고, 문서에서는 그 의미와 사용 맥락을 먼저 설명합니다.
        </p>
        <div className="docs-pill-row">
          <span className="docs-pill">Light / dark aware</span>
          <span className="docs-pill">Semantic first</span>
        </div>
      </section>

      <section className="docs-split">
        <div className="docs-stack">
          <article className="docs-panel">
            <h2>Overview</h2>
            <p>
              Foundation tokens는 컴포넌트보다 먼저 읽히는 기준 레이어입니다. 토큰 문서를 먼저 이해하면
              컴포넌트 문서에서 variant와 state를 해석하는 속도가 훨씬 빨라집니다.
            </p>
          </article>

          <article className="docs-panel">
            <h2>Hierarchy</h2>
            <DocsPropertyList items={tokenHierarchy} />
          </article>

          <article className="docs-panel">
            <h2>Theme interpretation</h2>
            <p>
              같은 semantic 의미는 light와 dark에서 유지되고, 실제 참조 palette step만 달라집니다. 그래서
              화면이 바뀌어도 토큰 이름은 안정적으로 유지되고, 구현은 의미 중심으로 읽힙니다.
            </p>
            <div className="docs-card-grid docs-card-grid--three docs-card-grid--compact">
              <div className="docs-card">
                <strong>Light</strong>
                <p>neutral 기반 읽기성과 brand 중심 강조를 기본으로 합니다.</p>
              </div>
              <div className="docs-card">
                <strong>Dark</strong>
                <p>깊은 neutral surface 위에 밝은 foreground와 완화된 emphasis를 배치합니다.</p>
              </div>
              <div className="docs-card docs-card--accent">
                <strong>Invariant meaning</strong>
                <p>토큰 이름은 유지되고 참조 값만 바뀌므로 UI 의미가 흔들리지 않습니다.</p>
              </div>
            </div>
          </article>

          <article className="docs-panel">
            <h2>Examples</h2>
            <p>자주 보게 되는 semantic token 예시입니다. 실제 구현에서는 raw palette 대신 이런 의미 계층을 우선 소비합니다.</p>
            <div className="docs-token-grid">
              {tokenExamples.map((token) => (
                <div className="docs-token-card" key={token.name}>
                  <div className="docs-token-swatch" style={{ background: token.swatch }} />
                  <strong>{token.name}</strong>
                  <p>{token.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="docs-panel">
            <h2>Reference table</h2>
            <p>토큰 문서를 읽을 때 계속 확인하게 되는 운영 규칙입니다.</p>
            <DocsPropsTable columns={["Topic", "Description"]} rows={tokenTable} />
          </article>

          <article className="docs-panel">
            <DocsProse>
              <TokensContent />
            </DocsProse>
          </article>
        </div>

        <DocsRail>
          <DocsRailCard title="Quick facts">
            <p>Raw palette - semantic - component mapping</p>
            <p>Light / dark aware</p>
            <p>English token ids, Korean explanation</p>
          </DocsRailCard>

          <DocsRailCard title="On this page" tone="accent">
            <p>Overview</p>
            <p>Hierarchy</p>
            <p>Theme interpretation</p>
            <p>Examples</p>
            <p>Reference table</p>
          </DocsRailCard>

          <DocsRailCard title="Rule of thumb" tone="solid">
            <p>UI surface에서는 raw palette를 직접 쓰지 말고 semantic token을 먼저 소비합니다.</p>
          </DocsRailCard>

          <DocsRailCard title="Source references">
            <p><code>packages/tokens/data/color/palette.json</code></p>
            <p><code>packages/tokens/data/color/semantic.json</code></p>
            <p><code>packages/tokens/data/themes/light.json</code></p>
            <p><code>packages/tokens/data/components/core.json</code></p>
          </DocsRailCard>
        </DocsRail>
      </section>
    </div>
  );
}
