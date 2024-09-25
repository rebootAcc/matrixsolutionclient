import React from "react";
import OurProductHomeDesign from "./OurProductHomeDesign";

const PreBuildPC = () => {
  const content = {
    heading: "PRE-BUILD PC",
    link: "/products/PRE-BUILD PC",
  };
  return (
    <div>
      <OurProductHomeDesign
        showheader={true}
        content={content}
        category="PRE-BUILD PC"
      />
    </div>
  );
};

export default PreBuildPC;
