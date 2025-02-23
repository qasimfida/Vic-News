import React, { useEffect } from "react";
import RowItem from "./RowItem";
import Popup from "./Popup";
import useNews from "../hooks/useNews";
import { useSelection } from "../context/SelectionContext";
import Loader from "./Loader";
import useRankedNews from "../hooks/useRankedNews";

const OrderedNews = () => {
  const {
    currentIndex,
    setCurrentIndex,
    activeList,
    isPopupOpen,setPopupOpen,
    setActiveList,
    handleKeyDown,
  } = useSelection();
  const { news, loading, error } = useNews();
  const { rankednews } = useRankedNews();

  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      handleKeyDown(event, news.length, rankednews.length, () => {
        if (currentIndex !== null) {
          activeList === "ordered" && handleRowClick(currentIndex as number);
        }
      });
      if (event.key === "Escape") {
        setPopupOpen(false);
        setCurrentIndex(null);
      }
    };

    console.log(isPopupOpen, "ordered");
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  }, [news.length, currentIndex]);

  const handleRowClick = (index: number) => {
    setActiveList("ordered");
    setCurrentIndex(index);
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
    setCurrentIndex(null);
  };
  if (loading) {
    return (
      <div>
        <Loader rows={1} widths={["30%"]} />
        <Loader rows={13} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="">
        <h2 className="text-xl font-medium my-[12px]">Ordered News</h2>
        <div className="text-rose-600 mb-12 text-center flex items-center justify-center">
          {error}
        </div>
      </div>
    );
  }
  return (
    <div className="px-2 md:px-4">
      <h2 className="text-xl font-medium my-[12px]">Time Ordered News</h2>
      <div>
        {news.map((item, index) => (
          <div
            key={index}
            onClick={() => handleRowClick(index)}
            className={`cursor-pointer  transition ${
              activeList === "ordered" && currentIndex === index
                ? "bg-[#6B6D70] border border-[#6B6D70]"
                : "hover:border-[#6B6D70]"
            }`}
          >
            <RowItem
              sno={index + 3}
              text={item.text}
              bn={item.bn}
              time={item.time}
              bnColor={"red"}
              textColor={"orange"}
              paraColor={"orange"}
            />
          </div>
        ))}
      </div>

      {isPopupOpen && currentIndex !== null && activeList === "ordered" && (
        <Popup
          title={news[currentIndex].text}
          contentImage={news[currentIndex].contentImage}
          orgUrl={news[currentIndex].orgUrl}
          content={`Breaking News (${news[currentIndex].bn} at ${news[currentIndex].time}): ${news[currentIndex].content}`}
          onClose={handleClose}
        />
      )}
      <div className="text-orange"></div>
    </div>
  );
};

export default OrderedNews;
