import { useState, ChangeEvent } from "react";
import React from "react";
import CrossIcon from "../assets/icons/CrossIcon";
import Button from "./Buttons";
import DateIcon from "../assets/icons/DateIcon";
import SourcesIcon from "../assets/icons/SourcesIcon";
import TimeIcon from "../assets/icons/TimeIcon";
import SearchIcon from "../assets/icons/SearchIcon";

const Navbar: React.FC = () => {
  const [searchActive, setSearchActive] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchActive(event.target.value.length > 0);
  };

  return (
    <nav className="flex items-center bg-black text-white gap-[33px] pt-[22px]">
      <div className="flex items-center bg-[#F39320] w-1/2  text-white px-2 py-[6.25px] ">
        <input
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          className="bg-transparent placeholder:text-white px-11  focus:outline-none text-white text-[16px] font-medium flex-grow"
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

      {/* Buttons */}
      <div className="flex justify-between gap-[60px] w-1/2">
        <Button text="Sources" icon={SourcesIcon} />
        <Button text="All Dates" icon={DateIcon} />
        <Button text="Time" icon={TimeIcon} />
      </div>
    </nav>
  );
};

export default Navbar;
