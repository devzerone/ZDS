import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Breadcrumb, collapseBreadcrumbItems, getBreadcrumbRenderModel, normalizeBreadcrumbItems } from "./Breadcrumb";

test("renders ancestor links and marks the final item as the current page", () => {
  const markup = renderToStaticMarkup(
    <Breadcrumb
      items={[
        { label: "Workspace", href: "/workspace" },
        { label: "Settings", href: "/workspace/settings" },
        { label: "Members" }
      ]}
    />
  );

  assert.match(markup, /data-zds-component="breadcrumb"/);
  assert.match(markup, /href="\/workspace"/);
  assert.match(markup, /href="\/workspace\/settings"/);
  assert.match(markup, /aria-current="page"/);
  assert.doesNotMatch(markup, /href="Members"/);
});

test("throws when no breadcrumb items are provided", () => {
  assert.throws(() => renderToStaticMarkup(<Breadcrumb items={[]} />), /requires at least one item/i);
});

test("normalizes the final breadcrumb item as current", () => {
  const items = normalizeBreadcrumbItems([
    { label: "Workspace", href: "/workspace" },
    { label: "Settings" }
  ]);

  assert.equal(items[0].current, false);
  assert.equal(items[1].current, true);
});

test("collapses the middle of deep paths when maxVisibleItems is set", () => {
  const items = collapseBreadcrumbItems(
    [
      { label: "Workspace", href: "/workspace" },
      { label: "Administration", href: "/workspace/admin" },
      { label: "Roles", href: "/workspace/admin/roles" },
      { label: "Permission policies", href: "/workspace/admin/roles/policies" },
      { label: "Review changes" }
    ],
    4
  );

  assert.equal(items.length, 4);
  assert.equal(items[1].collapsed, true);
  assert.equal(items[3].current, true);
});

test("renders a collapsed summary for constrained paths", () => {
  const markup = renderToStaticMarkup(
    <Breadcrumb
      items={[
        { label: "Workspace", href: "/workspace" },
        { label: "Administration", href: "/workspace/admin" },
        { label: "Roles", href: "/workspace/admin/roles" },
        { label: "Permission policies", href: "/workspace/admin/roles/policies" },
        { label: "Review changes" }
      ]}
      maxVisibleItems={4}
    />
  );

  assert.match(markup, /data-zds-role="collapsed-summary"/);
  assert.match(markup, /Collapsed breadcrumb path/);
});

test("keeps separators decorative and the current page non-interactive", () => {
  const markup = renderToStaticMarkup(
    <Breadcrumb
      items={[
        { label: "Workspace", href: "/workspace" },
        { label: "Members" }
      ]}
    />
  );

  assert.match(markup, /data-zds-slot="separator"/);
  assert.match(markup, /aria-hidden="true"/);
  assert.match(markup, /aria-current="page"/);
});

test("computes a breadcrumb render model with spacing and typography tokens", () => {
  const model = getBreadcrumbRenderModel(
    [
      { label: "Workspace", href: "/workspace" },
      { label: "Members" }
    ],
    4
  );

  assert.equal(model.layout.itemGap, 4);
  assert.equal(model.layout.separatorGap, 8);
  assert.equal(model.typography.itemToken, "font.label.md");
});
