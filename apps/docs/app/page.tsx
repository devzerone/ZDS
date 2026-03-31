import Link from "next/link";
import { siteNav } from "../components/navigation/site-nav";

export default function HomePage() {
  const sections = siteNav.filter((section) => section.label !== "Resources");

  return (
    <div className="docs-page">
      <section className="docs-hero docs-hero--home">
        <span className="docs-eyebrow">Design system docs</span>
        <h1>A calm source of truth for tokens, components, and implementation.</h1>
        <p>
          ZDS 문서는 overview에서 foundation을 이해하고, component reference에서 계약과 사용 원칙을 확인한 뒤,
          필요할 때만 Storybook preview로 넘어가는 흐름을 기준으로 설계했습니다.
        </p>
      </section>

      <section className="docs-card-grid docs-card-grid--three">
        <article className="docs-card">
          <strong>Foundation</strong>
          <p>semantic token 구조와 theme 해석, naming 규칙을 한 문서 흐름에서 먼저 읽습니다.</p>
        </article>
        <article className="docs-card">
          <strong>Components</strong>
          <p>Button 페이지에서 anatomy, variant, parity, source reference를 함께 확인합니다.</p>
        </article>
        <article className="docs-card docs-card--accent">
          <strong>Preview</strong>
          <p>Storybook은 인터랙션 검토용으로만 연결하고, canonical guidance는 docs에 남깁니다.</p>
        </article>
      </section>

      <section className="docs-split">
        <div className="docs-stack">
          <article className="docs-panel">
            <span className="docs-eyebrow">Start here</span>
            <h2>Docs should explain the system before the playground asks you to experiment.</h2>
            <p>
              overview page에서 목적과 token language를 이해하고, Button 문서에서 상태와 접근성을 읽은 다음
              interactive story로 넘어가는 것이 기본 흐름입니다.
            </p>
            <div className="docs-actions">
              <Link className="preview-link" href="/components/button">
                버튼 문서 보기
              </Link>
              <a className="docs-text-link" href="/storybook/index.html?path=/story/components-button--playground">
                Storybook preview 열기
              </a>
            </div>
            <p className="docs-inline-note">Reference flow: Overview -&gt; Button docs -&gt; Storybook preview</p>
          </article>

          <article className="docs-panel docs-panel--muted">
            <span className="docs-panel__label">Release workflow</span>
            <p>
              validate tokens, build docs, build Storybook, then publish static artifacts. 문서 셸은 안정적으로
              유지하고 reference component만 확장합니다.
            </p>
          </article>

          <section className="docs-panel">
            <div className="docs-section-heading">
              <span>Overview</span>
              <h2>바로 들어가기</h2>
            </div>
            <div className="docs-link-list">
              {sections.flatMap((section) => section.entries).map((entry) => (
                <Link className="docs-list-item" href={entry.href} key={entry.href}>
                  <div>
                    <strong>{entry.label}</strong>
                    <p>{entry.description}</p>
                  </div>
                  <span>열기</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="docs-rail">
          <article className="docs-rail-card">
            <span>Popular entries</span>
            <p>Button</p>
            <p>Token foundation</p>
            <p>Theme toggle guidance</p>
          </article>
          <article className="docs-rail-card docs-rail-card--accent">
            <span>Preview policy</span>
            <p>Storybook은 controlled playground로 두고, canonical usage story는 docs 셸에 남깁니다.</p>
          </article>
        </aside>
      </section>
    </div>
  );
}
