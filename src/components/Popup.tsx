import React, { useEffect, useRef } from "react";
import MyImage from "./LazyLoaderImage";

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-[#1E1E1E] text-white border-[2px] border-white shadow-2xl py-[16px] px-[12px] lg:py-[32px] lg:px-[60px] w-4/5 max-sm:w-[90%] max-w-4xl relative pointer-events-auto"
      >
        <h2 className="md:text-[20px] text-[16px] font-medium mb-2">{title}</h2>

        {contentImage && (
          <MyImage
            image={{
              src: contentImage,
              alt: title || "Popup Image",
            }}
          />
        )}

        <p className="md:text-[16px] text-[12px] leading-relaxed text-[#E0AB74]">
          {content}
        </p>

        {orgUrl && (
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
