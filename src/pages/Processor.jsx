import React from "react";
import ProductPageDesignComponent from "../component/pagedesign/ProductPageDesignComponent";

const Processor = () => {
  const content = {
    heading: "Processor",

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
        imgsrc: "/images/processor.png",
        name: "AMD Ryzen 5G",
        details:
          "AMD Ryzen 5 8500G Processor with Radeon 740M Graphics (6 Cores, 12 Threads, Max. Boost Clock Up To 5.0GHz, AM5 Socket and 22MB Cache)",
      },
      {
        imgsrc: "/images/processor.png",
        name: "AMD Ryzen 5G",
        details:
          "AMD Ryzen 5 8500G Processor with Radeon 740M Graphics (6 Cores, 12 Threads, Max. Boost Clock Up To 5.0GHz, AM5 Socket and 22MB Cache)",
      },
      {
        imgsrc: "/images/processor.png",
        name: "AMD Ryzen 5G",
        details:
          "AMD Ryzen 5 8500G Processor with Radeon 740M Graphics (6 Cores, 12 Threads, Max. Boost Clock Up To 5.0GHz, AM5 Socket and 22MB Cache)",
      },
      {
        imgsrc: "/images/processor.png",
        name: "AMD Ryzen 5G",
        details:
          "AMD Ryzen 5 8500G Processor with Radeon 740M Graphics (6 Cores, 12 Threads, Max. Boost Clock Up To 5.0GHz, AM5 Socket and 22MB Cache)",
      },
      {
        imgsrc: "/images/processor.png",
        name: "AMD Ryzen 5G",
        details:
          "AMD Ryzen 5 8500G Processor with Radeon 740M Graphics (6 Cores, 12 Threads, Max. Boost Clock Up To 5.0GHz, AM5 Socket and 22MB Cache)",
      },
      {
        imgsrc: "/images/processor.png",
        name: "AMD Ryzen 5G",
        details:
          "AMD Ryzen 5 8500G Processor with Radeon 740M Graphics (6 Cores, 12 Threads, Max. Boost Clock Up To 5.0GHz, AM5 Socket and 22MB Cache)",
      },
      {
        imgsrc: "/images/processor.png",
        name: "AMD Ryzen 5G",
        details:
          "AMD Ryzen 5 8500G Processor with Radeon 740M Graphics (6 Cores, 12 Threads, Max. Boost Clock Up To 5.0GHz, AM5 Socket and 22MB Cache)",
      },
      {
        imgsrc: "/images/processor.png",
        name: "AMD Ryzen 5G",
        details:
          "AMD Ryzen 5 8500G Processor with Radeon 740M Graphics (6 Cores, 12 Threads, Max. Boost Clock Up To 5.0GHz, AM5 Socket and 22MB Cache)",
      },
      {
        imgsrc: "/images/processor.png",
        name: "AMD Ryzen 5G",
        details:
          "AMD Ryzen 5 8500G Processor with Radeon 740M Graphics (6 Cores, 12 Threads, Max. Boost Clock Up To 5.0GHz, AM5 Socket and 22MB Cache)",
      },
    ],
  };
  return (
    <div>
      <ProductPageDesignComponent content={content} />
    </div>
  );
};

export default Processor;
