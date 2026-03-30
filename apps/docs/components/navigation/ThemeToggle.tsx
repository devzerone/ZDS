"use client";

import { useThemeMode } from "../theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle light and dark mode">
      {theme === "light" ? "다크" : "라이트"}
    </button>
  );
}

export default ThemeToggle;
