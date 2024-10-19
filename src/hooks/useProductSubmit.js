import combinate from "combinate";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";

//internal import
import useAsync from "@/hooks/useAsync";
import { SidebarContext } from "@/context/SidebarContext";
import AttributeServices from "@/services/AttributeServices";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import SettingServices from "@/services/SettingServices";
import TaxService from "@/services/TaxService";

const useProductSubmit = (id) => {
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);

  const { data: attribue } = useAsync(AttributeServices.getShowingAttributes);
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  // react ref
  const resetRef = useRef([]);
  const resetRefTwo = useRef("");

  // react hook
  const [imageUrl, setImageUrl] = useState([]);
  const [tag, setTag] = useState([]);
  const [values, setValues] = useState({});
  let [variants, setVariants] = useState([]);
  const [variant, setVariant] = useState([]);
  const [totalStock, setTotalStock] = useState();
  const [quantity, setQuantity] = useState();

  const [originalPrice, setOriginalPrice] = useState();
  const [price, setPrice] = useState();
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [isBasicComplete, setIsBasicComplete] = useState(false);
  const [tapValue, setTapValue] = useState("Basic Info");
  const [isCombination, setIsCombination] = useState(false);
  const [attTitle, setAttTitle] = useState([]);
  const [variantTitle, setVariantTitle] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [productId, setProductId] = useState("");
  const [updatedId, setUpdatedId] = useState(id);
  const [imgId, setImgId] = useState("");
  const [isBulkUpdate, setIsBulkUpdate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState([]);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState(lang);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slug, setSlug] = useState("");

  const [userManual, setUserManual] = useState([]);
  const [technical, setTechnical] = useState([]);
  const [dataSheet, setDataSheet] = useState([]);

  const [userManualNames,setUserManualNames] = useState([]);
  const [technicalSpecNames,setTechnicalSpecNames] = useState([]);
  const [datasheetNames,setDatasheetNames] = useState([]);

  const [tax, setTax] = useState([]);
  const [minimumOrder, setMinimumOrder] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [taxOption, setTaxOption] = useState([]);
  const [taxRes, setTaxRes] = useState([]);
  const [slabStatus, setSlabStatus] = useState(true);
  const [askForPrice, setAskForPrice] = useState(false);
  const [fewLeft, setFewLeft] = useState(false);
  const [fileName, setFileName] = useState("select file");
  const [hsnNumber, setHsnNumber] = useState("");

  //Product specification
  const [productType, setProductType] = useState("");
  const [productLine, setProductLine] = useState("");
  const [brand, setBrand] = useState("");
  const [uom, setUom] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [importerName, setImporterName] = useState("");
  const [importerAddress, setImporterAddress] = useState("");
  const [isReturnable, setIsreturnable] = useState(false);
  const [returnDays, setReturnDays] = useState(1);



  const [slab, setSlab] = useState([
    // {
    //   name: "MOQ slab 1",
    //   minQuantity: 0,
    //   maxQuantity: 0,
    //   moqSalePrice: 0,
    // },
  ]);
  // console.log("step1", dataSheet);
  // console.log("All product drawer data=>", {
  //   dataSheet: dataSheet
  // });

  // console.log(
  //   "defaultCategory",
  //   defaultCategory,
  //   "selectedCategory",
  //   selectedCategory
  // );

  // handle click
  const onCloseModal = () => setOpenModal(false);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!imageUrl) return notifyError("Image is required!");

      if (!askForPrice) {
        if (data.originalPrice < data.price) {
          setIsSubmitting(false);
          return notifyError(
            "SalePrice must be less then or equal of product price!"
          );
        }
      }
      if (!defaultCategory[0]) {
        setIsSubmitting(false);
        return notifyError("Default Category is required!");
      }

      const updatedVariants = variants.map((v, i) => {
        const newObj = {
          ...v,
          price: Number(v?.price || 0),
          originalPrice: Number(v?.originalPrice || 0),
          discount: Number(v?.discount || 0),
          quantity: v?.quantity !==null ? v.quantity : null,
        };
        return newObj;
      });
      setIsBasicComplete(true);
      setPrice(data.price);
      setQuantity(data.stock);
      setBarcode(data.barcode);
      setSku(data.sku);
      setOriginalPrice(data.originalPrice);


      // const titleTranslates = await handlerTextTranslateHandler(
      //   data.title,
      //   language
      // );
      // const descriptionTranslates = await handlerTextTranslateHandler(
      //   data.description,
      //   language
      // );


      const productImage = (arr, productImages = false) => {
        let imageArr = [];
        const img = arr?.map((item, i) => {
          let newImg = {
            medialink: item
          };
          productImages ? newImg.isDefault = i === 0 ? true : false : ""
          imageArr.push(newImg);
        });
        return imageArr;
      };



      const AllTax = tax?.map((item) => item);
      const taxData = (allTaxArr, CurrTaxArr) => {
        let newArr = [];
        for (let i = 0; i < allTaxArr.length; i++) {
          for (let j = 0; j < CurrTaxArr.length; j++) {
            if (CurrTaxArr[j]._id === allTaxArr[i]?._id) {
              newArr.push(allTaxArr[i]._id);
            }
          }
        }
        return newArr;
      };
 

      
      var productData = {
        barcode: data?.barcode || "",
        title: data.title,
        askForPrice: askForPrice,
        description: data.description ? data.description : "",
        slug: data.slug
          ? data.slug
          : data.title.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"),
        categories: selectedCategory.map((item) => item._id),
        category: defaultCategory[0]._id,
        image: productImage(imageUrl, true),
        fewLeft: fewLeft,
        stock:
          fewLeft === true
            ? 100
            : variants?.length < 1
              ? data.stock
              : totalStock,
        tax: taxData(taxRes, tax),
        warrantyPeriods: {
          duration: warrantyPeriod,
          unit: "months",
        },
        sku: data.sku,
        minimumOrderOfQuantity: askForPrice == true ? 1 : minimumOrder,
        moqSlab: slab,
        sales: 100,
        tag: tag,
        prices: {
          price:askForPrice == true ? "" : data.originalPrice || 0,
          salePrice: askForPrice == true ? "" : data.price || "",
          discount: data.originalPrice && data.originalPrice ?  data.originalPrice - data.price :"",
        },
        variants:
          // askForPrice == true ? [] : isCombination ? updatedVariants : [],
          isCombination && updatedVariants?.length > 0 ? updatedVariants : [],
        isCombination:
          // askForPrice == true
          //   ? false
          //   : updatedVariants?.length > 0
          //     ? isCombination
          //     : false, 
          isCombination && updatedVariants?.length > 0 ? isCombination : false,
        status: "show",
        userManual: productImage(userManual),
        technicalSpecification: productImage(technical),
        dataSheet: productImage(dataSheet),
        HsnSacNumber: hsnNumber,
        productSpecification: {}
      };

      if (productType !== "") {
        productData.productSpecification.productType = productType;
      }
      if (productLine !== "") {
        productData.productSpecification.productLine = productLine;
      }

      if (brand !== "") {
        productData.productSpecification.brand = brand;
      }

      if (uom !== "") {
        productData.productSpecification.uom = uom;
      }

      if (originCountry !== "") {
        productData.productSpecification.originCountry = originCountry;
      }

      if (importerName !== "") {
        productData.productSpecification.importerName = importerName;
      }

      if (importerAddress !== "") {
        productData.productSpecification.importerAddress = importerAddress;
      }

      if (importerAddress !== "") {
        productData.productSpecification.importerAddress = importerAddress;
      }

      if (isReturnable) {
        productData.productSpecification.returnPolicy = {}
        productData.productSpecification.returnPolicy.isReturnable = isReturnable;
        productData.productSpecification.returnPolicy.returnDays = returnDays;
      }


      // return setIsSubmitting(false);
      let check = true;
      if (slab.length > 0) {
        for (let ele of slab) {
          if (parseInt(ele.minQuantity, 10) > parseInt(minimumOrder, 10)) {
            if (parseInt(ele.minQuantity, 10) > parseInt(ele.maxQuantity, 10)) {
              setSlabStatus(false);
              check = false;
              setIsSubmitting(false);

              notifyError(`in ${ele.name} ,min slab is less the MAx Slab`);
            }
          } else {
            setSlabStatus(false);
            check = false;
            setIsSubmitting(false);

            notifyError(
              `in ${ele.name}, min slab is greater then minimum order quantity`
            );
          }
        }
      }
      if (check === true) {
        if (updatedId) {
          const res = await ProductServices.updateProduct(
            updatedId,
            productData
          );
          if (res) {
            if (isCombination) {
              setIsUpdate(true);
              notifySuccess(res.message);
              setIsBasicComplete(true);
              setIsSubmitting(false);
              handleProductTap("Combination", true);
            } else {
              setIsUpdate(true);
              notifySuccess(res.message);
              setIsSubmitting(false);
              setUserManual([])
              setWarrantyPeriod('')
              setValue('warrantyPeriod', '')
            }
          }

          if (
            tapValue === "Combination" ||
            (tapValue !== "Combination" && !isCombination)
          ) {
            closeDrawer();
          }
        } else {
          const res = await ProductServices.addProduct(productData);
          console.log("res..after add product.. ",res);
          if (isCombination) {
            setUpdatedId(res._id);
            // console.log("1...........");
            // setValue("title", res.title[language ? language : "en"]);
            // console.log("2...........");

            // setValue(
            //   "description",
            //   res.description[language ? language : "en"]
            // );
            // console.log("3...........");

            // setValue("slug", res.slug);
            // setValue("show", res.show);
            // setValue("barcode", res.barcode);
            // setValue("stock", res.stock);
            // setTag(JSON.parse(res.tag));
            // setImageUrl(res.image);
            // setVariants(res.variants);
            // console.log("4...........");
            // setValue("productId", res.productId);
            // setProductId(res.productId);
            // setOriginalPrice(res?.prices?.originalPrice);
            // setPrice(res?.prices?.price);
            // setBarcode(res.barcode);
            // setSku(res.sku);
            // setValue("minimumOrder", "");
            // setValue("warrantyPeriod", "");
            // setWarrantyPeriod("");
            // setValue("hsnNumber", "");
            // setHsnNumber("");
            // setSlab([
            //   {
            //     name: "MOQ slab 1",
            //     minQuantity: 0,
            //     maxQuantity: 0,
            //     moqSalePrice: 0,
            //   },
            // ]);
            // console.log("5...........");

            // const result = res.variants.map(
            //   ({
            //     originalPrice,
            //     price,
            //     discount,
            //     quantity,
            //     barcode,
            //     sku,
            //     productId,
            //     image,
            //     ...rest
            //   }) => rest
            // );

            // setVariant(result);
            setIsUpdate(true);
            setIsBasicComplete(true);
            setIsSubmitting(false);
            handleProductTap("Combination", true);
            notifySuccess("Product Added Successfully!");
          } else {
            setIsUpdate(true);
            notifySuccess("Product Added Successfully!");
          }

          if (
            tapValue === "Combination" ||
            (tapValue !== "Combination" && !isCombination)
          ) {
            setIsSubmitting(false);
            closeDrawer();
          }
        }
      }
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err.message);
      // closeDrawer();
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setSlug("");
      setLanguage(lang);
      setValue("language", language);
      handleProductTap("Basic Info", true);
      setResData({});
      setValue("sku");
      setValue("title");
      setValue("slug");
      setValue("description");
      setValue("quantity");
      setValue("stock");
      setValue("originalPrice");
      setValue("price");
      setValue("barcode");
      setValue("productId");
      setValue("hsnNumber");
      setValue("setWarrantyPeriod");

      setValue("productType");
      setValue("productLine");
      setValue("brand");
      setValue("uom");
      setValue("originCountry");
      setValue("importerName");
      setValue("importerAddress");
      setValue("returnDays");

      setProductType('')
      setProductLine('')
      setBrand('')
      setUom('')
      setOriginCountry('')
      setImporterName('')
      setImporterAddress('')
      setIsreturnable('')
      setReturnDays('');

      setProductId("");
      // setValue('show');

      setImageUrl([]);
      setUserManual([])
      setTechnical([])
      setDataSheet([])

      setUserManualNames([])
      setTechnicalSpecNames([])
      setDatasheetNames([])
      setTax([]);
      setTag([]);
      setVariants([]);
      setVariant([]);
      setValues({});
      setTotalStock();
      setSelectedCategory([]);
      setDefaultCategory([]);
      if (location.pathname === "/admin/products") {
        resetRefTwo?.current?.resetSelectedValues();
      }

      clearErrors("sku");
      clearErrors("title");
      clearErrors("slug");
      clearErrors("description");
      clearErrors("stock");
      clearErrors("quantity");
      setValue("stock", );
      setValue("costPrice", );
      setValue("price", );
      setValue("originalPrice", );
      clearErrors("show");
      clearErrors("barcode");
      setIsCombination(false);
      setIsBasicComplete(false);
      setIsSubmitting(false);
      setAttributes([]);

      setUpdatedId();
      return;
    } else {
      handleProductTap("Basic Info", true);
    }

    if (id) {
      setIsBasicComplete(true);
      (async () => {
        try {
          let res = await ProductServices.getProductById(id);


          if (res && res.product) {
            res = res.product;
            // let response = res?.tax;
            // let allTax = [];
            // for (let ele of response) {
            //   taxRes.map((item) => {
            //     if (ele == item._id) {
            //       allTax.push(item);
            //     }
            //   });
            // }
            // let arr = allTax.map((item) => ({
            //   amount: `${item.taxName} (${item.taxType === "flatin" ? "₹" : ""}${
            //     item.amount
            //   } ${item.taxType === "percentage" ? "%" : ""})`,
            //   _id: item._id,
            //   taxName: item.taxName,
            //   taxType: item.taxType,
            // }));
            let arr = res?.tax?.map((item) => ({
              amount: `${item.taxName} (${item.taxType === "flatin" ? "₹" : ""
                }${item.amount} ${item.taxType === "percentage" ? "%" : ""})`,
              _id: item._id,
              taxName: item.taxName,
              taxType: item.taxType,
            }));
            
            // setTaxOption(arr);
            setTax(arr);

            setResData(res);
            setSlug(res.slug);
            setUpdatedId(res._id);
            setValue("title", res.title);
            setValue("description", res.description);
            setValue("slug", res.slug);
            setValue("show", res.show);
            setValue("sku", res.sku);
            setValue("barcode", res.barcode);
            setValue("stock", res.stock);
            setValue("productId", res.productId);
            setValue("price", res?.prices?.salePrice);
            setValue("originalPrice", res?.prices?.price);
            setValue("stock", res?.stock);
            setMinimumOrder(res?.minimumOrderOfQuantity);
            setValue("minimumOrder", res?.minimumOrderOfQuantity);
            setWarrantyPeriod(res?.warrantyPeriods?.duration);
            setValue("warrantyPeriod", res?.warrantyPeriods?.duration);
            setTag(res?.tag);
            setValue("hsnNumber", res?.HsnSacNumber);

            setHsnNumber(res?.HsnSacNumber), setAskForPrice(res?.askForPrice);
            setFewLeft(res?.fewLeft);
            setProductId(res.productId ? res.productId : res._id);
            setBarcode(res.barcode);
            setSku(res.sku);

            res.categories.map((category) => {
              category.name = category?.name;

              return category;
            });

            res.category.name = res?.category?.name;

            const allImg = (arr,documentType) => {
              let img = [];
              arr.map((item) =>{
                img.push(item?.medialink)
                
                if(documentType == "usermanual"){
                  
                  setUserManualNames((userManual) => [...userManual, item?.medialink.split("product/")[1]]);
                }
                 if(documentType == "technicalspec"){
                  setTechnicalSpecNames((techspec) => [...techspec, item?.medialink.split("product/")[1]]);
                }
                 if(documentType == "datasheet"){
                  setDatasheetNames((techspec) => [...techspec, item?.medialink.split("product/")[1]]);
                 }
              });
              return img;
            };


            setSelectedCategory(res.categories && res.categories);
            setDefaultCategory([res?.category && res?.category]);

            setImageUrl(res?.image && allImg(res?.image));
            setUserManual(res?.userManual && allImg(res?.userManual,"usermanual"));
            setTechnical(
              res?.technicalSpecification && allImg(res?.technicalSpecification,"technicalspec")
            );
            setDataSheet(res?.dataSheet && allImg(res?.dataSheet,"datasheet"));
            setVariants(res.variants);
            setIsCombination(res.isCombination);
            setQuantity(res?.stock);
            setTotalStock(res.stock);
            setOriginalPrice(res?.prices?.price);
            setPrice(res?.prices?.salePrice);
            setSlab(res.moqSlab);


            setProductType(res.productSpecification?.productType 
              )
            setProductLine(res.productSpecification?.productLine )
            setBrand(res.productSpecification?.brand )
            setUom(res.productSpecification?.uom )
            setOriginCountry(res.productSpecification?.originCountry )
            setImporterName(res.productSpecification?.importerName )
            setImporterAddress(res.productSpecification?.importerAddress )
            setIsreturnable(res.productSpecification?.returnPolicy?.isReturnable )
            setReturnDays(res.productSpecification?.returnPolicy?.returnDays );
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
    setValue,
    isDrawerOpen,
    location.pathname,
    clearErrors,
    language,
    lang,
  ]);
  useEffect(() => {
    setValue("price", 0);
    setPrice(0);
  }, [askForPrice]);

  //for filter related attribute and extras for every product which need to update
  useEffect(() => {
    const result = attribue
      ?.filter((att) => att.option !== "Checkbox")
      .map((v) => {
        return {
          label: v?.title,
          value: v?.title,
        };
      });

    setAttTitle([...result]);

    const res = Object?.keys(Object.assign({}, ...variants));
    const varTitle = attribue?.filter((att) => res.includes(att._id));
    
    if (variants?.length > 0) {
      const totalStock = variants?.reduce((pre, acc) => pre + acc.quantity,0);
      // setTotalStock(Number(totalStock));
      if(totalStock == 0){
        let allVariantsNull = true;
        variants.map(cur_variant =>{
          if(cur_variant.quantity !== null){
            allVariantsNull = false;
          }
        })
        if(allVariantsNull){
          setTotalStock(null)
        }else{
          setTotalStock(Number(totalStock))
        }
      }else{
        setTotalStock(Number(totalStock));
      }
    }
    setVariantTitle(varTitle);
  }, [attribue, variants, language, lang]);

  //for adding attribute values
  const handleAddAtt = (v, el) => {
    const result = attribue.filter((att) => {
      const attribueTItle = att?.title;
      return v.some((item) => item.label === attribueTItle);
    });
    const attributeArray = result.map((value) => {
      const attributeTitle = value?.title;
      return {
        ...value,
        label: attributeTitle,
        value: attributeTitle,
      };
    });
    setAttributes(attributeArray);
  };

  //generate all combination combination
  const handleGenerateCombination = () => {
    if (Object.keys(values).length === 0) {
      return notifyError("Please select a variant first!");
    }
    const result = variants.filter(
      ({
        originalPrice,
        discount,
        price,
        quantity,
        barcode,
        sku,
        productId,
        image,
        ...rest
      }) => JSON.stringify({ ...rest }) !== "{}"
    );


    // console.log("result", result);
    setVariants(result);
    const combo = combinate(values);
    combo.map((com, i) => {
      if (JSON.stringify(variant).includes(JSON.stringify(com))) {
        return setVariant((pre) => [...pre, com]);
      } else {
        const newCom = {
          ...com,
 
          originalPrice: originalPrice || 0,
          price: price || 0,
          quantity: Number(quantity),
          discount: Number(originalPrice - price),
          productId: productId && productId + "-" + (variants.length + i),
          barcode: barcode,
          sku: sku,
          image: imageUrl[0] || "",
        };

        setVariants((pre) => [...pre, newCom]);
        return setVariant((pre) => [...pre, com]);
      }
    });

    setValues({});

    // resetRef?.current?.map((v, i) =>
    //   resetRef?.current[i]?.resetSelectedValues()
    // );
  };

  //for clear selected combination
  const handleClearVariant = () => {
    setVariants([]);
    setVariant([]);
    setValues({});
    resetRef?.current?.map(
      async (v, i) => await resetRef?.current[i]?.resetSelectedValues()
    );

    // console.log('value', selectedList, removedItem, resetRef.current);
  };

  //for edit combination values
  const handleEditVariant = (variant) => {
    setTapValue("Combine");
  };

  //for remove combination values
  const handleRemoveVariant = (vari, ext) => {
    
    swal({
      title: `Are you sure to delete this ${ext ? "Extra" : "combination"}!`,
      text: `(If Okay, It will be delete this ${ext ? "Extra" : "combination"
        })`, 
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const result = variants.filter((v) => v !== vari);
        setVariants(result);
        
        const {
          originalPrice,
          price,
          discount,
          quantity,
          barcode,
          sku,
          productId,
          image,
          ...rest
        } = vari;
        const res = variant.filter(
          (obj) => JSON.stringify(obj) !== JSON.stringify(rest)
        );
        setVariant(res);
        setIsBulkUpdate(true);
        // setTimeout(() => setIsBulkUpdate(false), 500);
        const timeOutId = setTimeout(() => setIsBulkUpdate(false), 500);
        return clearTimeout(timeOutId);
      }
    });
  };

  // handle notification for combination and extras
  const handleIsCombination = () => {
    if (isCombination && variantTitle.length > 0) {
      swal({
        title: "Are you sure to remove combination from this product!",
        text: "(It will be delete all your combination and extras)",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((value) => {
        // console.log(value);
        if (value) {
          setIsCombination(!isCombination);
          setTapValue("Basic Info");
          // setVariants([]);
          // setVariant([]);
        }
      });
    } else {
      setIsCombination(!isCombination);
      setTapValue("Basic Info");
    }
  };

  //for select bulk action images
  const handleSelectImage = (img) => {
    if (openModal) {
      variants[imgId].image = img;
      setOpenModal(false);
    }
  };

  //for select individual combination image
  const handleSelectInlineImage = (id) => {
    setImgId(id);
    setOpenModal(!openModal);
  };

  //this for variant/combination list
  const handleSkuBarcode = (value, name, id) => {
    variants[id][name] = value;
  };

  const handleProductTap = (e, value, name) => {
    // console.log(e);

    if (value) {
      if (!value)
        return notifyError(
          `${"Please save product before adding combinations!"}`
        );
    } else {
      if (!isBasicComplete)
        return notifyError(
          `${"Please save product before adding combinations!"}`
        );
    }
    setTapValue(e);
  };

  //this one for combination list
  const handleQuantityPrice = (value, name, id, variant) => {
    // console.log(
    //   "handleQuantityPrice",
    //   "name",
    //   name,
    //   "value",
    //   value,
    //   "variant",
    //   variant
    // );
    if (name === "originalPrice" && Number(value) < Number(variant.price)) {
      // variants[id][name] = Number(variant.originalPrice);
      notifyError("Price must be more then or equal of originalPrice!");
      setValue("originalPrice", variant.originalPrice);
      setIsBulkUpdate(true);
      const timeOutId = setTimeout(() => setIsBulkUpdate(false), 100);
      return () => clearTimeout(timeOutId);
    }
    if (name === "price" && Number(variant.originalPrice) < Number(value)) {
      // variants[id][name] = Number(variant.originalPrice);
      notifyError("SalePrice must be less then or equal of product price!");
      setValue("price", variant.originalPrice);
      setIsBulkUpdate(true);
      const timeOutId = setTimeout(() => setIsBulkUpdate(false), 100);
      return () => clearTimeout(timeOutId);
    }
    setVariants((pre) =>
      pre.map((com, i) => {
        if (i === id) {
         
          const updatedCom = {
            ...com,
            [name]: value =="" ? null : Math.round(value),
          };
          if (name === "price") {
            updatedCom.discount = Number(variant.originalPrice) - Number(value);
          }
          if (name === "originalPrice") {
            updatedCom.discount = Number(value) - Number(variant.price);
          }

          return updatedCom;
        }
        return com;
      })
    );


    const totalStock = variants.reduce(
      (pre, acc) => pre + Number(acc.quantity),
      0
    );
      setTotalStock(Number(totalStock));
    
  };

  //for change language in product drawer
  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("title", resData.title[lang ? lang : "en"]);
      setValue("description", resData.description[lang ? lang : "en"]);
    }
  };

  // to change the is returnable value based on the checkbox
  const handleReturnPolicy = (value) => {
    setIsreturnable(value)
    // setValue("slug", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    // setSlug(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));

  };

  //for handle product slug
  const handleProductSlug = (value) => {
    setValue("slug", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    setSlug(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };

  //for handle product minimum Order
  const handleProductMinimumOrder = (value) => {
    setValue("minimumOrder", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    setMinimumOrder(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };

  //for handle product "Warranty Period Year
  const handleProductWarrantyPeriod = (value) => {
    setValue(
      "warrantyPeriod",
      value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-")
    );
    setWarrantyPeriod(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };
  //for handle product "Warranty Period Year
  const handleHsnNumber = (value) => {
    setValue("hsnNumber", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    setHsnNumber(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };
  // for MOQ slab -----------------------------------
  const handleAddSlab = (id) => {
    let newArray = [...slab];
    const newSlab = {
      name: `MOQ slab ${id}`,
      minQuantity: 0,
      maxQuantity: 0,
      moqSalePrice: 0,
    };
    setSlab([...newArray, newSlab]);
  };

  const isNumber = (input) => {
    const numberPattern = /^\d+$/;
    return numberPattern.test(input);
  };
  // for MOQ slab Price--------------------------
  const handleDeleteSlab = (id) => {
    let newArray = [...slab];
    const slabFilter = newArray.filter((item) => item.name !== id);
    setSlab(slabFilter);
  };

  // for MOQ slab price ---------------------------------

  const handleInputField = (val, id) => {
    let price = parseInt(val, 10);
    if (isNumber(price)) {
      let newArray = [...slab];
      newArray.forEach((ele, i) => {
        if (ele.name === id) {
          ele.moqSalePrice = price;
        }
      });
      setSlab(newArray);
    }
  };

  const handleMaxMOQ = (val, id) => {
    let price = parseInt(val, 10);
    let newArray = [...slab];
    setSlabStatus(true);
    if (isNumber(val)) {
      newArray.forEach((ele, i) => {
        if (ele.name === id) {
          ele.maxQuantity = val;
        }
      });
      setSlab(newArray);
    } else {
      if (val === "") {
        newArray.forEach((ele, i) => {
          if (ele.name === id) {
            ele.maxQuantity = val;
          }
        });
        setSlab(newArray);
      }
    }
  };
  const handleMinMOQ = (val, id) => {
    let price = parseInt(val,10);
    let newArray = [...slab];
    setSlabStatus(true);

    if (isNumber(val)) {
      newArray.forEach((ele, i) => {
        if (ele.name === id) {
          ele.minQuantity = val;
        }
      });
      setSlab(newArray);
    } else {
      if (val === "") {
        newArray.forEach((ele, i) => {
          if (ele.name === id) {
            ele.minQuantity = "";
          }
        });
        setSlab(newArray);
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      for (let ele of slab) {
        if (ele.minQuantity > minimumOrder) {
          if (ele.minQuantity >= ele.maxQuantity) {
            notifyError(`${ele.name} is less the MAx Slab`);
          }
        } else {
          notifyError(`${ele.name} is greater then minimum order quantity`);
        }
      }
    }, 2000);
  }, [slab]);
  
  // for handle get tax option
  const getTaxDetails = () => {
    TaxService.getTax(1, 100).then((res) => {
      if (res?.success === true) {
        setTaxRes(res?.taxDetails);
        let response = res?.taxDetails;
        let arr = response.map((item) => ({
          amount: `${item.taxName} (${item.taxType === "flatin" ? "₹" : ""}${item.amount
            } ${item.taxType === "percentage" ? "%" : ""})`,
          _id: item._id,
          taxName: item.taxName,
          taxType: item.taxType,
        }));
        
        setTaxOption(arr);
      }
    });
  };

  // ----------------------------------handle photo uploaded--------------------------------------

  useEffect(() => {
  }, [dataSheet])
  return {
    tag,
    setTag,
    values,
    language,
    register,
    onSubmit,
    errors,
    slug,
    openModal,
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
    productId,
    onCloseModal,
    isBulkUpdate,
    globalSetting,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,

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
    setMinimumOrder,
    warrantyPeriod,
    setWarrantyPeriod,
    taxOption,
    slab,
    setSlab,
    askForPrice,
    setAskForPrice,
    fewLeft,
    setFewLeft,
    fileName,
    setFileName,
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


    handleProductMinimumOrder,
    handleSkuBarcode,
    handleProductTap,
    selectedCategory,
    setSelectedCategory,
    setDefaultCategory,
    defaultCategory,
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
    handleProductWarrantyPeriod,
    handleAddSlab,
    handleInputField,
    handleMaxMOQ,
    handleMinMOQ,
    handleDeleteSlab,
    handleHsnNumber,
    getTaxDetails,
  };
};

export default useProductSubmit;

