import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainPageTemplate from "../../template/MainPageTemplate";
import SubBanner from "./SubPageBanner";
import FooterComponent from "../FooterComponent";
import { IoMdMenu } from "react-icons/io";
import axios from "axios";
import LoadingAnimation from "../admindashboardcomponent/LoadingAnimation";
import FrontendLoadingANimation from "./FrontendLoadingANimation";

const ProductPageDesignComponent = () => {
  const { category, subcategory, brand, subsubcategory } = useParams(); // Get the category from URL
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [noProductsFound, setNoProductsFound] = useState(false); // New state for no products found
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [limit] = useState(15);
  const [loading, setLoading] = useState(false); // Loading state for lazy loading
  const [hasMore, setHasMore] = useState(true); // To track if more products are available
  const observerRef = useRef();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setProducts([]); // Clear the products when URL params change
    setNoProductsFound(false); // Reset no products found state
    setCurrentPage(1); // Reset pagination
    setHasMore(true); // Reset the "has more" state
    setLoading(true); // Show loading initially
  }, [category, subcategory, brand, subsubcategory]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: currentPage,
      limit: limit,
    });

    // Add filters based on URL params
    if (brand) {
      params.append("brand", brand);
    }
    if (category) {
      params.append("categoryName", category);
    }
    if (subcategory) {
      params.append("subCategoryName", subcategory);
    }
    if (subsubcategory) {
      params.append("subSubCategoryName", subsubcategory);
    }
    params.append("isdraft", "false");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/products/all?${params.toString()}`
      );

      const fetchedProducts = response.data.data;

      if (fetchedProducts.length === 0 && currentPage === 1) {
        setNoProductsFound(true); // No products available on the first page
        setHasMore(false); // Stop further requests
      } else if (fetchedProducts.length < limit) {
        setHasMore(false); // No more products available
      }

      setProducts((prevProducts) => {
        // Ensure no duplicate products are added
        const newProducts = fetchedProducts.filter(
          (newProduct) =>
            !prevProducts.some(
              (prevProduct) => prevProduct._id === newProduct._id
            )
        );
        return [...prevProducts, ...newProducts];
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setNoProductsFound(true);
      setLoading(false);
    }
  }, [category, subcategory, subsubcategory, brand, currentPage, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect(); // Disconnect previous observer
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1); // Load next set of products
        }
      });
      if (node) observerRef.current.observe(node); // Observe the last product element
    },
    [loading, hasMore]
  );

  const Productdetails = (productId) => {
    navigate(`/product-details/${productId}`);
  };

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
                  <div
                    className="flex justify-center items-center h-full w-full"
                    key={index}
                    ref={
                      index === products.length - 1
                        ? lastProductElementRef
                        : null
                    } // Set the ref on the last product
                  >
                    <div
                      className={`flex flex-col rounded-lg boxsh h-full w-full  ${
                        !product.active ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex flex-col gap-4 p-4">
                        <span className="flex justify-center items-center">
                          <img
                            src={product.productthumbnailimage}
                            alt="Product Thumbnail"
                            className="h-[12rem] w-[15rem]"
                          />
                        </span>
                        <div className="flex flex-col justify-center items-center gap-1">
                          <span className="text-lg font-medium text-center text-[#2D68DB] product-title">
                            {product.title}
                          </span>
                          <span
                            className={`text-sm text-center product-details ${
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
                      <div className="h-full flex justify-end items-end">
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
              {loading && (
                <div className="flex justify-center items-center py-10">
                  <FrontendLoadingANimation />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <FooterComponent />
    </MainPageTemplate>
  );
};

export default ProductPageDesignComponent;
