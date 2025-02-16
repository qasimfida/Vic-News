import React, { useEffect, useRef } from "react";

interface PopupProps {
  title: string;
  content: string;
  contentImage: string;
  orgUrl: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({
  title,
  content,
  contentImage,
  orgUrl,
  onClose,
}) => {
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
        <h2 className="md:text-[24px] text-[16px] font-medium mb-2 ">
          {title}
        </h2>
        {contentImage && (
          <img
            width=""
            className="w-full object-contain mb-2 h-[200px]"
            src={contentImage || ""}
            alt=""
          />
        )}

        <p className="md:text-[18px] text-[12px] leading-relaxed text-[#E0AB74]">
          {content}
        </p>
        {contentImage && (
          <a
            href={orgUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#F39320] mt-5 block break-words"
          >
            {orgUrl}
          </a>
        )}
      </div>
    </div>
  );
};

export default Popup;
