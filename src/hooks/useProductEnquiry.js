
import { useState } from "react";
import { useForm } from "react-hook-form";

const useProductEnquiry = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [shippingState, setShippingState] = useState("select state");

  const submitHandler = async (data) => {
    setError("");
    const userInfo = {
      name: `${data.firstName} ${data.lastName}`,
      contact: data.contact,
      email: data.email,
      address: data.address,
      state: shippingState,
      city: data.city,
      zipCode: data.zipCode,
    };

    console.log("userInfo", userInfo);
    // let orderInfo = {
    //   user_info: userInfo,
    //   shippingOption: data.shippingOption,
    //   paymentMethod: data.paymentMethod,
    //   status: "Pending",
    //   cart: items,
    //   subTotal: cartTotal,
    //   shippingCost: shippingCost,
    //   discount: discountAmount,
    //   total: total,
    // };
    // console.log("orderInfo", userInfo);

    // let BillingInfo = {
    //   user_info: userInfo,
    //   shippingOption: data.shippingOption,
    //   paymentMethod: data.paymentMethod,
    //   status: "Pending",
    //   cart: items,
    //   subTotal: cartTotal,
    //   shippingCost: shippingCost,
    //   discount: discountAmount,
    //   total: total,
    // };
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

export default useProductEnquiry;
