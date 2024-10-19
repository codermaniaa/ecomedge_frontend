import React, { useEffect, useState } from "react";
import Image from "next/image";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@component/header/PageHeader";
import CMSkeleton from "@component/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import AboutServices from "@services/AboutServices";
import { notifyError, notifySuccess } from "@utils/toast";

const AboutUs = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const [aboutRes, setAboutRes] = useState("");

  console.log("aboutRes....", aboutRes);
  const getAboutDetails = () => {
    AboutServices.getAbout().then((res) => {
      if (res?.success === true) {
        notifySuccess(res?.message);
        setAboutRes(res?.result[0]);
        // setHomeResponse(res?.PromotionDetailsdData);
        // setHomePage(res?.Pagination);
      } else {
        notifyError(res?.message);
      }
    });
  };
  useEffect(() => {
    getAboutDetails();
  }, []);

  return (
    <Layout title="About Us" description="This is about us page">
      <PageHeader
        headerBg={aboutRes?.bannerImage}
        title={showingTranslateValue(
          storeCustomizationSetting?.about_us?.title
        )}
      />

      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          <div className="grid grid-flow-row lg:grid-cols-2 gap-4 lg:gap-16 items-center">
            <div className="">
              <h3 className="text-xl lg:text-3xl mb-2 font-serif font-semibold">
                <CMSkeleton
                  count={1}
                  height={50}
                  // error={error}
                  loading={loading}
                  newData={aboutRes?.heading}
                  // data={aboutRes?.heading}
                />
              </h3>
              <div className="mt-3 text-base opacity-90 leading-7">
                <p>
                  <CMSkeleton
                    count={5}
                    height={20}
                    // error={error}
                    loading={loading}
                    newData={aboutRes?.shortDescription}
                    // data={storeCustomizationSetting?.about_us?.top_description}
                  />
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-6 mt-8">
                <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                  {loading ? (
                    <CMSkeleton
                      count={8}
                      height={20}
                      error={error}
                      loading={loading}
                    />
                  ) : (
                    <>
                      {aboutRes &&
                        aboutRes.socialInteraction &&
                        aboutRes.socialInteraction.length > 0 && (
                          <>
                            <span className="text-3xl block font-extrabold font-serif mb-4 text-gray-800">
                              {aboutRes?.socialInteraction[0]?.counting}
                            </span>
                            <h4 className="text-lg font-serif font-bold mb-1">
                              {aboutRes &&
                                aboutRes.socialInteraction &&
                                aboutRes.socialInteraction.length > 0 &&
                                aboutRes?.socialInteraction[0].comment}
                            </h4>
                            <p className="mb-0 opacity-90 leading-7">
                              {aboutRes &&
                                aboutRes.socialInteraction &&
                                aboutRes.socialInteraction.length > 0 &&
                                aboutRes?.socialInteraction[0].description}
                            </p>
                          </>
                        )}
                    </>
                  )}
                </div>
                <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                  {loading ? (
                    <CMSkeleton
                      count={8}
                      height={20}
                      error={error}
                      loading={loading}
                    />
                  ) : (
                    <>
                      {aboutRes &&
                        aboutRes.socialInteraction &&
                        aboutRes.socialInteraction.length > 0 && (
                          <>
                            <span className="text-3xl block font-extrabold font-serif mb-4 text-gray-800">
                              {aboutRes?.socialInteraction[1]?.counting}
                            </span>
                            <h4 className="text-lg font-serif font-bold mb-1">
                              {aboutRes?.socialInteraction[1]?.comment}
                            </h4>
                            <p className="mb-0 opacity-90 leading-7">
                              {aboutRes?.socialInteraction[1]?.description}
                            </p>
                          </>
                        )}
                    </>
                  )}
                </div>
              </div>
            </div>
            {aboutRes?.productImage && aboutRes?.productImage.length > 0 && (
              <div className="mt-10 lg:mt-0">
                <img
                  width={920}
                  height={750}
                  src={aboutRes?.productImage[0]}
                  alt="logo"
                />
              </div>
            )}
          </div>
          <div className="mt-10 lg:mt-16 text-base opacity-90 leading-7">
            <p>
              <CMSkeleton
                count={5}
                height={20}
                // error={error}
                loading={loading}
                newData={aboutRes?.briefDescription}

                // data={
                //   storeCustomizationSetting?.about_us?.middle_description_one
                // }
              />
            </p>
            {/* 
            <p>
              <CMSkeleton
                count={8}
                height={20}
                error={error}
                loading={loading}
                data={
                  storeCustomizationSetting?.about_us?.middle_description_two
                }
              />
            </p> */}
          </div>
          <div className="mt-10 lg:mt-12 flex flex-col sm:grid gap-4">
            <img
              width={1920}
              height={570}
              src={aboutRes?.centerImage}
              alt="logo"
              className="block rounded-lg"
            />
          </div>
        </div>
        <div className="bg-gray-50 lg:py-20 py-10">
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
            <div className="relative flex flex-col sm:flex-row sm:items-end justify-between mb-8">
              <div className="max-w-2xl">
                <h3 className="text-xl lg:text-3xl mb-2 font-serif font-semibold">
                  <CMSkeleton
                    count={1}
                    height={50}
                    // error={error}
                    loading={loading}
                    data={storeCustomizationSetting?.about_us?.founder_title}
                  />
                </h3>
                <p className="mt-2 md:mt-3 font-normal block text-base">
                  <CMSkeleton
                    count={3}
                    height={20}
                    // error={error}
                    loading={loading}
                    newData={aboutRes?.ourTeam?.teamDescription}

                    // data={
                    //   storeCustomizationSetting?.about_us?.founder_description
                    // }
                  />
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-6 xl:gap-x-8">
              {aboutRes?.ourTeam?.members?.map((ele, i) => (
                <div className="max-w-sm">
                  <img
                    width={420}
                    height={420}
                    src={ele?.mediaLink}
                    alt="team-1"
                    className="block rounded-lg"
                  />
                  <div className="py-4">
                    <h5 className="text-lg font-semibold font-serif">
                      {ele?.name}
                    </h5>
                    <span className="opacity-75 text-sm">{ele?.position}</span>
                  </div>
                </div>
              ))}            
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
