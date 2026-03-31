"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { siteNav, type SiteNavEntry } from "./site-nav";

type SearchEntry = SiteNavEntry & {
  section: string;
  external?: boolean;
};

const searchEntries: SearchEntry[] = siteNav.flatMap((section) =>
  section.entries.map((entry) => ({
    ...entry,
    section: section.label,
    external: entry.href.startsWith("/storybook/")
  }))
);

type DocsSearchProps = {
  label: string;
};

function getShortcutLabel() {
  return "Cmd/Ctrl K";
}

export default function DocsSearch({ label }: DocsSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return searchEntries;
    }

    return searchEntries.filter((entry) =>
      `${entry.label} ${entry.description} ${entry.section}`.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable === true;

      if (isShortcut) {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "/" && !isTypingTarget) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [pathname]);

  const shortcutLabel = getShortcutLabel();

  return (
    <>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className="docs-search-shell docs-search-shell--button"
        onClick={() => setOpen(true)}
        type="button"
      >
        <span>{label}</span>
        <kbd>{shortcutLabel}</kbd>
      </button>

      {open ? (
        <div
          aria-hidden="true"
          className="docs-search-overlay"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            aria-label="Search documentation"
            aria-modal="true"
            className="docs-search-dialog"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="docs-search-dialog__head">
              <strong>Search docs</strong>
              <button className="docs-search-close" onClick={() => setOpen(false)} type="button">
                Close
              </button>
            </div>

            <input
              autoFocus
              className="docs-search-input"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search pages, components, and preview entry points"
              type="text"
              value={query}
            />

            <div className="docs-search-results">
              {results.length > 0 ? (
                results.map((entry) => (
                  <button
                    className="docs-search-result"
                    key={`${entry.section}-${entry.href}`}
                    onClick={() => {
                      if (entry.external) {
                        window.location.href = entry.href;
                        return;
                      }

                      router.push(entry.href);
                    }}
                    type="button"
                  >
                    <span>{entry.label}</span>
                    <small>{entry.section}</small>
                    <p>{entry.description}</p>
                  </button>
                ))
              ) : (
                <p className="docs-search-empty">검색 결과가 없습니다. 다른 이름이나 섹션으로 다시 찾아보세요.</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
