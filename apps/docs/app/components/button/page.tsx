import ButtonContent from "../../../content/components/button.mdx";
import ButtonPreviewSandbox from "../../../components/button/ButtonPreviewSandbox";
import PreviewLink from "../../../components/preview-link/PreviewLink";
import DocsProse from "../../../components/prose/DocsProse";

const requiredStates = ["default", "disabled", "loading", "focus", "hover", "pressed"];
const propertyGuide = [
  ["Variant", "Primary는 한 섹션에 한 번만 사용하고, Secondary와 Tertiary는 이를 보조해야 합니다. Destructive는 항상 위험한 결과를 분명하게 드러내야 합니다."],
  ["Size", "Small은 밀도 높은 화면에, Medium은 기본 선택에, Large는 여유 있는 화면이나 히어로 액션에 적합합니다."],
  ["State", "Default, Hover, Focus, Pressed, Loading, Disabled는 서로 분리된 스타일이 아니라 하나의 일관된 계열로 읽혀야 합니다."]
] as const;

const propsTable = [
  ["variant", "primary | secondary | tertiary | destructive"],
  ["size", "small | medium | large"],
  ["disabled / loading", "액션의 위계를 유지한 채 사용 가능 여부만 바꾸는 불리언 플래그입니다."]
] as const;

export default function ButtonDocsPage() {
  return (
    <div className="docs-page">
      <section className="docs-hero docs-hero--component">
        <h1>Button</h1>
        <p>
          Button은 화면에서 가장 중요한 액션을 실행할 때 사용하는 기본 컴포넌트입니다. 한 섹션에는 하나의
          대표 액션만 두고, 보조 작업은 더 조용한 variant로 분리합니다.
        </p>
        <div className="docs-pill-row">
          <span className="docs-pill">Default action</span>
          <span className="docs-pill">Preview + code</span>
        </div>
      </section>

      <section className="docs-split">
        <div className="docs-stack">
          <article className="docs-panel">
            <h2>Preview</h2>
            <p>
              기본 예제로 위계를 먼저 확인한 뒤, 액션 라벨은 유지한 채 variant, 크기, 상태 차이를 비교합니다.
            </p>
            <div className="docs-sandbox-card">
              <div className="docs-sandbox-head">
                <div className="docs-sandbox-tabs">
                  <span className="docs-sandbox-tab docs-sandbox-tab--active">Preview</span>
                  <span className="docs-sandbox-tab">Code</span>
                </div>
                <div className="docs-sandbox-indicator" aria-hidden="true">
                  <span />
                </div>
              </div>
              <div className="docs-sandbox-body">
                <ButtonPreviewSandbox mode="single" />
              </div>
              <div className="docs-preview-meta">
                <span>Primary / md / enabled</span>
                <span className="docs-preview-chip">React</span>
              </div>
            </div>
          </article>

          <article className="docs-panel">
            <h2>Property</h2>
            <div className="docs-property-list">
              {propertyGuide.map(([label, description]) => (
                <div className="docs-property-item" key={label}>
                  <strong>{label}</strong>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="docs-panel">
            <h2>Examples</h2>
            <p>아이콘 지원과 위계를 함께 사용할 때도, 사용자가 가장 먼저 읽는 것은 항상 라벨이어야 합니다.</p>
            <div className="docs-preview-canvas">
              <ButtonPreviewSandbox mode="row" />
              <div className="docs-preview-meta">
                <span>아이콘 지원 / 혼합 위계</span>
                <span className="docs-preview-chip">Examples</span>
              </div>
            </div>
          </article>

          <article className="docs-panel">
            <h2>Props Table</h2>
            <p>계약 문서를 1차 기준으로 삼고, React API 이름도 spec과 Storybook에서 사용하는 용어와 맞춰 유지합니다.</p>
            <div className="docs-props-table">
              <div className="docs-props-row docs-props-row--head">
                <strong>Prop</strong>
                <strong>Description</strong>
              </div>
              {propsTable.map(([prop, description]) => (
                <div className="docs-props-row" key={prop}>
                  <span>{prop}</span>
                  <span>{description}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="docs-panel">
            <DocsProse>
              <ButtonContent />
            </DocsProse>
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
            <span>On this page</span>
            <p>Preview</p>
            <p>Property</p>
            <p>Examples</p>
            <p>Props table</p>
          </article>

          <article className="docs-rail-card docs-rail-card--solid">
            <span>Next step</span>
            <p>args와 상호작용 검토는 Storybook에서 확인하고, canonical guidance는 다시 docs로 돌아와 읽습니다.</p>
            <PreviewLink href="/storybook/index.html?path=/story/components-button--playground" label="Button preview 열기" />
          </article>

          <article className="docs-rail-card">
            <span>Implementation</span>
            <p>Source references stay aligned across spec, tokens, pen, React, and Storybook.</p>
            <ul className="source-list">
              <li><code>spec/components/button/button.spec.json</code></li>
              <li><code>packages/tokens/data/components/button.json</code></li>
              <li><code>pen/components/button/button.pen</code></li>
              <li><code>packages/react/src/components/button/Button.tsx</code></li>
            </ul>
          </article>
        </aside>
      </section>
    </div>
  );
}
