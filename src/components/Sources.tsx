import React, { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";

interface DropdownOption {
  id: number;
  label: string;
}

const Dropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const newsContext = useContext(NewsContext);

  if (!newsContext) return null;

  const { allTopics, selectedTopic, setTopics } = newsContext;

  const options: DropdownOption[] = [
    { id: 1, label: "Blockchain" },
    { id: 2, label: "Earning" },
    { id: 3, label: "IPO" },
    { id: 4, label: "Mergers" },
    { id: 5, label: "Financial Market" },
    { id: 6, label: "Financial Market" },
  ];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="relative bg-[#464646]">
      <div className="text-[12px] font-medium py-3 px-3 text-white">
        {/* Title */}
        <p className="text-[12px] md:ml-[16px] max-md:text-center text-[#C6CACB] mb-3">
          Source
        </p>

        {/* Options */}
        <div className="space-y-3">
          {allTopics.map((topic) => (
            <div
              className={`cursor-pointer max-md:text-center hover:bg-[#6B6D70] py-2 px-4 hover:border hover:rounded-md 
              ${
                selectedOption === topic.replace("_", " ")
                  ? "bg-[#6B6D70] rounded-md border"
                  : ""
              }`}
              onClick={(e) => setTopics(topic.replace("_", " "))}
              >
              {topic.replace("_", " ")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
