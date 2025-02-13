import React, { useState, useEffect, useContext } from "react";
import RowItem from "./RowItem";
import MoreIcon from "../assets/icons/MoreIcon";
import Popup from "./Popup";
import { NewsContext } from "../context/NewsContext";

interface ItemData {
  sno: string;
  text: string;
  bn: string;
  time: string;
  content: string;
}

export const itemData: ItemData[] = [
  {
    sno: "01",
    text: "S&P 500 Index Falls 1.8% Led by  Communication Services Sector",
    bn: "BN",
    time: "11:45",
    content:
      "Microsoft becomes the second company to cross the $3 trillion market cap milestone, driven by strong cloud growth, AI integration, and record-breaking revenue in its latest financial quarter.",
  },
  {
    sno: "02",
    text: "MSCI Nordic Index  Falls 0.3% ; H&M Drops",
    bn: "BN",
    time: "12:05",
    content:
      "Bitcoin surged past the $50,000 mark as institutional investors continued accumulating the cryptocurrency, citing it as a hedge against inflation and global economic uncertainties.",
  },
  {
    sno: "03",
    text: " Ukraine  1Q   Tourism Revenue  Falls  13%,  Most  Since  March  2016",
    bn: "BN",
    time: "12:15",
    content:
      "Nvidia's stock soared by 10% today after the company unveiled a groundbreaking AI chip, capable of delivering unparalleled performance for machine learning and data center applications.",
  },
];

const RankedNews: React.FC = () => {
  const newsContext = useContext(NewsContext);

 
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);


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
          prevIndex !== null && prevIndex < itemData.length - 1
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
        {itemData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleRowClick(index)}
            className="cursor-pointer"
          >
            <RowItem
              sno={item.sno}
              text={item.text}
              bn={item.bn}
              time={item.time}
              bnColor={"yellow"}
              textColor="yellow"
            />
          </div>
        ))}
      </div>

      {/* Popup */}
      {isPopupOpen && currentIndex !== null && (
        <Popup
          title={itemData[currentIndex].text}
          content={`Breaking News (${itemData[currentIndex].bn} at ${itemData[currentIndex].time}): ${itemData[currentIndex].content}`}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default RankedNews;
