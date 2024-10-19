import { notifyError, notifySuccess } from "@/utils/toast";
import axios from "axios";
import React, { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import ImageKit from "imagekit-javascript";

const UploadFile = ({ setImageUrl, imageUrl }) => {
  // const [fileUpload, setFileUpload] = useState("");
  const [fileName, setFileName] = useState("select file");

  console.log('step1');
  console.log("imageUrl", imageUrl);


  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileNam = file.name;
      // console.log("fileNam", fileNam);

      const imagekit = new ImageKit({
        // publicKey: `${import.meta.env.VITE_APP_IMAGEKIT_PUBLIC_KEY}`,
        // urlEndpoint: `${import.meta.env.VITE_APP_IMAGEKIT_URL_END_POINT}`,
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
            // token: authenticateParameter.data.token,
            // expire: authenticateParameter.data.expire,
            // signature: authenticateParameter.data.signature,
            // extensions: [
            //   {
            //     name: "google-auto-tagging",
            //     maxTags: 5,
            //     minConfidence: 95,
            //   },
            // ],
          })
          .then((response) => {
            // console.log("response=>", response);
            notifySuccess("File Uploaded successfully!");
            // setLoading(false);
            // console.log("imagekit....", response);
            setImageUrl(response.url);
            setFileName(response.name);
          })
          .catch((err) => {
            console.log("err", err);
            notifyError(err.Message);
            // setLoading(false);
          });
      } else {
        notifyError("Unable to authenticate");
      }
    }
  };
  function isValidURL(url) {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlPattern.test(url);
  }

  return (
    <div className="col-span-8 sm:col-span-4">
      <label
        htmlFor="filesss"
        className="flex justify-between p-3 items-center border text-sm focus:outline-none cursor-pointer block w-full border-transparent focus:bg-white p-1 rounded-md bg-gray-200 dark:text-primaryOn dark:bg-bgBlack"
      >
        <span className="flex items-center gap-2">
          <FaRegFilePdf className="text-4xl" />
          <span>{fileName}</span>
        </span>
        {isValidURL(imageUrl) && (
          <a
            href={imageUrl && imageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoEyeSharp className="text-2xl cursor-pointer hover:text-yellow-500" />
          </a>
        )}
      </label>

      <input
        id="filesss"
        type="file"
        // accept=".pdf,.docx,.xlsx"
        onChange={(e) => handleUploadFile(e)}
      />
    </div>
  );
};

export default UploadFile;
