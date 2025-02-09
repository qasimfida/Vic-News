import React, { useState, useEffect } from "react";
import RowItem from "./RowItem";
import MoreIcon from "../assets/icons/MoreIcon";
import Popup from "./Popup"; // Import the Popup component

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
      text: "Microsoft Surpasses $3 Trillion Market Cap for the First Time",
      bn: "BN",
      time: "11:45",
      content:
        "Microsoft becomes the second company to cross the $3 trillion market cap milestone, driven by strong cloud growth, AI integration, and record-breaking revenue in its latest financial quarter.",
    },
    {
      sno: "02",
      text: "Bitcoin Hits $50,000 Amid Growing Institutional Interest",
      bn: "BN",
      time: "12:05",
      content:
        "Bitcoin surged past the $50,000 mark as institutional investors continued accumulating the cryptocurrency, citing it as a hedge against inflation and global economic uncertainties.",
    },
    {
      sno: "03",
      text: "Nvidia’s Stock Rises 10% Following AI Chip Breakthrough",
      bn: "BN",
      time: "12:15",
      content:
        "Nvidia's stock soared by 10% today after the company unveiled a groundbreaking AI chip, capable of delivering unparalleled performance for machine learning and data center applications.",
    },
  
   
  
];

const RankedNews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

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
      if (event.key === "ArrowRight" && currentIndex !== null && currentIndex < itemData.length - 1) {
        setCurrentIndex(currentIndex + 1); // Go to the next item
      }
      if (event.key === "Escape") {
        handleClose(); // Close on Esc
      }
    }
  };

  // Add event listener for keydown when popup is open
  useEffect(() => {
    if (isPopupOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPopupOpen, currentIndex]);

  return (
    <div>
      {/* Header */}
      <div className="flex px-4 items-center bg-black text-white mt-[32px] mb-[57px]">
        <h2 className="text-[20px] font-medium">Top Ranked News</h2>

        <div className="ml-[24px] mr-[12px] w-[2px] h-[30px] bg-[#747678]"></div>

        <div className="flex items-baseline text-[#747678] gap-[8px] cursor-pointer hover:text-white">
          <h2 className="text-[20px] font-medium">More</h2>
          <MoreIcon stroke={"#737576"} />
        </div>
      </div>

      {/* News List */}
      <div className="bg-[#232323] px-4 py-2">
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
