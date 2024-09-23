import React, { useEffect } from "react";

import Slider from "react-slick";
const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};
const MainBanner = () => {
  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
  };

  const banners = [
    { imgsrc: "/images/slider3.jpg" },
    { imgsrc: "/images/slider4.jpg" },
    { imgsrc: "/images/slider1.jpg" },
    { imgsrc: "/images/slider2.jpg" },
  ];
  useEffect(() => {
    const imageUrls = banners.map((banner) => banner.imgsrc);
    preloadImages(imageUrls);
  }, [banners]);
  return (
    <div className="w-full ">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="">
            <img
              src={banner.imgsrc}
              loading="lazy"
              alt=""
              className="h-auto w-full z-[-10]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainBanner;
