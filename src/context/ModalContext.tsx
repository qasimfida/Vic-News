import React, { createContext, useState, useContext } from "react";
import { ModalContextType, ModalKey } from "../types/types";


const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openModals, setOpenModals] = useState<Record<ModalKey, boolean>>({
    dateSelector: false,
    topicSelector: false,
    sortSelector: false,
  });

  const openModal = (modal: ModalKey) => {
    setOpenModals((prev) => ({ ...prev, [modal]: true }));
  };

  const closeModal = (modal: ModalKey) => {
    setOpenModals((prev) => ({ ...prev, [modal]: false }));
  };

  const isModalOpen = (modal: ModalKey) => openModals[modal];

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
