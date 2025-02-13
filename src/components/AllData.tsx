import React, { useState, useContext } from "react";
import LeftArrow from "../assets/icons/LeftArrow";
import RightArrow from "../assets/icons/RightArrow";
import { NewsContext } from "../context/NewsContext";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);
  const newsContext = useContext(NewsContext);
  if (!newsContext) return null;

  const { dateRange, setDateRange } = newsContext;
  const daysOfWeek = ["Sun", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (year: number, month: number) =>
    Array.from({ length: 42 }, (_, i) =>
      new Date(year, month, i - new Date(year, month, 1).getDay() + 1)
    );

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleDateClick = (clickedDate: Date) => {
    if (selectingStart) {
      setDateRange([clickedDate, null] as [Date | null, Date | null]);
    } else {
      const sortedRange: [Date | null, Date | null] = [
        dateRange[0],
        clickedDate
      ].sort((a, b) => (a?.getTime() ?? 0) - (b?.getTime() ?? 0)) as [Date | null, Date | null];
      setDateRange(sortedRange);
    }
    setSelectingStart(!selectingStart);
  };

  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div className="text-white py-2 px-2">
      <div className="flex items-center justify-between mx-3 mb-2">
        <button onClick={handlePrevMonth} className="text-gray-400 hover:text-white"><LeftArrow /></button>
        <div className="text-sm">{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</div>
        <button onClick={handleNextMonth} className="text-gray-400 hover:text-white"><RightArrow /></button>
      </div>

      <div className="grid grid-cols-7 text-center py-1 text-xs mb-2 shadow-md">
        {daysOfWeek.map(day => <div key={day} className="text-gray-400">{day}</div>)}
      </div>

      <div className="grid grid-cols-7 text-center text-xs">
        {days.map((day, index) => {
          const isInRange = dateRange[0] && dateRange[1] && day >= dateRange[0] && day <= dateRange[1];
          const isStartOrEnd = dateRange[0]?.getTime() === day.getTime() || dateRange[1]?.getTime() === day.getTime();
          return (
            <div
              key={index}
              className={`py-1 cursor-pointer ${day.getMonth() !== currentDate.getMonth() ? "text-gray-500" : "text-white"} ${isInRange ? "bg-blue-300 text-black" : ""} ${isStartOrEnd ? "bg-blue-500 text-white font-bold rounded" : ""}`}
              onClick={() => handleDateClick(day)}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;