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
      onClose(); // Close if clicked outside the popup
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
        className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-4/5 max-w-lg relative"
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default Popup;
