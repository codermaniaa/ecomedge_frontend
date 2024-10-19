import { Button, Input } from "@windmill/react-ui";
import React, { useContext } from "react";

import "react-responsive-modal/styles.css";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import { useTranslation } from "react-i18next";
import Title from "../form/Title";
import { useForm } from "react-hook-form";

const TaxDrawer = ({
  id,
  taxName,
  buttonType,
  handleSelectType,
  taxType,
  taxAmount,
  isSubmitting,
  UpdateTaxData,
  cancelUpdate,
  handleTaxAmount,
  handleTaxName,
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
      <div className="p-3 h-full flex flex-col gap-6 dark:bg-gray-800 mb-5">
        <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={"Update Tax"}
            description={" Please provide correct information !"}
          />
        </div>

        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
          <LabelArea label={"TAX NAME"} />
          <div className="col-span-8 sm:col-span-4">
            <Input
              {...register(`taxName`, {
                required: "Tax Name is required!",
              })}
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
              name="taxName"
              type="text"
              defaultValue={taxName}
              placeholder={"Enter Tax Title."}
              onBlur={(e) => handleTaxName(e.target.value)}
            />
            <Error errorName={errors.taxName} />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={"TYPE"} />
          <div className="col-span-8 sm:col-span-4 w-full flex gap-1 flex-wrap">
            {buttonType &&
              buttonType.map((item, i) => (
                <p
                  key={i}
                  onClick={() => handleSelectType(item)}
                  className={`py-3 px-4 rounded bg-gray-200 dark:bg-gray-700 dark:text-primaryOn dark:hover:bg-secondaryContainerOn w-48 text-xs text-center cursor-pointer ${
                    taxType === item
                      ? "border-2 border-dashed border-green-500"
                      : ""
                  } `}
                >
                  {item}
                </p>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={"AMOUNT"} />
          <div className="col-span-8 sm:col-span-4">
            <Input
              {...register(`taxAmount`, {
                required: "Amount is required!",
              })}
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
              name="taxAmount"
              type="number"
              defaultValue={taxAmount}
              placeholder={"Please Enter Amount."}
              onBlur={(e) => handleTaxAmount(e.target.value)}
            />
            <Error errorName={errors.taxAmount} />
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
                    onClick={UpdateTaxData}
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

export default TaxDrawer;
