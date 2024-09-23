import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainPageTemplate from "../../template/MainPageTemplate";
import SubBanner from "./SubPageBanner";
import ProductCategoryComponent from "./ProductCategoryComponent";
import FooterComponent from "../FooterComponent";
import { IoMdMenu } from "react-icons/io";
import axios from "axios";

const ProductPageDesignComponent = () => {
  const { category, subcategory, brand, subsubcategory } = useParams(); // Get the category from URL
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [noProductsFound, setNoProductsFound] = useState(false); // New state for no products found
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "";

      if (brand) {
        url = `${import.meta.env.VITE_BASE_URL}/api/products/brand/${brand}`;
      } else if (category && subcategory && subsubcategory) {
        url = `${
          import.meta.env.VITE_BASE_URL
        }/api/products/category/${category}/subcategory/${subcategory}/subsubcategory/${subsubcategory}`;
      } else if (category && subcategory) {
        url = `${
          import.meta.env.VITE_BASE_URL
        }/api/products/category/${category}/subcategory/${subcategory}`;
      } else if (category) {
        url = `${
          import.meta.env.VITE_BASE_URL
        }/api/products/category/${category}`;
      }
      console.log(subsubcategory);
      try {
        const response = await axios.get(url);
        if (response.data.length === 0) {
          setNoProductsFound(true);
        } else {
          setNoProductsFound(false);
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setNoProductsFound(true);
      }
    };
    fetchProducts();
  }, [category, subcategory, subsubcategory, brand]);

  const Productdetails = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const productcategory = [
    {
      name: "Graphics Card",
      link: "/products/PC COMPONENTS/Graphics Cards",
    },
    { name: "Processor", link: "/products/PC COMPONENTS/Processor%20%20CPU" },
    {
      name: "Monitors",
      link: "/products/PC PERIPHERALS/Output Devices/Monitor",
    },
    { name: "Gaming Chair", link: "/products/PC PERIPHERALS/Gaming Chair" },
    {
      name: "Motherboard",
      link: "/products/PC COMPONENTS/Motherboard",
    },
    { name: "Memory", link: "/products/PC COMPONENTS/Memory%20%20RAM" },
    {
      name: "Power Supply Units",
      link: "/products/PC COMPONENTS/Power Supply Units",
    },
  ];

  return (
    <MainPageTemplate>
      <SubBanner
        bannerimg={"/images/subpagebanner.png"}
        heading={category || brand || subsubcategory}
      />
      <div className="xl:p-16 lg:p-8 sm:p-4 flex flex-row row gap-4">
        <div className="flex lg:hidden sm:hidden items-center">
          <button className="text-3xl hidden" onClick={toggleSidebar}>
            <IoMdMenu />
          </button>
        </div>
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:relative top-0 left-0 w-[80%] sm:overflow-scroll lg:overflow-hidden lg:w-[20%] h-full bg-white shadow-lg sm:z-[100] lg:z-0 lg:shadow-none flex flex-col gap-8 p-4 transition-transform duration-300 ease-in-out`}
        >
          {/* <div className="flex justify-end lg:hidden">
            <button className="text-3xl" onClick={toggleSidebar}>
              &times;
            </button>
          </div>
          <div className="flex flex-col">
            <ProductCategoryComponent productcategory={productcategory} />
          </div> */}
          <div>
            <img
              src="/images/grapicsrectangle3.jpg"
              alt=""
              className="rounded-lg"
            />
          </div>
          <div>
            <img
              src="/images/grapicsrectangle1.jpg"
              alt=""
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="lg:w-[80%] sm:w-full flex flex-col gap-6">
          {noProductsFound ? (
            <div className="text-center text-lg text-gray-500">
              No products found in this category or subcategory.
            </div>
          ) : (
            <>
              <div className="flex flex-row gap-4 py-2 border-b-2">
                <div className="flex lg:hidden items-center">
                  <button className="text-3xl" onClick={toggleSidebar}>
                    <IoMdMenu />
                  </button>
                </div>
                <div className="w-fit px-3 h-[2.5rem] flex justify-center sm:text-xs md:text-base items-center bg-[#E7EFFF] rounded-md text-[#2D68DB]">
                  New to Old
                </div>
                <div className="w-fit px-3 h-[2.5rem] flex justify-center items-center sm:text-xs md:text-base bg-[#FFEAEA] rounded-md text-[#E20000]">
                  High To Low
                </div>
                <div className="w-fit px-3 h-[2.5rem] flex justify-center items-center sm:text-xs md:text-base bg-[#E4E4E4] rounded-md text-[#444444]">
                  A To Z
                </div>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {products.map((product, index) => (
                  <div className="flex justify-center items-center" key={index}>
                    <div
                      className={`flex flex-col rounded-lg boxsh ${
                        !product.active ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex flex-col gap-4 p-4">
                        <span className="flex justify-center items-center">
                          <img
                            src={product.productthumbnailimage}
                            alt=""
                            className="h-[12rem] w-[15rem]"
                          />
                        </span>
                        <div className="flex flex-col justify-center items-center gap-1">
                          <span className="text-lg font-medium text-center text-[#2D68DB] product-title">
                            {product.title}
                          </span>
                          <span
                            className={`text-sm text-center  product-details ${
                              !product.active
                                ? "text-red-600"
                                : "text-[#777777]"
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: product.active
                                ? product.fullDescription
                                : "Currently unavailable",
                            }}
                          ></span>
                        </div>
                      </div>
                      <button
                        onClick={() => Productdetails(product.productId)}
                        className="lg:h-[4rem] md:h-[3.5rem] sm:h-[2.5rem] w-full bg-[#2D68DB] text-white rounded-b-lg flex justify-center items-center sm:text-base md:text-lg lg:text-xl font-semibold"
                      >
                        {product.active ? "View Details" : "Unavailable"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <FooterComponent />
    </MainPageTemplate>
  );
};

export default ProductPageDesignComponent;
