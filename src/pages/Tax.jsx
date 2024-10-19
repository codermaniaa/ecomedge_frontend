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
import useTaxSubmit from "@/hooks/useTaxSubmit";
import LabelArea from "@/components/form/LabelArea";
import Error from "@/components/form/Error";
import { Button } from "@windmill/react-ui";
import TaxTable from "@/components/Tax/TaxTable";
import TaxDrawer from "@/components/drawer/TaxDrawer";
// import Tooltip from "@/components/tooltip/Tooltip";
import "../style/custom-pagination.css"
import ReactPaginate from "react-paginate";

const Tax = ({ id }) => {
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
    taxName,
    taxAmount,
    isSubmitting,
    buttonType,
    taxType,
    taxList,
    taxPage,
    handleTaxName,
    handleTaxAmount,
    handleSelectType,
    onSubmit,
    handleCancel,
    getTaxDetails,
    handleUpdate,
    cancelUpdate,
    validation,
  } = useTaxSubmit();

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
    getTaxDetails();
  }, []);
  const pageCount = Math.ceil(taxPage?.TotalDocuments / 10);

  return (
    <>
      <PageTitle>{"Tax Details"}</PageTitle>
      {/* <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} /> */}
      {/* <BulkActionDrawer ids={allId} title="Products" /> */}
      <MainDrawer>
        <TaxDrawer
          id={serviceId}
          taxName={taxName}
          buttonType={buttonType}
          handleSelectType={handleSelectType}
          taxType={taxType}
          taxAmount={taxAmount}
          isSubmitting={isSubmitting}
          UpdateTaxData={validation}
          cancelUpdate={cancelUpdate}
          handleTaxAmount={handleTaxAmount}
          handleTaxName={handleTaxName}
        />
      </MainDrawer>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <LabelArea label={"TAX NAME"} />
        <div className="col-span-8 sm:col-span-4">
          <Input
            {...register(`taxName`, {
              required: "Tax Name is required!",
            })}
            className="border h-12 text-sm focus:outline-none block w-full   dark:bg-gray-700 border-transparent "
            name="taxName"
            type="text"
            defaultValue={taxName}
            placeholder={"Enter Tax Title."}
            onBlur={(e) => handleTaxName(e.target.value)}
          />
          <Error errorName={errors.taxName} />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <LabelArea label={"TYPE"} />
        <div className="col-span-8 sm:col-span-4 w-full flex gap-1 flex-wrap">
          {buttonType &&
            buttonType.map((item, i) => (
              <p
                key={i}
                onClick={() => handleSelectType(item)}
                className={`py-3 px-4 rounded bg-gray-200 dark:bg-gray-800 dark:text-primaryOn w-48 text-xs text-center cursor-pointer ${
                  taxType === item
                    ? "border-2 border-dashed border-green-500"
                    : ""
                } `}
              >
                {item}
              </p>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <LabelArea label={"AMOUNT"} />
        <div className="col-span-8 sm:col-span-4">
          <Input
            {...register(`taxAmount`, {
              required: "Amount is required!",
            })}
            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent"
            name="taxAmount"
            type="number"
            defaultValue={taxAmount}
            placeholder={`Please Enter Amount ${
              taxType === "PERCENTAGE (%)" ? '"%"' : '"₹"'
            }`}
            onBlur={(e) => handleTaxAmount(e.target.value)}
          />
          <Error errorName={errors.taxAmount} />
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
                <Button disabled={true} type="button" style={{ backgroundColor: "#f34d1b" }} className="w-full h-12">
                  <img
                    src={spinnerLoadingImage}
                    alt="Loading"
                    width={20}
                    height={10}
                  />{" "}
                  <span className="font-serif ml-2 font-light" >Processing</span>
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
                    <span >ADD {title}</span>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {taxList.length > 0 && (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                {/* <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    isChecked={isCheckAll}
                    handleClick={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>{"Tax Name"}</TableCell>
                <TableCell>{"Amount"}</TableCell>
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
            <TaxTable
              lang={lang}
              isCheck={isCheck}
              TaxList={taxList}
              setIsCheck={setIsCheck}
              handleUpdate={handleUpdate}
              getTaxDetails={getTaxDetails}
              //   currency={currency}
            />
          </Table>
          <TableFooter>
          {taxPage?.TotalDocuments > 10 && (
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
            <Pagination
              totalResults={taxPage?.TotalDocuments}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Product Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      )}
    </>
  );
};

export default Tax;
