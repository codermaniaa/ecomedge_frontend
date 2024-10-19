import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { CardElement } from "@stripe/react-stripe-js";
import Link from "next/link";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import useTranslation from "next-translate/useTranslation";
// import { Select } from "@windmill/react-ui";

//internal import
import Layout from "@layout/Layout";
import Error from "@component/form/Error";
import CartItem from "@component/cart/CartItem";
import InputArea from "@component/form/InputArea";
import useGetSetting from "@hooks/useGetSetting";
import InputPayment from "@component/form/InputPayment";
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Label from "@component/form/Label";
import InputShipping from "@component/form/InputShipping";
import OrderServices from "@services/OrderServices";
import { notifyError, notifySuccess } from "@utils/toast";
import useAsync from "@hooks/useAsync";
import AboutServices from "@services/AboutServices";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    currency,
    isCheckoutSubmit,
    shippingDetails,
    tax,
    taxCalRes,
    selectItemId,
    handleSameDetails,
    billingState,
    setBillingState,
    shippingState,
    setShippingState,
    handleAddress,
    handleShippingContactInfo,
    handleShippingPersonInfo,
  } = useCheckoutSubmit();

  const { t } = useTranslation();
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  // const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const totalSalePrice = items
    .map((items) => items.prices.salePrice * items.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(items, "items total tax price yash");
  const { data } = useAsync(() => AboutServices.getState());
  //console.log("checkout page...", data);
  console.log("taxCalRes checkout", taxCalRes);
  const formatTaxInfo = (taxObject) => {
    return Object.keys(taxObject).map((key) => {
      const taxArray = taxObject[key];
      //console.log("taxArray checkout", taxArray);
      return (
        <span key={key}>
          {/* {key} <br /> */}
          {taxArray.map((element, index) => (
            <span key={index}>
              {element.taxName}
              {`(${element.amount}${element.type == "percentage" && "%"})`}
              &nbsp;
            </span>
          ))}
        </span>
      );
    });
  };

  // Tax calculation
  let totalTax = 0;
  const taxElements =
    taxCalRes &&
    taxCalRes.map((ele, i) => {
      // Accumulate total tax
      totalTax += ele?.totalTaxAmount || 0;

      // Return JSX for tax item
      return (
        <div
          key={i}
          className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0"
        >
          {formatTaxInfo(ele?.tax)}
          <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
            {currency}
            {ele?.totalTaxAmount?.toFixed(2)}
          </span>
        </div>
      );
    });

  let totalTaxByType = {};

  // Iterate through each element in taxCalRes
  taxCalRes &&
    taxCalRes.forEach((ele) => {
      // Iterate through each tax type within the tax object
      Object.keys(ele.tax).forEach((taxType) => {
        // Iterate through each tax detail within the tax type
        ele.tax[taxType].forEach((taxDetail) => {
          // Accumulate tax amount for each tax name
          if (taxDetail.taxName in totalTaxByType) {
            totalTaxByType[taxDetail.taxName] += taxDetail.taxAmount;
          } else {
            totalTaxByType[taxDetail.taxName] = taxDetail.taxAmount;
          }
        });
      });
    });

  return (
    <>
      <Layout title="Checkout" description="this is checkout page">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="form-group">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      01.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.personal_details
                      )}
                    </h2>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.first_name
                          )}
                          name="firstName"
                          type="text"
                          placeholder="First Name"
                        />
                        <Error errorName={errors.firstName} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.last_name
                          )}
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                        />
                        <Error errorName={errors.lastName} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.email_address
                          )}
                          name="email"
                          type="email"
                          placeholder="youremail@gmail.com"
                        />
                        <Error errorName={errors.email} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.checkout_phone
                          )}
                          name="contact"
                          type="tel"
                          inputmode="numeric"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          errMsg="Please enter a 10-digit phone number"
                          placeholder="XXXX-XXXX-XX"
                        />

                        <Error errorName={errors.contact} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={"GST Number"}
                          name="gstnumber"
                          type="text"
                          placeholder="22AAAAA0000A1Z5"
                          notRequiredField={true}
                        />

                        {/* <Error errorName={errors.gstnumber} /> */}
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      02.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.shipping_details
                      )}
                    </h2>

                    <div className="grid grid-cols-6 gap-6 mb-8">
                      <div className="col-span-6">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.street_address
                          )}
                          name="address"
                          type="text"
                          placeholder="Full Address"
                          handleInputData={handleAddress}
                          requiredOnChange={true}
                        />
                        <Error errorName={errors.address} />
                      </div>
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <Label label={"State"} />
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow ">
                          <select
                            onChange={(e) => setShippingState(e.target.value)}
                            value={shippingState}
                            className="border h-12 text-sm focus:outline-none block w-full rounded  bg-gray-100 border-transparent focus:bg-white"
                          >
                            {data?.stateDetails?.map((ele, i) => (
                              <option key={i} value={ele?.name}>
                                {ele?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.city
                          )}
                          name="city"
                          type="text"
                          placeholder="City"
                          handleInputData={handleAddress}
                          requiredOnChange={true}
                        />
                        <Error errorName={errors.city} />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.zip_code
                          )}
                          name="zipCode"
                          type="text"
                          placeholder="PIN code"
                          handleInputData={handleAddress}
                          requiredOnChange={true}
                        />
                        <Error errorName={errors.zipCode} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-12">
                    <div className="flex justify-between gap-1 items-center">
                      <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                        03.Billing Details
                      </h2>
                      <p className="text-sm text-zinc-700">
                        <input
                          type="checkbox"
                          onChange={(e) => handleSameDetails(e)}
                          className="border border-green-500 rounded"
                        />{" "}
                        Same as Shipping details
                      </p>
                    </div>

                    <div className="grid grid-cols-6 gap-6 mb-8">
                      <div className="col-span-6">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.street_address
                          )}
                          name="BIllingAddress"
                          type="text"
                          placeholder="Full Address"
                        />
                        <Error errorName={errors.address} />
                      </div>
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <Label label={"State"} />
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow ">
                          <select
                            onChange={(e) => setBillingState(e.target.value)}
                            value={billingState}
                            className="border h-12 text-sm focus:outline-none block w-full rounded  bg-gray-100 border-transparent focus:bg-white"
                          >
                            {data?.stateDetails?.map((ele, i) => (
                              <option key={i} value={ele?.name}>
                                {ele?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.city
                          )}
                          name="BIllingCity"
                          type="text"
                          placeholder="City"
                        />
                        <Error errorName={errors.city} />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.zip_code
                          )}
                          name="BIllingZipCode"
                          type="text"
                          placeholder="PIN Code"
                        />
                        <Error errorName={errors.zipCode} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      04.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.shipping_cost
                      )}
                    </h2>

                    <div className="grid grid-cols-6 gap-6">
                      {shippingDetails &&
                        shippingDetails?.map((item, i) => (
                          <div key={i} className="col-span-6 sm:col-span-3">
                            <InputShipping
                              currency={currency}
                              handleShippingCost={handleShippingCost}
                              register={register}
                              Image={item?.icon}
                              value={item?.shippingMethod}
                              time={item?.deliveryTime}
                              cost={item?.cost}
                              id={item._id}
                            />
                            <Error errorName={errors.shippingOption} />
                            {selectItemId === item._id && (
                              <>
                                <input
                                  type="text"
                                  {...register(`personInfo`, {
                                    required: `Contact person name is required!`,
                                  })}
                                  name="personInfo"
                                  onChange={(e) =>
                                    handleShippingPersonInfo(e.target.value)
                                  }
                                  placeholder="Contact person name"
                                  className="placeholder:text-[12px] placeholder:text-zinc-400 w-full border-none rounded my-1 shadow-md focus:border-green-700"
                                />
                                <Error errorName={errors.personInfo} />
                                <input
                                  type="tel"
                                  {...register(`contactInfo`, {
                                    required: `Contact person  number is required!`,
                                  })}
                                  name="contactInfo"
                                  onChange={(e) =>
                                    handleShippingContactInfo(e.target.value)
                                  }
                                  inputmode="numeric"
                                  maxLength={10}
                                  pattern="[0-9]{10}"
                                  title="Please enter a 10-digit phone number"
                                  placeholder="Contact person number"
                                  className="placeholder:text-[12px] placeholder:text-zinc-400 w-full border-none rounded my-1 shadow-md focus:border-green-700"
                                />
                                <Error errorName={errors.contactInfo} />
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      05.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.payment_method
                      )}
                    </h2>
                    {showCard && (
                      <div className="mb-3">
                        <CardElement />{" "}
                        <p className="text-red-400 text-sm mt-1">{error}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={t("common:cashOnDelivery")}
                          value="Cash"
                          Icon={IoWalletSharp}
                        />
                        <Error errorName={errors.paymentMethod} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={t("common:creditCard")}
                          value="Card"
                          Icon={ImCreditCard}
                        />
                        <Error errorName={errors.paymentMethod} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                    <div className="col-span-6 sm:col-span-3">
                      <Link href="/">
                        <a className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full">
                          <span className="text-xl mr-2">
                            <IoReturnUpBackOutline />
                          </span>
                          {showingTranslateValue(
                            storeCustomizationSetting?.checkout?.continue_button
                          )}
                        </a>
                      </Link>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <button
                        type="submit"
                        disabled={isEmpty || !stripe || isCheckoutSubmit}
                        className="bg-gray-800 hover:bg-gray-600 border border-gray-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                      >
                        {isCheckoutSubmit ? (
                          <span className="flex justify-center text-center">
                            {" "}
                            <img
                              src="/loader/spinner.gif"
                              alt="Loading"
                              width={20}
                              height={10}
                            />{" "}
                            <span className="ml-2">
                              {t("common:processing")}
                            </span>
                          </span>
                        ) : (
                          <span className="flex justify-center text-center">
                            {showingTranslateValue(
                              storeCustomizationSetting?.checkout
                                ?.confirm_button
                            )}
                            <span className="text-xl ml-2">
                              {" "}
                              <IoArrowForward />
                            </span>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
              <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
                <h2 className="font-semibold font-serif text-lg pb-4">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.order_summary
                  )}
                </h2>

                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} currency={currency} />
                  ))}
                  {isEmpty && (
                    <div className="text-center py-10">
                      <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                        <IoBagHandle />
                      </span>
                      <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                        No Item Added Yet!
                      </h2>
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                  <form className="w-full">
                    {couponInfo.couponCode ? (
                      <span className="bg-gray-50 px-4 py-3 leading-tight w-full rounded-md flex justify-between">
                        {" "}
                        <p className="text-gray-600">Coupon Applied </p>{" "}
                        <span className="text-red-500 text-right">
                          {couponInfo.couponCode}
                        </span>
                      </span>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-start justify-end">
                        <input
                          ref={couponRef}
                          type="text"
                          placeholder={t("common:couponCode")}
                          className="form-input py-2 px-3 md:px-4 w-full appearance-none transition ease-in-out border text-input text-sm rounded-md h-12 duration-200 bg-white border-gray-200 focus:ring-0 focus:outline-none focus:border-gray-500 placeholder-gray-500 placeholder-opacity-75"
                        />
                        <button
                          onClick={handleCouponCode}
                          className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 hover:text-white hover:bg-gray-800 h-12 text-sm lg:text-base w-full sm:w-auto"
                        >
                          {showingTranslateValue(
                            storeCustomizationSetting?.checkout?.apply_button
                          )}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.sub_total
                  )}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {totalSalePrice}
                  </span>
                </div>

                {/* {taxElements} */}
                {/* Render total tax */}
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  <span className="mr-auto">Total Tax:</span>
                  {/* {formatTaxInfo(ele?.tax)} */}

                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {totalTax.toFixed(2)}
                  </span>
                </div>
                {Object.keys(totalTaxByType).map((taxName, index) => (
                  <div  
                    key={index}
                    className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0"
                  >
                    <span className="mr-auto">{taxName} Tax:</span>

                    <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                      {currency}
                      {totalTaxByType[taxName].toFixed(2)}
                    </span>
                  </div>
                ))}

                {/* {taxCalRes &&
                  taxCalRes?.map((ele, i) => (
                    <div
                      key={i}
                      className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0"
                    >
                      {formatTaxInfo(ele?.tax)}
                      <span >
                             {ele?.taxName?.length > 1 ? <>{`${index}.`}</> : ""} {e}{" "}
                            &nbsp;
                           </span>
                      <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                        {currency}
                        {ele?.totalTaxAmount?.toFixed(2)}
                      </span>
                    </div>
                  ))} */}

                {/* {tax?.map((ele, i) => (
                  <div
                    key={i}
                    className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0"
                  >
                    {ele?.taxName?.map((e, index) => (
                      <span key={index}>
                        {ele?.taxName?.length > 1 ? <>{`${index}.`}</> : ""} {e}{" "}
                        &nbsp;
                      </span>
                    ))}
                    <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                      {currency}
                      {ele?.totalTax?.toFixed(2)}
                    </span>
                  </div>
                ))} */}
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.shipping_cost
                  )}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.discount
                  )}
                  <span className="ml-auto flex-shrink-0 font-bold text-orange-400">
                    {currency}
                    {discountAmount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t mt-4">
                  <div className="flex items-center font-bold font-serif justify-between pt-5 text-sm uppercase">
                    {showingTranslateValue(
                      storeCustomizationSetting?.checkout?.total_cost
                    )}
                    <span className="font-serif font-extrabold text-lg">
                      {currency}
                      {parseFloat(total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
