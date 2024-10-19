import { SidebarContext } from "@context/SidebarContext";
import EnquiryService from "@services/EnquiryService";
import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "@utils/toast";

const useAskForService = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const { isLoading, setIsLoading, askForPriceProduct, useAskForPriceProduct } =
    useContext(SidebarContext);

  const [shippingState, setShippingState] = useState("select state");

  const submitHandler = async (data) => {
    setError("");
    // const userInfo = {
    //   name: `${data.firstName} ${data.lastName}`,
    //   contact: data.contact,
    //   email: data.email,
    //   address: data.address,
    //   state: shippingState,
    //   city: data.city,
    //   zipCode: data.zipCode,
    //   message: data.message,
    // };

    // const userInfo = {
    //   name: `${data.firstName} ${data.lastName}`,
    //   contact: data.contact,
    //   email: data.email,
    //   address: data.address,
    //   state: shippingState,
    //   city: data.city,
    //   zipCode: data.zipCode,
    //   message: data.message,
    // };

    const userInfo = {
      productId: askForPriceProduct?._id,
      personalDetails: {
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.email,
        phoneNumber: data.contact,
      },
      shippingDetails: {
        streetAddress: data.address,
        state: shippingState,
        city: data.city,
        zipCode: data.zipCode,
      },
      message: data.message,
    };

    // console.log("userInfo", userInfo);

    EnquiryService.Postaskforprice(userInfo).then((res) => {
      if (res?.success === true) {
        console.log("getEnquiry", res);
        notifySuccess(
          "your Enquiry message sent successfully. We will contact you shortly."
        );
        setValue('firstName', '');
        setValue('lastName', '');
        setValue('email', '');
        setValue('contact', '');
        setValue('address', '');
        setValue('city', '');
        setValue('zipCode', '');
        setValue('message', '');
      }
    });
  };

  const stateData = [
    "Select state",
    "Andaman & Nicobar (UT)",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh (UT)",
    "Chhattisgarh",
    "Dadra & Nagar Haveli and Daman & Diu (UT)",
    "Delhi [National Capital Territory (NCT)]",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu & Kashmir (UT)",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh (UT)",
    "Lakshadweep (UT)",
    "Maharashtra",
    "Madhya Pradesh",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry (UT)",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Tripura",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  return {
    handleSubmit,
    submitHandler,
    error,
    register,
    errors,
    setShippingState,
    shippingState,
    stateData,
  };
};

export default useAskForService;
