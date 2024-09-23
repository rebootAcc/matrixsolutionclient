import React from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import FooterComponent from "../component/FooterComponent";

const BankDetails = () => {
  return (
    <MainPageTemplate>
      <div className="xl:p-16 lg:p-8 sm:p-4 flex flex-col items-center gap-5 sm:gap-8 font-roboto">
        <h1 className="text-3xl md:text-4xl font-bold text-[rgb(49,_56_70)] text-center uppercase relative after:h-1 after:bg-[rgb(231,40,77)] after:absolute after:w-[25%] after:top-full after:left-1/2 after:-translate-x-1/2 after:mt-5 font-poppins">
          <span>Bank Details</span>
        </h1>
        <div className="w-full xlg:max-w-7xl py-5 text-[rgba(56,_68,_79,_1)]">
          <div className="">
            <table className="text-sm border w-full border-[rgba(221,221,221,1)] mb-3">
              <tbody>
                <tr className="even:bg-white odd:bg-[rgba(250,250,250,1)]">
                  <td className="flex items-center flex-col py-2 px-3">
                    <p className="text-sm font-normal mb-3">
                      <span>A/C NAME : MATRIX SOLUTION</span>
                    </p>
                    <p className="text-sm font-normal mb-3">
                      <img
                        src="/images/sbi-logo.jpg"
                        alt="sbi"
                        className="w-36"
                      />
                    </p>
                    <p className="text-sm font-normal mb-3">
                      BANK NAME : State Bank Of India
                      <br />
                    </p>
                    <p className="text-sm font-normal mb-3">
                      BRANCH : SME BRANCH, SILIGURI
                    </p>
                    <p className="text-sm font-normal mb-3">
                      CA A/C NO. : 36854229806
                    </p>
                    <p className="text-sm font-normal mb-3">
                      IFSC CODE : SBIN0004126
                    </p>
                  </td>
                </tr>
                <tr className="even:bg-white odd:bg-[rgba(250,250,250,1)]">
                  <td className="flex items-center flex-col py-2 px-3">
                    <p className="text-sm font-normal mb-3">
                      A/C NAME : MATRIX SOLUTIONS
                    </p>
                    <p className="text-sm font-normal mb-3">
                      <img
                        src="/images/union-bank-of-india.svg"
                        alt="union"
                        className="w-36"
                      />
                      <br />
                    </p>
                    <p className="text-sm font-normal mb-3">
                      BANK NAME : Union Bank of India
                    </p>
                    <p className="text-sm font-normal mb-3">
                      BRANCH : DABGRAM-SILIGURI BRANCH, DARJILING-734000
                    </p>
                    <p className="text-sm font-normal mb-3">
                      CA A/C NO. : 574301010050250
                    </p>
                    <p className="text-sm font-normal mb-3">
                      IFSC CODE : UBIN0557439
                    </p>
                  </td>
                </tr>
                <tr className="even:bg-white odd:bg-[rgba(250,250,250,1)]">
                  <td className="flex items-center flex-col py-2 px-3">
                    <p className="text-sm font-normal mb-3">
                      <img
                        src="/images/gpay.webp"
                        className="w-36 align-middle"
                      />
                    </p>
                    <p className="text-sm font-normal mb-3">
                      G Pay us at UPI ID: matrixsolutions@uboi
                    </p>
                    <p className="text-sm font-normal mb-3">
                      &nbsp; &nbsp;&nbsp;
                      <img src="/images/account-qr.jpeg" className="w-36" />
                      <br />
                    </p>
                    <p className="text-sm font-normal mb-3">
                      Kindly email/ Call us once you made the payment with your
                      Order ID as the payment reference.
                    </p>
                    <p className="text-sm font-normal mb-3">
                      <font color="#ff0000">
                        Note: Please use complete UPI ID instead of mobile
                        number.&nbsp;
                      </font>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <FooterComponent />
    </MainPageTemplate>
  );
};

export default BankDetails;
