import React from "react";
import {
  Button,
  Input,
  TableCell,
  TableContainer,
  TableHeader,
  Textarea,
  Table,
} from "@windmill/react-ui";
import LabelArea from "./LabelArea";
import Error from "./Error";
import InputValue from "./InputValue";
import { GrFormSubtract } from "react-icons/gr";
import { BsPlus } from "react-icons/bs";

const MoqSlab = ({
  errors,
  register,
  minMoqSlab,
  handleMinMoqSlab,
  handleInputField,
  globalSetting,
  isCombination,
}) => {
  const currency = globalSetting?.default_currency || "₹";

  return (
    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
      <LabelArea label={`MOQ slab 1`} />
      <div className="col-span-8 sm:col-span-4 flex gap-1">
        <Input
          {...register(`minimumOrder`, {
            required: "minimum Order is required!",
          })}
          className="border h-12 text-sm focus:outline-none block w-[100px] bg-gray-100 dark:bg-white border-transparent focus:bg-white"
          name="min MOQ"
          type="text"
          defaultValue={minMoqSlab}
          placeholder={"Minimum order Quantity"}
          onBlur={(e) => handleMinMoqSlab(e.target.value)}
        />
        {/* <Error errorName={errors.minimumOrder} /> */}

        <Input
          {...register(`minimumOrder`, {
            required: "minimum Order is required!",
          })}
          className="border h-12 text-sm focus:outline-none block w-[100px] bg-gray-100 dark:bg-white border-transparent focus:bg-white"
          name="min MOQ"
          type="text"
          defaultValue={minMoqSlab}
          placeholder={"Minimum order Quantity"}
          onBlur={(e) => handleMinMoqSlab(e.target.value)}
        />
        {/* <Error errorName={errors.minimumOrder} /> */}
        <InputValue
          disabled={isCombination}
          product
          register={register}
          minValue={0}
          defaultValue={0.0}
          required="false"
          label="Sale price"
          name="price"
          type="number"
          placeholder="Sale price"
          currency={currency}
          handleInputField={handleInputField}
        />
        {/* <Error errorName={errors.price} /> */}
        <Button>
          <span>
            <GrFormSubtract />
          </span>{" "}
          Delete
        </Button>
        <Button>
          <span>
            <BsPlus />
          </span>
          Add more
        </Button>
      </div>
    </div>
  );
};

export default MoqSlab;
