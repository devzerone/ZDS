"use client";

import { Breadcrumb } from "@zds/react/breadcrumb";

type BreadcrumbPreviewSandboxProps = {
  mode: "single" | "standard" | "constrained";
};

const standardItems = [
  { label: "Workspace", href: "/workspace" },
  { label: "Settings", href: "/workspace/settings" },
  { label: "Members" }
];

const constrainedItems = [
  { label: "Workspace", href: "/workspace" },
  { label: "Administration", href: "/workspace/admin" },
  { label: "Roles", href: "/workspace/admin/roles" },
  { label: "Permission policies", href: "/workspace/admin/roles/policies" },
  { label: "Review changes" }
];

export function BreadcrumbPreviewSandbox({ mode }: BreadcrumbPreviewSandboxProps) {
  if (mode === "single") {
    return (
      <div className="docs-preview-stage">
        <Breadcrumb items={[{ label: "Billing" }]} />
      </div>
    );
  }

  if (mode === "constrained") {
    return (
      <div className="docs-preview-stage" style={{ maxWidth: 360 }}>
        <Breadcrumb items={constrainedItems} maxVisibleItems={4} />
      </div>
    );
  }

  return (
    <div className="docs-preview-stage">
      <Breadcrumb items={standardItems} />
    </div>
  );
}

export default BreadcrumbPreviewSandbox;
