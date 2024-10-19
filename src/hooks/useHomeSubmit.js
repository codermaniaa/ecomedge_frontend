import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { notifyError, notifySuccess } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import TaxService from "@/services/TaxService";
import shippingService from "@/services/ShippingService";
import homeService from "@/services/HomeService";

const useHomeSubmit = () => {
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

  const [homeIcon, setHomeIcon] = useState([]);
  const [heading, setHeading] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [dec, setDec] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const [homeId, setHomeId] = useState("");
  const [homeResponse, setHomeResponse] = useState("");
  const [homePage, setHomePage] = useState("");

  console.log("shipping details", {
    homeIcon: homeIcon,
    heading: heading,
    ctaText: ctaText,
    dec: dec,
    ctaLink: ctaLink,
  });

  //   -------------type select-----------
  const handleSelectType = (val) => {
    setTaxType(val);
  };

  //   -------------shipping Method-----------------
  const handleShippingMethod = (value) => {
    setValue("heading", value);
    setHeading(value);
    console.log("value", value);
  };
  // -----------description---------------
  const handleDec = (value) => {
    setValue("description", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    setDec(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };
  //----------------isNumber----------------

  const isNumber = (input) => {
    const numberPattern = /^\d+$/;
    return numberPattern.test(input);
  };
  //   -------------Charges Amount-----------------
  const handleCtaTextCharges = (value) => {
    setValue("ctaText", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    setCtaText(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };
  //   -------------ctaLink-----------------
  const handleCtaLinkCharges = (value) => {
    setValue("ctaLink", value);
    setCtaLink(value);
  };
  //   --------------------- submit form------------------------
  const onSubmit = () => {
    let error = 0;
    if (homeIcon.length === 0) {
      error = error + 1;
      notifyError("Please select Icon.");
    }
    if (heading.trim().length == 0) {
      error = error + 1;
      notifyError("Please enter shipping method.");
    }
    if (error === 0) {
      validation();
    }
  };
  const validation = () => {
    let newHomePage = {
      image: homeIcon && homeIcon[0],
      heading: heading,
      description: dec,
      ctaText: ctaText,
      ctaLink: ctaLink,
    };
    if(homeId && homeId !==""){
      newHomePage.id = homeId
    }
    homeService.postHome(newHomePage).then((res) => {
      if (res?.success === true) {
        notifySuccess(res.message);
        if (homeId) {
          toggleDrawer();
        }
        setValue("heading", "");
        setHeading("");
        setValue("ctaText", "");
        setValue("ctaLink", "");
        setValue("description", "");
        setDec("");

        setHomeIcon([]);
        setCtaText("");
        setCtaLink("");
        setHomeIcon([]);
        clearErrors("heading");
        clearErrors("ctaText");
        clearErrors("ctaLink");
        clearErrors("description");

        getHomeDetails();
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

    let AllData = [...homeResponse];
    // console.log("AllData===>", AllData);

    AllData.forEach((item, i) => {
      if (item._id === id) {
        setValue("heading", item.heading);
        setHeading(item.heading);
        setValue("ctaText", item.ctaText);
        setCtaText(item.ctaText);
        setValue("ctaLink", item.ctaLink);
        setCtaLink(item.ctaLink);
        setValue("description", item.description);
        setDec(item.description);
        setHomeIcon([item.image]);
        setHomeId(id);
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
  const getHomeDetails = () => {
    homeService.getHome({ page: currentPage, limit: limitData }).then((res) => {
      if (res?.success === true) {
        notifySuccess(res?.message);
        setHomeResponse(res?.HomepageDetails);
        setHomePage(res?.Pagination);
      } else {
        notifyError(res?.message);
      }
    });
  };
  return {
    homeIcon,
    setHomeIcon,
    heading,
    ctaText,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    errors,
    homePage,
    dec,
    ctaLink,
    handleDec,
    handleShippingMethod,
    handleCtaTextCharges,
    handleSelectType,
    handleCtaLinkCharges,
    onSubmit,
    handleCancel,
    handleUpdate,
    homeResponse,
    getHomeDetails,
    cancelUpdate,
    validation,
  };
};

export default useHomeSubmit;
