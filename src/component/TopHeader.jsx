import React, { useState } from "react";
import { PiPhoneCallFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import EnquiryForm from "./EnquiryForm";
import { IoClose } from "react-icons/io5";

const TopHeader = () => {
  const [modalCall, setModalCall] = useState(false);
  const socialicon = [
    {
      imgsrc: "/images/facebook.svg",
      link: "https://www.facebook.com/people/Matrix-Solutions/100054548420331/?locale=eu_ES",
    },
    {
      imgsrc: "/images/instagram.svg",
      link: "",
    },
    {
      imgsrc: "/images/twitter.svg",
      link: "",
    },
  ];
  const headeriteam = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  const headeriteam2 = [
    { name: "Order Now", link: () => setModalCall(true) },
    { name: "Trade Inquiry", link: () => setModalCall(true) },
    { name: "FAQ", link: () => setModalCall(true) },
  ];
  return (
    <div className="p-2 px-8 shadow-sm lg:flex sm:hidden md:flex-row sm:flex-col lg:gap-0 sm:gap-4 justify-between bg-[#000000] items-center ">
      <div className="md:flex sm:hidden gap-5 items-center font-roboto">
        {headeriteam.map((iteam, index) => (
          <Link
            to={iteam.link}
            className="text-sm text-[#B6BBC6] font-medium"
            key={index}
          >
            {iteam.name}
          </Link>
        ))}
      </div>
      <div className="md:flex sm:hidden items-center gap-6 ">
        <Link
          to={"tel:9476383750"}
          className="flex items-center text-[#B6BBC6] text-sm font-semibold gap-1"
        >
          <span>
            <PiPhoneCallFill className="text-lg" />
          </span>
          9476383750
        </Link>

        {headeriteam2.map((iteam, index) => {
          const isFunction = typeof iteam.link === "function";

          return isFunction ? (
            <button
              type="button"
              onClick={iteam.link}
              className="text-sm text-[#B6BBC6] font-medium"
              key={index}
            >
              {iteam.name}
            </button>
          ) : (
            <Link
              to={iteam.link}
              className="text-sm text-[#B6BBC6] font-medium"
              key={index}
            >
              {iteam.name}
            </Link>
          );
        })}

        <div className="lg:flex sm:hidden gap-2 items-center">
          {socialicon.map((icon, index) => (
            <Link target="_blank" to={icon.link} className="" key={index}>
              <img src={icon.imgsrc} alt="" className="h-5 w-full" />
            </Link>
          ))}
        </div>
      </div>
      {modalCall && (
        <div className="fixed top-0 left-0 w-full h-full z-[1100] flex items-center justify-center bg-black/65 backdrop-blur-sm">
          <div className="relative flex items-center justify-center">
            <div className="absolute top-0 right-0">
              <button
                type="button"
                className="text-4xl bg-[#FFB800A6] text-white p-2 rounded-bl-xl"
                onClick={() => setModalCall(false)}
              >
                <IoClose />
              </button>
            </div>
            <div>
              <EnquiryForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopHeader;
