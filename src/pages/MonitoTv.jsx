import React from "react";
import ProductPageDesignComponent from "../component/pagedesign/ProductPageDesignComponent";

const MonitoTv = () => {
  const content = {
    heading: "Monitor & TV",

    filters: [
      { name: "AMD", link: "" },
      { name: "Apple", link: "" },
      { name: "HP", link: "" },
      { name: "LG", link: "" },
      { name: "Samsung", link: "" },
      { name: "Sony", link: "" },
      { name: "Acer", link: "" },
    ],
  };
  return (
    <div>
      <ProductPageDesignComponent content={content} />
    </div>
  );
};

export default MonitoTv;
