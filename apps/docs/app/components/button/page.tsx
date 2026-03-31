import ButtonContent from "../../../content/components/button.mdx";
import PreviewLink from "../../../components/preview-link/PreviewLink";
import DocsProse from "../../../components/prose/DocsProse";
import buttonSpec from "../../../../../spec/components/button/button.spec.json";

const requiredStates = ["default", "disabled", "loading", "focus", "hover", "pressed"];
const variantGuide = [
  {
    name: "Primary",
    description: "가장 중요한 다음 액션이 분명해야 할 때 한 섹션에 하나만 둡니다.",
    className: "docs-variant-card docs-variant-card--primary"
  },
  {
    name: "Secondary",
    description: "이미 primary가 있는 문맥에서 이를 보조하는 선택지를 보여줄 때 사용합니다.",
    className: "docs-variant-card"
  },
  {
    name: "Tertiary",
    description: "항상 보여야 하지만 시선을 크게 가져가면 안 되는 낮은 강조 액션입니다.",
    className: "docs-variant-card"
  },
  {
    name: "Destructive",
    description: "되돌리기 어려운 파괴적 동작에만 사용하고 명확한 문구와 함께 둡니다.",
    className: "docs-variant-card docs-variant-card--danger"
  }
];

export default function ButtonDocsPage() {
  return (
    <div className="docs-page">
      <section className="docs-hero docs-hero--component">
        <h1>Button</h1>
        <p>
          Button은 강조, 순서, 책임을 전달하는 기본 액션 컴포넌트입니다. 한 섹션에는 하나의 primary만 두고,
          label 중심 계약을 유지한 채 variant를 선택합니다.
        </p>
        <div className="docs-pill-row">
          <span className="docs-pill docs-pill--brand">4 variants</span>
          <span className="docs-pill">6 required states</span>
        </div>
      </section>

      <section className="docs-split">
        <div className="docs-stack">
          <article className="docs-panel">
            <h2>Anatomy</h2>
            <p>label이 항상 의미를 주도하고, icon은 방향성과 맥락만 보조합니다.</p>
            <div className="docs-card-grid docs-card-grid--two">
              <div className="docs-card docs-card--soft">
                <strong>Label</strong>
                <p>항상 보이고, 동사 중심이며, 밀도 높은 화면에서도 빠르게 읽혀야 합니다.</p>
              </div>
              <div className="docs-card docs-card--soft">
                <strong>Icon slot</strong>
                <p>leading 또는 trailing으로만 사용하고, 의미 전달을 혼자 맡기지 않습니다.</p>
              </div>
            </div>
          </article>

          <article className="docs-panel">
            <h2>Variant guidance</h2>
            <div className="docs-card-grid docs-card-grid--four">
              {variantGuide.map((variant) => (
                <div className={variant.className} key={variant.name}>
                  <strong>{variant.name}</strong>
                  <p>{variant.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="docs-panel">
            <DocsProse>
              <ButtonContent />
            </DocsProse>
          </article>

          <article className="docs-panel">
            <h2>Parity status</h2>
            <table>
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Status</th>
                  <th>Gap</th>
                  <th>Owner</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(buttonSpec.parity).map(([platform, details]) => (
                  <tr key={platform}>
                    <td>{platform}</td>
                    <td>{details.status}</td>
                    <td>{details.gap}</td>
                    <td>{details.owner}</td>
                    <td>{details.remediationTarget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>

        <aside className="docs-rail">
          <article className="docs-rail-card">
            <span>Quick facts</span>
            <p>Variants: primary, secondary, tertiary, destructive</p>
            <p>Sizes: small, medium, large</p>
            <p>States: {requiredStates.join(", ")}</p>
          </article>

          <article className="docs-rail-card docs-rail-card--accent">
            <span>Implementation</span>
            <p>source of truth는 spec, token, pen, React, Storybook 링크를 함께 보여주고 API 서사는 중복하지 않습니다.</p>
            <ul className="source-list">
              <li><code>spec/components/button/button.spec.json</code></li>
              <li><code>packages/tokens/data/components/button.json</code></li>
              <li><code>pen/components/button/button.pen</code></li>
              <li><code>packages/react/src/components/button/Button.tsx</code></li>
            </ul>
          </article>

          <article className="docs-rail-card docs-rail-card--solid">
            <span>Next step</span>
            <p>Storybook에서 args와 interaction을 확인한 뒤, canonical usage guidance는 다시 docs에서 확인합니다.</p>
            <PreviewLink href="/storybook/index.html?path=/story/components-button--playground" label="Button preview 열기" />
          </article>
        </aside>
      </section>
    </div>
  );
}
