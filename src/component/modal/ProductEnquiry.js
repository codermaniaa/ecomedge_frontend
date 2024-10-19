import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

//internal import
import Price from "@component/common/Price";
import Stock from "@component/common/Stock";
import Tags from "@component/common/Tags";
import { notifyError, notifySuccess } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import MainModal from "@component/modal/MainModal";
import Discount from "@component/common/Discount";
import VariantList from "@component/variants/VariantList";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import InputArea from "@component/form/InputArea";
import useGetSetting from "@hooks/useGetSetting";
import { useForm } from "react-hook-form";
import Error from "@component/form/Error";
import Label from "@component/form/Label";
import Uploader from "@component/image-uploader/Uploader";
import EnquiryService from "@services/EnquiryService";

const ProductEnquiry = ({ modalOpen, setModalOpen }) => {
  const router = useRouter();
  const { loading, storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const [productImage, setProductImage] = useState("");

  const submitHandler = async (data) => {
    setError("");
    const userInfo = {
      productImage: "https://example.com/product-image.jpg",
      productName: data.productName,
      name:  data.name,
      address: data.address,
      message: data.message,
      city: data.city,
      email: "john.doe@gmail.com",
      phone: data.contact,
      zipCode: data.zipCode,
      quantity: data.quantity,
    };

    console.log("product enquiry", userInfo);

    EnquiryService.PostEnquiry(userInfo).then((res) => {
      if (res?.success === true) {
        console.log("getEnquiry", res);
        setModalOpen(false);
        notifySuccess(res.message);
      }
    });
  };

  return (
    <>
      <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col p-3 lg:flex-row md:flex-row w-full max-w-4xl overflow-hidden">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="form-group mt-12">
                <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                  Product Enquiry
                </h2>

                <div className="grid grid-cols-6 gap-6 mb-8">
                  {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"> */}
                  <Label className="col-span-4 sm:col-span-2 font-medium text-sm">
                    product image
                  </Label>
                  <div className="col-span-8 sm:col-span-4">
                    <Uploader
                      product
                      folder="product"
                      imageUrl={productImage}
                      setImageUrl={setProductImage}
                    />
                  </div>
                  {/* </div> */}
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <InputArea
                      register={register}
                      //   label='Product Name'
                      name="productName"
                      type="text"
                      placeholder='Product name "mcb,switch board"'
                      //   handleInputData={handleAddress}
                    />
                    <Error errorName={errors.productName} />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <InputArea
                      register={register}
                      //   label='Name'
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      //   handleInputData={handleAddress}
                    />
                    <Error errorName={errors.yourName} />
                  </div>
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <InputArea
                      register={register}
                      //   label='Name'
                      name="contact"
                      type="text"
                      placeholder="Enter your contact number"
                      //   handleInputData={handleAddress}
                    />
                    <Error errorName={errors.yourName} />
                  </div>
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <InputArea
                      register={register}
                      //   label='Name'
                      name="quantity"
                      type="text"
                      placeholder="Quantity needed"
                      //   handleInputData={handleAddress}
                    />
                    <Error errorName={errors.yourName} />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <InputArea
                      register={register}
                      //   label={showingTranslateValue(
                      //     storeCustomizationSetting?.checkout?.city
                      //   )}
                      name="city"
                      type="text"
                      placeholder="city"
                      //   handleInputData={handleAddress}
                    />
                    <Error errorName={errors.city} />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <InputArea
                      register={register}
                      //   label={showingTranslateValue(
                      //     storeCustomizationSetting?.checkout?.zip_code
                      //   )}
                      name="zipCode"
                      type="text"
                      placeholder="zipCode"
                      //   handleInputData={handleAddress}
                    />
                    <Error errorName={errors.zipCode} />
                  </div>
                  <div className="col-span-6 flex flex-col justify-start">
                    <InputArea
                      register={register}
                      //   label={showingTranslateValue(
                      //     storeCustomizationSetting?.checkout?.street_address
                      //   )}
                      name="address"
                      type="text"
                      placeholder='address "123 Boulevard Rd, Beverley Hills"'
                      //   handleInputData={handleAddress}
                    />
                    <Error errorName={errors.address} />
                  </div>
                  <div className="col-span-6 flex flex-col justify-start">
                    <InputArea
                      register={register}
                      //   label={showingTranslateValue(
                      //     storeCustomizationSetting?.checkout?.street_address
                      //   )}
                      name="message"
                      type="text"
                      placeholder="Write any additional message"
                      //   handleInputData={handleAddress}
                    />
                    <Error errorName={errors.address} />
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
      </MainModal>
    </>
  );
};

export default ProductEnquiry;
