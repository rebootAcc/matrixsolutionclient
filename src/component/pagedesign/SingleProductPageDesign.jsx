import React, { useState, useEffect, useRef } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import SubBanner from "./SubPageBanner";
import SinglePageImagesComponent from "./SinglePageImagesComponent";
import { MdCurrencyRupee } from "react-icons/md";
import { VscCircleFilled } from "react-icons/vsc";
import FooterComponent from "../FooterComponent";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EnquiryBoxComponent from "../EnquiryBoxComponent";
import SingleProductPageSimilerProductComponent from "./SingleProductPageSimilerProductComponent";
import { TiHome } from "react-icons/ti";
import { CgChevronDoubleDown, CgChevronDoubleUp } from "react-icons/cg";

const SingleProductPageDesign = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const specificationsRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/products/${productId}`
        );
        setProduct(response.data);

        // Fetch similar products from the same category
        const similarResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/products/all?categoryName=${
            response.data.categoryName
          }`
        );

        setSimilarProducts(similarResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, [productId]);
  const specifications = product?.specifications || [];

  const openModal = (componentName) => {
    setSelectedComponent(componentName);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const information = [
    {
      img: "/images/freeshiping.svg",
      name: "Free Shipping",
      details: "On all orders in India",
    },
    {
      img: "/images/easyreplacement.svg",
      name: "Easy Replacement",
      details: "Within 3 day",
    },
    {
      img: "/images/securedshoping.svg",
      name: "Secured Shopping",
      details: "Shop with confidence",
    },
    {
      img: "/images/nohiddencharge.svg",
      name: "No Hidden Charges",
      details: "No Convenience Fee",
    },
    {
      img: "/images/brandedproducts.svg",
      name: "Branded Products",
      details: "Assured Warranty",
    },
    {
      img: "/images/multiplepaymentmethod.svg",
      name: "Multiple Payment Methods",
      details: "Choose available options",
    },
  ];

  if (!product) {
    return (
      <div class="loader">
        <div class="justify-content-center jimu-primary-loading"></div>
      </div>
    );
  }

  const formatSubcategoryLink = (name) => {
    // Encode the subcategory name properly
    return encodeForUrl(name);
  };

  const encodeForUrl = (str) => {
    return encodeURIComponent(str)
      .replace(/%2F/g, "-slash-") // Replace encoded "/" with "-slash-"
      .replace(/%40/g, "-at-") // Replace encoded "@" with "-at-"
      .replace(/%26/g, "-and-") // Replace encoded "&" with "-and-"
      .replace(/%5C/g, "-backslash-") // Replace encoded "\" with "-backslash-"
      .replace(/%25/g, "-percent-"); // Replace encoded "%" with "-percent-"
  };
  const handleShowLess = (event) => {
    event.preventDefault(); // Prevent default action
    setIsExpanded(false); // Collapse the specifications
    // Scroll to the specifications section
    if (specificationsRef.current) {
      specificationsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderDescription = (description) => {
    // Decode the HTML entities
    return description
      .replace(/\\u003C/g, "<") // Replace encoded "<"
      .replace(/\\u003E/g, ">") // Replace encoded ">"
      .replace(/\\u0026/g, "&") // Replace encoded "&"
      .replace(/\\n/g, "") // Remove any newline characters
      .replace(/\\u002F/g, "/"); // Replace encoded "/"
  };

  return (
    <MainPageTemplate>
      <div className="w-full lg:h-[3.5rem] bg-[#EDEDED] flex-wrap lg:text-base xl:text-lg sm:text-sm px-6 flex justify-center items-center gap-2">
        <TiHome />
        <Link to={`/products/${product.categoryName}`}>
          {product.categoryName}
        </Link>
        {product.subCategoryName && (
          <>
            {" / "}
            <Link
              to={`/products/${formatSubcategoryLink(
                product.categoryName
              )}/${formatSubcategoryLink(product.subCategoryName)}`}
            >
              {product.subCategoryName}
            </Link>
          </>
        )}
        {product.subSubCategoryName && (
          <>
            {" / "}
            <Link
              to={`/products/${formatSubcategoryLink(
                product.categoryName
              )}/${formatSubcategoryLink(
                product.subCategoryName
              )}/${formatSubcategoryLink(product.subSubCategoryName)}`}
            >
              {product.subSubCategoryName}
            </Link>
          </>
        )}
        {" / "} <div className="text-[#888]">{product.title}</div>
      </div>

      <div className="flex flex-col gap-6 font-roboto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 bg-[#F5F5F5] xl:p-16 lg:p-8 sm:p-4 ">
          <div>
            <SinglePageImagesComponent images={product.images} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-semibold productpage-product-title">
                  {product.title}
                </div>
                <div className="lg:w-[30%] xl:w-[20%] md:w-[40%] sm:w-[50%] h-[5px] bg-[#E20000]"></div>
              </div>
              <div className="flex flex-row items-center gap-5">
                <div className="w-fit flex justify-center items-center p-2 h-[2rem] rounded-sm bg-[#EBEBEB] text-sm font-normal">
                  {product.categoryName}
                </div>
                <div className="w-fit flex justify-center items-center p-2 h-[2rem] rounded-sm bg-[#EBEBEB] text-sm font-normal">
                  <img src={product.brandimage} alt="" className="h-[1.6rem]" />
                </div>

                <div className="w-fit flex justify-center items-center p-2 h-[2rem] rounded-sm bg-[#EBEBEB] text-sm font-medium">
                  {product.brand}
                </div>
              </div>
              <div className="flex flex-col gap-4 border-b border-[#D6D6D6] pb-6">
                <div className="flex text-2xl text-[#777777] text-semibold items-center gap-1">
                  <span className="text-xl">MRP</span> <s>{product.price}</s>
                </div>
                <div className="flex items-center gap-5">
                  <span className="flex text-2xl text-[#E20000] text-semibold items-center">
                    <span>
                      <MdCurrencyRupee />
                    </span>
                    <span>{product.offerPrice} inc GST</span>
                  </span>
                  <span className="w-fit px-3 h-[1.5rem] flex justify-center items-center rounded-full bg-[#00D160] text-sm font-semibold text-white">
                    {product.discount}% OFF
                  </span>
                </div>
                <div className="flex gap-4 items-center text-[#00000099]">
                  {!product.active && (
                    <div className="text-red-600 font-semibold">
                      Product Unavailable
                    </div>
                  )}

                  {(product.inStockAvailable || product.soldOutStock) && (
                    <div className="flex gap-4 items-center text-[#00000099]">
                      {/* If inStockAvailable > 0, show stock */}
                      {product.inStockAvailable > 0 && (
                        <div className="w-fit flex justify-center items-center p-2 h-[2rem] rounded-sm bg-[#EBEBEB] text-sm font-semibold">
                          In Stock {product.inStockAvailable}
                        </div>
                      )}

                      {/* If soldOutStock > 0, show sold out */}
                      {product.soldOutStock > 0 && (
                        <div className="w-fit flex justify-center items-center p-2 h-[2rem] rounded-sm bg-[#EBEBEB] text-sm font-semibold">
                          Sold Out {product.soldOutStock}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                {information.map((item, index) => (
                  <div className="flex items-center gap-2" key={index}>
                    <div>
                      <img src={item.img} alt="" className="h-[3rem]" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-lg text-[#444444] font-semibold">
                        {item.name}
                      </div>
                      <div className="text-[#888888]">{item.details}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-row items-center gap-6">
                <button
                  onClick={() => openModal("EnquiryBoxComponent")}
                  className={`w-[8rem] h-[2.4rem] flex rounded-md justify-center items-center text-sm font-semibold text-white ${
                    product.active
                      ? "bg-[#E20000]"
                      : "bg-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!product.active} // Disable the button when product is deactivated
                >
                  Add To Cart
                </button>
                <button
                  onClick={() => openModal("EnquiryBoxComponent")}
                  className={`w-[8rem] h-[2.4rem] flex rounded-md justify-center items-center text-sm font-semibold text-white ${
                    product.active
                      ? "bg-[#3A4666]"
                      : "bg-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!product.active} // Disable the button when product is deactivated
                >
                  Trade Inquiry
                </button>
                <button
                  onClick={() => openModal("EnquiryBoxComponent")}
                  className={`w-[8rem] h-[2.4rem] flex rounded-md justify-center items-center text-sm font-semibold text-white ${
                    product.active
                      ? "bg-[#2D68DB]"
                      : "bg-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!product.active} // Disable the button when product is deactivated
                >
                  Enquiry Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 xl:px-16 lg:px-8 sm:px-4 ">
          <div className="border-b-2 flex flex-row gap-4">
            <div className="h-[3.5rem] rounded-t-lg flex justify-center items-center sm:w-[40%] lg:w-[25%] xlg:w-[15%] bg-[#E4E4E4] text-xl text-[#3A4666] font-bold">
              Descriptions
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="xlg:text-4xl lg:text-3xl sm:text-2xl font-semibold text-[#3A4666]">
              {product.fullTitleDescription}
            </div>
            <div className="flex flex-col gap-8">
              <div
                dangerouslySetInnerHTML={{
                  __html: product.fullDescription
                    .replace(/\\u003C/g, "<")
                    .replace(/\\u003E/g, ">")
                    .replace(/\\n/g, ""),
                }}
              />
            </div>
            {specifications.length > 0 && (
              <div className="flex flex-col">
                <div className="h-[3.5rem] items-center flex px-4 w-full text-[#3A4666] text-2xl font-semibold bg-[#F4F4F4] border border-[#CACACA]">
                  Specification
                </div>
                <div
                  ref={specificationsRef}
                  className={`flex flex-col border border-[#cacaca] ${
                    isExpanded ? "" : "max-h-[200px]"
                  } overflow-hidden`}
                >
                  {specifications.map((item, index) => (
                    <div
                      key={index}
                      className={`flex flex-row border-b border-[#CACACA] ${
                        index % 2 === 0 ? "bg-transparent" : "bg-[#F4F4F4]"
                      } `}
                    >
                      <div className="w-[30%] p-4  border-r border-[#CACACA]">
                        {item.name}
                      </div>
                      <div className="w-[70%] p-4">
                        {item.details.map((detail, detailIndex) => (
                          <div key={detailIndex}>{detail}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {!isExpanded && (
                  <div className="w-full flex justify-center items-center">
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="text-[#3A4666] rounded-sm hover:bg-[#3A4666] hover:text-[#E4E4E4] flex gap-2 items-center mt-2 px-4 h-[2rem] w-fit text-sm bg-[#E4E4E4]"
                    >
                      Show More <CgChevronDoubleDown className="text-lg" />
                    </button>
                  </div>
                )}
                {isExpanded && (
                  <div className="w-full flex justify-center items-center">
                    <button
                      onClick={handleShowLess}
                      className="text-[#E4E4E4] rounded-sm hover:bg-[#E4E4E4] hover:text-[#3A4666] flex gap-2 items-center mt-2 px-4 h-[2rem] w-fit text-sm bg-[#3A4666]"
                    >
                      Show Less <CgChevronDoubleUp />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="xl:p-16 lg:p-8 sm:p-4 ">
          <SingleProductPageSimilerProductComponent
            similarProduct={{
              heading: "Similar Products",
              products: similarProducts,
            }}
          />
        </div>
      </div>
      {modalOpen && (
        <div className="fixed top-0 z-[100] left-0 w-full h-full flex items-center justify-center  bg-black bg-opacity-80">
          <div className="w-full relative lg:top-[0] xl:top-[0] sm:h-[90vh] overflow-y-scroll lg:h-[95vh] justify-center items-center flex flex-col rounded-lg">
            <div className="sm:w-[95%] relative md:w-[60%] lg:w-[55%] xlg:w-[45%] xl:w-[35%]">
              <button
                className="bg-[#2b1554] text-white sm:w-[4rem] lg:w-[6rem] absolute sm:top-5 lg:top-12 xl:top-5 right-[1rem]  lg:h-10  sm:h-10 flex items-center justify-center rounded-lg z-[100] opacity-100 hover:bg-white hover:text-[#2E3192] border-2 border-[#2D68DB]"
                onClick={closeModal}
              >
                Close
              </button>
              {selectedComponent === "EnquiryBoxComponent" && (
                <EnquiryBoxComponent product={product} close={closeModal} />
              )}
            </div>
          </div>
        </div>
      )}
      <FooterComponent />
    </MainPageTemplate>
  );
};

export default SingleProductPageDesign;
