import React from "react";
import { VscCircleFilled } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

const ProductCategoryComponent = ({ productcategory }) => {
  const location = useLocation();

  // Function to extract the category from the pathname
  const getCategoryFromPathname = (pathname) => {
    const parts = pathname.split("/");
    return parts[2]; // Adjust the index based on your routing structure
  };

  return (
    <div className="flex flex-col rounded-lg">
      <div className="h-[3rem] w-full text-lg text-white font-semibold rounded-lg bg-[#E20000] flex justify-center items-center">
        Products Category
      </div>
      <div className="border-x-2 border-b-2 rounded-lg">
        {productcategory.map((product, index) => (
          <Link
            to={product.link}
            key={index}
            className={`p-3 flex gap-2 text-lg font-medium items-center  ${
              decodeURIComponent(location.pathname).includes(
                decodeURIComponent(product.link)
              )
                ? "bg-blue-200"
                : ""
            }`}
          >
            <span>
              <VscCircleFilled />
            </span>
            <span>{product.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryComponent;
