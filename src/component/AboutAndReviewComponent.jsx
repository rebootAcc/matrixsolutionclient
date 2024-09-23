import React from "react";
import { RiStarFill } from "react-icons/ri";
import Slider from "react-slick";

const AboutAndReviewComponent = () => {
  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
  };
  const reviews = [
    {
      name: "Mohna Rani",
      details:
        "My favourite shop in Chandni for all pc parts. They have superb stock and compared to md computers prices are marginally better. Also, store prices are lesser compared to their online store. Recently purchased Ryzen 5 5600x/Spectrix D60G/Deepcool Matrexx 40",
    },
    {
      name: "Mohna Rani",
      details:
        "My favourite shop in Chandni for all pc parts. They have superb stock and compared to md computers prices are marginally better. Also, store prices are lesser compared to their online store. Recently purchased Ryzen 5 5600x/Spectrix D60G/Deepcool Matrexx 40",
    },
    {
      name: "Mohna Rani",
      details:
        "My favourite shop in Chandni for all pc parts. They have superb stock and compared to md computers prices are marginally better. Also, store prices are lesser compared to their online store. Recently purchased Ryzen 5 5600x/Spectrix D60G/Deepcool Matrexx 40",
    },
  ];
  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 ">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 items-center gap-8">
        <div className=" flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold">
              About
              <span className="text-[#E20000]"> Matrix Solutions!</span>{" "}
            </span>
            <span>Your favourite Store for All Computer Needs !</span>
          </div>
          <div className="flex sm:text-sm xlg:text-lg text-[##777777] flex-col gap-1">
            <span>
              Matrix Solutions has evolved significantly since its inception,
              transitioning from a key player in the IT sector to a
              comprehensive solution provider. Specializing in customized and
              integrated IT solutions, Matrix Solutions now offers turnkey
              solutions in network integration and IT-enabled services. Our
              extensive range of services addresses every aspect of your
              company's integrated information needs, regardless of your
              platform or the complexity of your technological requirements.
              With our expertise, we drive both business and technology
              strategies forward, ensuring seamless integration and efficient
              operations.
            </span>
          </div>
        </div>
        <div className=" p-6 bg-[#EFEFEF] rounded-xl">
          <div className="w-full">
            <div className="flex-col flex gap-6">
              <span className="text-2xl">
                WHAT YOU SAY <span className="text-[#E20000]"> ABOUT US</span>
              </span>
              <div className="w-full">
                <Slider {...settings}>
                  {reviews.map((review, index) => (
                    <div
                      className="!flex items-center justify-center"
                      key={index}
                    >
                      <div className="!flex flex-col w-[90%] gap-2">
                        <span className="text-[#777777] sm:h-[14rem] md:h-[15rem] lg:h-[10rem] text-lg">
                          {review.details}
                        </span>
                        <span className="text-xl text-[#2D68DB] text-semibold">
                          ---- {review.name}
                        </span>
                        <span className="flex flex-row text-xl items-center gap-2 text-[#FFB800]">
                          <RiStarFill />
                          <RiStarFill />
                          <RiStarFill />
                          <RiStarFill />
                          <RiStarFill />
                        </span>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAndReviewComponent;
