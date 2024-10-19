import { SidebarContext } from "@context/SidebarContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import Loading from "@component/preloader/Loading";
import FeatureCategory from "@component/category/FeatureCategory";
import CMSkeleton from "@component/preloader/CMSkeleton";
import CatalogCategory from "@component/category/CatalogCategory";

const BrandCatalog = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { loading, error, storeCustomizationSetting } = useGetSetting();

  // console.log("storeCustomizationSetting", storeCustomizationSetting);


  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen">
         

            {/* feature category's */}
            {storeCustomizationSetting?.home?.featured_status && (
              <div className="bg-gray-100 lg:py-16 py-10">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                  <div className="mb-10 flex justify-center">
                    <div className="text-center w-full lg:w-2/5">
                      <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                        <CMSkeleton
                          count={1}
                          height={30}
                          // error={error}
                          loading={loading}
                          newData="Brand Catalog"
                          // data={'Brand Catalog'}
                        />
                      </h2>
                      <p className="text-base font-sans text-gray-600 leading-6">
                        <CMSkeleton
                          count={4}
                          height={10}
                          error={error}
                          loading={loading}
                          newData='Get latest brand catalogue from available brands at TriDyoda'
                          // data={
                          //   storeCustomizationSetting?.home?.feature_description
                          // }
                        />
                      </p>
                    </div>
                  </div>

                  <CatalogCategory />
                </div>
              </div>
            )}
          </div>
        </Layout>
      )}
    </>
  );
};

export default BrandCatalog;
