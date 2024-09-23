import React from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import { Link } from "react-router-dom";
import FooterComponent from "../component/FooterComponent";

const AboutUs = () => {
  return (
    <MainPageTemplate>
      <div className="xl:p-16 lg:p-8 sm:p-4">
        <div className="w-full flex md:flex-row sm:flex-col gap-4">
          <div className="md:w-[60%] sm:w-full flex flex-col gap-8">
            <span className="xlg:text-6xl sm:text-4xl font-semibold">
              About <span className="text-[#DA0000]">Matrix Solutions</span>
            </span>
            <span className="flex flex-col gap-2 sm:text-lg md:text-sm lg:text-xl ">
              <div>
                Matrix Solution has evolved significantly since its inception,
                transitioning from a key player in the IT sector to a
                comprehensive solution provider. Specializing in customized and
                integrated IT solutions, Matrix Solution now offers turnkey
                solutions in network integration and IT-enabled services. Our
                extensive range of services addresses every aspect of your
                company's integrated information needs, regardless of your
                platform or the complexity of your technological requirements.
                With our expertise, we drive both business and technology
                strategies forward, ensuring seamless integration and efficient
                operations.
              </div>
              <div>
                As a web portal of Vedant Computers Sales Private Limited,
                Matrix Solution benefits from the robust foundation of a young
                and vibrant company committed to delivering high-quality branded
                IT products online. Since its establishment in 2003, Vedant has
                been a leading IT distribution company in West Bengal, known for
                providing a comprehensive range of PC components through its
                extensive sales channels. Our dedication to superior quality,
                well-known brand products, exceptional support, and excellent
                after-sales service is the cornerstone of our business
                philosophy.
              </div>
              <div>
                Matrix Solution is proud to be an authorized partner for several
                global leading brands, including Canon, HP Commercial, and Acer.
                Our partnerships enable us to offer our customers top-tier
                products and services, ensuring that their IT infrastructure is
                both reliable and cutting-edge. Whether you are looking for
                network integration, IT-enabled services, or high-quality IT
                products, Matrix Solution has the expertise and resources to
                meet your needs.
              </div>
              <div>
                Our mission is to provide our customers with superior quality
                products from renowned brands, backed by unparalleled support
                and after-sales service. At Matrix Solution, we strive to exceed
                customer expectations, delivering solutions that drive business
                success and technological advancement. Join us on our journey as
                we continue to innovate and lead the way in providing
                integrated IT solutions.
              </div>
            </span>
            <div className="flex flex-row xl:gap-8 sm:gap-2 sm:text-sm md:text-lg xlg:text-xl font-semibold text-white items-center">
              <Link
                to={"/contact-us"}
                className="relative h-[3rem] lg:w-[40%] sm:w-full p-1 text-[white] text-base
            font-bold nded-full overflow-hidden rounded-lg bg-[#DA0000] flex
            justify-center items-center gap-2 transition-all duration-400
            ease-in-out shadow-md hover:scale-105 hover:text-white
            active:scale-90 before:absolute before:top-0 before:-left-full
            before:w-full border-2 border-[#462A7A] before:h-full
            before:bg-gradient-to-r before:from-[#DA0000] before:to-[white]
            before:transition-all before:duration-500 before:ease-in-out
            before:z-[-1] hover:before:left-0"
              >
                Contact Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </MainPageTemplate>
  );
};

export default AboutUs;
