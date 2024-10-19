import React from "react";
import dayjs from "dayjs";

const RequestTable = ({ order, currency }) => {
  return (
    <>
      <td className="px-5 py-3 leading-6 whitespace-nowrap">
        <span className="uppercase text-sm font-medium">
          {order?._id?.substring(20, 24)}
        </span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">
          {dayjs(order.createdAt).format("MMMM D, YYYY")}
        </span>
      </td>

      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">{order.title}</span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
        {order.status && (
          <span className="text-gray-500">{order.status}</span>
        )}
      </td>
     
    </>
  );
};

export default RequestTable;
