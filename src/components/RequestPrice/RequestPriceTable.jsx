import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

import { useTranslation } from "react-i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import
import { showDateTimeFormat } from "@/utils/dateFormate";
import PrintReceipt from "@/components/form/PrintReceipt";
import SelectStatus from "@/components/form/SelectStatus";
import Status from "@/components/table/Status";
import Tooltip from "@/components/tooltip/Tooltip";
import { useState } from "react";

const RequestPriceTable = ({ orders, currency, globalSetting }) => {
  console.log('globalSetting', globalSetting)
  const { t } = useTranslation();
  console.log('orders on request page table', orders)
  const RequestTime = (val) => {
    const parsedUpdatedAt = new Date(val);
    const formattedDate = `${parsedUpdatedAt.getFullYear()}/${parsedUpdatedAt.getMonth() + 1
      }/${parsedUpdatedAt.getDate()} ${parsedUpdatedAt.getHours()}:${parsedUpdatedAt.getMinutes()}`;
    return formattedDate;
  };

  //   product name 
  const [expandedProductName, setExpandedProductName] = useState('');

  const toggleProductName = (productName) => {
    setExpandedProductName((prev) => (prev === productName ? '' : productName));
  };
  const getMaxWidth = (productName) => {
    return expandedProductName === productName ? 'none' : '300px';
  };

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {orders?.getAskForPriceDetails?.map((order, i) => (
          <TableRow key={i + 1}>
            <TableCell className="truncate" style={{ maxWidth: getMaxWidth(order?.productName) }}>
              <span
                className="font-semibold uppercase text-xs cursor-pointer"
                onClick={() => toggleProductName(order?.productName)}
              >
                {expandedProductName === order?.title ? (
                  order?.title
                ) : (
                  <>
                    {order?.title}
                  </>
                )}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{RequestTime(order?.createdAt)}</span>
            </TableCell>

            <TableCell className="text-xs">
              <span className="text-sm">
                {order?.personalDetails?.firstName}{" "}
                {order?.personalDetails?.lastName}
              </span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {order?.personalDetails?.phoneNumber}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {order?.personalDetails?.emailAddress}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">{order?.message}</span>
            </TableCell>
            {/* 
            <TableCell className="text-xs">
              <Status status={order?.status} />
            </TableCell> */}

            <TableCell className="text-center" >
              <SelectStatus  id={order._id} order={order} />
            </TableCell>

            <TableCell className="text-right flex justify-end">
              <div className="flex justify-between items-center">
                {/* <PrintReceipt orderId={order._id} /> */}

                <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  <Link to={`/admin/requestprice/${order._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("ViewInvoice")}
                      bgColor="#059669"
                    />
                  </Link>
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default RequestPriceTable;
