import React, { useEffect, useState } from "react";
import { t } from "i18next";
import axios from "axios";
import { useDropzone } from "react-dropzone";
// import cloudinary from "cloudinary/lib/cloudinary";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";

//internal import
import useAsync from "@/hooks/useAsync";
import SettingServices from "@/services/SettingServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import Container from "@/components/image-uploader/Container";
import ImageKit from "imagekit-javascript";

// cloudinary?.config({
//   cloud_name: import.meta.env.VITE_APP_CLOUD_NAME,
//   api_key: import.meta.env.VITE_APP_CLOUDINARY_API_KEY,
//   api_secret: import.meta.env.VITE_APP_CLOUDINARY_API_SECRET,
// });

const Uploader = ({ setImageUrl, imageUrl, product,scenario, pdf, pdfName,setUserManualNames,setTechnicalSpecNames,setDatasheetNames,setBrandFileName }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);


  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/*":
        pdf === true
          ? [".pdf", ".docx", ".xlsx",".csv"]
          : [".jpeg", ".jpg", ".png",".webp"],
    },
    multiple: product ? true : false,
    // Approx 15 mb max Size.
    maxSize: 16000000,
    maxFiles: globalSetting?.number_of_image_per_product || 2,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    if (fileRejections) {
      fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map((e) => (
              <li key={e.code}>
                {e.code === "too-many-files"
                  ? notifyError(
                      `Maximum ${globalSetting?.number_of_image_per_product} Image Can be Upload!`
                    ) 
                  : notifyError(e.message)}
              </li>
            ))}
          </ul>
        </li>
      ));
    }

    if (files) {
      files.forEach(async (file) => {
        if (
          product &&
          imageUrl?.length + files?.length >
            globalSetting?.number_of_image_per_product
        ) {
          return notifyError(
            `Maximum ${globalSetting?.number_of_image_per_product} Image Can be Upload!`
          );
        }

        setLoading(true);
        setError("Uploading....");

        const imagekit = new ImageKit({
          publicKey: `${import.meta.env.VITE_APP_IMAGEKIT_PUBLIC_KEY}`,
          urlEndpoint: `${import.meta.env.VITE_APP_IMAGEKIT_URL_END_POINT}`,
          // transformationPosition: "path",
          // authenticationEndpoint : `${
          //   import.meta.env.VITE_APP_IMAGEKIT_AUTHENDTICATION_ENDPOINT
          // }`,
          // apiVersion: "v2"
        });

        const authenticateParameter = await axios.get(
          import.meta.env.VITE_APP_IMAGEKIT_AUTHENDTICATION_ENDPOINT
        );

        if (
          authenticateParameter &&
          authenticateParameter.data &&
          authenticateParameter.data.token
        ) {
          imagekit
            .upload({
              file: file,
              fileName: file.name,
              folder: "product",
              token: authenticateParameter.data.token,
              expire: authenticateParameter.data.expire,
              signature: authenticateParameter.data.signature,
              // extensions: [
              //   {
              //     name: "google-auto-tagging",
              //     maxTags: 5,
              //     minConfidence: 95,
              //   },
              // ],
            })
            .then((response) => {
              {response?.fileType === "image" ? (notifySuccess("Image Uploaded successfully!")): (notifySuccess("file Uploaded successfully!"))}
              ;
              setLoading(false);
              if (product) {
                setImageUrl((imgUrl) => [...imgUrl, response.url]);

                if(scenario == "usermanual"){
                  setUserManualNames((usermanualName) => [...usermanualName, response.name]);
                }
                if(scenario == "techspec"){
                  setTechnicalSpecNames((techspecName) => [...techspecName, response.name]);
                }
                if(scenario == "datasheet"){
                  setDatasheetNames((datasheetName) => [...datasheetName, response.name]);
                }
                if(scenario == "brandFile"){
                  setBrandFileName((brandFileName) => [...brandFileName, response.name]);
                }
              } else {
                setImageUrl(response.url);

                if(scenario == "usermanual"){
                  setUserManualNames([response.name]);
                }
                if(scenario == "techspec"){
                  setTechnicalSpecNames([response.name]);
                }
                if(scenario == "datasheet"){
                  setDatasheetNames([response.name]);
                }
                if(scenario == "brandFile"){
                  setBrandFileName([response.name]);
                }
              }
            })
            .catch((err) => {
              console.log("err", err);
              notifyError(err.Message);
              setLoading(false);
            });
        } else {
          notifyError("Unable to authenticate");  
        }
        
        //  ----------------------------------------------------------------------------------------------------
        // if (product) {
        //   const result = imageUrl?.find(
        //     (img) => img === `${import.meta.env.VITE_APP_CLOUDINARY_URL}`
        //   );

        //   if (result) return setLoading(false);
        // }

        // const name = file.name.replaceAll(/\s/g, "");
        // const public_id = name?.substring(0, name.lastIndexOf("."));

        // const formData = new FormData();
        // formData.append("file", file);
        // formData.append(
        //   "upload_preset",
        //   import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET
        // );
        // formData.append("cloud_name", import.meta.env.VITE_APP_CLOUD_NAME);
        // formData.append("folder", folder);
        // formData.append("public_id", public_id);

        // axios({
        //   url: import.meta.env.VITE_APP_CLOUDINARY_URL,
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   },
        //   data: formData,
        // })
        //   .then((res) => {
        //     notifySuccess("Image Uploaded successfully!");
        //     setLoading(false);
        //     if (product) {
        //       setImageUrl((imgUrl) => [...imgUrl, res.data.secure_url]);
        //     } else {
        //       setImageUrl(res.data.secure_url);
        //     }
        //   })
        //   .catch((err) => {
        //     console.error("err", err);
        //     notifyError(err.Message);
        //     setLoading(false);
        //   });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          className="inline-flex border-2 border-gray-100 w-24 max-h-24"
          src={file.preview}
          alt={file.name}
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleRemoveImage = async (img) => {
    try {
      // const url = img.substring(img.length - 25);
      // const url = img.split("/").pop().split(".")[0];
      // const public_id = `${folder}/${url}`;

      // const res = await cloudinary.v2.uploader.destroy(public_id);

      setLoading(false);
      // notifyError(
      //   res.result === "ok" ? "Image delete successfully!" : res.result
      // );
      notifyError("delete successfully!");
      if (product) {
        if(scenario && (scenario == "usermanual" ||scenario == "techspec" || scenario == "datasheet")){
          const result = imageUrl?.filter((i) => i !== img[0]);
          setImageUrl(result);
        }else{
          const result = imageUrl?.filter((i) => i !== img);
          setImageUrl(result);
        }
      } else {
        setImageUrl(""); 
      }

      if(scenario == "usermanual"){
        setUserManualNames([]);
      }
      if(scenario == "techspec"){
        setTechnicalSpecNames([]);
      }
      if(scenario == "datasheet"){
        setDatasheetNames([]);
      }
      if(scenario == "brandFile"){
        setBrandFileName([]);
      }
    } catch (err) {
      console.error("err", err);
      notifyError(err.Message);
      setLoading(false);
    }
  };
  return (
    <div className="w-full text-center">
      <div
        className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-orange-500" />
        </span>
        {pdf === true ? (
          <>
            <p className="text-sm mt-2">Drag Your file  here</p>
            <em className="text-xs text-gray-400">
              {"(Only *.pdf ,*.docx , .xlsx , .csv  will be accepted)"}
            </em>
          </>
        ) : (
          <>
            <p className="text-sm mt-2">Drag Your image  here</p>
            <em className="text-xs text-gray-400">{t("imageFormat")}</em>
          </>
        )}
      </div>

      <div className="text-green-500">{loading && err}</div>
      <aside className="flex flex-row flex-wrap mt-4">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container
              pdfName={pdfName}
              pdf={pdf}  
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              handleRemoveImage={handleRemoveImage}
              />
          </DndProvider>
        ) : !product && imageUrl ? (
          <div className="relative">
            {" "}
            <iframe
              className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
              src={imageUrl}
              alt="product"
              />
            <button
              type="button"
              className="absolute top-0 right-0 text-red-500 focus:outline-none"
              onClick={() => handleRemoveImage(imageUrl)}
              handleRemoveImage={handleRemoveImage}
            >
              <FiXCircle /> 
            </button>
          </div>
        ) : (
          thumbs
        )}
      </aside>
    </div>
  );
};

export default Uploader;
