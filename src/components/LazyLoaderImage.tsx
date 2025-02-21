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
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = image.src;

    img.onload = () => {
      setLoaded(true);
      setError(false);
      setLoader(false);
    };

    img.onerror = () => {
      setError(true);
      setLoaded(false);
      setLoader(false);
    };
  }, [image.src]);

  return (
    <div className="flex flex-col  w-full max-h-[300px] overflow-hidden items-center justify-center">
      {loader && (
        <div className="  flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className=" flex items-center justify-center">
          <span className="text-red-500 font-medium">Image failed to load</span>
        </div>
      )}

      {!error && (
        <img
          src={image.src}
          alt={image.alt}
          className={`${className} transition-opacity duration-500 max-h-[300px] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={style}
          loading="lazy"
          onLoad={() => {
            setLoaded(true);
            setLoader(false);
          }}
          onError={() => {
            setError(true);
            setLoader(false);
          }}
        />
      )}
    </div>
  );
};

export default MyImage;
