import * as React from "react";
import type { SVGProps } from "react";
const SvgMoreVertical = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={5} r={2} fill="currentColor" />
    <circle cx={12} cy={12} r={2} fill="currentColor" />
    <circle cx={12} cy={19} r={2} fill="currentColor" />
  </svg>
);
export default SvgMoreVertical;
