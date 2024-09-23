import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

const TopBrandsComponent = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 725) {
        setSlidesToShow(2);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(4);
      } else if (window.innerWidth <= 1780) {
        setSlidesToShow(6);
      } else {
        setSlidesToShow(7);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const settings = {
    infinite: true,
    centerMode: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "linear",
    speed: 6000,
    autoplaySpeed: 500,
    arrows: false,
  };
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/brands/getbrand`
      );
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 flex flex-col gap-8 justify-center items-center">
      <div className="text-4xl font-semibold text-[#DA0000]">
        <span className="text-[#2D68DB]">Top </span> Brands
      </div>
      <div className="w-full ">
        <Slider {...settings}>
          {brands.map((brand) => (
            <span
              key={brand.brandId}
              className="slider-container p-4 !flex justify-center items-center  "
            >
              <img src={brand.brandimage} alt="" className="w-[80%]" />
            </span>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopBrandsComponent;
