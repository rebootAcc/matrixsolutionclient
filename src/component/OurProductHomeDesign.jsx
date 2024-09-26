import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const OurProductHomeDesign = ({
  content,
  showheader,
  category,
  subcategory,
}) => {
  const { heading } = content;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Construct query parameters
        const params = new URLSearchParams();
        if (category) params.append("categoryName", category);
        if (subcategory) params.append("subCategoryName", subcategory);
        params.append("limit", 8); // Limit the number of products to 8
        params.append("isdraft", "false");
        params.append("active", "true");

        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/products/all?${params.toString()}`
        );

        setProducts(response.data.data || []); // Assuming the products are in the `data` array
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  const Productdetails = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const categoryproductpage = (category, subcategory) => {
    if (subcategory) {
      navigate(`/products/${category}/${subcategory}`);
    } else {
      navigate(`/products/${category}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {showheader && (
        <div className="flex justify-between items-center border-b-2 border-[#2D68DB]">
          <span className="h-[4rem] sm:w-[60%] md:w-[40%] lg:w-[20%] flex justify-center items-center bg-[#2D68DB] text-xl font-semibold text-white rounded-t-xl">
            {heading}
          </span>
          <button
            onClick={() => categoryproductpage(category, subcategory)}
            className="text-[#3A4666] flex items-center sm:text-lg md:text-xl font-medium"
          >
            View All Product
            <span>
              <MdKeyboardDoubleArrowRight />
            </span>
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-4 lg:gap-8">
        {products.map((product, index) => (
          <div className="flex justify-center items-center w-full" key={index}>
            <div
              className={`flex flex-col rounded-lg boxsh w-full h-full ${
                !product.active ? "opacity-50" : ""
              }`}
            >
              <div className="flex flex-col gap-4 p-4">
                <span className="flex justify-center items-center">
                  <img
                    src={product.productthumbnailimage}
                    alt="Product Thumbnail"
                    className="lg:h-[12rem] sm:w-[12rem] sm:h-[8rem] lg:w-[15rem]"
                  />
                </span>
                <div className="flex flex-col justify-center items-center gap-1">
                  <span className="text-lg text-center font-medium text-[#2D68DB] product-title">
                    {product.title}
                  </span>
                  <span
                    className={`text-sm text-center product-details ${
                      !product.active ? "text-red-600" : "text-[#777777]"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: product.active
                        ? product.fullDescription
                        : "Currently unavailable",
                    }}
                  ></span>
                </div>
              </div>
              <div className="w-full flex justify-end items-end h-full">
                <button
                  onClick={() => Productdetails(product.productId)}
                  className="lg:h-[4rem] md:h-[3.5rem] sm:h-[2.5rem] w-full bg-[#2D68DB] text-white rounded-b-lg flex justify-center items-center sm:text-base md:text-lg lg:text-xl font-semibold"
                >
                  {product.active ? "View Details" : "Unavailable"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProductHomeDesign;
