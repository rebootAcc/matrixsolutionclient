import React, { useState } from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import { ImWhatsapp } from "react-icons/im";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { Link, useNavigate } from "react-router-dom";

import FooterComponent from "../component/FooterComponent";
const ContactUs = () => {
  const getNewBadgeColor = (index) => {
    switch (index % 3) {
      case 0:
        return "bg-[#FFB800A6]";
      case 1:
        return "bg-[#FFB800A6]";
      case 2:
        return "bg-[#FFB800A6]";
      default:
        return "bg-green-600";
    }
  };
  const contactus = [
    {
      icon: <ImWhatsapp />,
      heading: "Discuss now",
      details: "9476383750",
      link: "https://api.whatsapp.com/send?phone=919476383750",
    },
    {
      icon: <BiSolidPhoneCall />,
      heading: "Call Us",
      details: "9476383750",
      link: "tel:9476383750",
    },
    {
      icon: <MdEmail />,
      heading: "Email Us",
      details: "contact@mscliq.com",
      link: "mailto:contact@mscliq.com",
    },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",

    mobNo: "",
    location: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, mobNo, location } = formData;

    // Check if all required fields are filled
    if (!name || !mobNo || !location) {
      alert("Please fill in all required fields.");
      return;
    }

    emailjs
      .sendForm(
        "service_cueqm93",
        "template_uh8i1th",
        e.target,
        "O7VIy8tYdVThaMh67"
      )
      .then(
        () => {
          alert("submit succesfully");
        },
        (error) => {
          alert(error.text);
        }
      );

    // Clear the form data after submission
    setFormData({
      name: "",
      email: "",

      mobNo: "",
      location: "",
      message: "",
    });
  };
  return (
    <MainPageTemplate>
      <div className="flex flex-col gap-8 xl:p-16 lg:p-8 sm:p-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactus.map((contact, index) => (
            <Link
              to={contact.link}
              key={index}
              className={`flex h-[8rem]   gap-4 rounded-xl boxsh p-4 items-center justify-center ${
                index % 2 === 0 ? "bg-[#DA0000]" : "bg-[#DA0000]"
              }`}
            >
              <span
                className={`h-[4rem] w-[4rem]  text-3xl  flex justify-center items-center rounded-full text-white shadow-lg   ${getNewBadgeColor(
                  index
                )} `}
              >
                {contact.icon}
              </span>
              <div
                className={`flex flex-col  ${
                  index % 2 === 0 ? "text-white" : "text-white"
                }`}
              >
                <span className="text-2xl  font-semibold">
                  {contact.heading}
                </span>
                <span className="text-xl  font-semibold">
                  {contact.details}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex lg:flex-row sm:flex-col items-center justify-center gap-4">
          <div className="lg:w-[50%] sm:w-full flex flex-col gap-4  p-6">
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-semibold">Get in touch today</span>
            </div>
            <div className="">
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col justify-center items-center bg-[#DA0000] rounded-lg p-6 gap-4"
              >
                <div className="flex lg:flex-row sm:flex-col w-full gap-4">
                  <span className="flex w-full flex-col gap-2">
                    <span className="text-lg font-semibold text-white">
                      Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="your name"
                      className=" sm:p-3 md:p-2 h-[3.5rem] bg-white rounded-xl sm:text-lg md:text-xl "
                    />
                  </span>{" "}
                  <span className="flex  w-full flex-col gap-2">
                    <span className="text-lg font-semibold text-white">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your name"
                      className=" sm:p-3 md:p-2 h-[3.5rem] bg-white rounded-xl sm:text-lg md:text-xl "
                    />
                  </span>
                </div>
                <div className="flex lg:flex-row sm:flex-col w-full gap-4">
                  <span className="flex w-full flex-col gap-2">
                    <span className="text-lg font-semibold text-white">
                      Mob No.
                    </span>
                    <input
                      type="tel"
                      name="mobNo"
                      value={formData.mobNo}
                      onChange={handleChange}
                      placeholder="your mobile number"
                      className="sm:w-full sm:p-3 h-[3.5rem] md:p-2 bg-white rounded-xl sm:text-lg md:text-xl "
                    />
                  </span>{" "}
                  <span className="flex w-full flex-col gap-2">
                    <span className="text-lg font-semibold text-white">
                      Location
                    </span>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="your location"
                      className="sm:w-full sm:p-3 h-[3.5rem] md:p-2 bg-white rounded-xl sm:text-lg md:text-xl "
                    />
                  </span>
                </div>

                <span className="flex w-full flex-col gap-2">
                  <span className="text-lg font-semibold text-white">
                    Message &#40;Optional&#41;
                  </span>
                  <textarea
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="your message"
                    className="sm:w-full sm:p-3 max-h-[6rem] min-h-[6rem] md:p-2 bg-white rounded-xl sm:text-lg md:text-xl "
                  />
                </span>

                <button
                  type="submit"
                  className="h-[3rem] sm:w-[70%] md:w-[60%] lg:w-[50%] rounded-lg bg-white border-2 border-[#462A7A] hover:bg-[#DA0000] hover:text-white flex justify-center items-center text-[#DA0000] sm:text-xl lg:text-2xl font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="lg:w-[50%] sm:w-full flex justify-center items-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14255.283272584165!2d88.4303581!3d26.7181707!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441969c71eea7%3A0xd4fdc1703272242e!2sMatrix%20Solutions!5e0!3m2!1sen!2sin!4v1720774135206!5m2!1sen!2sin"
              className="w-full sm:h-[15rem] md:h-[20rem] lg:h-[30rem]"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <FooterComponent />
    </MainPageTemplate>
  );
};

export default ContactUs;
