import type { ReactNode } from "react";

type DocsPreviewCardProps = {
  children: ReactNode;
  metaLabel: string;
  metaChip: string;
  secondaryTabLabel?: string;
};

export function DocsPreviewCard({
  children,
  metaLabel,
  metaChip,
  secondaryTabLabel = "Code"
}: DocsPreviewCardProps) {
  return (
    <div className="docs-sandbox-card">
      <div className="docs-sandbox-head">
        <div className="docs-sandbox-tabs">
          <span className="docs-sandbox-tab docs-sandbox-tab--active">Preview</span>
          <span className="docs-sandbox-tab">{secondaryTabLabel}</span>
        </div>
        <div className="docs-sandbox-indicator" aria-hidden="true">
          <span />
        </div>
      </div>
      <div className="docs-sandbox-body">{children}</div>
      <div className="docs-preview-meta">
        <span>{metaLabel}</span>
        <span className="docs-preview-chip">{metaChip}</span>
      </div>
    </div>
  );
}

export default DocsPreviewCard;
