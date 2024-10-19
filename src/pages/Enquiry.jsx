import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Pagination,
  Textarea,
} from "@windmill/react-ui";
// import {
//   Button,
//   Input,
//   TableCell,
//   TableContainer,
//   TableHeader,
//   Table,
// } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";
import { FaRegFilePdf } from "react-icons/fa";

//internal import

import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
// import NotFound from "@/components/table/NotFound";
import ProductServices from "@/services/ProductServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import MainDrawer from "@/components/drawer/MainDrawer";
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
import useEnquirySubmit from "@/hooks/useEnquirySubmit";
import EnquiryTable from "@/components/Enquiry/EnquiryTable";
import { Select } from "@windmill/react-ui";
import "../style/custom-pagination.css"
import ReactPaginate from "react-paginate";
// import Tooltip from "@/components/tooltip/Tooltip";

const Enquiry = ({ id }) => {
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

  const { enquiryList, handleSearchMethod, enquiryPage, getEnquiryDetails } =
    useEnquirySubmit();

   
  // react hooks
  const [orderStatus, setOrderStatus] = useState(false);

  const [isCheck, setIsCheck] = useState([]);
  const handleChangeStatus = (id, status) => {
    return notifyError("CRUD operation is disabled for this option!");
    OrderServices.updateOrder(id, { status: status })
      .then((res) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err) => notifyError(err.message));
  };

  useEffect(() => {
    getEnquiryDetails();
  }, []);
  const pageCount = Math.ceil(enquiryPage?.TotalDocuments / 10);

  return (
    <>
      <PageTitle>{" Enquiry"}</PageTitle>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
        <div className="col-span-8 sm:col-span-4 flex ">
          <Input
            className="border h-12 text-sm focus:outline-none block flex-auto w-70   dark:bg-gray-700 border-transparent "
            name="shippingMethod"
            type="text"
            defaultValue={""}
            placeholder={"Search by name"}
            onBlur={(e) => handleSearchMethod(e.target.value)}
          />

          <Select
            onChange={(e) => handleChangeStatus(id, e.target.value)}
            className="border border-gray-50 bg-gray-50 dark:border-gray-700 h-12 rounded-md text-xs focus:border-gray-400 ml-10 pr-10 focus:outline-none flex-auto w-30 "
          >
            <option value="Status" defaultValue hidden>
              {t("Current Status")}
            </option>
            <option
              defaultValue={orderStatus === "Delivered"}
              value="Delivered"

            >
              Resolve
            </option>
            <option defaultValue={orderStatus === "Pending"} value="Pending">
              Pending
            </option>
            <option
              defaultValue={orderStatus === "Processing"}
              value="Processing"
            >
              Processing
            </option>
            <option defaultValue={orderStatus === "Cancel"} value="Cancel">
              Cancel
            </option>
          </Select>
        </div>
      </div>

      {enquiryList.length > 0 && (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{"id"}</TableCell>

                <TableCell>{"Product Name"}</TableCell>
                <TableCell>{"Quantity"}</TableCell>
                <TableCell>{"Requested BY"}</TableCell>
                <TableCell>{"Contact Number "}</TableCell>
                <TableCell>{"Address "}</TableCell>
                <TableCell>{"Image "}</TableCell>
                <TableCell>{"Status "}</TableCell>
              </tr>
            </TableHeader>
            <EnquiryTable
              lang={lang}
              isCheck={isCheck}
              EnquiryData={enquiryList}
              setIsCheck={setIsCheck}
            />
          </Table>
          <TableFooter>
          {enquiryPage?.TotalDocuments > 10 && (
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
              totalResults={enquiryPage?.TotalDocuments}
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

export default Enquiry;
