import React from "react";
import OurProductHomeDesign from "./OurProductHomeDesign";

const MsStore = () => {
  const content = {
    heading: "MS STORE",
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
