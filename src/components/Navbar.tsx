import { useState, ChangeEvent, useContext } from "react";
import React from "react";
import CrossIcon from "../assets/icons/CrossIcon";
import Button from "./Buttons";
import DateIcon from "../assets/icons/DateIcon";
import SourcesIcon from "../assets/icons/SourcesIcon";
import TimeIcon from "../assets/icons/TimeIcon";
import SearchIcon from "../assets/icons/SearchIcon";
import { NewsContext } from "../context/NewsContext";
import { useModal } from "../context/ModalContext";
import TopicSelectorPopup from "./TopicSelector";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const newsContext = useContext(NewsContext);
  const { openModal, isModalOpen } = useModal();

  if (!newsContext) return null;

  const { handleSearchChange } = newsContext;

  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearchChange(value); // Updates search as user types
  };

  // const toggleDropdown = (dropdown: string) => {
  //   setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  // };

  return (
    <nav className="flex items-center max-md:flex-col bg-black text-white gap-[15px] lg:gap-[33px] pt-[22px] relative">
      {/* Search Bar */}
      <div className="flex items-center bg-[#F39320] w-1/2 max-md:w-full text-white px-2 py-[10px]">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          className="bg-transparent placeholder:text-white md:px-11 px-[16px] focus:outline-none text-white text-[16px] font-medium flex-grow"
        />
        {searchTerm !== "" && (
          <button
            className="text-black cursor-pointer"
            onClick={() => {
              setSearchTerm("");
              handleSearchChange("");
            }}
          >
            <div className="pr-4">
              <CrossIcon stroke={"white"} />
            </div>
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="relative flex justify-between gap-[15px] lg:gap-[30px] max-md:mt-[16px]  max-md:w-full w-1/2">
       {/* <Button text="Sources" icon={SourcesIcon} onClick={() => openModal("topicSelector")}/> 
       {
            isModalOpen("topicSelector") && <TopicSelectorPopup icon={SourcesIcon} />
          } */}
          <TopicSelectorPopup icon={SourcesIcon}/>
        <Button text="All Dates" icon={DateIcon} />
        <Button text="Time" icon={TimeIcon} />
      </div>
    </nav>
  );
};

export default Navbar;
