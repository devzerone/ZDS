"use client";

import { usePathname } from "next/navigation";
import { productTabs } from "./site-nav";

export function DocsTopbar() {
  const currentPath = usePathname();

  return (
    <header className="docs-topbar">
      <nav className="docs-product-tabs" aria-label="Platform navigation">
        {productTabs.map((tab) => {
          const active = tab.href === "/" ? currentPath === "/" : currentPath.startsWith(tab.href);
          return (
            <a className={`docs-product-tab${active ? " is-active" : ""}`} href={tab.href} key={tab.label}>
              {tab.label}
            </a>
          );
        })}
      </nav>
      <div className="docs-search-shell" aria-label="Search shortcut">
        <span>Search</span>
        <kbd>⌘K</kbd>
      </div>
    </header>
  );
}

export default DocsTopbar;
