import { useState, ChangeEvent, useContext, useEffect } from "react";
import React from "react";
import CrossIcon from "../assets/icons/CrossIcon";
import Button from "./Buttons";
import DateIcon from "../assets/icons/DateIcon";
import SourcesIcon from "../assets/icons/SourcesIcon";
import TimeIcon from "../assets/icons/TimeIcon";
import Dropdown from "./Sources";
import SortDropdown from "./Time";
import Calendar from "./AllData";
import { NewsContext } from "../context/NewsContext";
import useNews from "../hooks/useNews";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const newsContext = useContext(NewsContext);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (!newsContext) return null;

  const { handleSearchChange } = newsContext;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearchChange(value);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };


  return (
    <nav className="flex items-center max-md:flex-col bg-black text-white gap-[15px] lg:gap-[33px] pt-[22px] relative">
      <div className="flex items-center bg-[#F39320] w-1/2 max-md:w-full text-white px-2 py-[10px]">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          className="bg-transparent placeholder:text-white px-[16px] focus:outline-none text-white text-[16px] font-medium flex-grow"
        />
        {searchTerm !== "" && (
          <button className="text-black cursor-pointer" onClick={() => {
            setSearchTerm("");
            handleSearchChange("");
          }}>
            <div className="pr-4">
              <CrossIcon stroke="white" />
            </div>
          </button>
        )}
      </div>

      <div className="flex justify-between gap-[15px] lg:gap-[30px] max-md:mt-[16px] max-md:w-full w-1/2">
        {/* Sources Dropdown */}
        <div className="md:relative w-full dropdown-container">
          <Button
            text="Sources"
            className={`${activeDropdown === "sources" ? "bg-[#464646]" : ""}`}
            icon={SourcesIcon}
            onClick={() => toggleDropdown("sources")}
          />
          {activeDropdown === "sources" && (
            <div className="absolute left-0 top-full mt-[12px] z-10 w-full rounded-[3px] bg-[#464646]">
              <Dropdown />
            </div>
          )}
        </div>

        {/* All Dates Calendar */}
        <div className="md:relative w-full dropdown-container">
          <Button
            text="All Dates"
            className={`${activeDropdown === "all-dates" ? "bg-[#464646]" : ""}`}
            icon={DateIcon}
            onClick={() => toggleDropdown("all-dates")}
          />
          {activeDropdown === "all-dates" && (
            <div className="absolute left-0 top-full mt-[12px] z-10 w-full rounded-[3px] bg-[#464646]">
              <Calendar />
            </div>
          )}
        </div>

        {/* Time Sorting Dropdown */}
        <div className="md:relative w-full dropdown-container">
          <Button
            text="Time"
            className={`${activeDropdown === "time" ? "bg-[#464646]" : ""}`}
            icon={TimeIcon}
            onClick={() => toggleDropdown("time")}
          />
          {activeDropdown === "time" && (
            <div className="absolute w-full left-0 top-full mt-[12px] z-10 rounded-[3px] bg-[#464646]">
              <SortDropdown />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;