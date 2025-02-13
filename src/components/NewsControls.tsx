import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

const NewsControls = () => {
  const newsContext = useContext(NewsContext);

  if (!newsContext) return null;

  const { setSort, setTickers } = newsContext;

  return (
    <div>
      <label>Sort by: </label>
      <select onChange={(e:any) => setSort(e.target.value)}>
        <option value="LATEST">Latest</option>
        <option value="EARLIEST">Earliest</option>
        <option value="RELEVANCE">Relevance</option>
      </select>

      <label>Stock Ticker: </label>
      <input type="text" onBlur={(e) => setTickers(e.target.value)} placeholder="Enter tickers (e.g., AAPL,TSLA)" />
    </div>
  );
};

export default NewsControls;
