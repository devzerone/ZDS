import { useEffect, useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS, BUTTON_VISUAL_STATES, type ButtonProps, type VisualState } from "./Button";

type StoryArgs = ButtonProps & {
  previewState: VisualState;
};

function ButtonPreviewHarness({ previewState, ...args }: StoryArgs) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const button = rootRef.current?.querySelector("button");
    if (!button) {
      return;
    }

    button.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    button.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    button.blur();

    if (previewState === "hover" || previewState === "pressed") {
      button.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    }
    if (previewState === "pressed") {
      button.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    }
    if (previewState === "focus") {
      button.focus();
    }
  }, [previewState]);

  return (
    <div ref={rootRef}>
      <Button {...args} disabled={previewState === "disabled" ? true : args.disabled} loading={previewState === "loading" ? true : args.loading}>
        {args.children}
      </Button>
    </div>
  );
}

const meta = {
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Canonical button preview backed by the shared React Button implementation."
      }
    }
  },
  args: {
    children: "Continue",
    variant: "primary",
    size: "medium",
    previewState: "default"
  },
  argTypes: {
    children: { control: "text" },
    variant: { options: BUTTON_VARIANTS, control: "inline-radio" },
    size: { options: BUTTON_SIZES, control: "inline-radio" },
    previewState: { options: BUTTON_VISUAL_STATES, control: "select" },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
    onClick: { control: false },
    disabled: { control: false },
    loading: { control: false }
  },
  render: (args) => <ButtonPreviewHarness {...args} />,
  decorators: [
    (Story, context) => {
      const docsUrl = context.parameters.docsUrl as string | undefined;
      return (
        <div style={{ display: "grid", gap: "1rem", justifyItems: "center" }}>
          <Story />
          {docsUrl ? (
            <a href={docsUrl} style={{ color: "inherit", fontWeight: 600 }}>
              Open canonical docs
            </a>
          ) : null}
        </div>
      );
    }
  ]
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docsUrl: "/components/button"
  }
};

export const Secondary: Story = {
  args: {
    variant: "secondary"
  },
  parameters: {
    docsUrl: "/components/button"
  }
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary"
  },
  parameters: {
    docsUrl: "/components/button"
  }
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete"
  },
  parameters: {
    docsUrl: "/components/button"
  }
};

export const Disabled: Story = {
  args: {
    previewState: "disabled"
  },
  parameters: {
    docsUrl: "/components/button"
  }
};

export const Loading: Story = {
  args: {
    previewState: "loading"
  },
  parameters: {
    docsUrl: "/components/button"
  }
};

export const Small: Story = {
  args: {
    size: "small"
  },
  parameters: {
    docsUrl: "/components/button"
  }
};

export const Large: Story = {
  args: {
    size: "large"
  },
  parameters: {
    docsUrl: "/components/button"
  }
};
