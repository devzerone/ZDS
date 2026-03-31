import * as React from "react";
import type { SVGProps } from "react";
const SvgHeart = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 21S3 14.5 3 8.5C3 5.4 5.4 3 8.5 3c1.7 0 3.3.8 3.5 2 .2-1.2 1.8-2 3.5-2C18.6 3 21 5.4 21 8.5c0 6-9 12.5-9 12.5"
    />
  </svg>
);
export default SvgHeart;
