"use client";

import { useEffect, useState } from "react";
import { DocsRailCard } from "./DocsRail";

type HeadingLink = {
  id: string;
  label: string;
};

function readHeadingLinks() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(".docs-page article[id], .docs-page section[id]"));

  return nodes
    .map((node) => {
      const heading = node.querySelector<HTMLHeadingElement>("h2, h1");
      const label = heading?.textContent?.trim();
      if (!node.id || !label) {
        return null;
      }

      return { id: node.id, label };
    })
    .filter((item): item is HeadingLink => item !== null);
}

function readActiveId(links: HeadingLink[]) {
  if (typeof window === "undefined") {
    return links[0]?.id ?? "";
  }

  const hash = window.location.hash.replace(/^#/, "");
  return hash || links[0]?.id || "";
}

export default function DocsOnThisPage() {
  const [links, setLinks] = useState<HeadingLink[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const nextLinks = readHeadingLinks();
    setLinks(nextLinks);
    setActiveId(readActiveId(nextLinks));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleEntry?.target instanceof HTMLElement) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -64% 0px",
        threshold: [0.2, 0.6, 1]
      }
    );

    nextLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    const syncHash = () => {
      setActiveId(readActiveId(nextLinks));
    };

    window.addEventListener("hashchange", syncHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  if (links.length === 0) {
    return null;
  }

  return (
    <DocsRailCard title="On this page" tone="accent">
      <nav aria-label="On this page" className="docs-anchor-list">
        {links.map((link) => (
          <a
            className={`docs-anchor-link${activeId === link.id ? " is-active" : ""}`}
            href={`#${link.id}`}
            key={link.id}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </DocsRailCard>
  );
}
