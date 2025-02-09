import React, { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

const Button: FC<ButtonProps> = ({ text, icon: Icon, className = "", ...props }) => {
  return (
    <button
      className={`flex items-center gap-[19px] bg-[#2C2528] text-white px-[33px] py-[10px] cursor-pointer  ${className}`}
      {...props}
    >
      {Icon && <Icon className="text-white text-[16px] font-medium" />}
      <span className="leading-[20px]">{text}</span>
    </button>
  );
};

export default Button;
