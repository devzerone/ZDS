import * as React from "react";
import type { SVGProps } from "react";
const SvgBell = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 8c0-3.3-2.7-6-6-6S6 4.7 6 8c0 7-3 9-3 9h18s-3-2-3-9"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M13.7 21c-.3.6-1 1-1.7 1s-1.4-.4-1.7-1"
    />
  </svg>
);
export default SvgBell;
