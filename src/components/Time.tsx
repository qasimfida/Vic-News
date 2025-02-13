import React, { useState } from "react";

const SortDropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Latest");

  const options = ["Latest", "Earliest", "Relevance"];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className=" text-[12px] text-white  p-3 rounded-[3px]">
      {options.map((option) => (
        <div
          key={option}
          className={`py-2 px-3 cursor-pointer rounded-md max-md:text-center ${
            selectedOption === option
              ? "bg-[#6B6D70] border border-white"
              : "hover:[#6B6D70]"
          }`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default SortDropdown;
