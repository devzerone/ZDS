import * as React from "react";
import type { SVGProps } from "react";
const SvgEyeOff = (props: SVGProps<SVGSVGElement>) => (
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
      d="m2 2 20 20"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.9 5.2c.7-.1 1.4-.2 2.1-.2 4 0 7.5 3 10 8-1 2-2.2 3.7-3.7 5M5.7 5.7C4.2 7.3 2.9 9.1 2 12c2.5 5 6 8 10 8 1.3 0 2.6-.3 3.7-.9"
    />
  </svg>
);
export default SvgEyeOff;
