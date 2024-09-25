import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const SingleProductPageSimilerProductComponent = ({ similarProduct }) => {
  const { heading, products } = similarProduct;
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 725) {
        setSlidesToShow(2);
      } else if (window.innerWidth <= 980) {
        setSlidesToShow(3);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth <= 1280) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute top-1/2 sm:hidden lg:block sm:left-[-2rem] lg:left-[-1.5rem] xl:left-[-4rem] transform -translate-y-1/2 z-10 w-10 h-10 flex justify-center items-center"
      >
        <FaArrowLeftLong className="h-6 w-6" />
      </button>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute top-1/2 sm:hidden lg:block sm:right-[-2rem] lg:right-[-2.4rem] xl:right-[-4rem] transform -translate-y-1/2 z-10 w-10 h-10 flex justify-center items-center "
      >
        <FaArrowRightLong className="h-6 w-6" />
      </button>
    );
  };

  const navigate = useNavigate();

  const settings = {
    infinite: products.length > slidesToShow,
    speed: 1000,
    slidesToShow: Math.min(slidesToShow, products.length),
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const ProductDetails = (productId) => {
    navigate(`/product-details/${productId}`);
    window.location.reload();
  };

  if (!Array.isArray(products) || products.length === 0) {
    return <div>No similar products available.</div>;
  }
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center border-b-2 border-[#E20000]">
          <span className="h-[4rem] sm:w-[50%] md:w-[30%] lg:w-[20%] flex justify-center items-center bg-[#E20000] text-xl font-semibold text-white rounded-t-xl">
            {heading}
          </span>
        </div>
        <Slider {...settings}>
          {products.map((product) => (
            <div
              className="!flex justify-center lg:w-[23rem] items-center"
              key={product.productId}
            >
              <div className="flex flex-col sm:w-[95%] md:w-[20rem] lg:w-[95%] rounded-lg boxsh">
                <div
                  className={`flex flex-col rounded-lg gap-4 p-4 ${
                    !product.active ? "opacity-50" : ""
                  }`}
                >
                  <span className="flex justify-center items-center">
                    <img
                      src={product.productthumbnailimage}
                      alt=""
                      className="lg:h-[12rem] sm:w-[12rem] sm:h-[8rem] lg:w-[15rem]"
                    />
                  </span>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <span className="text-lg text-center font-medium text-[#2D68DB] product-title">
                      {product.title}
                    </span>
                    <span
                      className={`text-sm text-center  product-details ${
                        !product.active ? "text-red-600" : "text-[#777777]"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: product.active
                          ? product.fullDescription
                          : "Currently unavailable",
                      }}
                    ></span>
                  </div>
                </div>
                <button
                  onClick={() => ProductDetails(product.productId)}
                  className="lg:h-[4rem] md:h-[3.5rem] sm:h-[2.5rem] w-full bg-[#2D68DB] text-white rounded-b-lg flex justify-center items-center sm:text-base md:text-lg lg:text-xl font-semibold"
                >
                  {product.active ? "View Details" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SingleProductPageSimilerProductComponent;
