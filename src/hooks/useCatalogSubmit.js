import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { notifyError, notifySuccess } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import CatalogService from "@/services/CatalogService";

const useCatalogSubmit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const {
    toggleDrawer,
    currentPage,
    limitData,
  } = useContext(SidebarContext);

  const [brandIcon, setBrandIcon] = useState([]);
  const [description, setDescription] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandFile, setBrandFile] = useState([]);
  const [brandFileName, setBrandFileName] = useState("");
  const [itemId, setItemId] = useState("");
  const [getAllList, setGetAllList] = useState([]);
  const [catalogPage, setCatalogPage] = useState({});

  const handleSelectType = (val) => {
    // Logic for handling type selection (if needed)
  };

  const handleBrandName = (value) => {
    // setValue("brandName", value);
    setBrandName(value);
  };

  const handleDescription = (value) => {
    // setValue("description", value);
    setDescription(value);
  };



  const  onSubmit = (data) => {
    console.log("brandIcon",brandIcon);
    console.log("brandFile",brandFile);
    let error = 0;
    if (brandIcon.length === 0) {
      error += 1;
      notifyError("Please select Icon.");
    }
    if (brandName.trim().length === 0) {
      error += 1;
      notifyError("Please enter name.");
    }
    if (!brandFile) {
      error += 1;
      notifyError("Please select file.");
    }
    if (!brandFileName) {
      error += 1;
      notifyError("Please select file.");
    }

    if (error === 0) {
      validation();
    }
  };

  const validation = () => {
    let newCatalog = {
      id: itemId ? itemId : "",
      brandName: brandName,
      brandLogo: brandIcon[0],
      description: description,
      brandFile: brandFile[0],
      brandFileName:brandFileName,
    };

    CatalogService.postCatalog(newCatalog).then((res) => {
      if (res?.success === true) {
        notifySuccess(res.message);
        setValue("brandName", "");
        setBrandName("");
        setValue("description", "");
        setDescription("description","");
        setBrandIcon([]);
        setBrandFile([]);
        setBrandFileName("");
        clearErrors("brandName");
        clearErrors("description");
        getCatalogDetails();
        // toggleDrawer();
      } else {
        notifyError(res.message);
      }
    });
  };

  const handleCancel = () => {
    setBrandName("");
    setDescription("");
    setBrandIcon([]);
    setBrandFile([]);
    setBrandFileName("");
   
  };
  const cancelUpdate = () => {
    setBrandName("");
    setDescription("");
    setBrandIcon([]);
    setBrandFile([]);
    setBrandFileName("");
    toggleDrawer();
  };


  const handleUpdate = (id) => {
    // toggleDrawer();
    let allData = [...getAllList];
    allData.forEach((item) => {
      console.log("setItemId",item);
      console.log("description1",item.description);
      if (item._id === id) {
        setItemId(item._id);
        setValue("brandName", item.brandName);
        setBrandName(item.brandName);
        setValue("description", item.description);
        setDescription(item.description);
        setBrandIcon([item.brandLogo]);
        setBrandFile([item.brandFile]);
      }
    });
  };



  
  const getCatalogDetails = () => {
    CatalogService.getCatalog({ page: currentPage, limit: limitData }).then(
      (res) => {
        if (res?.success === true) {
          console.log("brandCatalogDetailsdData",res);
          setGetAllList(res?.brandCatalogDetailsdData);
          setCatalogPage(res?.Pagination);
        } else {
          notifyError(res.message);
        }
      }
    );
  };

  useEffect(() => {
    getCatalogDetails();
  }, [currentPage, limitData]);


  return {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    errors,
    isSubmitting,
    onSubmit,
    handleCancel,
    handleUpdate,
    cancelUpdate,
    validation,
    catalogPage,
    brandName,
    brandIcon,
    setBrandIcon,
    brandFileName,
    setBrandFileName,
    description,
    brandFile,
    getAllList,
    setBrandFile,
    handleDescription,
    handleBrandName,
    getCatalogDetails,
    itemId,
  };
};


export default useCatalogSubmit;
