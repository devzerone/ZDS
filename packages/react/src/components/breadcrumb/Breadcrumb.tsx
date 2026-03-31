import React, { type CSSProperties } from "react";
import { palette } from "@zds/tokens/color";
import { semantic } from "@zds/tokens/semantic";
import { spacing } from "@zds/tokens/spacing";
import { typography } from "@zds/tokens/typography";
import { breadcrumbTokens } from "@zds/tokens/components/breadcrumb";
import ChevronRightIcon from "../../icons/ChevronRight";
import { PrimitiveBreadcrumb, type PrimitiveBreadcrumbItem } from "../../primitives/breadcrumb";

export type BreadcrumbItem = {
  href?: string;
  key?: string;
  label: string;
};

export type BreadcrumbProps = {
  ariaLabel?: string;
  items: BreadcrumbItem[];
  maxVisibleItems?: number;
};

export const BREADCRUMB_ITEM_ROLES = Object.freeze(Object.keys(breadcrumbTokens.itemRoles)) as Array<keyof typeof breadcrumbTokens.itemRoles>;

function toCssVarName(tokenName: string) {
  return `--${tokenName.replaceAll(".", "-")}`;
}

function resolveSemanticColor(tokenName: string): string {
  const token = semantic.tokens[tokenName];
  if (!token) {
    throw new Error(`Unknown semantic token: ${tokenName}`);
  }

  const [familyName, stepName] = token.light.split(".");
  const family = palette.families[familyName];
  if (!family?.steps?.[stepName]) {
    throw new Error(`Unknown palette reference for semantic token: ${tokenName}`);
  }

  return family.steps[stepName];
}

function resolveSemanticColorVar(tokenName: string) {
  return `var(${toCssVarName(tokenName)}, ${resolveSemanticColor(tokenName)})`;
}

function resolveDimensionVar(tokenName: string, fallback: number) {
  return `var(${toCssVarName(tokenName)}, ${fallback}px)`;
}

function resolveTypographyVar(tokenName: string, suffix: "family" | "size" | "line-height" | "weight", fallback: string | number) {
  return `var(--${tokenName.replaceAll(".", "-")}-${suffix}, ${fallback})`;
}

export function normalizeBreadcrumbItems(items: BreadcrumbItem[]) {
  if (items.length === 0) {
    throw new Error("ZDS Breadcrumb requires at least one item.");
  }

  return items.map((item, index) => ({
    ...item,
    current: index === items.length - 1
  }));
}

export function collapseBreadcrumbItems(items: BreadcrumbItem[], maxVisibleItems?: number): PrimitiveBreadcrumbItem[] {
  const normalized = normalizeBreadcrumbItems(items);

  if (!maxVisibleItems || normalized.length <= maxVisibleItems || maxVisibleItems < 4) {
    return normalized;
  }

  const tailCount = maxVisibleItems - 2;
  const trailingItems = normalized.slice(normalized.length - tailCount);

  return [
    normalized[0],
    {
      key: "collapsed-summary",
      label: "...",
      collapsed: true,
      ariaLabel: "Collapsed breadcrumb path"
    },
    ...trailingItems
  ];
}

export function getBreadcrumbRenderModel(items: BreadcrumbItem[], maxVisibleItems?: number) {
  const typographyTokenName = breadcrumbTokens.typography.itemLabel;
  const summaryTypographyTokenName = breadcrumbTokens.typography.summaryLabel;

  return {
    items: collapseBreadcrumbItems(items, maxVisibleItems),
    layout: {
      itemGapToken: breadcrumbTokens.layout.itemGap,
      itemGap: spacing.tokens[breadcrumbTokens.layout.itemGap],
      separatorGapToken: breadcrumbTokens.layout.separatorGap,
      separatorGap: spacing.tokens[breadcrumbTokens.layout.separatorGap],
      wrapGapToken: breadcrumbTokens.layout.wrapGap,
      wrapGap: spacing.tokens[breadcrumbTokens.layout.wrapGap],
      paddingYToken: breadcrumbTokens.layout.paddingY,
      paddingY: spacing.tokens[breadcrumbTokens.layout.paddingY]
    },
    typography: {
      itemToken: typographyTokenName,
      item: typography.tokens[typographyTokenName],
      summaryToken: summaryTypographyTokenName,
      summary: typography.tokens[summaryTypographyTokenName]
    }
  };
}

export function Breadcrumb({ ariaLabel = "Breadcrumb", items, maxVisibleItems }: BreadcrumbProps) {
  const model = getBreadcrumbRenderModel(items, maxVisibleItems);
  const ancestorTokens = breadcrumbTokens.itemRoles.ancestor;
  const currentTokens = breadcrumbTokens.itemRoles.current;
  const collapsedTokens = breadcrumbTokens.itemRoles["collapsed-summary"];
  const separatorTokens = breadcrumbTokens.separator;

  const itemStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    paddingBlock: resolveDimensionVar(model.layout.paddingYToken, model.layout.paddingY),
    color: resolveSemanticColorVar(ancestorTokens.foreground),
    fontFamily: resolveTypographyVar(model.typography.itemToken, "family", model.typography.item.fontFamily),
    fontSize: resolveTypographyVar(model.typography.itemToken, "size", `${model.typography.item.fontSize}px`),
    fontWeight: resolveTypographyVar(model.typography.itemToken, "weight", model.typography.item.fontWeight),
    lineHeight: resolveTypographyVar(model.typography.itemToken, "line-height", `${model.typography.item.lineHeight}px`),
    whiteSpace: "nowrap"
  };

  const linkStyle: CSSProperties = {
    color: resolveSemanticColorVar(ancestorTokens.interactiveForeground),
    textDecoration: "none"
  };

  const currentItemStyle: CSSProperties = {
    color: resolveSemanticColorVar(currentTokens.emphasis),
    fontWeight: 600
  };

  const separatorStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    color: resolveSemanticColorVar(separatorTokens.foreground),
    lineHeight: 1,
    paddingInline: resolveDimensionVar(model.layout.separatorGapToken, model.layout.separatorGap),
    whiteSpace: "nowrap"
  };

  const listStyle: CSSProperties = {
    columnGap: resolveDimensionVar(model.layout.itemGapToken, model.layout.itemGap),
    rowGap: resolveDimensionVar(model.layout.wrapGapToken, model.layout.wrapGap)
  };

  const resolvedItems = model.items.map((item) => {
    if (item.collapsed) {
      return {
        ...item,
        label: "...",
        ariaLabel: item.ariaLabel ?? "Collapsed breadcrumb path"
      };
    }

    return item;
  });

  const separatorIcon = <ChevronRightIcon aria-hidden="true" focusable="false" width={12} height={12} />;

  return (
    <PrimitiveBreadcrumb
      ariaLabel={ariaLabel}
      collapsedLabel="..."
      currentItemStyle={currentItemStyle}
      itemStyle={{
        ...itemStyle,
        color: resolveSemanticColorVar(ancestorTokens.foreground)
      }}
      items={resolvedItems}
      linkStyle={linkStyle}
      listStyle={listStyle}
      separator={separatorIcon}
      separatorStyle={separatorStyle}
    />
  );
}

export function getCollapsedSummaryStyle(): CSSProperties {
  return {
    color: resolveSemanticColorVar(collapsedTokens.foreground)
  };
}

const collapsedTokens = breadcrumbTokens.itemRoles["collapsed-summary"];

export default Breadcrumb;
