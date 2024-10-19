/* eslint-disable react-hooks/exhaustive-deps */
import Ajv from "ajv";
import csvToJson from "csvtojson";
import { useContext, useState } from "react";
import * as XLSX from "xlsx";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";

// custom product upload validation schema
const schema = {
  type: "object",
  properties: {
    categories: { type: "array" },
    image: { type: "array" },
    tag: { type: "array" },
    variants: { type: "array" },
    show: { type: "array" },
    status: { type: "string" },
    prices: { type: "object" },
    isCombination: { type: "boolean" },
    title: { type: "object" },
    productId: { type: "string" },
    slug: { type: "string" },
    category: { type: "object" },
    stock: { type: "number" },
    description: { type: "object" },
  },
  required: ["categories", "category", "prices", "title"],
};

const useProductFilter = (data) => {
  const ajv = new Ajv({ allErrors: true });
  const { setLoading, setIsUpdate } = useContext(SidebarContext);

  const [newProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [filename, setFileName] = useState("");
  const [isDisabled, setIsDisable] = useState(false);

  //service data filtering
  const serviceData = data;

  const handleOnDrop = (data) => {
    // console.log('data', data);
    for (let i = 0; i < data.length; i++) {
      newProducts.push(data[i].data);
    }
  };

  const handleUploadProducts = () => {
    if (newProducts.length < 1) {
      notifyError("Please upload/select csv file first!");
    } else {
      // notifySuccess('CRUD operation disable for demo!');
      ProductServices.addAllProducts(newProducts)
        .then((res) => {
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  };

  const handleSelectFile = async (e) => {
    e.preventDefault();

    const fileReader = new FileReader();
    const file = e.target?.files[0];

    if (file && file.type === "application/json") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.readAsText(file, "UTF-8BOM");
      fileReader.onload = (e) => {
        const text = JSON.parse(e.target.result);

        const productData = text.map((value) => {
          console.log("value&&&&&&&&&&&&&&&&CCCCCCCCCCCCCCCC", value);
          return {
            categories: value.categories,
            image: value.image,
            barcode: value.barcode,
            tag: value.tag,
            variants: value.variants,
            status: value.status,
            prices: value.prices,
            isCombination: value.isCombination,
            title: value.title,
            productId: value.productId,
            slug: value.slug,
            sku: value.sku,
            category: value.category,
            stock: value.stock,
            description: value.description,
          };
        });
        setSelectedFile(productData);
      };
    } else if (file && file.type === "text/csv") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.onload = async (event) => {
        const text = event.target.result;
        const json = await csvToJson().fromString(text);
        console.log("json.......", json);
        const productData = json.map((value) => {
          let images = [];
          let imageSplit = value.image?.split(",");
          for (let i = 0; i < imageSplit.length; i++) {
            let newImage = {
              medialink: imageSplit[i],
              isDefault: i == 0 && true,
            };
            images.push(newImage);
          }

          return {
            barcode: value.barcode,
            sku: value.sku,
            title: value.title,
            fewLeft: false,
            askForPrice: false,
            description: value.description,
            slug: value.slug,
            categories: value.categories?.split(","),
            category: value.category,
            image: images,
            stock: value.stock,
            tax: [value.tax],
            warrantyPeriods: { duration: value.warranty, unit: "years" },
            minimumOrderOfQuantity: parseInt(value.MOQ, 10),
            sales: 0,
            tag: value.tag?.split(","),
            prices: {
              price: value.prices,
              salePrice: value.sale_price,
              discount: value.prices - value.sale_price,
            },
            variants: [],
            isCombination: false,
            status: value.status,
            HsnSacNumber: value.HsnSacNumber,
            userManual: [
              {
                medialink: "",
              },
            ],
            technicalSpecification: [
              {
                medialink: "",
              },
            ],
            testCertification: [
              {
                medialink: "",
              },
            ],
            productSpecification: {
              productType: value.productType,
              productLine: value.productLine,
              brand: value.brand,
              uom: value.uom,
              originCountry: value.originCountry,
              importerName: value.importerName,
              importerAddress: value.importerAddress,
              returnPolicy: {
                isReturnable: value.returnDays > 0,
                returnDays: value.returnDays
              }
            },
          };

          // {
          //   categories: value.categories,
          //   image: value.image,
          //   barcode: value.barcode,
          //   tag: value.tag,
          //   // variants: value.variants,
          //   status: value.status,
          //   // prices: value.prices,
          //   tax: [value.tax],
          //   prices: {
          //     originalPrice: value.prices,
          //     price: value.sale_price,
          //     discount: value.prices - value.sale_price,
          //   },
          //   tag: value.tag?.split(","),
          //   isCombination: value.isCombination,
          //   title: value.title,
          //   // productId: value.productId,
          //   slug: value.slug,
          //   sku: value.sku,
          //   category: value.category,
          //   stock: value.stock,
          //   description: value.description,
          //   status: value.status,
          // };
        });
        console.log("productData...... ",productData);
        setSelectedFile(productData);
      };

      fileReader.readAsText(file);
    } else {
      setFileName(file?.name);
      setIsDisable(true);

      const rABS = !!fileReader.readAsBinaryString;

      fileReader.onload = function (event) {
        /* Parse data */
        const bstr = event.target.result;
        const wb = XLSX.read(bstr, {
          type: rABS ? "binary" : "array",
          bookVBA: true,
        });
        /* Get first worksheet */
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        /* Convert array of arrays */
        const json = XLSX.utils.sheet_to_json(ws);

        const productData = json.map((value) => {
          return {
            categories: JSON.parse(value.categories),
            image: JSON.parse(value.image),
            barcode: value.barcode,
            tag: JSON.parse(value.tag),
            variants: JSON.parse(value.variants),
            status: value.status,
            prices: JSON.parse(value.prices),
            isCombination: JSON.parse(value.isCombination),
            title: JSON.parse(value.title),
            productId: value.productId,
            slug: value.slug,
            sku: value.sku,
            category: JSON.parse(value.category),
            stock: JSON.parse(value.stock),
            description: JSON.parse(value.description),
          };
        });
        setSelectedFile(productData);
      };

      if (rABS) {
        fileReader.readAsBinaryString(file);
      } else {
        fileReader.readAsArrayBuffer(file);
      }
    }
  };

  const handleUploadMultiple = (e) => {
    console.log("selectedFile", selectedFile);
    if (selectedFile.length > 0) {
      console.log("validationdatayty");

      setLoading(true);
      let productDataValidation = selectedFile.map((value) =>
        ajv.validate(schema, value)
      );

      const isBelowThreshold = (currentValue) => currentValue === true;
      const validationData = productDataValidation.every(isBelowThreshold);
      console.log("validationdata", validationData);

      // if (validationData) {
      console.log(selectedFile);
      ProductServices.addAllProducts(selectedFile)
        .then((res) => {
          if (res?.success === true) {
            setIsUpdate(true);
            setLoading(false);
            notifySuccess(res.message);
          } else {
            notifyError(res.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err.message);
        });
      // } else {
      //   setLoading(false);
      //   notifyError("Please enter valid data!");
      // }
    } else {
      setLoading(false);
      notifyError("Please select a valid json, csv & xls file first!");
    }
  };

  const handleRemoveSelectFile = (e) => {
    // console.log('remove');
    setFileName("");
    setSelectedFile([]);
    setTimeout(() => setIsDisable(false), 1000);
  };

  return {
    data,
    filename,
    isDisabled,
    handleSelectFile,
    serviceData,
    handleOnDrop,
    handleUploadProducts,
    handleRemoveSelectFile,
    handleUploadMultiple,
  };
};

export default useProductFilter;
