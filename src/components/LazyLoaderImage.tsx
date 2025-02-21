import React, { useState, useEffect } from "react";

interface ImageProps {
  image: {
    alt: string;
    src: string;
  };
  className?: string;
  style?: React.CSSProperties;
}

const MyImage: React.FC<ImageProps> = ({ image, className, style }) => {
  const [loaded, setLoaded] = useState(false);
  const [blurSrc, setBlurSrc] = useState("");

  useEffect(() => {
    const smallImg = new Image();
    smallImg.src = image.src;
    smallImg.onload = () => setBlurSrc(image.src);
  }, [image.src]);

  return (
    <div className="relative w-full max-h-[300px] overflow-hidden flex items-center justify-center">
      <img
        src={blurSrc}
        alt={image.alt}
        className={`absolute inset-0 w-full max-h-[300px] object-cover blur-md  ${
          loaded ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
        loading="lazy"
      />

      <img
        src={image.src}
        alt={image.alt}
        className={`${className} transition-opacity duration-500 max-h-[300px] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={style}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default MyImage;
