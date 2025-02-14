import React, { useState, useContext } from "react";
import { NewsContext } from "../context/NewsContext";

type SortOption = "LATEST" | "EARLIEST" | "RELEVANCE";

const SortDropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<SortOption>("LATEST");
  const newsContext = useContext(NewsContext);

  if (!newsContext) return null;
  const { setSort } = newsContext;

  const options: { label: string; value: SortOption }[] = [
    { label: "Latest", value: "LATEST" },
    { label: "Earliest", value: "EARLIEST" },
    { label: "Relevance", value: "RELEVANCE" }
  ];

  const handleSelect = (optionValue: SortOption) => {
    setSelectedOption(optionValue);
    setSort(optionValue);
  };

  return (
    <div className="text-[12px] text-white p-3 rounded-[3px]">
      {options.map(({ label, value }) => (
        <div
          key={value}
          className={`py-2 px-3 cursor-pointer rounded-md max-md:text-center ${
            selectedOption === value ? "bg-[#6B6D70] border border-white" : "hover:bg-[#6B6D70]"
          }`}
          onClick={() => handleSelect(value)}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default SortDropdown;