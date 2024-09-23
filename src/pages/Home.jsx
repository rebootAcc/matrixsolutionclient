import React from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import MainBanner from "../component/MainBanner";
import OfferComponent from "../component/OfferComponent";
import HeroSectionComponent from "../component/HeroSectionComponent";
import ShopByCategory from "../component/ShopByCategory";
import OurProductOfMatrixSolution from "../component/OurProductOfMatrixSolution";
import BrandOfferComponent from "../component/BrandOfferComponent";
import TopBrandsComponent from "../component/TopBrandsComponent";
import AboutAndReviewComponent from "../component/AboutAndReviewComponent";
import FooterComponent from "../component/FooterComponent";

const Home = () => {
  return (
    <MainPageTemplate>
      <MainBanner />
      <OfferComponent />
      <HeroSectionComponent />
      <ShopByCategory />
      <OurProductOfMatrixSolution />
      <BrandOfferComponent />
      <TopBrandsComponent />
      <AboutAndReviewComponent />
      <FooterComponent />
    </MainPageTemplate>
  );
};

export default Home;
