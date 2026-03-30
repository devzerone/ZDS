import DocsProse from "../../../components/prose/DocsProse";
import TokensContent from "../../../content/foundation/tokens.mdx";

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
          <span className="docs-pill docs-pill--brand">light / dark aware</span>
          <span className="docs-pill">semantic first</span>
        </div>
      </section>

      <section className="docs-split">
        <div className="docs-stack">
          <article className="docs-panel">
            <DocsProse>
              <TokensContent />
            </DocsProse>
          </article>
        </div>

        <aside className="docs-rail">
          <article className="docs-rail-card">
            <span>Source references</span>
            <p><code>packages/foundation/tokens/color/palette.json</code></p>
            <p><code>packages/foundation/tokens/color/semantic.json</code></p>
            <p><code>packages/foundation/tokens/components/core.json</code></p>
          </article>
          <article className="docs-rail-card docs-rail-card--accent">
            <span>Rule of thumb</span>
            <p>UI surface에서는 raw palette를 직접 쓰지 말고 semantic token을 우선 소비합니다.</p>
          </article>
        </aside>
      </section>
    </div>
  );
}
