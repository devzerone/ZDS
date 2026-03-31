import * as React from "react";
import type { SVGProps } from "react";
const SvgMoreHorizontal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={5} cy={12} r={2} fill="currentColor" />
    <circle cx={12} cy={12} r={2} fill="currentColor" />
    <circle cx={19} cy={12} r={2} fill="currentColor" />
  </svg>
);
export default SvgMoreHorizontal;
