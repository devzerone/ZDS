"use client";

import { usePathname } from "next/navigation";
import { siteNav } from "./site-nav";
import ThemeToggle from "./ThemeToggle";

export function DocsSidebar() {
  const currentPath = usePathname();
  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar__header">
        <div>
          <a className="docs-brand" href="/">
            ZDS Docs
          </a>
          <p className="docs-brand-copy">공통 디자인 언어와 컴포넌트 스펙</p>
        </div>
        <ThemeToggle />
      </div>
      <nav aria-label="Design system documentation">
        {siteNav.map((section) => (
          <div className="docs-nav-section" key={section.label}>
            <a
              className={`docs-nav-section__title${currentPath === section.href ? " is-active" : ""}`}
              href={section.href}
            >
              {section.label}
            </a>
            <ul className="docs-nav-list">
              {section.entries.map((entry) => (
                <li key={entry.href}>
                  <a
                    className={`docs-nav-link${currentPath === entry.href ? " is-active" : ""}`}
                    href={entry.href}
                    target={entry.href.startsWith("/storybook/") ? "_blank" : undefined}
                    rel={entry.href.startsWith("/storybook/") ? "noreferrer" : undefined}
                  >
                    <span>{entry.label}</span>
                    <small>{entry.description}</small>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default DocsSidebar;
