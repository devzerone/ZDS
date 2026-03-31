import * as React from "react";
import type { SVGProps } from "react";
const SvgEye = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 12c2.5-5 6-8 10-8s7.5 3 10 8c-2.5 5-6 8-10 8s-7.5-3-10-8"
    />
    <circle cx={12} cy={12} r={3} stroke="currentColor" strokeWidth={2} />
  </svg>
);
export default SvgEye;
