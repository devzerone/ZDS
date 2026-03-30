export default function FoundationPage() {
  return (
    <div className="docs-page">
      <section className="docs-hero docs-hero--component">
        <span className="docs-eyebrow">Foundation</span>
        <h1>공통 토큰과 디자인 언어의 기초를 먼저 읽습니다.</h1>
        <p>
          Foundation 문서는 component 문서보다 먼저 읽히는 기준 레이어입니다. semantic token 구조, naming
          원칙, light and dark theme 해석을 먼저 이해하고 나면 component-level usage를 훨씬 일관되게 볼 수
          있습니다.
        </p>
      </section>

      <section className="docs-card-grid docs-card-grid--three">
        <article className="docs-card">
          <strong>Semantic tokens</strong>
          <p>raw palette보다 의미 중심 토큰을 우선 쓰고, UI 계층의 역할을 semantic naming으로 설명합니다.</p>
        </article>
        <article className="docs-card">
          <strong>Theme interpretation</strong>
          <p>같은 semantic meaning을 유지한 채 light와 dark에서 다른 step을 소비하는 구조를 따릅니다.</p>
        </article>
        <article className="docs-card docs-card--accent">
          <strong>Component mapping</strong>
          <p>component tokens는 foundation token을 소비하는 얇은 계약 계층으로 유지합니다.</p>
        </article>
      </section>

      <section className="docs-split">
        <div className="docs-stack">
          <article className="docs-panel">
            <span className="docs-eyebrow">Reading flow</span>
            <h2>Token language를 이해한 뒤 component contract를 읽는 순서를 권장합니다.</h2>
            <p>
              Button 같은 개별 component는 foundation token에 기대고 있기 때문에, foundation을 먼저 이해하면
              variant와 state 해석이 훨씬 빨라집니다.
            </p>
            <div className="docs-actions">
              <a className="preview-link" href="/foundation/tokens">
                Token 문서 보기
              </a>
              <a className="docs-text-link" href="/components/button">
                Button 문서로 이동
              </a>
            </div>
          </article>
        </div>

        <aside className="docs-rail">
          <article className="docs-rail-card">
            <span>What lives here</span>
            <p>palette family</p>
            <p>semantic token structure</p>
            <p>theme mapping guidance</p>
          </article>
          <article className="docs-rail-card docs-rail-card--accent">
            <span>Source</span>
            <p>foundation token 문서는 component별 API보다 위에 있는 공통 언어층입니다.</p>
          </article>
        </aside>
      </section>
    </div>
  );
}
