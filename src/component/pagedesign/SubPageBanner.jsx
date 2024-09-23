import React, { useState, useEffect } from "react";

// Utility function to preload images
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = (err) => reject(err);
  });
};

const SubBanner = ({ heading, bannerimg }) => {
  const [loadedImg, setLoadedImg] = useState(null);

  useEffect(() => {
    preloadImage(bannerimg)
      .then((src) => {
        setLoadedImg(src);
      })
      .catch((err) => {
        console.error("Failed to load image", err);
      });
  }, [bannerimg]);

  return (
    <div className="relative bg-[#254178D9]">
      {loadedImg ? (
        <img
          className="w-full h-auto object-cover resize bg-cover opacity-40"
          src={loadedImg}
          alt="Background"
        />
      ) : null}

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full">
        <h1 className="sm:text-xl md:text-4xl lg:text-5xl text-white text-center text-shadow">
          {heading}
        </h1>
      </div>
    </div>
  );
};

export default SubBanner;
