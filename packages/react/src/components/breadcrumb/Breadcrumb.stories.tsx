import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";

type StoryArgs = {
  docsUrl?: string;
  items: BreadcrumbItem[];
  maxVisibleItems?: number;
};

const canonicalItems: BreadcrumbItem[] = [
  { label: "Workspace", href: "/workspace" },
  { label: "Settings", href: "/workspace/settings" },
  { label: "Members", href: "/workspace/settings/members" }
];

const longPathItems: BreadcrumbItem[] = [
  { label: "Workspace", href: "/workspace" },
  { label: "Administration", href: "/workspace/admin" },
  { label: "Roles", href: "/workspace/admin/roles" },
  { label: "Permission policies", href: "/workspace/admin/roles/policies" },
  { label: "Review changes", href: "/workspace/admin/roles/policies/review" }
];

const meta = {
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Canonical breadcrumb preview backed by the shared React Breadcrumb implementation."
      }
    }
  },
  args: {
    items: canonicalItems
  },
  argTypes: {
    items: { control: false },
    maxVisibleItems: { control: { type: "number", min: 4, max: 6, step: 1 } }
  },
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
      <Breadcrumb items={args.items} maxVisibleItems={args.maxVisibleItems} />
      {args.docsUrl ? (
        <a href={args.docsUrl} style={{ color: "inherit", fontWeight: 600 }}>
          Open canonical docs
        </a>
      ) : null}
    </div>
  )
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    items: canonicalItems
  },
  parameters: {
    docsUrl: "/components/breadcrumb"
  }
};

export const SingleStep: Story = {
  args: {
    items: [{ label: "Billing" }]
  },
  parameters: {
    docsUrl: "/components/breadcrumb"
  }
};

export const ConstrainedPath: Story = {
  args: {
    items: longPathItems,
    maxVisibleItems: 4
  },
  parameters: {
    docsUrl: "/components/breadcrumb"
  }
};
