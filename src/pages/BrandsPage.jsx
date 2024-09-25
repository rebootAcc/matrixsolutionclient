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
          `${import.meta.env.VITE_BASE_URL}/api/brands/getbrand`
        );

        console.log(response.data);

        setBrands(response.data || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const formatSubcategoryLink = (name) => {
    if (!name) return "";
    return encodeURIComponent(name.replace(/\//g, " "));
  };

  return (
    <MainPageTemplate>
      <SubBanner
        bannerimg={"/images/subpagebanner.png"}
        heading={" Our Brands"}
      />
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 xlg:grid-cols-5 gap-6 xl:p-16 lg:p-8 sm:p-4">
        {brands.map((item, index) => (
          <Link
            to={`/products/brand/${formatSubcategoryLink(item.brandname)}`}
            className="flex flex-col justify-center items-center gap-5 boxsh rounded-lg p-4  "
            key={index}
          >
            <span>
              <img
                src={item.brandimage}
                alt={item.brandname}
                className="w-full h-[5rem]"
              />
            </span>
            <span className="text-2xl font-semibold">{item.brandname}</span>
          </Link>
        ))}
      </div>
      <FooterComponent />
    </MainPageTemplate>
  );
};

export default BrandsPage;
