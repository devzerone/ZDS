import type { ReactNode } from "react";
import DocsSidebar from "../components/navigation/DocsSidebar";
import DocsTopbar from "../components/navigation/DocsTopbar";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import "@zds/tokens/tokens.css";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
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
