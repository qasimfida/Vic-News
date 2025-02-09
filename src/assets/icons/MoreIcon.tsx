import React from "react";

interface MoreIconProps {
  stroke?: string;
}

const MoreIcon: React.FC<MoreIconProps> = ({ stroke = "#737576" }) => {
  return (
    <svg
    width="8"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8L5 4.5L1 1"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 8L9 4.5L5 1"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MoreIcon;
