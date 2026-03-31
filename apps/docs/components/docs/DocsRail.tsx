import type { PropsWithChildren, ReactNode } from "react";

type DocsRailCardTone = "default" | "accent" | "solid";

type DocsRailCardProps = PropsWithChildren<{
  title: string;
  tone?: DocsRailCardTone;
  footer?: ReactNode;
}>;

export function DocsRail({ children }: PropsWithChildren) {
  return <aside className="docs-rail">{children}</aside>;
}

export function DocsRailCard({ title, tone = "default", footer, children }: DocsRailCardProps) {
  const toneClass =
    tone === "accent" ? " docs-rail-card--accent" : tone === "solid" ? " docs-rail-card--solid" : "";

  return (
    <article className={`docs-rail-card${toneClass}`}>
      <span>{title}</span>
      {children}
      {footer}
    </article>
  );
}

export default DocsRail;
