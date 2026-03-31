import ButtonContent from "../../../content/components/button.mdx";
import ButtonPreviewSandbox from "../../../components/button/ButtonPreviewSandbox";
import PreviewLink from "../../../components/preview-link/PreviewLink";
import DocsProse from "../../../components/prose/DocsProse";

const requiredStates = ["default", "disabled", "loading", "focus", "hover", "pressed"];
const propertyGuide = [
  ["Variant", "Use primary once per section. Secondary and tertiary stay supportive, and destructive must always signal risk."],
  ["Size", "Small fits dense surfaces, medium is the default, and large is reserved for roomy moments or hero actions."],
  ["State", "Default, hover, focus, pressed, loading, and disabled should read as one coherent family rather than six separate styles."]
] as const;

const propsTable = [
  ["variant", "primary | secondary | tertiary | destructive"],
  ["size", "small | medium | large"],
  ["disabled / loading", "Boolean flags that preserve the same action hierarchy while changing availability."]
] as const;

export default function ButtonDocsPage() {
  return (
    <div className="docs-page">
      <section className="docs-hero docs-hero--component">
        <h1>Button</h1>
        <p>
          Buttons let people trigger the most important action in a flow. Keep one dominant action per section and
          use quieter variants for supporting work.
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
              Use the default example to verify hierarchy first, then compare variants, sizes, and states without
              changing the action label.
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
            <p>Combine icon support and hierarchy carefully so the label remains the first thing people scan.</p>
            <div className="docs-preview-canvas">
              <ButtonPreviewSandbox mode="row" />
              <div className="docs-preview-meta">
                <span>Icon support / mixed hierarchy</span>
                <span className="docs-preview-chip">Examples</span>
              </div>
            </div>
          </article>

          <article className="docs-panel">
            <h2>Props Table</h2>
            <p>Use the contract as the primary reference and keep the React API aligned with the same naming used in spec.</p>
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
            <p>Open Storybook for args and interaction review, then return here for canonical usage guidance.</p>
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
