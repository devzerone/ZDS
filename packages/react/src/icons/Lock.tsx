import * as React from "react";
import type { SVGProps } from "react";
const SvgLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect
      width={14}
      height={10}
      x={5}
      y={11}
      stroke="currentColor"
      strokeWidth={2}
      rx={2}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M8 11V7c0-2.2 1.8-4 4-4s4 1.8 4 4v4"
    />
  </svg>
);
export default SvgLock;
