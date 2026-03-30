import React, { type ButtonHTMLAttributes, type CSSProperties, type ReactNode, useMemo, useState } from "react";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const palette = require("../../../foundation/tokens/color/palette.json");
const semantic = require("../../../foundation/tokens/color/semantic.json");
const spacing = require("../../../foundation/tokens/spacing/core.json");
const radius = require("../../../foundation/tokens/radius/core.json");
const typography = require("../../../foundation/tokens/typography/core.json");
const buttonTokens = require("../../../foundation/tokens/components/button.json");

type ButtonVariant = keyof typeof buttonTokens.variants;
type ButtonSize = keyof typeof buttonTokens.sizes;
type VisualState = "default" | "hover" | "pressed" | "focus" | "disabled" | "loading";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  disabled?: boolean;
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

function resolveSizeToken(size: ButtonSize) {
  const sizeTokens = buttonTokens.sizes[size];
  return {
    paddingInline: spacing.tokens[sizeTokens.paddingX],
    paddingBlock: spacing.tokens[sizeTokens.paddingY],
    gap: spacing.tokens[sizeTokens.gap],
    borderRadius: radius.tokens[sizeTokens.radius],
    minHeight: sizeTokens.minHeight,
    iconSize: sizeTokens.iconSize,
    labelTypography: typography.tokens[sizeTokens.labelTypography]
  };
}

function resolveVariantState(variant: ButtonVariant, state: VisualState) {
  return buttonTokens.variants[variant][state];
}

function resolveVisualState(input: {
  disabled?: boolean;
  loading?: boolean;
  hovered: boolean;
  pressed: boolean;
  focusVisible: boolean;
}): VisualState {
  if (input.disabled) {
    return "disabled";
  }
  if (input.loading) {
    return "loading";
  }
  if (input.pressed) {
    return "pressed";
  }
  if (input.focusVisible) {
    return "focus";
  }
  if (input.hovered) {
    return "hover";
  }
  return "default";
}

function renderIcon(icon: ReactNode, iconSize: number, position: "leading" | "trailing") {
  if (!icon) {
    return null;
  }

  return (
    <span
      aria-hidden="true"
      data-zds-slot={`${position}-icon`}
      style={{
        width: iconSize,
        height: iconSize,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }}
    >
      {icon}
    </span>
  );
}

export function Button({
  variant = "primary",
  size = "medium",
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled = false,
  children,
  type = "button",
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onFocus,
  onBlur,
  ...rest
}: ButtonProps) {
  if (children === undefined || children === null || children === "") {
    throw new Error("ZDS Button requires a text label as children.");
  }

  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  const state = resolveVisualState({ disabled, loading, hovered, pressed, focusVisible });
  const stateTokens = resolveVariantState(variant, state);
  const sizeTokens = resolveSizeToken(size);
  const labelStyle = sizeTokens.labelTypography;

  const computedStyle = useMemo<CSSProperties>(() => {
    const nextStyle: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: sizeTokens.gap,
      minHeight: sizeTokens.minHeight,
      padding: `${sizeTokens.paddingBlock}px ${sizeTokens.paddingInline}px`,
      borderRadius: sizeTokens.borderRadius,
      border: `1px solid ${resolveSemanticColor(stateTokens.border)}`,
      backgroundColor: resolveSemanticColor(stateTokens.background),
      color: resolveSemanticColor(stateTokens.foreground),
      cursor: disabled || loading ? "not-allowed" : "pointer",
      fontFamily: labelStyle.fontFamily,
      fontSize: labelStyle.fontSize,
      fontWeight: labelStyle.fontWeight,
      lineHeight: `${labelStyle.lineHeight}px`,
      transition: "background-color 120ms ease, color 120ms ease, border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease",
      boxShadow: focusVisible ? `0 0 0 3px ${resolveSemanticColor(stateTokens.focus)}33` : "none",
      transform: pressed ? "translateY(1px)" : "translateY(0)"
    };

    return { ...nextStyle, ...style };
  }, [disabled, focusVisible, labelStyle, loading, pressed, sizeTokens, stateTokens, style]);

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-zds-component="button"
      data-zds-variant={variant}
      data-zds-size={size}
      data-zds-state={state}
      style={computedStyle}
      onMouseEnter={(event) => {
        setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        setPressed(false);
        onMouseLeave?.(event);
      }}
      onMouseDown={(event) => {
        setPressed(true);
        onMouseDown?.(event);
      }}
      onMouseUp={(event) => {
        setPressed(false);
        onMouseUp?.(event);
      }}
      onFocus={(event) => {
        setFocusVisible(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocusVisible(false);
        setPressed(false);
        onBlur?.(event);
      }}
    >
      {renderIcon(leadingIcon, sizeTokens.iconSize, "leading")}
      <span data-zds-slot="label">{children}</span>
      {loading ? (
        <span aria-hidden="true" data-zds-slot="loading-indicator" style={{ display: "inline-flex", alignItems: "center" }}>
          ...
        </span>
      ) : (
        renderIcon(trailingIcon, sizeTokens.iconSize, "trailing")
      )}
    </button>
  );
}

export default Button;
