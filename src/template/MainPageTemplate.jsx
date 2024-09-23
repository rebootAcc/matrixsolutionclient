import React, { useEffect } from "react";
import Header from "../component/Header";
import TopHeader from "../component/TopHeader";

const MainPageTemplate = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="flex  w-full h-full flex-col font-roboto overflow-x-hidden ">
        <div className="flex flex-col">
          <div>
            <TopHeader />
          </div>
          <div>
            <Header />
          </div>
        </div>

        <div className=" sm:mt-[3.8rem] md:mt-[7rem] lg:mt-[5rem] xlg:mt-[6rem]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainPageTemplate;
