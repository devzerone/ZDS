import * as React from "react";
import type { SVGProps } from "react";
const SvgLoader = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"
    >
      <animateTransform
        attributeName="transform"
        dur="1s"
        from="0 12 12"
        repeatCount="indefinite"
        to="360 12 12"
        type="rotate"
      />
    </path>
  </svg>
);
export default SvgLoader;
