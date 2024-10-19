import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { notifyError, notifySuccess } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import TaxService from "@/services/TaxService";

const useTaxSubmit = () => {
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
    limitData,
    toggleModal,
    toggleBulkDrawer,
    taxEdit,
    setTaxEdit,
  } = useContext(SidebarContext);
  // console.log("taxEdit-->", taxEdit);

  const [taxList, setTaxList] = useState([]);
  const buttonType = ["PERCENTAGE (%)", "FLAT IN ₹"];
  const [taxName, setTaxName] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [taxType, setTaxType] = useState("PERCENTAGE (%)");
  const [taxUpdateId, setTaxUpdateId] = useState("");
  const [taxPage, setTaxPage] = useState("");

  // console.log("taxdata##=", {
  //   taxName: taxName,
  //   taxAmount: taxAmount,
  //   taxType: taxType,
  // });
  // console.log("taxList=", taxList);
  // console.log(
  //   "this is scrolling test  ------################## ############### ####### ############## ######## ###### ############"
  // );

  //   -------------type select-----------
  const handleSelectType = (val) => {
    setTaxType(val);
  };

  //   -------------Tax Name-----------------
  const handleTaxName = (value) => {
    setValue("taxName", value);
    setTaxName(value);
    console.log("value", value);
  };
  //----------------isNumber----------------

  const isNumber = (input) => {
    const numberPattern = /^\d+$/;
    return numberPattern.test(input);
  };
  //   -------------Tax Amount-----------------
  const handleTaxAmount = (value) => {
    if (isNumber(value)) {
      setValue("taxAmount", value);
      setTaxAmount(value);
    } else {
      notifyError("Please enter valid amount");
    }
  };
  //   --------------------- submit form------------------------
  const onSubmit = () => {
    console.log("taxdata##=", {
      taxName: taxName,
      taxAmount: taxAmount,
      taxType: taxType,
    });
    let error = 0;
    if (taxName.trim().length == 0) {
      error = error + 1;
      notifyError("Please enter Tax Name.");
    }
    if (!taxAmount.trim()) {
      error = error + 1;
      notifyError("please fill tax amount.");
    }
    if (error === 0) {
      validation();
    }
  };
  const validation = () => {
    let type = taxType === "PERCENTAGE (%)" ? "%" : "₹";
    let amountType = taxType === "PERCENTAGE (%)" ? "percentage" : "flatin";
    let newTax = {
      taxName: taxName,
      taxType: amountType,
      currencySymbol: type,
      amount: parseInt(taxAmount, 10),
      id: taxUpdateId ? taxUpdateId : "",
    };
    console.log("newTax=>",newTax);

    TaxService.postTax(newTax).then((res) => {
      console.log("taxResponse", res);
      if (res?.success === true) {
        notifySuccess(res.message);
        if (taxUpdateId) {
          toggleDrawer();
        }
        setTaxUpdateId("");
        getTaxDetails();
        setTaxName("");
        setTaxAmount("");
        setValue("taxAmount", "");
        setValue("taxName", "");
        setTaxType("PERCENTAGE (%)");
        clearErrors("taxAmount");
        clearErrors("taxName");
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

    let AllData = [...taxList];
    // console.log("AllData===>", AllData);

    AllData.forEach((item, i) => {
      if (item._id === id) {
        console.log("item===>", item);
        console.log("idddddd", id);
        setTaxEdit(item);
        setTaxUpdateId(id);
        setValue("taxName", item.taxName);
        setTaxName(item.taxName);

        setValue("taxAmount", item.amount);
        setTaxAmount(item.amount);
        setTaxType(item.type === "percentage" ? "PERCENTAGE (%)" : "FLAT IN ₹");
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
  const getTaxDetails = () => {
    TaxService.getTax({ page: currentPage, limit: limitData }).then((res) => {
      if (res?.success === true) {
        notifySuccess(res.message);
        setTaxList(res.taxDetails);
        setTaxPage(res.Pagination);
      } else {
        notifyError(res.message);
      }
    });
  };

  return {
    taxName,
    setTaxName,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    errors,
    taxAmount,
    buttonType,
    setTaxAmount,
    taxList,
    handleTaxName,
    handleTaxAmount,
    taxType,
    taxPage,
    handleSelectType,
    onSubmit,
    handleCancel,
    handleUpdate,
    getTaxDetails,
    cancelUpdate,
    validation,
  };
};

export default useTaxSubmit;
