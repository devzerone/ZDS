import type { ReactNode } from "react";
import Script from "next/script";
import DocsSidebar from "../components/navigation/DocsSidebar";
import DocsTopbar from "../components/navigation/DocsTopbar";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import "@zds/tokens/tokens.css";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            const storageKey = "zds-docs-theme";
            const stored = window.localStorage.getItem(storageKey);
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const theme = stored === "light" || stored === "dark" ? stored : systemDark ? "dark" : "light";
            document.documentElement.dataset.theme = theme;
          })();`}
        </Script>
        <ThemeProvider>
          <div className="docs-shell">
            <DocsSidebar />
            <main className="docs-main">
              <DocsTopbar />
              <div className="docs-content">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
