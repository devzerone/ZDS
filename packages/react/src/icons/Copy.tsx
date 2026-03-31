import * as React from "react";
import type { SVGProps } from "react";
const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect
      width={12}
      height={12}
      x={9}
      y={9}
      stroke="currentColor"
      strokeWidth={2}
      rx={2}
    />
    <path
      stroke="currentColor"
      strokeWidth={2}
      d="M5 15H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v1"
    />
  </svg>
);
export default SvgCopy;
