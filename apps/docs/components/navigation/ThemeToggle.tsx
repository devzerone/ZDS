"use client";

import { useThemeMode } from "../theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle light and dark mode">
      <span className="theme-toggle__label">Light / Dark</span>
      <span className={`theme-toggle__thumb theme-toggle__thumb--${theme}`} aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
