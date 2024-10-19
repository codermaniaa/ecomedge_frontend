import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
//internal import
import OrderTable from "@component/order/OrderTable";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { useOrder } from "@context/OrderContext";
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";

const Invoice = ({ data, printRef, globalSetting, currency }) => {
  const { submitHandler, orderResponse,loading} = useCheckoutSubmit();
  
  
  const { getNumberTwo } = useUtilsFunction();
  const { order } = useOrder();
  console.log("orderResponseinvoive",order); 
  
  
  // Iterate over each item and sum up the taxAmount property of each tax object
  
  const [totalTax,setTotalTax] = useState(0);
useEffect(()=>{
  let totalTaxAmount = 0;
  order.cart.forEach(item => {
    item.tax["GST 18"].forEach(tax => {
        totalTaxAmount += tax.taxAmount;
    });
});
  setTotalTax(totalTaxAmount); 
})
  return (
    <div ref={printRef}>
      <div className="bg-indigo-50 p-8 rounded-t-xl">
        <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
          <div>
            <h1 className="font-bold font-serif text-2xl uppercase">Invoice</h1>
            <h6 className="text-gray-700">
              Status :{" "}
              {order?.status === "Delivered" && (
                <span className="text-gray-500">{order?.status}</span>
              )}
              {order?.status === "POS-Completed" && (
                <span className="text-gray-500">{order?.status}</span>
              )}
              {order?.status === "Pending" && (
                <span className="text-orange-500">{order?.status}</span>
              )}
              {order?.status === "Cancel" && (
                <span className="text-red-500">{order?.status}</span>
              )}
              {order?.status === "Processing" && (
                <span className="text-indigo-500">{order?.status}</span>
              )}
              {order?.status === "Deleted" && (
                <span className="text-red-700">{order?.status}</span>
              )}
            </h6>
          </div>
          <div className="lg:text-right text-left">
            <h2 className="text-lg font-serif font-semibold mt-4 lg:mt-0 md:mt-0">
              <Link href="/">
                <a className="">
                  <img
                    width={30}
                    height={20}
                    src="/logo/Ecomedge.png"
                    alt="logo"
                  />
                </a>
              </Link>
            </h2>
            <p className="text-sm text-gray-500 pt-3">
              {globalSetting?.address ||
                "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"}
            </p>
          </div>
        </div>
        <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
              Date
            </span>
            <span className="text-sm text-gray-500 block">
              {order?.createdAt !== undefined && (
                <span>{dayjs(order?.createdAt).format("MMMM D, YYYY")}</span>
              )}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
              Invoice No.
            </span>
            <span className="text-sm text-gray-500 block">
              #{order?.invoiceDetails?.invoiceNumber}
            </span>
          </div>
          <div className="flex flex-col lg:text-right text-left">
            <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
              Invoice To.
            </span>
            <span className="text-sm text-gray-500 block">
              {order?.user_info?.name} <br />
              {order?.user_info?.email}{" "}
              <span className="ml-2">{order?.user_info?.contact}</span>
              <br />
              {order?.user_info?.address}
              <br />
              {order?.city} {order?.country} {order?.zipCode}
              <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
             GST NO.
            </span>
              {/* <br /> */}
              {order?.user_info?.gstnumber}
            </span>
          </div>
        </div>
      </div>
      <div className="s">
        <div className="overflow-hidden lg:overflow-visible px-8 my-10">
          <div className="-my-2 overflow-x-auto">
            <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-xs bg-gray-100">
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
                  >
                    Sr.
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    Item Price
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    {order?.cart[0]?.tax["GST 18"][0].taxName === "IGST" ? "IGST" : "CGST & SGST" }
                  </th>

                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-right"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <OrderTable order={order} currency={currency} />
            </table>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-gray-100 p-10 bg-gray-50">
        <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              Payment Method
            </span>
            <span className="text-sm text-gray-500 font-semibold font-serif block">
              {order?.paymentMethod}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              Shipping Cost
            </span>
            <span className="text-sm text-gray-500 font-semibold font-serif block">
              {/* {currency} */}
              {getNumberTwo(order?.shippingCost)}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              Discount
            </span>
            <span className="text-sm text-gray-500 font-semibold font-serif block">
              {/* {currency} */}
              {getNumberTwo(order?.discount)}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              Total tax
            </span>
            <span className="text-sm text-gray-500 font-semibold font-serif block">
              {/* {currency} */}
              {/* {getNumberTwo((order?.total-(order?.discount + order?.shippingCost)) - ((order?.total - (order?.discount+order?.shippingCost))/1.18))} */}
              {getNumberTwo(totalTax?totalTax:0)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              Total Amount
            </span>
            <span className="text-2xl font-serif font-bold text-red-500 block">
              {/* {currency} */}
              {getNumberTwo(order?.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
