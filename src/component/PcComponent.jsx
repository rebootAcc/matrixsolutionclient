import React from "react";
import OurProductHomeDesign from "./OurProductHomeDesign";

const PcComponent = () => {
  const content = {
    heading: "PC COMPONENTS",
    link: "/products/PC COMPONENTS",
  };
  return (
    <div>
      <OurProductHomeDesign
        showheader={true}
        content={content}
        category="PC COMPONENTS"
      />
    </div>
  );
};

export default PcComponent;
