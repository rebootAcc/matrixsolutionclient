import React from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import FooterComponent from "../component/FooterComponent";

const CancelationAndRefund = () => {
  return (
    <MainPageTemplate>
      <div className="xl:p-16 lg:p-8 sm:p-4 flex flex-col items-center gap-5 sm:gap-8 font-roboto">
        <h1 className="text-3xl md:text-4xl font-bold text-[rgb(49,_56_70)] text-center uppercase relative after:h-1 after:bg-[rgb(231,40,77)] after:absolute after:w-[25%] after:top-full after:left-1/2 after:-translate-x-1/2 after:mt-5 font-poppins">
          <span>Cancellation &amp; Refund</span>
        </h1>
        <div className="w-full xlg:max-w-7xl py-5 text-[rgba(56,_68,_79,_1)]">
          <div>
            <div>
              <div>
                <h4 className="text-xl font-bold mb-4 uppercase text-[rgb(49,_56_70)]">
                  <span>Cancellation Policy :</span>
                </h4>
                <p></p>
                <ul className="text-sm font-normal list-disc ps-10 mb-3">
                  <li>
                    You need to Contact us via Call/ WhatsApp at Our Helpline
                    Number +91 9476383750 or mail us at contact@mscliq.com to
                    raise a cancellation/Modification of your Product/Order.
                    <br />
                  </li>
                  <li>
                    If you want to modify the order &#40;product/address
                    change&#41; after it is placed, please contact us in the
                    above-mentioned contact details. There is no need to cancel
                    the order.
                  </li>
                </ul>
                <p className="text-sm font-normal mb-3">
                  1. <u>Cancellation Request before the order is shipped:-</u>
                </p>
                <ul className="text-sm font-normal list-disc ps-10 mb-3">
                  <li>
                    We&apos;ll Initiate a refund after deducting a nominal
                    charge of 3% of the Product/Order value.
                  </li>
                  <li>
                    We'll process the refund within 24-48 hours of receiving the
                    request.
                  </li>
                </ul>
                <p className="text-sm font-normal mb-3">
                  2.{" "}
                  <u>
                    Cancellation Request after the order is shipped but not
                    delivered:-
                  </u>
                </p>
                <ul className="text-sm font-normal list-disc ps-10 mb-3">
                  <li>
                    We&apos;ll Initiate a refund after deducting a nominal
                    charge of 3% of the Product/Order value and Courier Charges
                    for both sides of transit.
                  </li>
                  <li>
                    After receiving the shipped product/order back, we'll
                    process the refund within 24-48 hours.
                    <br />
                  </li>
                </ul>
                <ul></ul>
                <p></p>
                <div>
                  <br />
                </div>
                <h4 className="text-xl font-bold mb-4 uppercase text-[rgb(49,_56_70)]">
                  <span>Return / Refund Policy :</span>
                </h4>
                <p></p>
                <ul className="text-sm font-normal list-disc ps-10 mb-3">
                  <li>
                    You need to Contact us via Call/ WhatsApp at Our Helpline
                    Number +91 9476383750 or mail us at contact@mscliq.com or
                    create a Return Request from Order History
                    &#40;Preferred&#41; to raise a Refund/Replacement of
                    Product/Order within 3 Days from the Delivery Date.
                  </li>
                </ul>
                <p></p>
                <div className="text-sm font-normal mb-3">
                  1. <u>In case you received Incorrect Product:-</u>
                </div>
                <ul className="text-sm font-normal list-disc ps-10 mb-3">
                  <li>
                    We&apos;ll arrange a Reverse Pickup of the Product and
                    provide a Replacement once the shipment gets returned.
                    Reverse Pickup only be done if the Product is in sealed
                    condition.{" "}
                  </li>
                  <li>
                    If the Wrong Product is Shipped Back/ Any Item is missing
                    then the return request will be hold until correct/all
                    missing items is returned back.
                    <br />
                  </li>
                </ul>
                <div className="text-sm font-normal mb-3">
                  2.&nbsp;
                  <u>In case you received Damaged/Defective Product:-</u>
                </div>
                <ul className="text-sm font-normal list-disc ps-10 mb-3">
                  <li>
                    You need to contact us with Proper Proof
                    &#40;Images/Videos&#41; for a replacement of the Product.{" "}
                  </li>
                  <li>
                    After 3 Days of delivery, you need to contact the
                    Manufacturer for a Warranty claim.{" "}
                  </li>
                  <li>
                    For Monitor display-related issues, replacement might be
                    provided by the manufacturer directly from day one.
                  </li>
                </ul>
                <p className="text-sm font-normal mb-3">
                  3. <u>In case you ordered an Incorrect Product:-</u>
                </p>
                <ul className="text-sm font-normal list-disc ps-10 mb-3">
                  <li>You may need to contact us first for approval.</li>
                  <li>
                    If the Product is opened, Return/Replacement is not
                    possible.{" "}
                  </li>
                  <li>
                    You need to Re-Ship the Product to Our Store address at your
                    own risk. In case of damage during transit
                    Return/Replacement is not possible.
                  </li>
                  <li>
                    If the Wrong Product is Shipped Back/ Any Item is missing
                    then the return request will be hold until correct/all
                    missing items is returned back.{" "}
                  </li>
                  <li>
                    We&apos;ll Replace the Product of your choice &#40;Courier
                    charges need to be provided from the customer side&#41; /
                    Refund it after deducting a nominal charge of 3% of the
                    Product/Order value and Courier Charges for one side of
                    transit.
                  </li>
                </ul>
                <div>
                  <span className="font-bold text-sm">Notes :</span>
                </div>
                <div>
                  <ul className="text-sm font-normal list-disc ps-10 mb-3">
                    <li>
                      There is No Cancellation/ Replacement on Pre-Order
                      Products/ Products listed on special Promo/ Pre-Build PC/
                      GPU/ Gaming Chairs{" "}
                    </li>
                    <li>
                      There is No Cancellation/Replacement on Cabinets/ Monitors
                      once it is Shipped.{" "}
                    </li>
                    <li>
                      You must return products in their original and proper
                      packaging with the company seal not broken.{" "}
                    </li>
                    <li>
                      A return can be created at the item level and if you have
                      ordered multiple items, you can initiate a return/refund
                      for any individual item. However, any product being
                      returned needs to be returned in full including all
                      components &amp; complimentary gifts or products which
                      came along with it.{" "}
                    </li>
                    <li>
                      Images are indicative only.&nbsp; Though we try our level
                      best to deliver as per the image shown. We reserve the
                      right to substitute the products with equal or higher
                      value in case of non-availability of the desired product.
                      No refund/ re-delivery claim in this respect will be
                      entertained.{" "}
                    </li>
                    <li>
                      In case of a return/refund, we process the refund once the
                      products have been received and verified at our warehouse
                      for missing items/ Damages.{" "}
                    </li>
                    <li>
                      Once the Refund is Processed. Your bank may take 5-7
                      working days to reflect the refund amount in your account.
                      <br />
                    </li>
                  </ul>
                </div>
                <h4></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </MainPageTemplate>
  );
};

export default CancelationAndRefund;
