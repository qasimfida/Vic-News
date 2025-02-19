import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ImageProps {
  image: {
    alt: string;
    src: string;
  };
  className?: string;
  style?: React.CSSProperties;
}

const MyImage: React.FC<ImageProps> = ({ image, className, style }) => (
  <LazyLoadImage
    alt={image.alt}
    effect="blur"
    wrapperProps={{
      style: {
        transitionDelay: "1s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      },
    }}
    className={className}
    src={image.src}
  />
);

export default MyImage;
