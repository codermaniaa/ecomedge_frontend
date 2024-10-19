import { Button, Input } from "@windmill/react-ui";
import React, { useContext } from "react";

import "react-responsive-modal/styles.css";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import { useTranslation } from "react-i18next";
import Title from "../form/Title";
import { useForm } from "react-hook-form";
import Uploader from "../image-uploader/Uploader";

const ShippingDrawer = ({
  id,
  isSubmitting,
  shippingIcon,
  setShippingIcon,
  handleShippingMethod,
  shippingMethod,
  shippingCharges,
  deliveryTime,
  UpdateShippingData,
  cancelUpdate,
  handleShippingCharges,
  handleDeliveryTime,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className=" h-full flex flex-col gap-6 dark:bg-gray-800 mb-5">
        <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={"Update shipping"}
            description={" Please provide correct information !"}
          />
        </div>
        <div className="p-3">
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={t("Icon")} />
            <div className="col-span-8 sm:col-span-4">
              <Uploader
                product
                folder="product"
                imageUrl={shippingIcon}
                setImageUrl={setShippingIcon}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={"Shipping Method"} />
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register(`shippingMethod`, {
                  required: "Shipping Method is required!",
                })}
                className="border h-12 text-sm focus:outline-none block w-full   dark:bg-gray-700 border-transparent "
                name="shippingMethod"
                type="text"
                defaultValue={shippingMethod}
                placeholder={"Enter Shipping Method."}
                onBlur={(e) => handleShippingMethod(e.target.value)}
              />
              <Error errorName={errors.shippingMethod} />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={"Charges"} />
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register(`shippingCharges`, {
                  required: "shipping Charges is required!",
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent"
                name="shippingCharges"
                type="number"
                defaultValue={shippingCharges}
                placeholder={`Please Enter shipping Charges`}
                onBlur={(e) => handleShippingCharges(e.target.value)}
              />
              <Error errorName={errors.shippingCharges} />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={"Delivery Time"} />
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register(`deliveryTime`, {
                  required: "Delivery Time is required!",
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent"
                name="deliveryTime"
                type="number"
                defaultValue={deliveryTime}
                placeholder={`Please Enter time`}
                onBlur={(e) => handleDeliveryTime(e.target.value)}
              />
              <Error errorName={errors.deliveryTime} />
            </div>
          </div>
        </div>
        <div className=" z-10  w-full py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 bg-gray-50 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea />
            <div className="col-span-8 sm:col-span-4 flex gap-1 justify-between w-full">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Button
                  onClick={() => cancelUpdate()}
                  className="h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700"
                  layout="outline"
                >
                  {"Cancel"}
                </Button>
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow flex-row">
                {isSubmitting ? (
                  <Button disabled={true} type="button"
                  style={{ backgroundColor: "#f34d1b" }}
                  className="w-full h-12">
                    <img
                      src={spinnerLoadingImage}
                      alt="Loading"
                      width={20}
                      height={10}
                    />{" "}
                    <span className="font-serif ml-2 font-light">
                      Processing
                    </span>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full h-12"
                    onClick={() => UpdateShippingData()}
                    style={{ backgroundColor: "#f34d1b" }}
                  >
                    {id ? <span>{t("UpdateBtn")}</span> : <span>Update</span>}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingDrawer;
