import React from "react";
import PcComponent from "./PcComponent";
import PcPeripheral from "./PcPeripheral";
import PreBuildPC from "./PreBuildPC";
import MsStore from "./MsStore";

const OurProductOfMatrixSolution = () => {
  return (
    <div className="flex flex-col gap-8 xl:p-16 lg:p-8 sm:p-4">
      <div className="text-4xl text-center font-semibold text-[#3A4666]">
        Products of <span className="text-[#2D68DB]"> Matrix Solutions</span>
      </div>
      <div className="flex flex-col gap-8">
        <PcComponent />
        <PcPeripheral />
        <PreBuildPC />
        <MsStore />
      </div>
    </div>
  );
};

export default OurProductOfMatrixSolution;
