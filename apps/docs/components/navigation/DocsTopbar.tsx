"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb, type BreadcrumbItem } from "@zds/react/breadcrumb";
import DocsSearch from "./DocsSearch";
import ThemeToggle from "./ThemeToggle";

function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  if (pathname === "/") {
    return [{ label: "Getting started" }, { label: "Introduction" }];
  }

  if (pathname === "/components") {
    return [{ label: "Components" }, { label: "Overview" }];
  }

  if (pathname.startsWith("/components/breadcrumb")) {
    return [
      { label: "Components", href: "/components" },
      { label: "Breadcrumb" }
    ];
  }

  if (pathname.startsWith("/components/button")) {
    return [
      { label: "Components", href: "/components" },
      { label: "Button" }
    ];
  }

  if (pathname === "/foundation") {
    return [{ label: "Foundation" }, { label: "Overview" }];
  }

  if (pathname.startsWith("/foundation/tokens")) {
    return [
      { label: "Foundation", href: "/foundation" },
      { label: "Tokens" }
    ];
  }

  if (pathname.startsWith("/foundation")) {
    return [{ label: "Foundation" }, { label: "Overview" }];
  }

  return [{ label: "Getting started" }, { label: "Introduction" }];
}

export function DocsTopbar() {
  const currentPath = usePathname();
  const breadcrumbItems = getBreadcrumbItems(currentPath);
  const isComponents = currentPath.startsWith("/components");
  const isFoundation = currentPath.startsWith("/foundation");
  const searchLabel = isComponents ? "Search components" : isFoundation ? "Search tokens" : "Search documentation";
  const primaryLink = isFoundation ? "/foundation/tokens" : "/";
  const primaryLabel = isFoundation ? "Foundation" : "Introduction";

  return (
    <header className="docs-topbar">
      <div className="docs-topbar__left">
        <div className="docs-topbar__crumb">
          <Breadcrumb ariaLabel="Current documentation location" items={breadcrumbItems} />
        </div>
        <nav aria-label="Docs section switcher" className="docs-topbar__switcher">
          <Link className={`docs-topbar__switch-link${!isComponents ? " is-active" : ""}`} href={primaryLink}>
            {primaryLabel}
          </Link>
          <Link className={`docs-topbar__switch-link${isComponents ? " is-active" : ""}`} href="/components">
            Components
          </Link>
        </nav>
      </div>
      <div className="docs-topbar__actions">
        <DocsSearch label={searchLabel} />
        <ThemeToggle />
      </div>
    </header>
  );
}

export default DocsTopbar;
