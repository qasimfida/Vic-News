import React, { createContext, useContext, useState } from "react";

interface SelectionContextType {
  currentIndex: number | null;
  setCurrentIndex: (index: number | null) => void;
  activeList: "ordered" | "ranked";
  setActiveList: (list: "ordered" | "ranked") => void;
  handleKeyDown: (event: KeyboardEvent, orderedLength: number, rankedLength: number, onEnter: () => void) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [activeList, setActiveList] = useState<"ordered" | "ranked">("ordered");


  const handleKeyDown = (
    event: KeyboardEvent,
    orderedLength: number,
    rankedLength: number,
    onEnter: () => void
  ) => {
    console.log("Key Pressed:", event.key);
    console.log("Before Update - currentIndex:", currentIndex, " activeList:", activeList);
  
    if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      if (activeList === "ordered" && currentIndex !== null && currentIndex >= orderedLength - 1) {
        setActiveList("ranked");
        setCurrentIndex(0);
      } else if (activeList === "ranked" && currentIndex !== null && currentIndex >= rankedLength - 1) {
        setActiveList("ordered");
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => (prev === null ? 0 : prev + 1));
      }
    } else if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      if (activeList === "ranked" && currentIndex === 0) {
        setActiveList("ordered");
        setCurrentIndex(orderedLength - 1);
      } else if (activeList === "ordered" && currentIndex === 0) {
        setActiveList("ranked");
        setCurrentIndex(rankedLength - 1);
      } else {
        setCurrentIndex((prev) => (prev === null ? 0 : prev - 1));
      }
    } else if (event.key === "Enter") {
      setTimeout(() => {
        onEnter();
      }, 10); 
    }
  
    console.log("After Update - currentIndex:", currentIndex, " activeList:", activeList);
  };
  
  
  return (
    <SelectionContext.Provider value={{ currentIndex, setCurrentIndex, activeList, setActiveList, handleKeyDown }}>
      {children}
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
