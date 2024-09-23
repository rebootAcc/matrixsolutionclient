import React from "react";

const BrandOfferComponent = () => {
  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 ">
      <div className="flex md:flex-row sm:flex-col items-center gap-4">
        <div className="md:w-[50%] sm:w-full">
          <img
            src="/images/brandoffer1.png"
            alt=""
            className="w-full rounded-lg"
          />
        </div>
        <div className="md:w-[50%] sm:w-full flex flex-col gap-4">
          <div className="">
            <img
              src="/images/brandoffer2.png"
              alt=""
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[50%]">
              <img
                src="/images/brandoffer3.png"
                alt=""
                className="w-full rounded-lg"
              />
            </div>
            <div className="w-[50%]">
              <img
                src="/images/brandoffer4.png"
                alt=""
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandOfferComponent;
