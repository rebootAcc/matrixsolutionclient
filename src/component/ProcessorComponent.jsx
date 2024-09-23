import React from "react";
import OurProductHomeDesign from "./OurProductHomeDesign";

const ProcessorComponent = () => {
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

export default ProcessorComponent;
