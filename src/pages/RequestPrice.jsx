import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Pagination,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import exportFromJSON from "export-from-json";

//internal import
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import OrderServices from "@/services/OrderServices";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import OrderTable from "@/components/order/OrderTable";
import TableLoading from "@/components/preloader/TableLoading";
import { notifyError } from "@/utils/toast";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import RequestPriceTable from "@/components/RequestPrice/RequestPriceTable";
import RequestPriceService from "@/services/RequestPriceService";
import "../style/custom-pagination.css"
import ReactPaginate from "react-paginate";
const RequestPrice = () => {
  const {
    time,
    setTime,
    currentPage,
    searchText,
    searchRef,
    status,
    setStatus,
    handleChangePage,
    handleSubmitForAll,
    resultsPerPage,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    lang,
  } = useContext(SidebarContext);

  const { t } = useTranslation();
  const [loadingExport, setLoadingExport] = useState(false);

  const { data, loading, error } = useAsync(() =>
    RequestPriceService.getRequestPrice({
      searchQuery: searchText,
      status,
      page: currentPage,
      limit: resultsPerPage,
      day: time,
      startDate,
      endDate,
    })
  );

  const { dataTable, serviceData, globalSetting } = useFilter(data?.getAskForPriceDetails);

  const handleDownloadOrders = async () => {
    try {
      setLoadingExport(true);
      const res = await OrderServices.getAllOrders({
        searchQuery: "",
        status: null,
        page: null,
        limit: null,
        day: null,
        // startDate: null,
        // endDate: null,
      });

      // console.log("handleDownloadOrders", res);
      const exportData = res?.orders?.map((order) => {
        return {
          _id: order._id,
          invoice: order.invoice,
          subTotal: order.subTotal,
          shippingCost: order.shippingCost,
          discount: order?.discount,
          total: order.total,
          paymentMethod: order.paymentMethod,
          status: order.status,
          user_info: order?.user_info?.name,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        };
      });

      exportFromJSON({
        data: exportData,
        fileName: "orders",
        exportType: exportFromJSON.types.csv,
      });
      setLoadingExport(false);
    } catch (err) {
      setLoadingExport(false);
      // console.log("err on orders download", err);
      notifyError(err ? err?.response?.data?.message : err.message);
    }
  };
  console.log("data in Rrquest page", data);
  console.log("dataTable in  Rrquest page", dataTable);

  const pageCount = Math.ceil(data?.pagination?.TotalDocuments / 10);

  return (
    <>
      <PageTitle>{t("Request")}</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form onSubmit={handleSubmitForAll}>
            <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
              <div>
                <Input
                  ref={searchRef}
                  type="search"
                  name="search"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  placeholder="Search by Customer Name / Product Name"
                />
              </div>

              <div>
                <Select
                  onChange={(e) => setStatus(e.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                >
                  <option value="Status" defaultValue hidden>
                    {t("Status")}
                  </option>

                  <option value="resolved">{t("Resolved")}</option>
                  <option value="pending  ">{t("PageOrderPending")}</option>
                  <option value="processing">{t("PageOrderProcessing")}</option>
                  <option value="cancel">{t("OrderCancel")}</option>
                </Select>
              </div>

              <div>
                {/* <Label style={{ visibility: "hidden" }}>{t("Download")}</Label> */}
                {loadingExport ? (
                  <Button disabled={true} type="button"
                    style={{ backgroundColor: "#f34d1b" }}
                    className="h-12 w-full">
                    <img
                      src={spinnerLoadingImage}
                      alt="Loading"
                      width={20}
                      height={10}
                    />{" "}
                    <span className="font-serif ml-2 font-light">
                      Processing
                    </span>
                  </Button>
                ) : (
                  <button
                    onClick={handleDownloadOrders}
                    disabled={data?.orders?.length <= 0 || loadingExport}
                    type="button"
                    style={{ backgroundColor: "#f34d1b" }}
                    className={`${(data?.orders?.length <= 0 || loadingExport) &&
                      "opacity-50 cursor-not-allowed bg-red-300"
                      } flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium focus:outline-none px-6 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300`}
                  >
                    Download All Orders
                    <span className="ml-2 text-base">
                      <IoCloudDownloadOutline />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 dark:bg-gray-900">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("product name")}</TableCell>
                <TableCell>{t("TimeTbl")}</TableCell>
                <TableCell>{t("CustomerName")}</TableCell>
                <TableCell>{t("Contact")}</TableCell>
                <TableCell>{t("Email")}</TableCell>
                <TableCell>{t("message")}</TableCell>
                <TableCell>{t("ActionTbl")}</TableCell>
                <TableCell className="text-right">{t("Details")}</TableCell>
              </tr>
            </TableHeader>

            <RequestPriceTable
              lang={lang}
              orders={data}
              globalSetting={globalSetting}
              currency={globalSetting?.default_currency || "₹"}
            />
          </Table>

          <TableFooter>
            {data?.pagination?.TotalDocuments > 10 && (
              <div className="paginationOrder">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next"
                  onPageChange={(e) => handleChangePage(e.selected + 1)}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  previousLabel="Previous"
                  renderOnZeroPageCount={null}
                  pageClassName="page--item"
                  pageLinkClassName="page--link"
                  previousClassName="page-item"
                  previousLinkClassName="page-previous-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-next-link"
                  breakClassName="page--item"
                  breakLinkClassName="page--link"
                  containerClassName="pagination"
                  activeClassName="activePagination"
                />
              </div>)}
            {/* <Pagination
              totalResults={data?.pagination?.TotalDocuments}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            /> */}
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no orders right now." />
      )}
    </>
  );
};

export default RequestPrice;
