import React from "react";

interface LeftArrowProps extends React.SVGProps<SVGSVGElement> {}

const LeftArrow: React.FC<LeftArrowProps> = (props) => (
  <svg
    width="9"
    height="18"
    viewBox="0 0 13 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.057 20.9938L1.75879 11.6957L11.057 2.39746"
      stroke="white"
      stroke-width="3.0994"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default LeftArrow;
