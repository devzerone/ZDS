import type { Preview } from "@storybook/react";
import "../packages/tokens/tokens.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f5f7fb" },
        { name: "dark", value: "#0f131a" }
      ]
    }
  },
  globalTypes: {
    theme: {
      description: "Preview theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" }
        ]
      }
    }
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === "dark";
      return (
        <div
          data-theme={isDark ? "dark" : "light"}
          style={{
            minHeight: "100vh",
            padding: "2rem",
            background: "var(--color-bg-canvas)",
            color: "var(--color-fg-primary)"
          }}
        >
          <Story />
        </div>
      );
    }
  ]
};

export default preview;
