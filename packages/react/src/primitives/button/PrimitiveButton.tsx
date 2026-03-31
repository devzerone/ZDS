import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

export type PrimitiveButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  loading?: boolean;
  loadingIndicator?: ReactNode;
  size?: string;
  state?: string;
  variant?: string;
};

function renderIcon(icon: ReactNode, position: "leading" | "trailing") {
  if (!icon) {
    return null;
  }

  return (
    <span aria-hidden="true" data-zds-slot={`${position}-icon`}>
      {icon}
    </span>
  );
}

export function PrimitiveButton({
  children,
  leadingIcon,
  trailingIcon,
  loading = false,
  loadingIndicator,
  size,
  state,
  variant,
  type = "button",
  ...rest
}: PrimitiveButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      aria-busy={loading || undefined}
      data-zds-component="button"
      data-zds-size={size}
      data-zds-state={state}
      data-zds-variant={variant}
    >
      {renderIcon(leadingIcon, "leading")}
      <span data-zds-slot="label">{children}</span>
      {loading ? (
        <span aria-hidden="true" data-zds-slot="loading-indicator">
          {loadingIndicator ?? "..."}
        </span>
      ) : (
        renderIcon(trailingIcon, "trailing")
      )}
    </button>
  );
}

export default PrimitiveButton;
