import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import footer1img from "/images/footer1.png";
import footer2img from "/images/footer2.png";
import footer3img from "/images/footer3.png";

import locationimg from "/images/location.svg";
import gmailimg from "/images/gmail.svg";
import phoneimg from "/images/phone.svg";

import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { MdOutlineEmail, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram, IoLogoLinkedin } from "react-icons/io";
import EnquiryForm from "./EnquiryForm";
import { IoClose } from "react-icons/io5";

const FooterComponent = () => {
  const registerd = [
    {
      imgsrc: "/images/hp.jpg",
      link: "",
    },
    {
      imgsrc: "/images/canon.jpg",
      link: "",
    },
    {
      imgsrc: "/images/acer.jpg",
      link: "",
    },
    {
      imgsrc: "/images/aoc.jpg",
      link: "",
    },
    {
      imgsrc: "/images/digisol.jpg",
      link: "",
    },
  ];
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [autoplay, setAutoplay] = useState(false);
  const [modalCall, setModalCall] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 725) {
        setSlidesToShow(2);
        setAutoplay(true);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(3);
        setAutoplay(true);
      } else if (window.innerWidth <= 1280) {
        setSlidesToShow(4);
        setAutoplay(true);
      } else if (window.innerWidth <= 1780) {
        setSlidesToShow(5);
        setAutoplay(false);
      } else {
        setSlidesToShow(5);
        setAutoplay(false);
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
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 2000,
    pauseOnHover: false,

    centerMode: false,
    arrows: false,
  };
  const information = [
    { name: "Bank Details", link: "/bank-details" },
    { name: "Shipping & Delivery", link: "/shipping-&-delivery" },
    { name: "Cancellation & Refund", link: "/cancelation-&-refund" },
    { name: "Payment Method", link: "/payment-methods" },
    { name: "Brand Support", link: "/brand-support" },
  ];
  const consults = [
    { name: "Contact Us", link: "/contact-us" },
    { name: "Trade Enquiry", link: () => setModalCall(true) },
    { name: "Become Partner", link: () => setModalCall(true) },
    {
      name: "WhatsApp Us",
      link: "https://api.whatsapp.com/send?phone=919476383750",
    },
    {
      name: "Store Location",
      link: "https://maps.app.goo.gl/ZXiPJWYsMirbSNA59",
    },
  ];
  const socialmedia = [
    { icon: "/images/facebookfooter.svg", link: "" },
    { icon: "/images/instagramfooter.svg", link: "" },
    { icon: "/images/youtubefooter.svg", link: "" },
    { icon: "/images/twitterfooter.svg", link: "" },
    { icon: "/images/linkedinfooter.svg", link: "" },
  ];

  return (
    <div className="xl:p-16 sm:p-4 lg:p-8 bg-[#333333]">
      <div className="flex  flex-col gap-8">
        <div className="flex sm:flex-col md:flex-row sm:h-fit sm:gap-5 lg:gap-0 lg:h-[8rem] w-full p-4 justify-between items-center rounded-lg">
          <div className="md:w-[30%] lg:w-[20%] p-2 h-[8rem] text-center bg-[#2D68DB] rounded-r-xl flex justify-center items-center sm:w-full sm:text-xl lg:text-lg xlg:text-2xl xl:text-3xl font-semibold text-white ">
            Authorised Dealers
          </div>
          <div className="lg:w-[75%] md:w-[70%] sm:w-full">
            <Slider {...settings}>
              {registerd.map((register, index) => (
                <div key={index} className="!flex justify-center items-center">
                  <Link
                    to={register.link}
                    className="w-[90%] h-[8rem] rounded-lg bg-white !flex justify-center items-center"
                  >
                    <img
                      src={register.imgsrc}
                      alt=""
                      className="h-[8rem] w-fit rounded-lg "
                    />
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-6 md:gap-6 lg:gap-2 xlg:gap-4 xl:gap-8">
          <div className="flex flex-col gap-4 text-white justify-center items-center">
            <div className="lg:text-2xl xl:text-4xl md:text-3xl sm:text-2xl font-bold">
              <img src="/images/logo.svg" alt="logo" className="size-28" />
            </div>
            <div className="text-sm">Siliguri, West Bengal 734001</div>
            <div className="flex justify-center items-center gap-4 text-gray-400 text-2xl">
              <Link to={""}>
                <FaFacebookF />
              </Link>
              <Link to={""}>
                <FaXTwitter />
              </Link>
              <Link to={""}>
                <IoLogoInstagram />
              </Link>
              <Link to={""}>
                <IoLogoLinkedin />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-start  gap-2 text-white">
            <div className="flex ">
              <span className="text-lg font-medium">Information</span>
            </div>

            <div className="flex flex-col gap-1 text-base">
              {information.map((service, index) => (
                <Link
                  to={service.link}
                  className="flex flex-row gap-2 items-center"
                  key={index}
                >
                  <span>
                    <MdOutlineKeyboardArrowRight />
                  </span>
                  <span>{service.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start  gap-2 text-white">
            <div className="flex">
              <span className="text-lg font-medium">Customer Service</span>
            </div>

            <div className="flex flex-col gap-2 text-base">
              {consults.map((consult, index) => {
                const isExternal =
                  typeof consult.link === "string" &&
                  consult.link.startsWith("https:");
                const isFunction = typeof consult.link === "function";

                return isFunction ? (
                  // Render a button or clickable span for consults with a function as link
                  <button
                    onClick={consult.link}
                    className="flex flex-row gap-2 items-center"
                    key={index}
                  >
                    <span>
                      <MdOutlineKeyboardArrowRight />
                    </span>
                    <span>{consult.name}</span>
                  </button>
                ) : (
                  // Render a Link for consults with a URL
                  <Link
                    to={consult.link}
                    className="flex flex-row gap-2 items-center"
                    key={index}
                    {...(isExternal && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    <span>
                      <MdOutlineKeyboardArrowRight />
                    </span>
                    <span>{consult.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col justify-start sm:items-start  lg:items-center gap-4 text-white">
            <div className="flex flex-col gap-4 justify-between">
              <span className="text-lg font-medium">Newsletter</span>
              <div className="flex flex-col gap-2">
                <p>
                  Stay up to date with news and promotions by signing up for our
                  newsletter
                </p>
                <div className="flex justify-between items-center bg-white px-1 py-2">
                  <input
                    type="text"
                    placeholder="Your Email"
                    className="h-[2rem] text-gray-500 border-none px-2 outline-none"
                  />
                  <button className="h-[2rem] text-white px-4 flex justify-center items-center bg-gray-500">
                    <MdOutlineEmail /> Send
                  </button>
                </div>
                <div className="flex gap-2 items-center text-xs">
                  <input type="checkbox" name="" id="" />I have read and agree
                  to the Privacy Policy
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t-2 border-white ">
          <div className="flex sm:flex-col lg:flex-row sm:gap-4 lg:gap-0 text-center items-center justify-between text-white">
            <span>
              Copyright 2024
              <Link to={"/"} className="font-bold text-[#DA0000] ml-2">
                Matrix Solutions
              </Link>{" "}
              | All Rights Reserved. Privacy Policy
            </span>
            <span>
              Developed By:
              <Link
                to={"https://rebootmarketing.in/"}
                className="ml-2 font-bold text-[#DA0000]"
                target="_blank"
              >
                Reboot Marketing Pvt. Ltd.
              </Link>{" "}
            </span>
          </div>
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default FooterComponent;
