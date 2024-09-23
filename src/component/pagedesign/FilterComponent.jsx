import React from "react";
import { VscCircleFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";

const FilterComponent = ({ filters }) => {
  return (
    <div className="flex flex-col rounded-lg">
      <div className="h-[3rem] w-full text-lg text-white font-semibold rounded-lg bg-[#E20000] flex justify-center items-center">
        Filter
      </div>
      <div className="border-x-2 border-b-2 rounded-lg ">
        {filters.map((filter, index) => (
          <Link
            to={filter.link}
            key={index}
            className="p-3 flex gap-2 text-lg  font-medium  items-center"
          >
            <span>
              <VscCircleFilled />
            </span>
            <span>{filter.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
