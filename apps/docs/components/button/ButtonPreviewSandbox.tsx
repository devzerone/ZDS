"use client";

import { Button } from "@zds/react/button";

type ButtonPreviewSandboxProps = {
  mode: "single" | "row";
};

export function ButtonPreviewSandbox({ mode }: ButtonPreviewSandboxProps) {
  if (mode === "row") {
    return (
      <div className="docs-preview-stage docs-preview-stage--row">
        <Button>Continue</Button>
        <Button variant="secondary">Add item</Button>
      </div>
    );
  }

  return (
    <div className="docs-preview-stage">
      <Button>Save</Button>
    </div>
  );
}

export default ButtonPreviewSandbox;
