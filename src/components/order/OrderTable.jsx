import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

import { useTranslation } from "react-i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiPrinter } from "react-icons/fi";

//internal import
import { showDateTimeFormat } from "@/utils/dateFormate";
import PrintReceipt from "@/components/form/PrintReceipt";
import SelectStatus from "@/components/form/SelectStatus";
import Status from "@/components/table/Status";
import Tooltip from "@/components/tooltip/Tooltip";

const OrderTable = ({ orders, currency, globalSetting }) => {
  // console.log('globalSetting',globalSetting)
  const { t } = useTranslation();
  console.log('Orders...', orders)
  const formattedDate = new Date("2024-04-12T15:33:52.389Z").toLocaleString('en-US', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '').replace(/(\d+)[-./](\d+)[-./](\d+),/, '$1-$2-$3,');

  
  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {orders?.map((order, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {order?.invoiceDetails?.invoiceNumber}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {formattedDate}
              </span>
            </TableCell>

            <TableCell className="text-xs">
              <span className="text-sm">{order?.user_info?.name}</span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {order?.paymentMethod}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {currency}
                {parseFloat(order?.total)?.toFixed(2)}
              </span>
            </TableCell>

            <TableCell className="text-xs">
              <Status status={order?.status} />
            </TableCell>

            <TableCell className="text-center">
              <SelectStatus id={order._id} order={order} />
            </TableCell>

            <TableCell className="text-right flex justify-end">
              <div className="flex justify-between items-center">
                {/* <PrintReceipt orderId={order._id} />   */}

                <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  <Link to={`/admin/order/${order._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiPrinter}
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

export default OrderTable;
