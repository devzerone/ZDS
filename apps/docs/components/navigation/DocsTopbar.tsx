"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

function getBreadcrumb(pathname: string) {
  if (pathname === "/") {
    return "Docs / Overview";
  }

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/-/g, " "))
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  return `Docs / ${segments.join(" / ")}`;
}

export function DocsTopbar() {
  const currentPath = usePathname();

  return (
    <header className="docs-topbar">
      <span className="docs-topbar__crumb">{getBreadcrumb(currentPath)}</span>
      <div className="docs-topbar__actions">
        <div className="docs-search-shell" aria-label="Search shortcut">
          <span>Find component guidance</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default DocsTopbar;
