import dayjs from "dayjs";
import { useParams } from "react-router";
import ReactToPrint from "react-to-print";
import React, { useContext, useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {
  TableCell,
  TableHeader,
  Table,
  TableContainer,
  TableRow,
  WindmillContext,
  TableBody,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { PDFDownloadLink } from "@react-pdf/renderer";

//internal import
import useAsync from "@/hooks/useAsync";
import Status from "@/components/table/Status";
import OrderServices from "@/services/OrderServices";
import Invoice from "@/components/invoice/Invoice";
import Loading from "@/components/preloader/Loading";
import logoDark from "@/assets/img/logo/Admin logo dark.svg";
import logoLight from "@/assets/img/logo/Admin logo light.svg";
import PageTitle from "@/components/Typography/PageTitle";
import InvoiceForDownload from "@/components/invoice/InvoiceForDownload";
import SettingServices from "@/services/SettingServices";
import RequestPriceService from "@/services/RequestPriceService";

const RequestPriceInvoice = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  const { id } = useParams();
  const printRef = useRef();

  const { data, loading, error } = useAsync(() =>
    RequestPriceService.getRequestPriceById(id)
  );
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  const currency = globalSetting?.default_currency || "₹";

  console.log("data=== invoice", data.getAskForPriceDetails);
  const RequestTime = (val) => {
    const parsedUpdatedAt = new Date(val);
    const formattedDate = `${parsedUpdatedAt.getFullYear()}/${
      parsedUpdatedAt.getMonth() + 1
    }/${parsedUpdatedAt.getDate()} ${parsedUpdatedAt.getHours()}:${parsedUpdatedAt.getMinutes()}`;
    return formattedDate;
  };

  return (
    <>
      <PageTitle> {t("Details")} </PageTitle>

      <div
        ref={printRef}
        className="bg-white dark:bg-gray-800 mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden"
      >
        {!loading && (
          <div className="">
            <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-700 dark:text-gray-300">
              <h1 className="font-bold font-serif text-xl uppercase">
                {t("product Details")}
                <p className="text-xs mt-1 text-gray-500">
                  {t("InvoiceStatus")}
                  <span className="pl-2 font-medium text-xs capitalize">
                    {" "}
                    <Status status={data?.getAskForPriceDetails?.status} />
                  </span>
                </p>
              </h1>
              <div className="lg:text-right text-left">
                <h2 className="lg:flex lg:justify-end text-lg font-serif font-semibold mt-4 lg:mt-0 lg:ml-0 md:mt-0">
                  {mode === "dark" ? (
                    <img src={logoDark} alt="TriDyota" width="110" />
                  ) : (
                    <img src={logoLight} alt="TriDyota" width="110" />
                  )}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {globalSetting?.address} <br />
                  {globalSetting?.contact} <br />{" "}
                  <span> {globalSetting?.email} </span> <br />
                  {globalSetting?.website}
                </p>
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
              <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoiceDate")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  <span>
                    {" "}
                    {RequestTime(data?.getAskForPriceDetails?.createdAt)}
                  </span>
                  {/* {data.createdAt !== undefined && (
                  )} */}
                </span>
              </div>
              {/* <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("Product Id")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  {data?.getAskForPriceDetails?._id}
                </span>
              </div> */}
              <div className="flex flex-col lg:text-right text-left">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("User details")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  {data?.getAskForPriceDetails?.personalDetails?.firstName}{" "}
                  {data?.getAskForPriceDetails?.personalDetails?.lastName}
                  <br />
                  {
                    data?.getAskForPriceDetails?.personalDetails?.emailAddress
                  }{" "}
                  <span className="ml-2">
                    {data?.getAskForPriceDetails?.personalDetails?.phoneNumber}
                  </span>
                  {/* <br />
                  {data?.getAskForPriceDetails?.shippingDetails?.streetAddress?.substring(
                    0,
                    30
                  )}
                  <br />
                  {data?.getAskForPriceDetails?.shippingDetails?.city},{" "}
                  {data?.getAskForPriceDetails?.shippingDetails?.state},{" "}
                  {data?.shippingDetails?.zipCode} */}
                </span>
              </div>
            </div>
          </div>
        )}
        {/* <div>
          {loading ? (
            <Loading loading={loading} />
          ) : error ? (
            <span className="text-center mx-auto text-red-500">{error}</span>
          ) : (
            <TableContainer className="my-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>productId</TableCell>
                    <TableCell>message</TableCell>
                    <TableCell className="text-center">peron address</TableCell>

                    <TableCell className="text-right">city/stat</TableCell>
                  </tr>
                </TableHeader>

                <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm ">
                  <TableRow className="dark:border-gray-700 dark:text-gray-400">
                    <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">
                      {data?.getAskForPriceDetails?.productId}
                    </TableCell>
                    <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
                      {data?.getAskForPriceDetails?.message}
                    </TableCell>
                    <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
                      {data?.getAskForPriceDetails?.shippingDetails?.streetAddress?.substring(
                        0,
                        30
                      )}
                    </TableCell>

                    <TableCell className="px-6 py-1 whitespace-nowrap text-right font-bold text-red-500 dark:text-green-500">
                      {data?.getAskForPriceDetails?.shippingDetails?.city},{" "}
                      {data?.getAskForPriceDetails?.shippingDetails?.state},{" "}
                      {data?.shippingDetails?.zipCode}
                    </TableCell>
                  </TableRow>
                </TableBody>
           
              </Table>
            </TableContainer>
          )}
        </div> */}

        {!loading && (
          <div className="border rounded-xl border-gray-100 p-8 py-3 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex lg:flex-row md:flex-row flex-col justify-between">
              <div className="mb-3 md:mb-0 lg:mb-0 px-1  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  Product id
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-normal font-serif block">
                  {data?.getAskForPriceDetails?.productId}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  message
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-normal font-serif block">
                  {data?.getAskForPriceDetails?.message}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0 px-1 flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  Address
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block">
                  {data?.getAskForPriceDetails?.shippingDetails?.streetAddress?.substring(
                    0,
                    30
                  )}
                </span>
              </div>
              <div className="flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  city/state
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block">
                  {data?.getAskForPriceDetails?.shippingDetails?.city},{" "}
                  {data?.getAskForPriceDetails?.shippingDetails?.state},{" "}
                  {data?.shippingDetails?.zipCode}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {!loading && (
        <div className="mb-4 mt-3 flex justify-between">
          {/* <PDFDownloadLink
            document={
              <InvoiceForDownload
                t={t}
                data={data}
                currency={currency}
                globalSetting={globalSetting}
              />
            }
            fileName="Invoice"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading..."
              ) : (
                <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto cursor-pointer">
                  Download Invoice
                  <span className="ml-2 text-base">
                    <IoCloudDownloadOutline />
                  </span>
                </button>
              )
            }
          </PDFDownloadLink> */}

          <ReactToPrint
            trigger={() => (
              <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto">
                {t("PrintInvoice")}
                <span className="ml-2">
                  <FiPrinter />
                </span>
              </button>
            )}
            content={() => printRef.current}
            documentTitle="Invoice"
          />
        </div>
      )}
    </>
  );
};

export default RequestPriceInvoice;
