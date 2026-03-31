import * as React from "react";
import type { SVGProps } from "react";
const SvgRefresh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M4 12c0-4.4 3.6-8 8-8 2.4 0 4.5 1 6 2.7M20 12c0 4.4-3.6 8-8 8-2.4 0-4.5-1-6-2.7"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 2.5V7h-4.5M6 21.5V17h4.5"
    />
  </svg>
);
export default SvgRefresh;
