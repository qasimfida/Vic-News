import React, { useState, useEffect, useRef } from "react";
import RowItem from "./RowItem";

export const itemData = [
  {
    sno: "01",
    text: "S&P 500 Index Falls 1.8% ; Led by Communication Services Sector",
    bn: "BN",
    time: "12:00",
    content:
      "The S&P 500 dropped 1.8% today, primarily driven by a sharp decline in the communication services sector. Analysts attribute the fall to economic uncertainties and weaker-than-expected earnings results.",
  },
  {
    sno: "02",
    text: "Liberty Gold Soars 13% After Positive Drilling Results",
    bn: "BN",
    time: "12:10",
    content:
      "Liberty Gold Corp saw a significant 13% surge in stock value following positive drilling results from its latest gold exploration project, indicating a promising future for investors and stakeholders alike.",
  },
  {
    sno: "03",
    text: "Domatar Options Surge Amid Unexpected Earnings Growth",
    bn: "BN",
    time: "12:20",
    content:
      "Domatar Inc. options activity spiked today as investors reacted to the company's unexpected earnings growth, which exceeded market expectations by a substantial margin, signaling potential strong future performance.",
  },
  {
    sno: "04",
    text: "Ranpak Holdings Declines 9% as Revenue Misses Expectations",
    bn: "BN",
    time: "12:30",
    content:
      "Ranpak Holdings Inc. shares plummeted by 9% as quarterly revenues fell short of Wall Street projections, raising concerns among investors about the company's profitability and long-term growth prospects.",
  },
  {
    sno: "05",
    text: "Pfizer Achieves Breakthrough in Cancer Drug Research",
    bn: "BN",
    time: "12:40",
    content:
      "Pharmaceutical giant Pfizer has announced a major breakthrough in cancer drug research, with promising trial results showing high efficacy rates, potentially leading to a revolutionary treatment option.",
  },
  {
    sno: "06",
    text: "Amazon's Stock Rises 5% Following Strong Quarterly Results",
    bn: "BN",
    time: "12:50",
    content:
      "Amazon's stock rose by 5% today as the company reported strong quarterly earnings, surpassing revenue and profit expectations, driven by e-commerce growth and increased demand for its cloud computing services.",
  },
  {
    sno: "07",
    text: "Tesla Announces New Electric Truck with Improved Range",
    bn: "BN",
    time: "01:00",
    content:
      "Tesla unveiled its new electric truck model, featuring an extended driving range, enhanced battery efficiency, and advanced self-driving capabilities, positioning itself ahead of competitors in the EV market.",
  },
  {
    sno: "08",
    text: "Meta Launches New Features to Improve User Privacy",
    bn: "BN",
    time: "01:10",
    content:
      "Meta has introduced a series of new privacy features aimed at giving users greater control over their data, addressing regulatory concerns, and improving overall user trust in its platforms.",
  },
  {
    sno: "09",
    text: "Google AI Unit Unveils Next-Generation Language Model",
    bn: "BN",
    time: "01:20",
    content:
      "Google's AI research division has unveiled its latest language model, boasting unprecedented capabilities in natural language processing, making significant strides in machine learning advancements.",
  },
  {
    sno: "10",
    text: "Apple’s New MacBook Pro to Feature M3 Chip with AI Enhancements",
    bn: "BN",
    time: "01:30",
    content:
      "Apple announced its upcoming MacBook Pro lineup, featuring the new M3 chip with AI-powered enhancements, improved performance, and better battery life, making it a major leap in the laptop market.",
  },
];

const OrderedNews = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

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
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      handleClose(); 
    }
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

  return (
    <div className="px-4">
      <h2 className="text-[24px] font-medium my-[12px]">Time Ordered News</h2>
      <div>
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
              bnColor={"red"}
              textColor={"orange"}
            />
          </div>
        ))}
      </div>

      {isPopupOpen && currentIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-4/5 max-w-lg relative"
          >
            <h2 className="text-xl font-bold mb-4">
              {itemData[currentIndex].text}
            </h2>
            <p className="text-sm leading-relaxed">
              Breaking News ({itemData[currentIndex].bn} at{" "}
              {itemData[currentIndex].time}): {itemData[currentIndex].content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderedNews;
