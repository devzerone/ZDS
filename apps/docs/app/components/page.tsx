import PreviewLink from "../../components/preview-link/PreviewLink";

export default function ComponentsPage() {
  return (
    <section className="docs-panel">
      <span className="docs-eyebrow">Components</span>
      <h1>문서와 preview가 함께 움직이는 reference component 집합</h1>
      <p>
        Button은 canonical docs, shared React implementation, Storybook preview를 연결하는 첫 reference
        component입니다. 이후 Input, Badge도 같은 구조를 따르게 됩니다.
      </p>
      <div className="docs-actions">
        <a className="preview-link" href="/components/button">
          Button 문서 보기
        </a>
        <PreviewLink href="/storybook/index.html?path=/story/components-button--playground" label="Button preview 열기" />
      </div>
    </section>
  );
}
