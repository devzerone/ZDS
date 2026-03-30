import DocsProse from "../../../components/prose/DocsProse";
import TokensContent from "../../../content/foundation/tokens.mdx";

export default function FoundationTokensPage() {
  return (
    <section className="docs-panel">
      <DocsProse>
        <TokensContent />
      </DocsProse>
    </section>
  );
}
