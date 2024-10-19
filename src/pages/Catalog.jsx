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
import { useTranslation } from "react-i18next";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";
import { FaRegFilePdf } from "react-icons/fa";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import MainDrawer from "@/components/drawer/MainDrawer";
import LabelArea from "@/components/form/LabelArea";
import Error from "@/components/form/Error";
import { Button } from "@windmill/react-ui";
import Uploader from "@/components/image-uploader/Uploader";
import useCatalogSubmit from "@/hooks/useCatalogSubmit";
import CatalogTable from "@/components/Catalog/CatalogTable";
import CatalogDrawer from "@/components/drawer/CatalogDrawer";
import "../style/custom-pagination.css"
import ReactPaginate from "react-paginate";
const Catalog = ({ id }) => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } = useToggleDrawer();
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
  const {
    register,
    errors,
    isSubmitting,
    onSubmit,
    handleCancel,
    handleUpdate,
    cancelUpdate,
    validation,
    catalogPage,
    brandName,
    brandIcon,
    setBrandIcon,
    dec,
    description,
    getAllList,
    brandFile,
    setBrandFile,
    brandFileName,
    setBrandFileName,
    handleBrandName,
    handleDescription,
    handleDec,
    getCatalogDetails,
    itemId,
  } = useCatalogSubmit();

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    getCatalogDetails();
  }, []);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBrandFile(file);
    setBrandFileName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(e);
  };
  const pageCount = Math.ceil(catalogPage?.TotalDocuments / 10);

  return (
    <>
      <PageTitle>{"Catalog Details"}</PageTitle>
      <MainDrawer>
        <CatalogDrawer
          id={serviceId}
          isSubmitting={isSubmitting}
          UpdateCatalogData={validation}
          cancelUpdate={cancelUpdate}
          brandIcon={brandIcon}
          brandName={brandName}
          handleBrandName={handleBrandName}
          setBrandIcon={setBrandIcon}
          dec={description}
          handleDec={handleDescription}
          brandFile={brandFile}
          brandFileName={brandFileName}
          setBrandFileName={setBrandFileName}
          setBrandFile={setBrandFile}
        />
      </MainDrawer>

      <form onSubmit={handleSubmit} className="track-horizontal thumb-horizontal w-full p-5 relative dark:bg-gray-700 dark:text-gray-200" >
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={"Brand Name"} />
          <div className="col-span-8 sm:col-span-4">
            <Input
              {...register(`brandName`, {
                required: "Brand Name is required!",
              })}
              className="border h-12 text-sm focus:outline-none block w-full dark:bg-gray-700 border-transparent"
              name="brandName"
              type="text"
              defaultValue={brandName}
              placeholder={"Enter Brand Name."}
              onBlur={(e) => handleBrandName(e.target.value)}
            />
            <Error errorName={errors.brandName} />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={"Brand Logo"} />
          <div className="col-span-8 sm:col-span-4">
            <Uploader
              product
              folder="product"
              imageUrl={brandIcon}
              setImageUrl={setBrandIcon}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={"Description"} />
          <div className="col-span-8 sm:col-span-4">
            <Textarea
              className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              {...register(`description`, {
                required: "Description is required!",
              })}
              name="description"
              rows="4"
              spellCheck="false"
              defaultValue={description}
              placeholder={"Brand Description"}
              onBlur={(e) => handleDescription(e.target.value)}
            />
            <Error errorName={errors.description} />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={"File"} />
          {/* <div className="col-span-8 sm:col-span-4">
            <label
              htmlFor="filesss"
              className="flex justify-items-center items-center border text-sm focus:outline-none cursor-pointer block w-full border-transparent focus:bg-white p-1 rounded-md bg-gray-200 dark:text-primaryOn dark:bg-bgBlack"
            >
              <FaRegFilePdf className="text-4xl" /> select file
            </label>
            <input
              id="filesss"
              accept=".pdf,.docx,.xlsx"
              className="hidden"
              imageUrl= {brandFile}
              onChange={handleFileChange}
              />
            </div> */}

          <div className="col-span-8 sm:col-span-4">
            <Uploader
              product
              pdf={true}
              pdfName={brandFileName}
              scenario="brandFile"
              folder="product"
              imageUrl={brandFile}
              setImageUrl={setBrandFile}
              setBrandFileName={setBrandFileName}
            />
          </div >
          {/* {brandFileName && <p className="col-span-4 sm:col-span-2 font-medium text-sm">{brandFileName}</p>} */}
        </div>
        <div className="w-full py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 bg-gray-50 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea />
            <div className="col-span-8 sm:col-span-4 flex gap-1 justify-between w-full">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Button
                  onClick={() => handleCancel()

                  }
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
                    <span className="font-serif ml-2 font-light">Processing</span>
                  </Button>
                ) : (
                  <Button type="submit"
                    style={{ backgroundColor: "#f34d1b" }}
                    className="w-full h-12">
                    {itemId ? "Update" : "Add"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      {getAllList.length > 0 && (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{"Brand Name"}</TableCell>
                <TableCell>{"Description"}</TableCell>
                <TableCell>
                  <button
                    disabled={isCheck?.length > 0}
                    className="p-2 w-full flex gap-0 items-center justify-end text-base cursor-pointer dark:text-gray-400"
                  >
                    Delete
                  </button>
                </TableCell>
              </tr>
            </TableHeader>
            <CatalogTable
              lang={lang}
              isCheck={isCheck}
              setIsCheck={setIsCheck}
              getAllList={getAllList}
              handleUpdate={handleUpdate}
              getCatalogDetails={getCatalogDetails}
            />
          </Table>
          <TableFooter>
            {catalogPage?.TotalDocuments > 10 && (
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
              totalResults={catalogPage?.TotalDocuments}
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

export default Catalog;
