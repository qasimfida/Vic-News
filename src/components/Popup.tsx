import React, { useEffect, useRef } from "react";

interface PopupProps {
  title: string;
  content: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, content, onClose }) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-[#1E1E1E] text-white border-[2px] border-white shadow-2xl py-[16px] px-[12px] lg:py-[32px] lg:px-[60px] w-4/5 max-sm:w-[90%] max-w-4xl relative "
      >
        <h2 className="md:text-[32px] text-[16px] font-medium mb-[10px] lg:mb-[30px]">
          {title}
        </h2>
        <p className="md:text-[20px] text-[12px] leading-relaxed text-[#E0AB74]">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Popup;
