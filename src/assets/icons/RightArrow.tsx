import React from "react";

interface RightArrowProps extends React.SVGProps<SVGSVGElement> {}

const RightArrow: React.FC<RightArrowProps> = (props) => (
  <svg
    width="9"
    height="18"
    viewBox="0 0 14 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.25683 2.33958L11.4962 11.6963L2.13949 20.9356"
      stroke="white"
      stroke-width="3.0994"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default RightArrow;
