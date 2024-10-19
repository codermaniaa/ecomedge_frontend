import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { useCart } from "react-use-cart";

//internal import
import { SidebarContext } from "@context/SidebarContext";
import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";

const StickyCart = () => {
  const { totalItems, cartTotal } = useCart();
  const { toggleCartDrawer } = useContext(SidebarContext);
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const {total} = useCheckoutSubmit();

  const currency = globalSetting?.default_currency || "₹";

  const [isVisible, setIsVisible] = useState(true);
  let scrollTimeout;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      
      // Clear the previous timeout if scrolling continues
      clearTimeout(scrollTimeout);
      
      // Set a timeout to show the component after scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 200); // Adjust the timeout duration as needed
    };

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  return (
    <div className={`sticky-cart ${isVisible ? 'visible' : 'hidden'}`}>
    {/* Your StickyCart content goes here */}
    <button aria-label="Cart" onClick={toggleCartDrawer} className="absolute">
      <div className="right-0 w-35 float-right fixed top-1/6 bottom-5/6 align-middle shadow-lg cursor-pointer z-30 hidden lg:block xl:block">
        <div className="flex flex-col items-center justify-center bg-indigo-50 rounded-tl-lg p-2 text-gray-700">
          <span className="text-2xl m b-1 text-gray-800">
            <IoBagHandleOutline />
          </span>
          <span className="px-2 text-sm font-serif font-medium">
            {totalItems} Items
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-800 p-2 text-white text-base font-serif font-medium rounded-bl-lg mx-auto">
          {currency}
          {parseFloat(total).toFixed(2)}
        </div>
      </div>
    </button>
  </div>
  );
};

export default dynamic(() => Promise.resolve(StickyCart), { ssr: false });
