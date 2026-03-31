import Link from "next/link";
import PreviewLink from "../../components/preview-link/PreviewLink";

export default function ComponentsPage() {
  return (
    <div className="docs-page">
      <section className="docs-hero docs-hero--component">
        <span className="docs-eyebrow">Components</span>
        <h1>문서와 preview가 함께 움직이는 reference component 집합</h1>
        <p>
          현재는 Button이 canonical docs, shared React implementation, Storybook preview를 연결하는 첫
          reference component입니다. 다음 컴포넌트도 같은 구조를 따라 확장할 수 있게 설계했습니다.
        </p>
      </section>

      <section className="docs-split">
        <div className="docs-stack">
          <article className="docs-panel">
            <span className="docs-eyebrow">Reference component</span>
            <h2>Button은 docs, spec, token, pen, React를 연결하는 기준선입니다.</h2>
            <p>
              variant, size, state, accessibility, parity를 문서에서 먼저 읽고, 필요할 때만 Storybook
              playground로 이동하는 흐름을 기준으로 삼습니다.
            </p>
            <div className="docs-actions">
              <Link className="preview-link" href="/components/button">
                Button 문서 보기
              </Link>
              <PreviewLink href="/storybook/index.html?path=/story/components-button--playground" label="Button preview 열기" />
            </div>
          </article>

          <article className="docs-card-grid docs-card-grid--three">
            <div className="docs-card">
              <strong>Canonical docs</strong>
              <p>사용 맥락, anatomy, 선택 기준, 접근성, parity를 문서에서 서술합니다.</p>
            </div>
            <div className="docs-card">
              <strong>Shared implementation</strong>
              <p>React Button과 token/spec를 같은 흐름으로 연결해 source drift를 줄입니다.</p>
            </div>
            <div className="docs-card docs-card--accent">
              <strong>Preview surface</strong>
              <p>Storybook은 controlled review 환경으로 두고, canonical explanation은 docs에 남깁니다.</p>
            </div>
          </article>
        </div>

        <aside className="docs-rail">
          <article className="docs-rail-card">
            <span>Available now</span>
            <p>Button</p>
          </article>
          <article className="docs-rail-card docs-rail-card--accent">
            <span>Planned next</span>
            <p>Input, Badge 같은 다음 컴포넌트도 같은 docs / preview 구조를 따릅니다.</p>
          </article>
        </aside>
      </section>
    </div>
  );
}
