import { useState, ChangeEvent } from "react";
import React from "react";
import CrossIcon from "../assets/icons/CrossIcon";
import Button from "./Buttons";
import DateIcon from "../assets/icons/DateIcon";
import SourcesIcon from "../assets/icons/SourcesIcon";
import TimeIcon from "../assets/icons/TimeIcon";
import SearchIcon from "../assets/icons/SearchIcon";
import Dropdown from "./Sources";
import SortDropdown from "./Time";
import Calendar from "./AllData";

const Navbar: React.FC = () => {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchActive(event.target.value.length > 0);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="flex items-center max-md:flex-col bg-black text-white gap-[15px] lg:gap-[33px] pt-[22px] relative">
      {/* Search Bar */}
      <div className="flex items-center bg-[#F39320] w-1/2 max-md:w-full text-white px-2 py-[10px]">
        <input
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          className="bg-transparent placeholder:text-white md:px-11 px-[16px] focus:outline-none text-white text-[16px] font-medium flex-grow"
        />
        <button
          className="text-black cursor-pointer"
          onClick={() => setSearchActive(false)}
        >
          <div className="pr-4">
            {searchActive ? <CrossIcon stroke={"white"} /> : <SearchIcon />}
          </div>
        </button>
      </div>

      {/* Buttons with Dropdowns */}
      <div className="flex justify-between gap-[15px] lg:gap-[30px] max-md:mt-[16px] max-md:w-full w-1/2">
        {/* Sources Dropdown */}
        <div className="md:relative w-full">
          <Button
            text="Sources"
            icon={SourcesIcon}
            onClick={() => toggleDropdown("sources")}
          />
          {activeDropdown === "sources" && (
            <div className="absolute left-0 top-full mt-[12px] z-10 w-full rounded-[3px] bg-[#464646] ">
              <Dropdown />
            </div>
          )}
        </div>

        {/* All Dates Calendar */}
        <div className="md:relative w-full">
          <Button
            text="All Dates"
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
        <div className="md:relative w-full">
          <Button
            text="Time"
            icon={TimeIcon}
            onClick={() => toggleDropdown("time")}
          />
          {activeDropdown === "time" && (
            <div className="absolute w-full left-0 top-full mt-[12px] z-10 rounded-[3px]  bg-[#464646] ">
              <SortDropdown />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
