import React from "react";
import ProductPageDesignComponent from "../component/pagedesign/ProductPageDesignComponent";

const GrapicsCard = () => {
  const content = {
    heading: "Grapics Card",

    filters: [
      { name: "AMD", link: "" },
      { name: "Apple", link: "" },
      { name: "HP", link: "" },
      { name: "LG", link: "" },
      { name: "Samsung", link: "" },
      { name: "Sony", link: "" },
      { name: "Acer", link: "" },
    ],
    products: [
      {
        imgsrc: "/images/grapiccard.png",
        name: "INTEL ARC A750 8GB GDDR6",
        details:
          "Xe-cores: 28 | Render Slices: 7 | Ray Tracing Units: 28 | Intel® Xe Matrix Extensions (Intel® XMX) | Engines: 448 | Xe Vector Engines: 448 |Graphics Clock:  2050 MHz",
      },
      {
        imgsrc: "/images/grapiccard.png",
        name: "INTEL ARC A750 8GB GDDR6",
        details:
          "Xe-cores: 28 | Render Slices: 7 | Ray Tracing Units: 28 | Intel® Xe Matrix Extensions (Intel® XMX) | Engines: 448 | Xe Vector Engines: 448 |Graphics Clock:  2050 MHz",
      },
      {
        imgsrc: "/images/grapiccard.png",
        name: "INTEL ARC A750 8GB GDDR6",
        details:
          "Xe-cores: 28 | Render Slices: 7 | Ray Tracing Units: 28 | Intel® Xe Matrix Extensions (Intel® XMX) | Engines: 448 | Xe Vector Engines: 448 |Graphics Clock:  2050 MHz",
      },
      {
        imgsrc: "/images/grapiccard.png",
        name: "INTEL ARC A750 8GB GDDR6",
        details:
          "Xe-cores: 28 | Render Slices: 7 | Ray Tracing Units: 28 | Intel® Xe Matrix Extensions (Intel® XMX) | Engines: 448 | Xe Vector Engines: 448 |Graphics Clock:  2050 MHz",
      },
      {
        imgsrc: "/images/grapiccard.png",
        name: "INTEL ARC A750 8GB GDDR6",
        details:
          "Xe-cores: 28 | Render Slices: 7 | Ray Tracing Units: 28 | Intel® Xe Matrix Extensions (Intel® XMX) | Engines: 448 | Xe Vector Engines: 448 |Graphics Clock:  2050 MHz",
      },
      {
        imgsrc: "/images/grapiccard.png",
        name: "INTEL ARC A750 8GB GDDR6",
        details:
          "Xe-cores: 28 | Render Slices: 7 | Ray Tracing Units: 28 | Intel® Xe Matrix Extensions (Intel® XMX) | Engines: 448 | Xe Vector Engines: 448 |Graphics Clock:  2050 MHz",
      },
    ],
  };
  return (
    <div>
      <ProductPageDesignComponent content={content} />
    </div>
  );
};

export default GrapicsCard;
