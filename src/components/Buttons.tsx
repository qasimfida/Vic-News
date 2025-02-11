import React, { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  text,
  icon: Icon,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`flex items-center max-sm:text-[10px] md:gap-[19px] gap-[10px]  bg-[#2C2528] text-white px-[21px] md:px-[33px] py-[6px] md:py-[10px] cursor-pointer  ${className}`}
      {...props}
    >
      {Icon && <Icon className="text-white text-[16px] font-medium" />}
      <span className="leading-[20px]">{text}</span>
    </button>
  );
};

export default Button;
