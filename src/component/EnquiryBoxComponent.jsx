import React, { useState } from "react";

const EnquiryBoxComponent = ({ product, close }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    location: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, mobileNumber, location, quantity, message } = formData;

    if (!name || !mobileNumber || !location || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    // Create the message for WhatsApp
    const whatsappMessage = `
      *Enquiry Details:*\n
      *Product Name:* ${product.title}\n
      *Product Brand:* ${product.brand}\n
      *Product Category:* ${product.categoryName}\n
      *Name:* ${name}\n
      *Mobile Number:* ${mobileNumber}\n
      *Location:* ${location}\n
      *Quantity:* ${quantity}\n
      *Message:* ${message}
    `;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const whatsappUrl = isDesktop
      ? `https://web.whatsapp.com/send?phone=919476383750&text=${encodedMessage}`
      : `https://api.whatsapp.com/send?phone=919476383750&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    setFormData({
      name: "",
      mobileNumber: "",
      location: "",
      quantity: "",
      message: "",
    });
    close();
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#da0000] rounded-lg sm:p-2 lg:p-8 gap-6">
      <div className="text-4xl sm:w-[80%] md:w-[50%]  text-center font-bold text-[white]">
        Submit Your Details
      </div>
      <div className="w-full px-5 text-white">
        <div className="text-2xl font-semibold">{product.title}</div>
        <div className="text-lg">{product.categoryName}</div>
        <div className="text-lg">{product.brand}</div>
      </div>
      <form
        className="w-full text-white flex flex-col gap-3 px-5"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold">Name</label>
            <input
              className="border-2 h-[3rem] p-2 text-gray-500 rounded-md"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold">Mobile Number</label>
            <input
              className="border-2 p-2 h-[3rem] text-gray-500 rounded-md"
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold">Location</label>
            <input
              className="border-2 p-2 h-[3rem] text-gray-500 rounded-md"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold">Quantity</label>
            <input
              className="border-2 p-2 h-[3rem] text-gray-500 rounded-md"
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-lg font-semibold">Message</label>
          <textarea
            className="border-2 min-h-[5rem] max-h-[5rem] text-gray-500  p-2 rounded-md"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-[40%] bg-[#2D68DB] text-white text-lg font-semibold p-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryBoxComponent;
