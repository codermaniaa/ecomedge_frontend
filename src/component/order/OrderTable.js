import useUtilsFunction from "@hooks/useUtilsFunction";
import React, { useEffect, useState } from "react";

const OrderTable = ({ order, currency }) => {
  const { getNumberTwo } = useUtilsFunction();
console.log("OrderTable data..",order); 

const [totalTax,setTotalTax] = useState(0);


// Iterate over each item and sum up the taxAmount property of each tax object

// useEffect(()=>{
//   let totalTaxAmount = 0;
//   order.cart.forEach(item => {
//     item.tax["GST 18"].forEach(tax => {
//         totalTaxAmount += tax.taxAmount;
//     });
// });
//   setTotalTax(totalTaxAmount); 
// })
  return (
    <tbody className="bg-white divide-y divide-gray-100 text-serif text-sm">
      {order?.cart?.map((item, i) => (
        <tr key={i}>
          <th className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
            {i + 1}{" "}
          </th>
          <td className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">
            {item.title}
          </td>
          <td className="px-6 py-1 whitespace-nowrap font-bold text-center">
            {item.quantity}{" "}
          </td>
          <td className="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">
            {/* {currency} */}
            {getNumberTwo(item?.pricePerUnit - item?.discountPerUnit )}
          </td>

          <td className="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">
            {/* {currency} */}
            {getNumberTwo(item?.totalTaxAmount)}
          </td>
          <td className="px-6 py-1 whitespace-nowrap text-right font-bold font-DejaVu k-grid text-red-500">
            {/* {currency} */}
            {getNumberTwo(item?.finalPrice)}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrderTable;
