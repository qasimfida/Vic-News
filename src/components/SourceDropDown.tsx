import React, { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";

const SourceDropDown: React.FC = () => {
  const [selectedOption] = useState<string>("");
  const newsContext = useContext(NewsContext);

  if (!newsContext) return null;

  const { allTopics, setTopics } = newsContext;

  return (
    <div className="relative bg-[#464646]">
      <div className="text-[12px] font-medium py-3 px-3 text-white">
        <p className="text-[12px] md:ml-[16px] max-md:text-center text-[#C6CACB] mb-3">
          Source
        </p>

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

export default SourceDropDown;
