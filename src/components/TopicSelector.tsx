import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import SourcesIcon from "../assets/icons/SourcesIcon";

const TopicSelectorDropdown = ({ Icon }:any) => {
  const newsContext = useContext(NewsContext);

  if (!newsContext) return null;

  const { allTopics, selectedTopic, setTopics } = newsContext;

  return (
    <div className="flex relative items-center justify-center max-sm:text-[10px] lg:gap-[19px]  gap-[10px]  bg-[#2C2528] text-white py-[6px] md:py-[10px] w-full cursor-pointer  ">
        <div className=" ">
          <SourcesIcon  />
    </div>
        <select
          className="appearance-none  
          inline relative items-center w-[30%] justify-center max-sm:text-[10px] lg:gap-[19px]  gap-[10px]  bg-[#2C2528] text-white  cursor-pointer 
          "
          value={selectedTopic}
          onChange={(e) => setTopics(e.target.value)}
        >
          <option value="" disabled>Source</option>
          {allTopics.map((topic, index) => (
            <option key={index} value={topic}>
              {topic.replace("_", " ")}
            </option>
          ))}
        </select>
        
    </div>
  );
};

export default TopicSelectorDropdown;