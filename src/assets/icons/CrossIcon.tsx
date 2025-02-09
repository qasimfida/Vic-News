import React from "react";

interface CrossIconProps {
  stroke: string;
}

const CrossIcon: React.FC<CrossIconProps> = ({ stroke }) => {
  return (
    <svg
        height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1L1 10M1 1L10 10"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CrossIcon;
