import React from "react";

const HeroSectionComponent = () => {
  const images = [
    { imgsrc: "/images/grapicsrectangle1.jpg" },
    { imgsrc: "/images/grapicsrectangle2.jpg" },
    { imgsrc: "/images/grapicsrectangle3.jpg" },
    { imgsrc: "/images/grapicsrectangle4.jpg" },
  ];
  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 flex flex-col sm:gap-2 md:gap-4 lg:gap-8">
      <div className="flex justify-center w-full items-center sm:gap-2 md:gap-4 lg:gap-8">
        <span className="w-full">
          <img
            src="/images/grapicsimg1.png"
            alt=""
            className="w-full rounded-lg"
          />
        </span>
        <span className="w-full">
          <img
            src="/images/processorimg1.png"
            alt=""
            className="w-full rounded-lg"
          />
        </span>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 sm:gap-2 md:gap-4 lg:gap-4">
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.imgsrc} alt="" className=" rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSectionComponent;
