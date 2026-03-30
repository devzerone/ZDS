import type { Preview } from "@storybook/react";

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
          style={{
            minHeight: "100vh",
            padding: "2rem",
            background: isDark ? "#0f131a" : "#f5f7fb",
            color: isDark ? "#f6f8fb" : "#171b24"
          }}
        >
          <Story />
        </div>
      );
    }
  ]
};

export default preview;
