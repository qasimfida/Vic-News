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
      className={`flex relative items-center justify-center max-sm:text-[10px] lg:gap-[19px]  gap-[10px]  bg-[#2C2528] text-white py-[6px] md:py-[10px] w-full cursor-pointer  ${className}`}
      {...props}
    >
      {Icon && (
        <Icon className="text-white  leading-[20px] text-[16px] font-medium" />
      )}
      {text}
      
    </button>
  );
};

export default Button;
