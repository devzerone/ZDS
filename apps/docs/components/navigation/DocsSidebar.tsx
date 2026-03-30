"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import logoDark from "../../../../packages/foundation/assets/brand/zds-logo-dark-transparent.png";
import logoLight from "../../../../packages/foundation/assets/brand/zds-logo-light-transparent.png";
import { useThemeMode } from "../theme/ThemeProvider";
import { siteNav } from "./site-nav";

export function DocsSidebar() {
  const currentPath = usePathname();
  const { theme } = useThemeMode();
  const logoSrc = theme === "dark" ? logoDark : logoLight;

  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar__header">
        <a className="docs-brand" href="/">
          <Image alt="ZDS logo" className="docs-brand__mark" priority src={logoSrc} />
          <div className="docs-brand__copy">
            <strong>Zero Design System</strong>
            <span>공통 디자인 언어와 컴포넌트 기준선</span>
          </div>
        </a>
      </div>
      <nav aria-label="Design system documentation">
        {siteNav.map((section) => (
          <div className="docs-nav-section" key={section.label}>
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
      <div className="docs-sidebar__footer">
        <span>Canonical source</span>
        <p>Spec, pen, tokens, React docs를 같은 흐름에서 읽을 수 있게 유지합니다.</p>
      </div>
    </aside>
  );
}

export default DocsSidebar;
