import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NewsContext } from "../context/NewsContext";

const DateRangeSelector = () => {
  const newsContext = useContext(NewsContext);

  if (!newsContext) return null;

  const { dateRange, setDateRange } = newsContext;

  return (
    <div>
      <label>Select Date Range: </label>
      <DatePicker
        selectsRange={true}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={(update) => setDateRange(update)}
        dateFormat="yyyy/MM/dd"
        calendarClassName="!bg-black !text:white"
      />
    </div>
  );
};

export default DateRangeSelector;
