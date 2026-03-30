import ButtonContent from "../../../content/components/button.mdx";
import PreviewLink from "../../../components/preview-link/PreviewLink";
import DocsProse from "../../../components/prose/DocsProse";
import buttonSpec from "../../../../../spec/components/button/button.spec.json";

const requiredStates = ["default", "disabled", "loading", "focus", "hover", "pressed"];

export default function ButtonDocsPage() {
  return (
    <>
      <section className="docs-panel">
        <span className="docs-eyebrow">Component</span>
        <h1>Button</h1>
        <p>
          Button documentation is sourced from canonical MDX content, then anchored back to the shared
          button spec, token file, and preview surface.
        </p>
        <div className="docs-actions">
          <PreviewLink href="/storybook/index.html?path=/story/components-button--playground" label="Button preview 열기" />
        </div>
      </section>

      <section className="docs-panel">
        <DocsProse>
          <ButtonContent />
        </DocsProse>
      </section>

      <section className="docs-panel">
        <h2>Required review states</h2>
        <p>{requiredStates.join(", ")}</p>
      </section>

      <section className="docs-panel">
        <h2>Source references</h2>
        <ul className="source-list">
          <li><code>spec/components/button/button.spec.json</code></li>
          <li><code>packages/foundation/tokens/components/button.json</code></li>
          <li><code>pen/components/button/button.pen</code></li>
          <li><code>packages/react/components/button/Button.tsx</code></li>
        </ul>
      </section>

      <section className="docs-panel">
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
      </section>
    </>
  );
}
