import React, { useState } from "react";
import { Link } from "react-router-dom";

const ShopByCategory = () => {
  const categories = [
    {
      imgsrc: "/images/monitor.jpg",
      name: "Monitor",
      link: "/products/PC PERIPHERALS/Output Devices/Monitor",
    },
    {
      imgsrc: "/images/graphiccards.jpg",
      name: "Grapics Card",
      link: "/products/PC COMPONENTS/Graphics Cards",
    },
    {
      imgsrc: "/images/laptop.png",
      name: "Laptop",
      link: "/products/MS STORE/Laptops",
    },
    {
      imgsrc: "/images/motherboard.jpg",
      name: "Mother Board",
      link: "/products/PC COMPONENTS/Motherboard",
    },
    {
      imgsrc: "/images/keyboardmouse.png",
      name: "Keybard & Mouse",
      link: "/products/PC PERIPHERALS/Input Devices/Keyboard%20%26%20Mouse%20Combo",
    },
    {
      imgsrc: "/images/printer.png",
      name: "Printer",
      link: "/products/PC%20PERIPHERALS/Output%20Devices/Printers",
    },
    {
      imgsrc: "/images/harddrive.png",
      name: "Hard Disk",
      link: "/products/PC%20COMPONENTS/Storage/Hard%20Disk%20Drive-slash-%20HDD",
    },
    {
      imgsrc: "/images/memoryram.jpg",
      name: "Memory & RAM",
      link: "/products/PC%20COMPONENTS/Memory-slash-%20RAM",
    },
    {
      imgsrc: "/images/gaming-accesories.jpg",
      name: "Gaming Accesories",
      link: "/products/PC%20PERIPHERALS/Gaming%20Chair",
    },
    {
      imgsrc: "/images/cpu.jpg",
      name: "CPU",
      link: "/products/PC%20COMPONENTS/Processor-slash-%20CPU",
    },
    {
      imgsrc: "/images/powersupply.jpg",
      name: "Power Supply",
      link: "/products/PC%20COMPONENTS/Power%20Supply%20Units",
    },
    {
      imgsrc: "/images/storage.jpg",
      name: "Sound System",
      link: "/products/PC%20COMPONENTS/Storage",
    },
  ];

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div className="text-4xl font-semibold text-[#DA0000]">
        <span className="text-[#2D68DB]">Shop</span> By Category
      </div>
      <div className="xl:p-16 lg:p-8 sm:p-4 ">
        <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {categories.map((category, index) => (
            <Link
              to={category.link}
              className=" hover:bg-blue-400/10 rounded-lg py-4   flex flex-col justify-center gap-4 items-center"
              key={index}
            >
              <img
                src={category.imgsrc}
                alt={category.name}
                className={` lg:w-[90%] `}
              />

              <div className="">
                <span className="xlg:text-base xl:text-lg lg:text-sm md:text-sm  text-[#2D68DB] items-center justify-center flex  sm:text-xs  text-center font-medium">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
