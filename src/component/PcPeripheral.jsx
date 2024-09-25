import React from "react";
import OurProductHomeDesign from "./OurProductHomeDesign";

const PcPeripheral = () => {
  const content = {
    heading: "PC PERIPHERALS",
    link: "/products/PC PERIPHERALS",
  };

  return (
    <div>
      <OurProductHomeDesign
        showheader={true}
        content={content}
        category="PC PERIPHERALS"
      />
    </div>
  );
};

export default PcPeripheral;
