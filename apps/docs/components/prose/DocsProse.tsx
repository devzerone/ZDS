import type { PropsWithChildren } from "react";

export function DocsProse({ children }: PropsWithChildren) {
  return <article className="docs-prose">{children}</article>;
}

export default DocsProse;
