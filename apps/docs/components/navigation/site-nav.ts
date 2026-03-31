export type SiteNavEntry = {
  label: string;
  href: string;
  description: string;
};

export type SiteNavSection = {
  label: string;
  href: string;
  entries: SiteNavEntry[];
};

export const productTabs: SiteNavEntry[] = [
  { label: "Docs", href: "/", description: "Design system guidance" },
  { label: "React", href: "/components", description: "React reference implementation" },
  { label: "AI Integration", href: "/foundation/tokens", description: "Spec and token context for AI tooling" },
  { label: "Breeze", href: "/components", description: "Interactive preview entry points" }
];

export const siteNav: SiteNavSection[] = [
  {
    label: "Docs",
    href: "/",
    entries: [
      {
        label: "Overview",
        href: "/",
        description: "Design language overview and getting started"
      }
    ]
  },
  {
    label: "Foundation",
    href: "/foundation",
    entries: [
      {
        label: "Tokens",
        href: "/foundation/tokens",
        description: "Semantic token structure, usage rules, and theme interpretation."
      }
    ]
  },
  {
    label: "Components",
    href: "/components",
    entries: [
      {
        label: "Button",
        href: "/components/button",
        description: "Variants, states, accessibility, parity, and preview access."
      },
      {
        label: "Breadcrumb",
        href: "/components/breadcrumb",
        description: "Hierarchy, constrained paths, accessibility, parity, and preview access."
      }
    ]
  },
  {
    label: "Resources",
    href: "/components",
    entries: [
      {
        label: "Storybook",
        href: "/storybook/index.html?path=/story/components-button--playground",
        description: "Interactive component preview"
      },
      {
        label: "Breadcrumb preview",
        href: "/storybook/index.html?path=/story/components-breadcrumb--playground",
        description: "Interactive breadcrumb preview"
      }
    ]
  }
];
