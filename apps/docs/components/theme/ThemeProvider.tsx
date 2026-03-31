"use client";

import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "zds-docs-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(): ThemeMode {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return stored === "light" || stored === "dark" ? stored : systemDark ? "dark" : "light";
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<ThemeMode>("light");

  useEffect(() => {
    const initial = resolveTheme();
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (nextTheme) => {
        setThemeState(nextTheme);
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
      },
      toggleTheme: () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        setThemeState(nextTheme);
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
      }
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useThemeMode must be used inside ThemeProvider.");
  }
  return value;
}
