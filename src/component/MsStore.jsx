import React from "react";
import OurProductHomeDesign from "./OurProductHomeDesign";

const MsStore = () => {
  const content = {
    heading: "PC PERIPHERALS",
    link: "/products/MS STORE",
  };

  return (
    <div>
      <OurProductHomeDesign
        showheader={true}
        content={content}
        category="MS STORE"
      />
    </div>
  );
};

export default MsStore;
