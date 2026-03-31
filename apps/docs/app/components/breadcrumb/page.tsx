import BreadcrumbContent from "../../../content/components/breadcrumb.mdx";
import BreadcrumbPreviewSandbox from "../../../components/breadcrumb/BreadcrumbPreviewSandbox";
import DocsPreviewCard from "../../../components/docs/DocsPreviewCard";
import DocsOnThisPage from "../../../components/docs/DocsOnThisPage";
import DocsRail, { DocsRailCard } from "../../../components/docs/DocsRail";
import DocsProse from "../../../components/prose/DocsProse";
import PreviewLink from "../../../components/preview-link/PreviewLink";

const propsTable = [
  ["items", "브레드크럼프에 표시할 순서형 항목 목록입니다. 마지막 항목은 현재 위치로 해석됩니다."],
  ["maxVisibleItems", "깊은 경로에서 시작점과 현재 위치를 유지한 채 중간 단계를 축약할 때 사용하는 최대 표시 수입니다."],
  ["ariaLabel", "navigation landmark에 붙는 접근성 레이블입니다."]
] as const;

export default function BreadcrumbDocsPage() {
  return (
    <div className="docs-page">
      <section className="docs-hero docs-hero--component">
        <h1>Breadcrumb</h1>
        <p>
          Breadcrumb는 현재 위치를 빠르게 파악하고 상위 단계로 되돌아갈 수 있게 돕는 공통 탐색 보조
          컴포넌트입니다. 장식적 구분자와 실제 탐색 항목을 분리해 hierarchy를 분명하게 읽히게 합니다.
        </p>
        <div className="docs-pill-row">
          <span className="docs-pill">Hierarchy navigation</span>
          <span className="docs-pill">Current location</span>
        </div>
      </section>

      <section className="docs-split">
        <div className="docs-stack">
          <article className="docs-panel" id="preview">
            <h2>Preview</h2>
            <p>표준 경로, 단일 경로, constrained-width 경로를 나란히 확인해 현재 위치와 상위 단계 의미를 비교합니다.</p>
            <DocsPreviewCard metaChip="React" metaLabel="Standard / single / constrained">
              <div style={{ display: "grid", gap: "1rem" }}>
                <BreadcrumbPreviewSandbox mode="standard" />
                <BreadcrumbPreviewSandbox mode="single" />
                <BreadcrumbPreviewSandbox mode="constrained" />
              </div>
            </DocsPreviewCard>
          </article>

          <article className="docs-panel" id="props-table">
            <h2>Props Table</h2>
            <table className="docs-props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {propsTable.map(([prop, description]) => (
                  <tr key={prop}>
                    <td>{prop}</td>
                    <td>{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="docs-panel">
            <DocsProse>
              <BreadcrumbContent />
            </DocsProse>
          </article>
        </div>

        <DocsRail>
          <DocsRailCard title="Quick facts">
            <p>Roles: ancestor, current, collapsed-summary</p>
            <p>Overflow: collapse-middle</p>
            <p>Platform status: react ready / native surfaces not-started</p>
          </DocsRailCard>

          <DocsOnThisPage />

          <DocsRailCard
            title="Next step"
            tone="solid"
            footer={<PreviewLink href="/storybook/index.html?path=/story/components-breadcrumb--playground" label="Breadcrumb preview 열기" />}
          >
            <p>interactive review는 Storybook에서 확인하고, canonical guidance는 docs에서 읽습니다.</p>
          </DocsRailCard>

          <DocsRailCard title="Implementation">
            <p>Source references stay aligned across spec, tokens, pen, React, and Storybook.</p>
            <ul className="source-list">
              <li><code>spec/components/breadcrumb/breadcrumb.spec.json</code></li>
              <li><code>packages/tokens/data/components/breadcrumb.json</code></li>
              <li><code>pen/components/breadcrumb/breadcrumb.pen</code></li>
              <li><code>packages/react/src/components/breadcrumb/Breadcrumb.tsx</code></li>
            </ul>
          </DocsRailCard>
        </DocsRail>
      </section>
    </div>
  );
}
