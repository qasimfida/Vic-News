import React, { useState } from "react";
import LeftArrow from "../assets/icons/LeftArrow";
import RightArrow from "../assets/icons/RightArrow";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Array(42)
      .fill(null)
      .map(
        (_, i) =>
          new Date(year, month, i - new Date(year, month, 1).getDay() + 1)
      );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  return (
    <div className=" text-white py-[8px]  px-[5px] ">
      <div className="flex items-center justify-between mx-[12px] mb-[4px]">
        <button
          onClick={handlePrevMonth}
          className="text-gray-400 hover:text-white"
        >
          <LeftArrow />
        </button>
        <div className="text-[10px]">
          {currentDate.toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentDate.getFullYear()}
        </div>
        <button
          onClick={handleNextMonth}
          className="text-gray-400 hover:text-white"
        >
          <RightArrow />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center py-[5px] text-[10px] mb-2 shadow-md">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-gray-400">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-[10px]">
        {days.map((day, index) => (
          <div
            key={index}
            className={`py-[3px] cursor-pointer ${
              day.getMonth() !== currentDate.getMonth()
                ? "text-gray-500"
                : "text-white"
            } ${
              day.getDate() === new Date().getDate() &&
              day.getMonth() === new Date().getMonth() &&
              day.getFullYear() === new Date().getFullYear()
                ? "bg-[#CEF4F3] !text-black rounded-[2px]"
                : ""
            }`}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
