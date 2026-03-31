import React, { type CSSProperties, type ReactNode } from "react";

export type PrimitiveBreadcrumbItem = {
  key?: string;
  label: ReactNode;
  href?: string;
  current?: boolean;
  collapsed?: boolean;
  ariaLabel?: string;
};

export type PrimitiveBreadcrumbProps = {
  ariaLabel?: string;
  collapsedLabel?: string;
  currentItemStyle?: CSSProperties;
  itemStyle?: CSSProperties;
  items: PrimitiveBreadcrumbItem[];
  linkStyle?: CSSProperties;
  listStyle?: CSSProperties;
  navStyle?: CSSProperties;
  separator?: ReactNode;
  separatorStyle?: CSSProperties;
};

function renderItemContent(
  item: PrimitiveBreadcrumbItem,
  collapsedLabel: string,
  itemStyle?: CSSProperties,
  linkStyle?: CSSProperties,
  currentItemStyle?: CSSProperties
) {
  const role = item.collapsed ? "collapsed-summary" : item.current ? "current" : "ancestor";
  const content = item.collapsed ? collapsedLabel : item.label;

  if (item.current) {
    return (
      <span aria-current="page" data-zds-role={role} style={{ ...itemStyle, ...currentItemStyle }}>
        {content}
      </span>
    );
  }

  if (item.href && !item.collapsed) {
    return (
      <a data-zds-role={role} href={item.href} style={{ ...itemStyle, ...linkStyle }}>
        {content}
      </a>
    );
  }

  return (
    <span aria-label={item.ariaLabel} data-zds-role={role} style={itemStyle}>
      {content}
    </span>
  );
}

export function PrimitiveBreadcrumb({
  ariaLabel = "Breadcrumb",
  collapsedLabel = "...",
  currentItemStyle,
  itemStyle,
  items,
  linkStyle,
  listStyle,
  navStyle,
  separator = "/",
  separatorStyle
}: PrimitiveBreadcrumbProps) {
  return (
    <nav aria-label={ariaLabel} data-zds-component="breadcrumb" style={navStyle}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          listStyle: "none",
          margin: 0,
          padding: 0,
          ...listStyle
        }}
      >
        {items.map((item, index) => (
          <li
            key={item.key ?? `${index}-${String(item.label)}`}
            style={{ display: "inline-flex", alignItems: "center", minWidth: 0 }}
          >
            {index > 0 ? (
              <span aria-hidden="true" data-zds-slot="separator" style={separatorStyle}>
                {separator}
              </span>
            ) : null}
            {renderItemContent(item, collapsedLabel, itemStyle, linkStyle, currentItemStyle)}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default PrimitiveBreadcrumb;
