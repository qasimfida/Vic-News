import React, { createContext, useContext, useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";

interface SelectionContextType {
  currentIndex: number | null;
  setCurrentIndex: (index: number | null) => void;
  activeList: "ordered" | "ranked";
  setActiveList: (list: "ordered" | "ranked") => void;
  setPopupOpen: any;
  isPopupOpen: boolean;
  handleKeyDown: (event: KeyboardEvent, orderedLength: number, rankedLength: number, onEnter: () => void) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [activeList, setActiveList] = useState<"ordered" | "ranked">("ordered");
  const [isPopupOpen, setPopupOpen] = useState(false);

  const navigateNext = (orderedLength: number, rankedLength: number) => {
    if (activeList === "ordered" && currentIndex !== null && currentIndex >= orderedLength - 1) {
      setActiveList("ranked");
      setCurrentIndex(0);
    } else if (activeList === "ranked" && currentIndex !== null && currentIndex >= rankedLength - 1) {
      setActiveList("ordered");
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => (prev === null ? 0 : prev + 1));
    }
  };

  const navigatePrev = (orderedLength: number, rankedLength: number) => {
    if (activeList === "ranked" && currentIndex === 0) {
      setActiveList("ordered");
      setCurrentIndex(orderedLength - 1);
    } else if (activeList === "ordered" && currentIndex === 0) {
      setActiveList("ranked");
      setCurrentIndex(rankedLength - 1);
    } else {
      setCurrentIndex((prev) => (prev === null ? 0 : prev - 1));
    }
  };

  const handleKeyDown = (event: KeyboardEvent, orderedLength: number, rankedLength: number, onEnter: () => void) => {
    if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      navigateNext(orderedLength, rankedLength);
    } else if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      navigatePrev(orderedLength, rankedLength);
    } else if (event.key === "Enter") {
      setTimeout(() => {
        onEnter();
      }, 10);
    }
  };

  // Swipe handlers for mobile navigation
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => navigateNext(5, 5), // Adjust lengths dynamically
    onSwipedDown: () => navigatePrev(5, 5),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  return (
    <SelectionContext.Provider
      value={{ currentIndex, setCurrentIndex, activeList, setActiveList, setPopupOpen, isPopupOpen, handleKeyDown }}
    >
      <div {...swipeHandlers}>{children}</div>
    </SelectionContext.Provider>
  );
};

export const useSelection = (): SelectionContextType => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
};
