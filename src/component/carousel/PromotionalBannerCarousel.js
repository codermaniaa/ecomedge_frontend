import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//internal import

import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import CartThree from "@component/cta-card/CartThree";
import SettingServices from "@services/SettingServices";
import { useState } from "react";
import { notifyError, notifySuccess } from "@utils/toast";

const PromotionalBannerCarousel = () => {
  const [bannerData, setBannerData] = useState([1, 2, 3, 4]);


  const getDetails = () => {
    SettingServices.getPromotionBanner().then((res) => {
      if (res?.success === true) {
        // notifySuccess(res?.message);
        setBannerData(res?.PromotionDetailsdData);
        // setHomePage(res?.Pagination);
        // setOneTimeCallApi(true);
      } else {
        notifyError(res?.message);
        // setOneTimeCallApi(true);
      }
    });
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      {/* <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={
          true && {
            clickable: true,
          }
        }
        // navigation={
        //   true && {
        //     clickable: true,
        //   }
        // }
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {bannerData &&
          bannerData?.map((item, i) => (
            <SwiperSlide
              className="h-full relative rounded-lg overflow-hidden"
              key={i + 1}
            >
              <div className="block mx-auto max-w-screen-2xl">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                  <div className="lg:p-16 p-6 bg-gray-800 shadow-sm border rounded-lg">
                    <CartThree item={item} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper> */}
      <div className="block mx-auto max-w-screen-2xl">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
          <div className="lg:p-16 p-6 bg-gray-800 shadow-sm border rounded-lg">
            <div className="w-full bg-white shadow-sm lg:px-10 lg:py-5 p-6 rounded-lg">
              <div className="flex flex-col lg:flex-row justify-between items-center">
                {/* Text Content */}
                <div className="lg:w-3/5 mb-6 lg:mb-0">
                  {/* <span className="text-base lg:text-lg">Organic Products and Food</span> */}
                  <h2 className="font-serif text-lg lg:text-2xl font-bold mb-1">Quick Delivery to Your Home</h2>
                  <p className="text-sm font-sans leading-6">
                    There are many products you will find in our shop, Choose your daily necessary product from our EcommEdge shop and get some special offers. See Our latest discounted products from here and get a special discount.
                  </p>
                  {/* <a
                    className="lg:w-1/3 text-xs font-serif font-medium inline-block mt-5 px-8 py-3 bg-emerald-500 text-center text-white rounded-full hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                    href="/#"
                  >
                    Download App
                  </a> */}
                </div>

                {/* Image */}
                {/* <div className="w-full lg:w-1/5 flex-grow hidden md:flex lg:justify-end">
                  <img
                    alt="Quick Delivery to Your Home"
                    loading="lazy"
                    width="373"
                    height="250"
                    decoding="async"
                    className="block w-auto object-contain"
                    srcSet="https://res.cloudinary.com/ahossain/image/upload/v1697688032/settings/delivery-boy_rluuoq.webp"
                    src="https://res.cloudinary.com/ahossain/image/upload/v1697688032/settings/delivery-boy_rluuoq.webp"
                      style={{ color: 'transparent' }}
                  />
                </div> */}
                <div className="w-full lg:w-1/4 flex-grow hidden md:flex lg:justify-end">

                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={
                      true && {
                        clickable: true,
                      }
                    }
                    // navigation={
                    //   true && {
                    //     clickable: true,
                    //   }
                    // }
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {bannerData &&
                      bannerData?.map((item, i) => (
                        <SwiperSlide
                          className="h-full relative rounded-lg overflow-hidden"
                          key={i + 1}
                        >
                          <div className="block mx-auto max-w-screen-2xl">
                            <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">

                              <CartThree item={item} />

                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PromotionalBannerCarousel);
