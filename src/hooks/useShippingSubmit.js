import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { notifyError, notifySuccess } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import TaxService from "@/services/TaxService";
import shippingService from "@/services/ShippingService";

const useShippingSubmit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const {
    toggleDrawer,
    isDrawerOpen,
    currentPage,
    toggleModal,
    limitData,
    toggleBulkDrawer,
    taxEdit,
    setTaxEdit,
  } = useContext(SidebarContext);
  // console.log("taxEdit-->", taxEdit);

  const [shippingIcon, setShippingIcon] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("");
  const [shippingCharges, setShippingCharges] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [shippingId, setShippingId] = useState("");
  const [shippingResponse, setShippingResponse] = useState("");
  const [shippingPage, setShippingPage] = useState("");

  console.log("shipping details", {
    shippingIcon: shippingIcon,
    shippingMethod: shippingMethod,
    shippingCharges: shippingCharges,
    deliveryTime: deliveryTime,
  });

  //   -------------type select-----------
  const handleSelectType = (val) => {
    setTaxType(val);
  };

  //   -------------shipping Method-----------------
  const handleShippingMethod = (value) => {
    setValue("shippingMethod", value);
    setShippingMethod(value);
    console.log("value", value);
  };
  //----------------isNumber----------------

  const isNumber = (input) => {
    const numberPattern = /^\d+$/;
    return numberPattern.test(input);
  };
  //   -------------Charges Amount-----------------
  const handleShippingCharges = (value) => {
    if (isNumber(value)) {
      setValue(
        "shippingCharges",
        value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-")
      );
      setShippingCharges(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    } else {
      notifyError("Please enter valid amount");
    }
  };
  //   -------------Charges Amount-----------------
  const handleDeliveryTime = (value) => {
    if (isNumber(value)) {
      setValue(
        "deliveryTime",
        value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-")
      );
      setDeliveryTime(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    } else {
      notifyError("Please enter valid amount");
    }
  };
  //   --------------------- submit form------------------------
  const onSubmit = () => {
    let error = 0;
    if (shippingIcon.length === 0) {
      error = error + 1;
      notifyError("Please select Icon.");
    }
    if (shippingMethod.trim().length == 0) {
      error = error + 1;
      notifyError("Please enter shipping method.");
    }

    if (deliveryTime && parseInt(deliveryTime, 10) == 0) {
      error = error + 1;
      notifyError("please give Delivery date.");
    }
    if (error === 0) {
      validation();
    }
  };
  const validation = () => {
    let newShipping = {
      id: shippingId ? shippingId : "",
      shippingMethod: shippingMethod,
      icon: shippingIcon.length > 0 ? shippingIcon[0] : "",
      cost: parseInt(shippingCharges, 10),
      deliveryTime: deliveryTime,
    };

    shippingService.postShipping(newShipping).then((res) => {
      if (res?.success === true) {
        notifySuccess(res.message);
        if (shippingId) {
          toggleDrawer();
        }
        setValue("shippingMethod", "");
        setShippingMethod("");
        setValue("shippingCharges", "");
        setShippingCharges("");
        setValue("deliveryTime", "");
        setDeliveryTime("");
        setShippingIcon([]);
        clearErrors("shippingMethod");
        clearErrors("shippingCharges");
        clearErrors("deliveryTime");
        getShippingDetails();
      } else {
        notifyError(res.message);
      }
    });
  };
  const handleCancel = () => {
    setTaxName("");
    setTaxAmount("");
    setValue("taxAmount", "");
    setValue("taxName", "");
    setTaxType("PERCENTAGE (%)");
    clearErrors("taxAmount");
    clearErrors("taxName");
  };
  // ----------------select for update tax------------
  const handleUpdate = (id) => {
    toggleDrawer();

    let AllData = [...shippingResponse];
    // console.log("AllData===>", AllData);

    AllData.forEach((item, i) => {
      if (item._id === id) {
        setValue("shippingMethod", item.shippingMethod);
        setShippingMethod(item.shippingMethod);
        setValue("shippingCharges", item.cost);
        setShippingCharges(item.cost);
        setValue("deliveryTime", item.deliveryTime);
        setDeliveryTime(item.deliveryTime);
        setShippingIcon([item.icon]);
        setShippingId(id);
      }
    });
  };
  // ----------------cancel update------------------
  const cancelUpdate = () => {
    setTaxName("");
    setTaxAmount("");
    setValue("taxAmount", "");
    setValue("taxName", "");
    setTaxType("PERCENTAGE (%)");
    clearErrors("taxAmount");
    clearErrors("taxName");
    toggleDrawer();
    handleCancel();
  };
  // -------------------get tax details------------------------
  const getShippingDetails = () => {
    shippingService
      .getShipping({ page: currentPage, limit: limitData })
      .then((res) => {
        if (res?.success === true) {
          notifySuccess(res?.message);
          setShippingResponse(res?.shippingDetailsdData);
          setShippingPage(res?.Pagination);
        } else {
          notifyError(res?.message);
        }
      });
  };
  return {
    shippingIcon,
    setShippingIcon,
    shippingMethod,
    shippingCharges,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    errors,
    deliveryTime,
    shippingPage,
    handleShippingMethod,
    handleShippingCharges,
    handleSelectType,
    handleDeliveryTime,
    onSubmit,
    handleCancel,
    handleUpdate,
    shippingResponse,
    getShippingDetails,
    cancelUpdate,
    validation,
  };
};

export default useShippingSubmit;
