import { SidebarContext } from "@context/SidebarContext";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";
import Loading from "@component/preloader/Loading";
import InputArea from "@component/form/InputArea";
import useAskForService from "@hooks/useAskForService";
import useTranslation from "next-translate/useTranslation";
import Layout from "@layout/Layout";
import Error from "@component/form/Error";
import Label from "@component/form/Label";
import Stock from "@component/common/Stock";
import Discount from "@component/common/Discount";
import Image from "next/image";

const askforprice = () => {
  const {
    handleSubmit,
    submitHandler,
    error,
    register,
    errors,
    setShippingState,
    shippingState,
    stateData,
  } = useAskForService();
  const router = useRouter();
  const { t } = useTranslation();
  const { showingTranslateValue } = useUtilsFunction();
  const { isLoading, setIsLoading, askForPriceProduct, useAskForPriceProduct } =
    useContext(SidebarContext);
  const { loading, storeCustomizationSetting } = useGetSetting();
  //   const product = askForPriceProduct;

  console.log("askForPriceProduct", askForPriceProduct);
  //   const product = { image: [] };
  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen flex justify-center p-[30px]">
            <div className="md:w-full lg:w-3/5  flex h-full flex-col order-2 sm:order-1 lg:order-1">
              {askForPriceProduct && (
                <div className="group box-border w-[200px] overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white relative">
                  <div
                    // onClick={() => handleModalOpen(!modalOpen, product._id)}
                    className="relative flex justify-center w-full cursor-pointer pt-2"
                  >
                    <div className="left-3">
                      <Stock
                        product={askForPriceProduct}
                        stock={askForPriceProduct.stock}
                        card
                      />
                    </div>

                    {/* <Discount product={askForPriceProduct} /> */}
                    {/* {product?.prices?.salePrice > 1 ? (
                      <span className="absolute text-dark text-xs bg-orange-500 text-white py-1 px-2 rounded font-medium z-10 right-0 top-0">
                        {discount}% off
                      </span>
                    ) : ""} */}
                    {askForPriceProduct?.image[0] ? (
                      <img
                        src={askForPriceProduct.image[0].medialink}
                        width={210}
                        height={210}
                        alt="product"
                        className="object-contain  transition duration-150 ease-linear transform group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                        width={210}
                        height={210}
                        alt="product"
                        className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
                    <div className="relative mb-1">
                      <span className="text-gray-400 font-medium text-xs d-block mb-1">
                        {askForPriceProduct.unit}
                      </span>
                      <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
                        <span className="line-clamp-2">
                          {askForPriceProduct?.title}
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
              )}
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
                          placeholder="XXXX-XXXX-XX"
                        />

                        <Error errorName={errors.contact} />
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
                        //   handleInputData={handleAddress}
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
                            {stateData?.map((ele, i) => (
                              <option value={ele}>{ele}</option>
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
                        //   handleInputData={handleAddress}
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
                          placeholder="PIN Code"
                        //   handleInputData={handleAddress}
                        />
                        <Error errorName={errors.zipCode} />
                      </div>
                      <div className="col-span-6">
                        <InputArea
                          register={register}
                          label={'message'}
                          name="message"
                          type="text"
                          placeholder="message"
                        //   handleInputData={handleAddress}
                        />
                        <Error errorName={errors.message} />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 flex justify-end">
                      <button
                        type="submit"
                        className="bg-gray-800 hover:bg-gray-600 border border-gray-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-[200px]"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default askforprice;
