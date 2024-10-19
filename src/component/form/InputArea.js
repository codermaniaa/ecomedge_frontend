import React from "react";
import Label from "@component/form/Label";

const InputArea = ({
  name,
  label,
  type,
  maxLength,
  inputmode,
  pattern,
  errMsg,
  Icon,
  register,
  defaultValue,
  autocomplete,
  placeholder,
  dataList,
  handleInputData,
  requiredOnChange,
  notRequiredField,
}) => {
  return (
    <>
      <Label label={label} />
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
              <Icon />{" "}
            </span>
          </div>
        )}
        {requiredOnChange == true ? (
          <input
            {...register(`${name}`, {
              required: notRequiredField ? false : `${label} is required!`,
            })}
            type={type}
            inputmode={inputmode}
            maxLength={maxLength}
            pattern={pattern}
            name={name}
            title={errMsg}
            defaultValue={defaultValue}
            placeholder={placeholder}
            autoComplete={autocomplete}
            onChange={(e) => handleInputData(e)}
            className={
              Icon
                ? "py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-gray-500 h-11 md:h-12"
                : "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-gray-500 h-11 md:h-12"
            }
            list="browsers"
            id="browser"
          />
        ) : (
          <input
            {...register(`${name}`, {
              required: notRequiredField ? false : `${label} is required!`,
            })}
            type={type}
            inputmode={inputmode}
            maxLength={maxLength}
            pattern={pattern}
            title={errMsg}
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            autoComplete={autocomplete}
            className={
              Icon
                ? "py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-gray-500 h-11 md:h-12"
                : "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-gray-500 h-11 md:h-12"
            }
            list="browsers"
            id="browser"
          />
        )}

        <datalist id="browsers">
          {dataList &&
            dataList?.map((item, i) => <option key={i} value={item} />)}
        </datalist>
      </div>
    </>
  );
};

export default InputArea;
