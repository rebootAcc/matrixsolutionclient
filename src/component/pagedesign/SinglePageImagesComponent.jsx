import React, { useState } from "react";
import {
  HiOutlineArrowSmallLeft,
  HiOutlineArrowSmallRight,
} from "react-icons/hi2";
import "tailwindcss/tailwind.css";

const SinglePageImagesComponent = ({ images }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZoomed, setIsZoomed] = useState(false);

  const thumbnailsToShow = 4;
  const maxIndex = images.length - 1;

  const handlePrev = () => {
    if (mainImageIndex > 0) {
      setMainImageIndex(mainImageIndex - 1);
      if (mainImageIndex - 1 < thumbIndex) {
        setThumbIndex(thumbIndex - 1);
      }
    }
  };

  const handleNext = () => {
    if (mainImageIndex < maxIndex) {
      setMainImageIndex(mainImageIndex + 1);
      if (mainImageIndex + 1 >= thumbIndex + thumbnailsToShow) {
        setThumbIndex(thumbIndex + 1);
      }
    }
  };

  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="main-image mb-4 relative">
        <div
          className="overflow-hidden relative sm:w-[20rem] lg:w-[23rem] xl:w-[28rem] sm:h-[20rem] lg:h-[23rem] xl:h-[28rem] rounded-lg shadow-lg"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            cursor:
              "url('https://cdn-icons-png.flaticon.com/512/32/32339.png'), zoom-in",
          }}
        >
          <img
            src={images[mainImageIndex]}
            alt={`Main ${mainImageIndex}`}
            className="sm:w-[20rem] lg:w-[23rem] xl:w-[28rem] sm:h-[20rem] lg:h-[23rem] xl:h-[28rem] rounded-lg"
          />
          {isZoomed && (
            <div
              className="absolute inset-0 bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(${images[mainImageIndex]})`,
                backgroundSize: "150%",
                ...zoomStyle,
              }}
            ></div>
          )}
        </div>
        <button
          onClick={handlePrev}
          disabled={mainImageIndex === 0}
          className="absolute lg:left-[-14%] sm:left-[-10%] xl:left-[-10%] top-1/2 transform -translate-y-1/2 sm:text-xl lg:text-2xl bg-white sm:p-1 lg:p-2 rounded-full shadow-lg"
        >
          <HiOutlineArrowSmallLeft />
        </button>
        <button
          onClick={handleNext}
          disabled={mainImageIndex === maxIndex}
          className="absolute lg:right-[-14%] sm:right-[-10%] xl:right-[-10%] top-1/2 transform -translate-y-1/2 sm:text-xl lg:text-2xl bg-white sm:p-1 lg:p-2 rounded-full shadow-lg"
        >
          <HiOutlineArrowSmallRight />
        </button>
      </div>
      <div className="thumbnail-slider flex items-center space-x-2">
        <div className="thumbnail-images flex overflow-hidden space-x-2">
          {images
            .slice(thumbIndex, thumbIndex + thumbnailsToShow)
            .map((image, index) => (
              <img
                key={thumbIndex + index}
                src={image}
                alt={`Thumbnail ${thumbIndex + index}`}
                onClick={() => handleThumbnailClick(thumbIndex + index)}
                className={`sm:w-[4rem] lg:w-[4rem] xl:w-[5rem] object-cover cursor-pointer transition-transform transform hover:scale-105 ${
                  mainImageIndex === thumbIndex + index
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePageImagesComponent;
