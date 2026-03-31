import Link from "next/link";
import DocsOnThisPage from "../components/docs/DocsOnThisPage";

export default function HomePage() {
  return (
    <div className="docs-page">
      <section className="docs-hero docs-hero--home">
        <span className="docs-eyebrow">Introduction</span>
        <h1>Fast, consistent design system docs for teams building real interfaces.</h1>
        <p>
          ZDS brings tokens, component guidance, implementation references, and preview links into one calm
          editorial surface. Start here when you want the system explained before you open Storybook.
        </p>
      </section>

      <section className="docs-panel" id="zds-overview">
        <h2>ZDS 소개</h2>
        <p>
          ZDS는 디자인 토큰, 컴포넌트 계약, Pencil 기준선, 구현 레퍼런스, 문서와 프리뷰를 한 저장소에서
          연결하는 디자인 시스템 모노레포입니다.
        </p>
        <p>
          문서는 먼저 개념과 기준을 설명하고, 그 다음에 컴포넌트와 프리뷰로 이동하도록 설계됩니다. 그래서
          팀은 무엇을 써야 하는지보다 먼저 왜 이렇게 써야 하는지를 이해할 수 있습니다.
        </p>
      </section>

      <section className="docs-card-grid docs-card-grid--three docs-card-grid--compact">
        <article className="docs-card">
          <strong>Source of truth</strong>
          <p>Spec, tokens, pen, implementation, docs</p>
        </article>
        <article className="docs-card">
          <strong>Review flow</strong>
          <p>Docs first, Storybook second</p>
        </article>
        <article className="docs-card docs-card--accent">
          <strong>Team language</strong>
          <p>Principles, naming, and hierarchy stay aligned.</p>
        </article>
      </section>

      <section className="docs-split">
        <div className="docs-stack">
          <article className="docs-panel" id="key-capabilities">
            <h2>핵심 기능</h2>
            <ul className="docs-bullet-list">
              <li>계약, 토큰, pen, React 구현을 같은 흐름으로 연결합니다.</li>
              <li>Storybook은 상호작용 검토에 집중하고, docs는 canonical guidance를 담당합니다.</li>
              <li>parity와 source-of-truth 경계를 명확히 관리해 drift를 줄입니다.</li>
              <li>팀이 빠르게 공통 언어를 익힐 수 있도록 설명형 문서를 우선합니다.</li>
            </ul>
          </article>

          <article className="docs-panel docs-panel--muted" id="good-fit-projects">
            <h2>적합한 프로젝트</h2>
            <ul className="docs-bullet-list">
              <li>일관된 UI와 토큰 체계가 필요한 제품 팀</li>
              <li>React 기반 문서와 프리뷰를 함께 운영해야 하는 조직</li>
              <li>디자인-개발 협업에서 기준선과 계약을 함께 관리하려는 팀</li>
            </ul>
          </article>
        </div>

        <aside className="docs-rail">
          <DocsOnThisPage />
          <article className="docs-rail-card docs-rail-card--accent">
            <span>Popular entry points</span>
            <p>Design principles</p>
            <p>Installation</p>
            <p>Button</p>
            <p>Theme guidance</p>
          </article>
          <article className="docs-rail-card docs-rail-card--solid">
            <span>Review policy</span>
            <p>
              Open Storybook only when you need interaction checks. Read docs first for shared language, hierarchy,
              and source-of-truth ownership.
            </p>
            <div className="docs-actions">
              <Link className="preview-link" href="/components/button">
                Components 열기
              </Link>
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}
