import React from "react";

//internal import
import Coupon from "@component/coupon/Coupon";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const OfferCard = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <div className="w-full group">
      <div className="bg-gray-50 h-full border-2  transition duration-150 ease-linear transform  rounded shadow">
        <div className="bg-orange-100 text-gray-900 px-6 py-0 rounded-t border-b flex items-center justify-center">
          <div className="homepage-section-title">
            <h3 className="text-base font-serif font-medium ">
              
              {showingTranslateValue(
                storeCustomizationSetting?.home?.discount_title
              )}
              
            </h3>
          </div>
        </div>
        <div className="overflow-hidden">
          <Coupon couponInHome />
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
