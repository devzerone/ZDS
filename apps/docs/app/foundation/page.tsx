import Link from "next/link";
import DocsRail, { DocsRailCard } from "../../components/docs/DocsRail";

export default function FoundationPage() {
  return (
    <div className="docs-page">
      <section className="docs-hero docs-hero--component">
        <span className="docs-eyebrow">Foundation</span>
        <h1>Read the shared token language before the component contract.</h1>
        <p>
          Foundation 문서는 component 문서보다 먼저 읽히는 기준 레이어입니다. semantic token 구조, naming
          원칙, light and dark theme 해석을 먼저 이해하고 나면 component-level usage를 훨씬 일관되게 읽을 수
          있습니다.
        </p>
        <div className="docs-pill-row">
          <span className="docs-pill">Semantic tokens</span>
          <span className="docs-pill">Theme interpretation</span>
        </div>
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
            <h2>Reading flow</h2>
            <p>
              Button 같은 개별 component는 foundation token에 기대고 있기 때문에, foundation을 먼저 이해하면
              variant와 state 해석이 훨씬 빨라집니다.
            </p>
            <div className="docs-actions">
              <Link className="preview-link" href="/foundation/tokens">
                Token 문서 보기
              </Link>
              <Link className="docs-text-link" href="/components/button">
                Button 문서로 이동
              </Link>
            </div>
          </article>

          <article className="docs-panel docs-panel--muted">
            <h2>What you will learn</h2>
            <ul className="docs-bullet-list">
              <li>raw palette와 semantic token의 역할 분리</li>
              <li>light / dark에서 semantic meaning을 유지하는 방식</li>
              <li>component mapping이 foundation 위에 얇게 쌓여야 하는 이유</li>
            </ul>
          </article>
        </div>

        <DocsRail>
          <DocsRailCard title="What lives here">
            <p>palette family</p>
            <p>semantic token structure</p>
            <p>theme mapping guidance</p>
          </DocsRailCard>
          <DocsRailCard title="On this page" tone="accent">
            <p>Reading flow</p>
            <p>What you will learn</p>
          </DocsRailCard>
          <DocsRailCard title="Source" tone="solid">
            <p>foundation token 문서는 component별 API보다 위에 있는 공통 언어층입니다.</p>
          </DocsRailCard>
        </DocsRail>
      </section>
    </div>
  );
}
