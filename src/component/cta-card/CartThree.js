import React from "react";
import Image from "next/image";
import Link from "next/link";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@component/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const CartThree = ({ item }) => {
  const { storeCustomizationSetting, error, loading } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  console.log("item..for carosal", item);
  return (
    <>
      <div className="w-full bg-white  rounded-lg">
        {/* <div className="flex justify-between items-center">
          <div className="lg:w-3/5">
            <span className="text-base lg:text-lg">
              <CMSkeleton
                count={1}
                height={20}
                error={error}
                loading={loading}
                data={storeCustomizationSetting?.home?.quick_delivery_subtitle}
              />
            </span>
            <h2 className="font-serif text-lg lg:text-2xl font-bold mb-1">
              <CMSkeleton
                count={1}
                height={30}
                error={error}
                loading={loading}
                newData={item?.heading}

              />
            </h2>
            <p className="text-sm font-sans leading-6">
              <CMSkeleton
                count={4}
                height={20}
                error={error}
                loading={false}
                newData={item?.description}
              />
            </p>
            <Link href={`${item?.image}`}>
              <a
                className="lg:w-1/3   text-xs font-serif font-medium inline-block mt-5 px-8 py-3 bg-gray-800 text-center text-white rounded-full hover:text-white contact-btn"
                target="_blank"
              >
                {item?.ctaText}
              </a>
            </Link>
          </div> */}
        <div
          
          className="flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-center"
        >
          <img
            alt="Quick Delivery to Your Home"
            loading="lazy"
            width="250"
            height="250"
            decoding="async"
            src={item?.image}
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default CartThree;
