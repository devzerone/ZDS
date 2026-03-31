import * as React from "react";
import type { SVGProps } from "react";
const SvgStar = (props: SVGProps<SVGSVGElement>) => (
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
      d="m12 2 2.9 6.6 7.1.7-5.3 4.7 1.5 7-6.2-3.7L5.8 21l1.5-7L2 9.3l7.1-.7z"
    />
  </svg>
);
export default SvgStar;
