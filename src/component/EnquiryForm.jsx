import React, { useState } from "react";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",

    mobNo: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the WhatsApp message
    const whatsappMessage = `Name: ${formData.name}\nMobile: ${formData.mobNo}\nLocation: ${formData.location}\nEmail: ${formData.email}\nMessage: ${formData.message}`;

    // Encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Replace with your actual WhatsApp number, including country code, without "+" or "00"
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const whatsappUrl = isDesktop
      ? `https://web.whatsapp.com/send?phone=919476383750&text=${encodedMessage}`
      : `https://api.whatsapp.com/send?phone=919476383750&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col justify-center items-center bg-[#DA0000] rounded-lg p-6 gap-4"
    >
      <div className="flex lg:flex-row sm:flex-col w-full gap-4">
        <span className="flex w-full flex-col gap-2">
          <span className="text-lg font-semibold text-white">Name</span>
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
          <span className="text-lg font-semibold text-white">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your email"
            className=" sm:p-3 md:p-2 h-[3.5rem] bg-white rounded-xl sm:text-lg md:text-xl "
          />
        </span>
      </div>
      <div className="flex lg:flex-row sm:flex-col w-full gap-4">
        <span className="flex w-full flex-col gap-2">
          <span className="text-lg font-semibold text-white">Mob No.</span>
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
          <span className="text-lg font-semibold text-white">Location</span>
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
          Message &#40; Optional &#41;
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
  );
};

export default EnquiryForm;
