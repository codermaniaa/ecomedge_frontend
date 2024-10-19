import ReactTagInput from "@pathofdev/react-tag-input";
import {
  Button,
  Input,
  TableCell,
  TableContainer,
  TableHeader,
  Textarea,
  Table,
} from "@windmill/react-ui";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

//internal import

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import DrawerButton from "@/components/form/DrawerButton";
import InputValue from "@/components/form/InputValue";
import useProductSubmit from "@/hooks/useProductSubmit";
import ActiveButton from "@/components/form/ActiveButton";
import InputValueFive from "@/components/form/InputValueFive";
import Uploader from "@/components/image-uploader/Uploader";
import ParentCategory from "@/components/category/ParentCategory";
import AttributeOptionTwo from "@/components/attribute/AttributeOptionTwo";
import AttributeListTable from "@/components/attribute/AttributeListTable";
import SwitchToggleForCombination from "@/components/form/SwitchToggleForCombination";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import UploadFile from "@/components/image-uploader/UploadFile";

//internal import

const ProductDrawer = ({ id }) => {
  const { t } = useTranslation();

  const {
    tag,
    setTag,
    values,
    language,
    register,
    onSubmit,
    errors,
    slug,
    attribue,
    setValues,
    variants,
    imageUrl,
    setImageUrl,
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    // productId,
    onCloseModal,
    isBulkUpdate,
    globalSetting,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProductTap,

    selectedCategory,
    setSelectedCategory,

    setDefaultCategory,
    defaultCategory,

    userManual,
    setUserManual,

    technical,
    setTechnical,

    dataSheet,
    setDataSheet,

    userManualNames,
    setUserManualNames,

    technicalSpecNames,
    setTechnicalSpecNames,

    datasheetNames,
    setDatasheetNames,

    tax,
    setTax,

    minimumOrder,
    warrantyPeriod,
    taxOption,
    slab,
    setSlab,
    askForPrice,
    setAskForPrice,
    fewLeft,
    setFewLeft,
    fileName,
    // setFileName,
    hsnNumber,
    setHsnNumber,

    productType,
    setProductType,

    productLine,
    setProductLine,

    brand,
    setBrand,

    uom,
    setUom,

    originCountry,
    setOriginCountry,

    importerName,
    setImporterName,

    importerAddress,
    setImporterAddress,

    isReturnable,
    handleReturnPolicy,

    returnDays,
    setReturnDays,



    handleProductSlug,
    handleSelectLanguage,
    handleIsCombination,
    handleEditVariant,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
    handleProductMinimumOrder,
    handleProductWarrantyPeriod,
    handleAddSlab,
    handleInputField,
    handleMaxMOQ,
    handleMinMOQ,
    handleDeleteSlab,
    handleHsnNumber,
    getTaxDetails,
  } = useProductSubmit(id);
  const currency = globalSetting?.default_currency || "₹";

  // console.log('taxOption', taxOption);
  // console.log("Attributes............................. ", attributes);
  // console.log("Slabs..... ", slab);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

  }, [])

  useEffect(() => {
    getTaxDetails();

  }, []);
  return (
    <>
      {/* <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500 focus:outline-none active:outline-none text-xl border-0">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <div className="cursor-pointer">
          <UploaderThree
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleSelectImage={handleSelectImage}
          />
        </div>
      </Modal> */}

      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateProduct")}
            description={t("UpdateProductDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("DrawerAddProduct")}
            description={t("AddProductDescription")}
          />
        )}
      </div>

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
        <SwitchToggleForCombination
          product
          handleProcess={handleIsCombination}
          processOption={isCombination}
        />

        <ul style={{color: "#f34d1b" }} className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Basic Info"
              handleProductTap={handleProductTap}             
            />
          </li>
          {isCombination && (
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Combination"
                handleProductTap={handleProductTap}
              />
            </li>
          )}
        </ul>
      </div>

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">
          {tapValue === "Basic Info" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductID")} />
                <div className="col-span-8 sm:col-span-4">{productId}</div>
              </div> */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductTitleName")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`title`, {
                      required: "TItle is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="title"
                    type="text"
                    placeholder={t("ProductTitleName")}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductDescription")} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    {...register("description", {
                      required: false,
                    })}
                    name="description"
                    placeholder={t("ProductDescription")}
                    rows="4"
                    spellCheck="false"
                  />
                  <Error errorName={errors.description} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductImage")} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    type="file" id="img" name="img" accept="image/*"
                    product
                    folder="product"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"User Manual"} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    product
                    folder="product"
                    pdf={true}
                    pdfName={userManualNames}
                    scenario="usermanual"
                    imageUrl={userManual}
                    setImageUrl={setUserManual}
                    setUserManualNames={setUserManualNames}
                  />
                </div>

              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Technical Specification"} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    product
                    folder="product"
                    pdf={true}
                    pdfName={technicalSpecNames}
                    scenario="techspec"
                    imageUrl={technical}
                    setImageUrl={setTechnical}
                    setTechnicalSpecNames={setTechnicalSpecNames}
                  />
                </div>
                {/* {technicalSpecNames && technicalSpecNames.length > 1 ? 
                technicalSpecNames.map((cur_name)=>{
                  <span>{cur_name}</span>
                }):<span>{technicalSpecNames}</span>} */}
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Data sheet"} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    product
                    pdf={true}
                    pdfName={datasheetNames}
                    scenario="datasheet"
                    folder="product"
                    imageUrl={dataSheet}
                    setImageUrl={setDataSheet}
                    setDatasheetNames={setDatasheetNames}
                  />
                </div>
                {/* {datasheetNames && datasheetNames.length > 1 ? 
                datasheetNames.map((cur_name)=>{
                  <span>{cur_name}</span>
                }):<span>{datasheetNames}</span>} */}
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductSKU")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    required="false"
                    label={t("ProductSKU")}
                    name="sku"
                    type="text"
                    placeholder={t("ProductSKU")}
                  />
                  <Error errorName={errors.sku} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductBarcode")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    required="false"
                    label={t("ProductBarcode")}
                    name="barcode"
                    type="text"
                    placeholder={t("ProductBarcode")}
                  />
                  <Error errorName={errors.barcode} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Category")} />
                <div className="col-span-8 sm:col-span-4">
                  <ParentCategory
                    lang={language}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setDefaultCategory={setDefaultCategory}
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("DefaultCategory")} />
                <div className="col-span-8 sm:col-span-4">
                  <Multiselect
                    displayValue="name"
                    isObject={true}
                    singleSelect={true}
                    ref={resetRefTwo}
                    hidePlaceholder={true}
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={(v) => setDefaultCategory(v)}
                    selectedValues={defaultCategory}
                    options={selectedCategory}
                    placeholder={"Default Category"}
                  ></Multiselect>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Ask for price" />
                <div className="col-span-8 sm:col-span-4">
                  <div className="w-full flex gap-1">
                    <span className=" text-surfaceDark text-xs">
                      Ask for price
                    </span>
                    <input
                      type="checkbox"
                      checked={askForPrice}
                      onChange={(e) => setAskForPrice(e.target.checked)}
                    />
                  </div>
                </div>
              </div>

              {askForPrice === true ? (
                ""
              ) : (
                <>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={"Product Price(per unit)"} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputValue
                        // disabled={isCombination}
                        register={register}
                        maxValue={5000000}
                        minValue={askForPrice == true ? 0 : 1}
                        label="Original Price"
                        name="originalPrice"
                        type="number"
                        placeholder="OriginalPrice"
                        defaultValue={0.0}
                        required="false"
                        disabled={askForPrice}
                        product
                        currency={currency}
                      />
                    </div>
                  </div>
                  <Error errorName={errors.originalPrice} />
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={"Sale Price(per unit)"} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputValue
                        // disabled={isCombination}
                        product
                        register={register}
                        minValue={0}
                        defaultValue={0.0}
                        required="false"
                        label="Sale price"
                        name="price"
                        disabled={askForPrice}
                        type="number"
                        placeholder="Sale price"
                        currency={currency}
                      />
                      <Error errorName={errors.price} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={"Minimum order Quantity"} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        {...register(`minimumOrder`, {
                          required: "minimum Order is required!",
                        })}
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        name="minimumOrder"
                        type="number"
                        defaultValue={minimumOrder}
                        placeholder={"Minimum order Quantity"}
                        onBlur={(e) =>
                          handleProductMinimumOrder(e.target.value)
                        }
                      />
                      <Error errorName={errors.minimumOrder} />
                    </div>
                  </div>
                  <>
                    {slab.length > 0 ? (
                      slab.map((item, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                        >
                          <LabelArea label={`MOQ slab ${i + 1}`} />
                          <div className="col-span-8 sm:col-span-4 flex gap-1">
                            <input
                              className="border h-12 text-sm focus:outline-none block rounded-md w-[50px] p-1 dark:bg-gray-700 "
                              name="minimumOrder"
                              type="text"
                              value={item.minQuantity}
                              style={{ width: "100px" }}
                              placeholder="min MOQ"
                              onChange={(e) =>
                                handleMinMOQ(
                                  e.target.value,
                                  `MOQ slab ${i + 1}`
                                )
                              }
                            />
                            <input
                              className="border h-12 text-sm focus:outline-none block rounded-md w-[50px] p-1 bg-gray-200 dark:bg-gray-700"
                              name="minimumOrder"
                              style={{ width: "100px" }}
                              type="number"
                              value={item.maxQuantity}
                              placeholder="max MOQ"
                              onChange={(e) =>
                                handleMaxMOQ(
                                  e.target.value,
                                  `MOQ slab ${i + 1}`
                                )
                              }
                            />
                            <InputValue
                              // disabled={isCombination}
                              product
                              style={{ width: "100px" }}
                              register={register}
                              minValue={0}
                              defaultValue={item.moqSalePrice}
                              required="false"
                              label="Sale price"
                              name={`moqSlabPrice${i + 1}`}
                              type="number"
                              placeholder="Sale price"
                              currency={currency}
                              handleInputField={handleInputField}
                              id={`MOQ slab ${i + 1}`}
                            />
                            {slab && slab.length > 0 && (
                              <button
                                onClick={() =>
                                  handleDeleteSlab(`MOQ slab ${i + 1}`)
                                }
                                className="bg-Warning w-35 flex gap-2 justify-items-center items-center p-2 rounded cursor-pointer"
                              // className=" w-[100px] bg-red-600 hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700"
                              >
                                <span>
                                  <MdOutlineDeleteOutline />
                                </span>{" "}
                                Delete
                              </button>
                            )}
                            {slab && slab.length === i + 1 && (
                              <Button
                                className="w-[70px] "
                                onClick={() => handleAddSlab(i + 2)}
                                style={{ backgroundColor: "#f34d1b" }}
                              >
                                <span>
                                  <BsPlus />
                                </span>
                                Add more
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label={`MOQ slab `} />
                        <div className="col-span-8 sm:col-span-4 flex gap-1">
                          <Button
                            className="w-[70px] "
                            onClick={() => handleAddSlab(1)}
                            style={{ backgroundColor: "#f34d1b" }}
                          >
                            <span>
                              <BsPlus />
                            </span>
                            Add more
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                </>
              )}

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                <LabelArea label={t("ProductQuantity")} />
                <div className="col-span-8 sm:col-span-4">
                  <div className="w-full flex gap-1">
                    <span className=" text-surfaceDark text-xs">Few Left</span>
                    <input
                      type="checkbox"
                      checked={fewLeft}
                      onChange={(e) => setFewLeft(e.target.checked)}
                    />
                  </div>
                  <InputValueFive
                    register={register}
                    required={false}
                    minValue={0}
                    defaultValue={0}
                    label="Quantity"
                    name="stock"
                    type="number"
                    disabled={fewLeft}
                    placeholder={t("ProductQuantity")}
                  />
                  <Error errorName={errors.stock} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductSlug")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input

                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="slug"
                    type="text"
                    defaultValue={slug}
                    placeholder={t("ProductSlug")}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.slug} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductTag")} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                    placeholder={t("ProductTagPlaseholder")}
                    tags={tag}
                    onChange={(newTags) => setTag(newTags)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Tax Name"} />
                <div className="col-span-8 sm:col-span-4">
                  <Multiselect
                    displayValue="amount"
                    isObject={true}
                    singleSelect={true}
                    ref={resetRefTwo}
                    hidePlaceholder={true}
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={(v) => setTax(v)}
                    selectedValues={tax}
                    options={taxOption}
                    placeholder={"Enter Tax"}
                  ></Multiselect>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Warranty Period Year"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`warrantyPeriod`, {
                      required: "warranty Period is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="warrantyPeriod"
                    type="number"
                    defaultValue={warrantyPeriod}
                    placeholder={"Warranty Period Year"}
                    onBlur={(e) => handleProductWarrantyPeriod(e.target.value)}
                  />
                  <Error errorName={errors.warrantyPeriod} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"HSN/SAC number"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`hsnNumber`, {
                      required: "HSN/SAC number is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="hsnNumber"
                    type="number"
                    defaultValue={hsnNumber}
                    placeholder={"HSN/SAC number"}
                    onBlur={(e) => handleHsnNumber(e.target.value)}
                  />
                  <Error errorName={errors.hsnNumber} />
                </div>
              </div>

              {/* Product Specifations */}

              <dev>
                <h1>Product Specifations</h1>
              </dev>

              <dev>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={"Product Type"} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input

                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="productType"
                      type="text"
                      value={productType}
                      placeholder={"Product Type"}
                      onChange={(e) => setProductType(e.target.value)}

                    />
                    <Error errorName={errors.hsnNumber} />
                  </div>
                </div>
              </dev>

              <dev>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={"Product Line"} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input

                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="productLine"
                      type="text"
                      value={productLine}
                      placeholder={"Product Line"}
                      onChange={(e) => setProductLine(e.target.value)}
                    />
                    <Error errorName={errors.hsnNumber} />
                  </div>
                </div>
              </dev>

              <dev>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={"Brand"} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input

                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="brand"
                      type="text"
                      value={brand}
                      placeholder={"Brand"}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    <Error errorName={errors.hsnNumber} />
                  </div>
                </div>
              </dev>

              <dev>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={"UOM"} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input

                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="uom"
                      type="text"
                      value={uom}
                      placeholder={"UOM"}
                      onChange={(e) => setUom(e.target.value)}
                    />
                    <Error errorName={errors.hsnNumber} />
                  </div>
                </div>
              </dev>

              <dev>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={"Country Of Origin"} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input

                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="originCountry"
                      type="text"
                      value={originCountry}
                      placeholder={"Country Of Origin"}
                      onChange={(e) => setOriginCountry(e.target.value)}
                    />
                    <Error errorName={errors.hsnNumber} />
                  </div>
                </div>
              </dev>

              <dev>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={"Manufacturer / Importer Name"} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input

                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="importerName"
                      type="text"
                      value={importerName}
                      placeholder={"Importer Name"}
                      onChange={(e) => setImporterName(e.target.value)}
                    />
                    <Error errorName={errors.hsnNumber} />
                  </div>
                </div>
              </dev>

              <dev>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={"Manufacturer / Importer Address"} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input

                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="importerAddress"
                      type="text"
                      value={importerAddress}
                      placeholder={"Importer Address"}
                      onChange={(e) => setImporterAddress(e.target.value)}
                    />
                    <Error errorName={errors.hsnNumber} />
                  </div>
                </div>
              </dev>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Returns Policy" />
                <div className="col-span-8 sm:col-span-4">
                  <div className="w-40 flex gap-1">
                    <span className=" text-surfaceDark text-xs">
                      Return
                    </span>
                    <Input
                      type="checkbox"
                      checked={isReturnable}
                      onChange={(e) => handleReturnPolicy(e.target.checked)}
                    />
                    {isReturnable &&
                      <Input

                        className="border ml-2 h-8 text-sm focus:outline-none block  bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        type="number"
                        min="1"
                        max="30"
                        value={returnDays}
                        onChange={(e) => setReturnDays(e.target.value)}
                      />
                    }
                    {isReturnable &&
                      <p className="mt-1">Day's</p>
                    }
                  </div>

                  <Error errorName={errors.originalPrice} />
                </div>
              </div>


            </div>
          )}

          {tapValue === "Combination" &&
            isCombination &&
            (attribue.length < 1 ? (
              <div
                className="bg-teal-100 border border-teal-600 rounded-md text-teal-900 px-4 py-3 m-4"
                role="alert"
              >
                <div className="flex">
                  <div className="py-1">
                    <svg
                      className="fill-current h-6 w-6 text-teal-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm">
                      {t("AddCombinationsDiscription")}
                      <Link to="/admin/attributes" className="font-bold">
                        {t("AttributesFeatures")}
                      </Link>
                      {t("AddCombinationsDiscriptionTwo")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {/* <h4 className="mb-4 font-semibold text-lg">Variants</h4> */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 md:gap-3 xl:gap-3 lg:gap-2 mb-3 text-black ">
                  <MultiSelect
                    options={attTitle}
                    value={attributes}
                    onChange={(v) => handleAddAtt(v)}
                    labelledBy="Select"
                  // className={
                  //   " bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-primaryOn"
                  // }
                  />

                  {attributes?.map((attribute, i) => (
                    <div key={attribute._id}>
                      <div className="flex w-full h-10 justify-between font-sans rounded-tl rounded-tr bg-gray-200  px-4 py-3 text-left text-sm font-normal text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        {"Select"}
                        {attribute?.title}
                      </div>

                      <AttributeOptionTwo
                        id={i + 1}
                        values={values}
                        lang={language}
                        attributes={attribute}
                        setValues={setValues}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mb-6">
                  {attributes && attributes?.length > 0 && (
                    <Button
                      onClick={handleGenerateCombination}
                      type="button"
                      className="mx-2"
                    >
                      <span className="text-xs">{t("GenerateVariants")}</span>
                    </Button>
                  )}
                  {variantTitle.length > 0 && (
                    <Button onClick={handleClearVariant} className="mx-2">
                      <span className="text-xs">{t("ClearVariants")}</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}

          {isCombination ? (
            <DrawerButton
              id={id}
              save
              title="Product"
              isSubmitting={isSubmitting}
              handleProductTap={handleProductTap}
            />
          ) : (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}

          {tapValue === "Combination" && (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}
        </form>

        {tapValue === "Combination" &&
          isCombination &&
          variantTitle.length > 0 && (
            <div className="px-6">
              {/* {variants?.length >= 0 && ( */}
              {isCombination && (
                <TableContainer className="md:mb-32 mb-40 rounded-b-lg">
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableCell>{t("Image")}</TableCell>
                        <TableCell>{t("Combination")}</TableCell>
                        <TableCell>{t("Sku")}</TableCell>
                        <TableCell>{t("Barcode")}</TableCell>
                        <TableCell>{t("Price")}</TableCell>
                        <TableCell>{t("SalePrice")}</TableCell>
                        <TableCell>{t("QuantityTbl")}</TableCell>
                        <TableCell className="text-right">
                          {t("Action")}
                        </TableCell>
                      </tr>
                    </TableHeader>

                    <AttributeListTable
                      lang={language}
                      variants={variants}
                      setTapValue={setTapValue}
                      variantTitle={variantTitle}
                      isBulkUpdate={isBulkUpdate}
                      handleSkuBarcode={handleSkuBarcode}
                      handleEditVariant={handleEditVariant}
                      handleRemoveVariant={handleRemoveVariant}
                      handleQuantityPrice={handleQuantityPrice}
                      handleSelectInlineImage={handleSelectInlineImage}
                    />
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
