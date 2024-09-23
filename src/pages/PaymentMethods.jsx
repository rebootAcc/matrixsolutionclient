import React from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import FooterComponent from "../component/FooterComponent";

const PaymentMethods = () => {
  return (
    <MainPageTemplate>
      <div className="xl:p-16 lg:p-8 sm:p-4 flex flex-col items-center gap-5 sm:gap-8 font-roboto">
        <h1 className="text-3xl md:text-4xl font-bold text-[rgb(49,_56_70)] text-center uppercase relative after:h-1 after:bg-[rgb(231,40,77)] after:absolute after:w-[25%] after:top-full after:left-1/2 after:-translate-x-1/2 after:mt-5 font-poppins">
          <span>Payment Method</span>
        </h1>
        <div className="w-full xlg:max-w-7xl py-5 text-[rgba(56,_68,_79,_1)]">
          <div>
            <div>
              <div>
                <div className="font-bold text-sm text-[rgba(56,_68,_79,_1)] mb-3">
                  <b>We offer multiple payment options. </b>
                </div>
                <p className="mb-3"></p>
                <p className="mb-3">
                  <br />
                </p>
                <p className="text-sm font-normal mb-3">
                  Following are the list of available payment methods/ options{" "}
                  <b>: -</b>
                </p>
                <p className="mb-3">
                  <b>
                    <br />
                  </b>
                </p>
                <p className="text-sm font-normal mb-3">
                  <b>Debit Cards :</b> We accept payments made using Visa,
                  Master, RuPay &amp; Maestro Card.
                </p>
                <p className="mb-3">
                  <b>
                    <br />
                  </b>
                </p>
                <p className="text-sm font-normal mb-3">
                  <b>Credit Cards :</b> We accept payments made using Visa,
                  MasterCard, Diners and American Express.
                </p>
                <p className="mb-3">
                  <b>
                    <br />
                  </b>
                </p>
                <p className="text-sm font-normal mb-3">
                  <b>Internet Banking :</b> We accept almost all of the internet
                  banking payments available in India such as HDFC, Axis, ICICI,
                  SBI, Citi Bank, Kotak Bank and more.
                </p>
                <p className="mb-3">
                  <b>
                    <br />
                  </b>
                </p>
                <p className="text-sm font-normal mb-3">
                  <b>UPI :&nbsp;</b>We also accept payments through UPI payment
                  option.
                </p>
                <p className="mb-3">
                  <b>
                    <br />
                  </b>
                </p>
                <p className="text-sm font-normal mb-3">
                  <b>Bank Transfer :</b>&nbsp;We accept payment through fund
                  transfer.&nbsp;Your order will not ship until we receive
                  payment.
                </p>
                <p>
                  <br />
                </p>
                <p></p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </MainPageTemplate>
  );
};

export default PaymentMethods;
