import React, { useState, useEffect, useRef } from "react";
import RowItem from "./RowItem";
import Popup from "./Popup";
import useNews from "../hooks/useNews";
import SkeletonError from "./Loader";
import Loader from "./Loader";

const OrderedNews = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { news, loading, error } = useNews();

  const handleRowClick = (index: number) => {
    setCurrentIndex(index);
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
    setCurrentIndex(null);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isPopupOpen) {
      if (event.key === "Escape") {
        handleClose();
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        setCurrentIndex((prevIndex) =>
          prevIndex !== null && prevIndex < news.length - 1
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

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  if (loading) {
    return (
     <div >
       <Loader rows={1} widths={["30%"]} />
       <Loader rows={17} />
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
            className="cursor-pointer"
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

      {isPopupOpen && currentIndex !== null && (
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
