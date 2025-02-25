import { useEffect, useCallback, useContext } from "react";
import RowItem from "./RowItem";
import Popup from "./Popup";
import useRankedNews from "../hooks/useRankedNews";
import { useSelection } from "../context/SelectionContext";
import Loader from "./Loader";
import useNews from "../hooks/useNews";
import MoreIcon from "../assets/icons/MoreIcon";
import { NewsContext } from "../context/NewsContext";

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

  const newsContext = useContext(NewsContext);
  const loadMoreTopics = newsContext?.loadMoreTopics || (() => {});
  const loadNewerTopics = newsContext?.loadNewerTopics || (() => {});

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
        if (currentIndex !== null && activeList === "ranked") {
          handleRowClick(currentIndex);
        }
      });

      if (event.key === "Escape") {
        setPopupOpen(false);
        setCurrentIndex(3);
      }
    };

    document.addEventListener("keydown", keyListener);
    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  }, [
    handleKeyDown,
    news.length,
    rankednews.length,
    setPopupOpen,
    setCurrentIndex,
    currentIndex,
    activeList,
    handleRowClick,
  ]);

  const handleClose = () => {
    setPopupOpen(false);
    setCurrentIndex(0);
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
      <div>
        <h2 className="text-xl font-medium my-[12px]">Top Ranked News</h2>
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
          onClick={loadNewerTopics}
          className="flex items-baseline text-[#747678] gap-[8px] cursor-pointer hover:text-white"
        >
          <h2 className="md:text-[20px] text-[16px] font-medium">Newer</h2>
          <MoreIcon stroke={"#737576"} />
        </div>

        <div className="ml-[24px] mr-[12px] w-[2px] h-[18px] md:h-[30px] bg-[#747678]"></div>

        <div
          onClick={loadMoreTopics}
          className="flex items-baseline text-[#747678] gap-[8px] cursor-pointer hover:text-white"
        >
          <h2 className="md:text-[20px] text-[16px] font-medium">Older</h2>
          <MoreIcon stroke={"#737576"} />
        </div>
      </div>

      <div className="flex flex-col max-sm:gap-[16px] py-[9px] lg:px-4">
        {rankednews.map((item, index) => (
          <div
            key={index}
            onClick={() => handleRowClick(index)}
            className={`cursor-pointer transition bg-[#232323] max-sm:px-[7px] w-full ${
              activeList === "ranked" && currentIndex === index
                ? "bg-[#6B6D70] border border-[#6B6D70]"
                : "hover:border hover:border-"
            }`}
          >
            <RowItem
              sno={index + 1}
              text={item?.text}
              bn={item.bn}
              time={item.time}
              bnColor={"yellow"}
              textColor={"yellow"}
            />
          </div>
        ))}
      </div>

      {isPopupOpen &&
        currentIndex !== null &&
        activeList === "ranked" &&
        rankednews[currentIndex] && (
          <Popup
            title={rankednews[currentIndex]?.text}
            content={`Breaking News (${rankednews[currentIndex]?.bn} at ${rankednews[currentIndex]?.time}): ${rankednews[currentIndex]?.content}`}
            orgUrl={rankednews[currentIndex]?.orgUrl}
            contentImage={rankednews[currentIndex]?.contentImage}
            onClose={handleClose}
          />
        )}
    </div>
  );
};

export default RankedNews;
