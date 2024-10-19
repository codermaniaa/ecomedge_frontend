import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Pagination,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";

//internal import

import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
// import NotFound from "@/components/table/NotFound";
import ProductServices from "@/services/ProductServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import MainDrawer from "@/components/drawer/MainDrawer";
// import ProductDrawer from "@/components/drawer/ProductDrawer";
// import CheckBox from "@/components/form/CheckBox";
import useProductFilter from "@/hooks/useProductFilter";
// import TableLoading from "@/components/preloader/TableLoading";
import LabelArea from "@/components/form/LabelArea";
import Error from "@/components/form/Error";
import { Button } from "@windmill/react-ui";
import TaxTable from "@/components/Tax/TaxTable";
import TaxDrawer from "@/components/drawer/TaxDrawer";
import useShippingSubmit from "@/hooks/useShippingSubmit";
import Uploader from "@/components/image-uploader/Uploader";
import ShippingDrawer from "@/components/drawer/ShippingDrawer";
import ShippingTable from "@/components/Shipping/ShippingTable";
// import Tooltip from "@/components/tooltip/Tooltip";
import "../style/custom-pagination.css"
import ReactPaginate from "react-paginate";
const Shipping = ({ id }) => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const { t } = useTranslation();
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    sortedField,
    limitData,
  } = useContext(SidebarContext);

  // const { data, loading, error } = useAsync(() =>
  //   ProductServices.getAllProducts({
  //     page: currentPage,
  //     limit: limitData,
  //     category: category,
  //     title: searchText,
  //     price: sortedField,
  //   })
  // );
  const {
    register,
    errors,
    shippingMethod,
    deliveryTime,
    isSubmitting,

    shippingIcon,
    setShippingIcon,
    shippingCharges,
    shippingPage,
    handleShippingMethod,
    handleShippingCharges,
    handleDeliveryTime,
    onSubmit,
    handleCancel,
    getShippingDetails,
    handleUpdate,
    cancelUpdate,
    validation,
    shippingResponse,
  } = useShippingSubmit();

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  // const handleSelectAll = () => {
  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(data?.products.map((li) => li._id));
  //   if (isCheckAll) {
  //     setIsCheck([]);
  //   }
  // };

  // console.log('productss',products)
  // const { serviceData } = useProductFilter(data?.products);

  useEffect(() => {
    getShippingDetails();
  }, []);
  const pageCount = Math.ceil(shippingPage?.TotalDocuments / 10);

  return (
    <>
      <PageTitle>{"Shipping Details"}</PageTitle>
      {/* <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} /> */}
      {/* <BulkActionDrawer ids={allId} title="Products" /> */}
      <MainDrawer>
        <ShippingDrawer
          id={serviceId}
          isSubmitting={isSubmitting}
          setShippingIcon={setShippingIcon}
          shippingIcon={shippingIcon}
          shippingMethod={shippingMethod}
          shippingCharges={shippingCharges}
          deliveryTime={deliveryTime}
          UpdateShippingData={validation}
          cancelUpdate={cancelUpdate}
          handleShippingMethod={handleShippingMethod}
          handleShippingCharges={handleShippingCharges}
          handleDeliveryTime={handleDeliveryTime}
        />
      </MainDrawer>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <LabelArea label={t("Icon")} />
        <div className="col-span-8 sm:col-span-4">
          <Uploader
            product
            folder="product"
            imageUrl={shippingIcon}
            setImageUrl={setShippingIcon}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <LabelArea label={"Shipping Method"} />
        <div className="col-span-8 sm:col-span-4">
          <Input
            {...register(`shippingMethod`, {
              required: "Shipping Method is required!",
            })}
            className="border h-12 text-sm focus:outline-none block w-full   dark:bg-gray-700 border-transparent "
            name="shippingMethod"
            type="text"
            defaultValue={shippingMethod}
            placeholder={"Enter Shipping Method."}
            onBlur={(e) => handleShippingMethod(e.target.value)}
          />
          <Error errorName={errors.shippingMethod} />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <LabelArea label={"Charges"} />
        <div className="col-span-8 sm:col-span-4">
          <Input
            {...register(`shippingCharges`, {
              required: "shipping Charges is required!",
            })}
            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent"
            name="shippingCharges"
            type="number"
            defaultValue={shippingCharges}
            placeholder={`Please Enter shipping Charges`}
            onBlur={(e) => handleShippingCharges(e.target.value)}
          />
          <Error errorName={errors.shippingCharges} />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <LabelArea label={"Delivery Time"} />
        <div className="col-span-8 sm:col-span-4">
          <Input
            {...register(`deliveryTime`, {
              required: "Delivery Time is required!",
            })}
            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent"
            name="deliveryTime"
            type="number"
            defaultValue={deliveryTime}
            placeholder={`Please Enter time`}
            onBlur={(e) => handleDeliveryTime(e.target.value)}
          />
          <Error errorName={errors.deliveryTime} />
        </div>
      </div>

      <div className=" z-10  w-full py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 bg-gray-50 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea />
          <div className="col-span-8 sm:col-span-4 flex gap-1 justify-between w-full">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Button
                onClick={() => handleCancel()}
                className="h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700"
                layout="outline"
              >
                {"Cancel"}
              </Button>
            </div>

            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow flex-row">
              {isSubmitting ? (
                <Button disabled={true} type="button"
                style={{ backgroundColor: "#f34d1b" }}
                className="w-full h-12">
                  <img
                    src={spinnerLoadingImage}
                    alt="Loading"
                    width={20}
                    height={10}
                  />{" "}
                  <span className="font-serif ml-2 font-light">Processing</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-12"
                  onClick={onSubmit}
                  style={{ backgroundColor: "#f34d1b" }}

                >
                  {id ? (
                    <span>
                      {t("UpdateBtn")} {title}
                    </span>
                  ) : (
                    <span>ADD {title}</span>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {shippingResponse.length > 0 && (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{"Shipping Name"}</TableCell>
                <TableCell>{"Shipping charge"}</TableCell>
                <TableCell>{"Delivery Time"}</TableCell>
                <TableCell>
                  <button
                    disabled={isCheck?.length > 0}
                    // onClick={() => handleModalOpen(id, title, product)}
                    className="p-2 w-full  flex gap-0 items-center justify-end text-base cursor-pointer dark:text-gray-400"
                  >
                    Edit/Delete
                  </button>
                </TableCell>
              </tr>
            </TableHeader>
            <ShippingTable
              lang={lang}
              isCheck={isCheck}
              shippingList={shippingResponse}
              setIsCheck={setIsCheck}
              handleUpdate={handleUpdate}
              getShippingDetails={getShippingDetails}
              //   currency={currency}
            />
          </Table>
          <TableFooter>
          {shippingPage?.TotalDocuments > 10 && (
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
              totalResults={shippingPage?.TotalDocuments}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Product Page Navigation"
            /> */}
          </TableFooter>
        </TableContainer>
      )}
    </>
  );
};

export default Shipping;
