import React, { useState, useRef } from "react";
import "tailwindcss/tailwind.css";

const SinglePageImagesComponent = ({ images }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZoomed, setIsZoomed] = useState(false);

  const thumbnailsToShow = Math.min(images.length, 4); // Minimum of 4 thumbnails or total images if fewer than 4
  const maxIndex = images.length - 1;
  const startTouchX = useRef(0);
  const isDragging = useRef(false);

  // Handle thumbnail scrolling based on the current image index
  const updateThumbnailIndex = (index) => {
    if (images.length > 4) {
      // If the user is at the 3rd image or beyond, slide thumbnails
      if (index >= thumbIndex + thumbnailsToShow - 1 && index <= maxIndex) {
        setThumbIndex(thumbIndex + 1);
      }
      // If the user is moving backward
      if (index <= thumbIndex && thumbIndex > 0) {
        setThumbIndex(thumbIndex - 1);
      }
    }
  };

  const handleNext = () => {
    if (mainImageIndex < maxIndex) {
      const newIndex = mainImageIndex + 1;
      setMainImageIndex(newIndex);
      updateThumbnailIndex(newIndex);
    }
  };

  const handlePrev = () => {
    if (mainImageIndex > 0) {
      const newIndex = mainImageIndex - 1;
      setMainImageIndex(newIndex);
      updateThumbnailIndex(newIndex);
    }
  };

  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
    updateThumbnailIndex(index);
  };

  const handleTouchStart = (e) => {
    startTouchX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endTouchX = e.changedTouches[0].clientX;
    if (startTouchX.current - endTouchX > 50) {
      handleNext();
    } else if (endTouchX - startTouchX.current > 50) {
      handlePrev();
    }
  };

  const handleMouseDown = (e) => {
    startTouchX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    const endTouchX = e.clientX;
    if (startTouchX.current - endTouchX > 50) {
      handleNext();
    } else if (endTouchX - startTouchX.current > 50) {
      handlePrev();
    }
    isDragging.current = false;
  };

  // Zoom functionality
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
      <div
        className="main-image mb-4 relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: isZoomed
            ? "zoom-out"
            : "url('https://cdn-icons-png.flaticon.com/512/32/32339.png'), zoom-in",
        }}
      >
        <img
          src={images[mainImageIndex]}
          alt={`Main ${mainImageIndex}`}
          className="sm:w-[20rem] lg:w-[27rem] xlg:w-[30rem] xl:w-[35rem] sm:h-[20rem] lg:h-[23rem] xl:h-[28rem] rounded-lg"
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
