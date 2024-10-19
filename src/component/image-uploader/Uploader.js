// Certainly! If you want to modify the code similar to the previous one, here it is:


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiXCircle } from 'react-icons/fi';
// import { notifyError, notifySuccess } from '@/utils/toast';

const Uploader = ({ setImageUrl, imageUrl }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    maxSize: 100000, // the size of the image,
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

  useEffect(() => {
    const uploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const uploadFiles = async () => {
      try {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', uploadPreset);

        const response = await axios.post(uploadUrl, formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        setImageUrl(response.data.secure_url);
        notifySuccess('Image Uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        // notifyError('An error occurred while uploading the image.');
      }
    };

    if (files.length > 0) {
      uploadFiles();
    }
  }, [files, setImageUrl]);

  useEffect(
    () => () => {
      // Make sure to revoke the data URIs to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleRemoveImage = () => {
    setFiles([]);
    setImageUrl('');
  };

  return (
    <div className="w-full text-center">
      <div
        className="px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-gray-500" />
        </span>
        <p className="text-sm mt-2">Drag your image here</p>
        <em className="text-xs text-gray-400">
          (Only *.jpeg and *.png images will be accepted)
        </em>
      </div>
      <aside className="flex flex-row flex-wrap mt-4">
        {imageUrl ? (
          <div className="relative">
            <img
              className="inline-flex border rounded-md border-gray-100 w-24 max-h-24 p-2"
              src={imageUrl}
              alt="product"
            />
            <button
              type="button"
              className="absolute top-0 right-0 text-red-500 focus:outline-none"
              onClick={handleRemoveImage}
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


// This modified code uses the Cloudinary upload preset and URL as in your previous code, and it allows you to upload and display a single image. If you need any further adjustments or have specific requirements, feel free to let me know!