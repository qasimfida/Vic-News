import { useEffect, useCallback } from "react";
import RowItem from "./RowItem";
import Popup from "./Popup";
import useRankedNews from "../hooks/useRankedNews";
import { useSelection } from "../context/SelectionContext";
import Loader from "./Loader";
import useNews from "../hooks/useNews";

const RankedNews = () => {
  const {
    currentIndex,
    isPopupOpen,
    setPopupOpen,
    setCurrentIndex,
    activeList,
    setActiveList,
    handleKeyDown,
  } = useSelection();
  const { rankednews, loading, error } = useRankedNews();
  const { news } = useNews();

  const handleRowClick = useCallback(
    (index: number) => {
      setActiveList("ranked");
      setTimeout(() => {
        setCurrentIndex(index);
        setPopupOpen(true);
      }, 0);
    },
    [setActiveList, setCurrentIndex, setPopupOpen]
  );

  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      handleKeyDown(event, news.length, rankednews.length, () => {
        if (currentIndex !== null) {
          activeList === "ranked" && handleRowClick(currentIndex as number);
        }
      });

      if (event.key === "Escape") {
        setPopupOpen(false);
        setCurrentIndex(null);
      }
    };

    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  }, [
    handleKeyDown,
    isPopupOpen,
    news.length,
    rankednews.length,
    setCurrentIndex,
    handleRowClick,
    setPopupOpen,
    currentIndex,
    activeList,
  ]);

  const handleClose = () => {
    setPopupOpen(false);
    setCurrentIndex(null);
  };

  if (loading) {
    return (
      <div>
        <Loader rows={1} widths={["30%"]} />
        <Loader rows={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="">
        <h2 className="text-xl font-medium my-[12px]">Top Ranked News</h2>
        <div className="text-rose-600 mb-12 text-center flex items-center justify-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex md:px-4 items-center bg-black text-white lg:mt-[32px] md:mb-[24px] lg:mb-[32px] my-[16px]">
        <h2 className="md:text-[20px] text-[16px] font-medium">
          Top Ranked News
        </h2>
      </div>

      <div className="bg-[#232323] px-2 lg:px-4 py-2">
        {rankednews.map((item, index) => (
          <div
            key={index}
            onClick={() => handleRowClick(index)}
            className={`cursor-pointer transition ${
              activeList === "ranked" && currentIndex === index
                ? "bg-[#6B6D70] border border-[#6B6D70]"
                : "hover:bg-[#6B6D70]"
            }`}
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
      {isPopupOpen && currentIndex !== null && activeList === "ranked" && (
        <Popup
          title={rankednews[currentIndex].text}
          content={`Breaking News (${rankednews[currentIndex].bn} at ${rankednews[currentIndex].time}): ${rankednews[currentIndex].content}`}
          orgUrl={rankednews[currentIndex].orgUrl}
          contentImage={rankednews[currentIndex].contentImage}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default RankedNews;
