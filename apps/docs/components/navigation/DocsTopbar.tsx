"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

function getBreadcrumb(pathname: string) {
  if (pathname === "/") {
    return "Getting started / Introduction";
  }

  if (pathname.startsWith("/components")) {
    return "Components / Button";
  }

  if (pathname.startsWith("/foundation")) {
    return "Foundation / Tokens";
  }

  return "Getting started / Introduction";
}

export function DocsTopbar() {
  const currentPath = usePathname();
  const isComponents = currentPath.startsWith("/components");
  const isFoundation = currentPath.startsWith("/foundation");
  const searchLabel = isComponents ? "Search components" : isFoundation ? "Search tokens" : "Search documentation";
  const primaryLink = isFoundation ? "/foundation/tokens" : "/";
  const primaryLabel = isFoundation ? "Foundation" : "Introduction";

  return (
    <header className="docs-topbar">
      <div className="docs-topbar__left">
        <span className="docs-topbar__crumb">{getBreadcrumb(currentPath)}</span>
        <nav aria-label="Docs section switcher" className="docs-topbar__switcher">
          <Link className={`docs-topbar__switch-link${!isComponents ? " is-active" : ""}`} href={primaryLink}>
            {primaryLabel}
          </Link>
          <Link className={`docs-topbar__switch-link${isComponents ? " is-active" : ""}`} href="/components/button">
            Components
          </Link>
        </nav>
      </div>
      <div className="docs-topbar__actions">
        <div className="docs-search-shell" aria-label="Search shortcut">
          <span>{searchLabel}</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default DocsTopbar;
