import { siteNav } from "../components/navigation/site-nav";

export default function HomePage() {
  const sections = siteNav.filter((section) => section.label !== "Resources");

  return (
    <>
      <section className="docs-hero">
        <span className="docs-eyebrow">당근 앱을 위한 디자인 언어에서 영감을 받은 문서 구조</span>
        <h1>토큰, 컴포넌트, 프리뷰를 하나의 문서 흐름으로 연결합니다.</h1>
        <p>
          ZDS 문서는 foundation 가이드와 component reference를 한곳에서 제공하고, 실제 React surface는
          Storybook preview로 바로 이어집니다. 설계 원칙, 접근성, parity, source-of-truth 경로까지
          문서에서 먼저 읽고 구현으로 들어가는 흐름을 목표로 합니다.
        </p>
        <div className="docs-actions">
          <a className="preview-link" href="/components/button">
            버튼 문서 보기
          </a>
          <a className="docs-text-link" href="/storybook/index.html?path=/story/components-button--playground">
            Storybook preview 열기
          </a>
        </div>
      </section>

      <section className="docs-panel">
        <div className="docs-section-heading">
          <span>Overview</span>
          <h2>디자인 시스템 사용하기</h2>
        </div>
        <div className="docs-card-grid">
          <article className="docs-card">
            <strong>Foundation</strong>
            <p>semantic token 구조와 light/dark theme 해석, naming 원칙을 먼저 확인합니다.</p>
          </article>
          <article className="docs-card">
            <strong>Components</strong>
            <p>Button을 기준으로 variant, state, accessibility, parity를 문서와 preview로 함께 봅니다.</p>
          </article>
          <article className="docs-card">
            <strong>Resources</strong>
            <p>Storybook preview와 source-of-truth artifact를 연결해 실제 구현과 문서가 어긋나지 않게 합니다.</p>
          </article>
        </div>
      </section>

      <section className="docs-panel">
        <div className="docs-section-heading">
          <span>Guides</span>
          <h2>바로 들어가기</h2>
        </div>
        <div className="docs-link-list">
          {sections.flatMap((section) => section.entries).map((entry) => (
            <a className="docs-list-item" href={entry.href} key={entry.href}>
              <div>
                <strong>{entry.label}</strong>
                <p>{entry.description}</p>
              </div>
              <span>열기</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
