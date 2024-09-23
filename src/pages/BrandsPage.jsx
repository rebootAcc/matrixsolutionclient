import React, { useEffect, useState } from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import axios from "axios";
import { Link } from "react-router-dom";
import FooterComponent from "../component/FooterComponent";
import SubBanner from "../component/pagedesign/SubPageBanner";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/products/all`
        );

        // Map over the products and extract unique brand and brandimage pairs
        const uniqueBrands = Array.from(
          new Set(
            response.data.map((product) =>
              JSON.stringify({
                brand: product.brand,
                brandimage: product.brandimage,
              })
            )
          )
        ).map((brand) => JSON.parse(brand));

        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const formatSubcategoryLink = (name) => {
    // Replace slashes with spaces and encode the URL
    return encodeURIComponent(name.replace(/\//g, " "));
  };

  return (
    <MainPageTemplate>
      <SubBanner
        bannerimg={"/images/subpagebanner.png"}
        heading={" Our Brands"}
      />
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 xlg:grid-cols-6 gap-6 xl:p-16 lg:p-8 sm:p-4">
        {brands.map((item, index) => (
          <Link
            to={`/products/brand/${formatSubcategoryLink(item.brand)}`}
            className="flex flex-col justify-center items-center gap-2 boxsh rounded-lg p-4  "
            key={index}
          >
            <span>
              <img
                src={item.brandimage}
                alt={item.brand}
                className="w-full h-[7rem]"
              />
            </span>
            <span className="text-2xl font-semibold">{item.brand}</span>
          </Link>
        ))}
      </div>
      <FooterComponent />
    </MainPageTemplate>
  );
};

export default BrandsPage;
