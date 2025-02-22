import { useState, useContext, useEffect, useCallback } from "react";
import React from "react";
import Button from "./Buttons";
import SourcesIcon from "../assets/icons/SourcesIcon";
import TimeIcon from "../assets/icons/TimeIcon";
import SortDropdown from "./Time";
import { NewsContext } from "../context/NewsContext";
import SearchIcon from "../assets/icons/SearchIcon";
import SourceDropDown from "./SourceDropDown";
import CrossIcon from "../assets/icons/CrossIcon";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const newsContext = useContext(NewsContext);

  const handleSearch = useCallback(
    (e: any) => {
      const value = e.target.value;
      setSearchTerm(value);
      newsContext?.handleSearchChange(value);
    },
    [newsContext]
  );

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

  const { handleSearchChange, setTopics } = newsContext;

  const handleClearSearch = () => {
    setSearchTerm("");
    handleSearchChange("");
    setTopics("");
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
          onChange={handleSearch}
          className="bg-transparent placeholder:text-white px-[16px] focus:outline-none text-white text-[16px] font-medium flex-grow"
        />
        <div className="pr-4 flex items-center gap-2">
          {!searchTerm ? (
            <SearchIcon stroke="white" />
          ) : (
            <button
              className="text-black cursor-pointer"
              onClick={handleClearSearch}
            >
              <CrossIcon stroke="white" />
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-[15px] lg:gap-[30px] max-md:mt-[16px] max-md:w-full w-1/2">
        <div className="md:relative w-full dropdown-container">
          <Button
            text="Sources"
            className={`${activeDropdown === "sources" ? "bg-[#464646]" : ""}`}
            icon={SourcesIcon}
            onClick={() => toggleDropdown("sources")}
          />
          {activeDropdown === "sources" && (
            <div className="absolute left-0 top-full mt-[12px] z-10 w-full rounded-[3px] bg-[#464646]">
              <SourceDropDown />
            </div>
          )}
        </div>

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
