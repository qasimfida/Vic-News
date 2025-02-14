import React, { useState, useEffect, useContext } from "react";
import RowItem from "./RowItem";
import MoreIcon from "../assets/icons/MoreIcon";
import Popup from "./Popup";
import { NewsContext } from "../context/NewsContext";
import Loader from "./Loader";
import useRankedNews from "../hooks/useRankedNews";

interface ItemData {
  sno: string;
  text: string;
  bn: string;
  time: string;
  content: string;
}

const RankedNews: React.FC = () => {
  const newsContext = useContext(NewsContext);
  const { rankednews, loading, error } = useRankedNews();

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const [visibleTopicsIndex, setLocalVisibleTopicsIndex] = useState(0);

  useEffect(() => {
    setLocalVisibleTopicsIndex(visibleTopicsIndex);
  }, []); // Empty dependency array ensures it only runs on mount

  useEffect(() => {
    if (isPopupOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPopupOpen, currentIndex]);

  if (!newsContext) return null;

  const { loadMoreTopics } = newsContext;

  const handleRowClick = (index: number) => {
    setCurrentIndex(index);
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
    setCurrentIndex(null);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isPopupOpen) {
      if (event.key === "Escape") {
        handleClose();
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        setCurrentIndex((prevIndex) =>
          prevIndex !== null && prevIndex < rankednews.length - 1
            ? prevIndex + 1
            : prevIndex
        );
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrentIndex((prevIndex) =>
          prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      }
    }
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
    <div>
      <div className="flex md:px-4 items-center bg-black text-white lg:mt-[32px] md:mb-[24px] lg:mb-[57px] my-[16px]">
        <h2 className="md:text-[20px] text-[16px] font-medium">
          Top Ranked News
        </h2>

        <div className="ml-[24px] mr-[12px] w-[2px] h-[18px] md:h-[30px] bg-[#747678]"></div>

        <div
          onClick={loadMoreTopics}
          className="flex items-baseline text-[#747678] gap-[8px] cursor-pointer hover:text-white"
        >
          <h2 className="md:text-[20px] text-[16px] font-medium">More</h2>
          <MoreIcon stroke={"#737576"} />
        </div>
      </div>

      {/* News List */}
      <div className="bg-[#232323] px-2 lg:px-4 py-2">
        {rankednews.slice(0, 3).map((item, index) => (
          <div
            key={index}
            onClick={() => handleRowClick(index)}
            className="cursor-pointer"
          >
            <RowItem
              sno={index + 1}
              text={item.text}
              bn={item.bn}
              time={item.time}
              bnColor={"yellow"}
              textColor={"yellow"}
            />
          </div>
        ))}
      </div>

      {/* Popup */}
      {isPopupOpen && currentIndex !== null && (
        <Popup
          title={rankednews[currentIndex].text}
          content={`Breaking News (${rankednews[currentIndex].bn} at ${rankednews[currentIndex].time}): ${rankednews[currentIndex].content}`}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default RankedNews;
