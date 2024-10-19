import {
  Button,
  Card,
  CardBody,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronRight, FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

//internal import
import CategoryTable from "@/components/category/CategoryTable";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import Loading from "@/components/preloader/Loading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import CategoryServices from "@/services/CategoryServices";
import { showingTranslateValue } from "@/utils/translate";
import "../style/custom-pagination.css"
import ReactPaginate from "react-paginate";

const ChildCategory = () => {
  const { id } = useParams();
  const [childCategory, setChildCategory] = useState([]);
  const [selectedObj, setSelectObj] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { handleDeleteMany, allId, handleUpdateMany } = useToggleDrawer();
  const { data, loading, error } = useAsync(CategoryServices.getAllCategory);
  const [curChildrenData, setCurrentChildrenData] = useState({categories:[]});
  const [parentCategoryName,setParentCategoryName] = useState("");
  const subCategoryLimit = 100;
  const { t } = useTranslation();
  console.log("Data in child Category.... ",data);
  useEffect(() => {
    const getAncestors = (target, children, ancestors = []) => {
      for (let node of children) {
        if (node._id === target) {
          return ancestors.concat(node);
        }
        const found = getAncestors(
          target,
          node?.children,
          ancestors?.concat(node)
        );
        if (found) {
          return found;
        }
      }
      return undefined;
    };

    const findChildArray = (obj, target) => {
      // console.log('obj', obj);
      return obj?._id === target
        ? obj
        : obj?.children?.reduce(
            (acc, obj) => acc ?? findChildArray(obj, target),
            undefined
          );
    };

    if (!loading) {
      var result;
      if(data && data.categories.length > 0){
        for(let cur_category of data.categories){
          const childArray = findChildArray(cur_category, id);
          if(childArray){
            result = childArray;
            break;
          }
        }
      }
      // const result = findChildArray(data.categories, id);
      const res = getAncestors(id, result?.children);

      if (result?.children?.length > 0) {
        setParentCategoryName(result?.name)
        setCurrentChildrenData({categories:result?.children})
        setChildCategory(result?.children);
        setSelectObj(res);
      }
      // console.log("result", result, "res", res);
    }
  }, [id, loading, data, childCategory]);

  const {
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleChangePage,
  } = useFilter(childCategory);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(childCategory?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  const pageCount = Math.ceil(curChildrenData?.categories?.length / 10);

  return (
    <>
      <PageTitle>{t("CategoryPageTitle")}</PageTitle>

      <DeleteModal ids={allId} setIsCheck={setIsCheck} category />

      <BulkActionDrawer
        ids={allId}
        title="Child Categories"
        lang={lang}
        data={data}
        childId={id}
      />

      <div className="flex items-center pb-4">
        <ol className="flex items-center w-full overflow-hidden font-serif ">
          <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
            <Link className="text-white" to={`/admin/categories`}>{t("Categories")}</Link>
          </li>
          {selectedObj?.map((child, i) => (
            <span key={i + 1} className="flex items-center font-serif">
              <li className="text-sm mt-[1px]">
                {" "}
                <FiChevronRight />{" "}
              </li>
              <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer text-blue-700 hover:text-green-500 font-semibold ">
                <Link to={`/admin/categories/${child._id}`}>
                  {child?.name}
                </Link>
              </li>
            </span>
          ))}
        </ol>
      </div>
      
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="flex justify-end items-end">
            {/* <Button onClick={toggleDrawer} className="rounded-md h-12"> */}
              <span className="text-white mr-3">
                Parent Category:-
              </span>
              <span className="text-white">
                {parentCategoryName}
              </span>
            {/* </Button> */}
          </div>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="flex justify-end items-end">
            <Button onClick={toggleDrawer} style={{ backgroundColor: "#f34d1b" }} className="rounded-md h-12">
              <span className="mr-3">
                <FiPlus />
              </span>
              {t("AddCategory")}
            </Button>

            <div className="ml-3 w-full md:w-24 lg:w-24 xl:w-24">
              <Button
                disabled={isCheck.length < 1}
                onClick={() => handleUpdateMany(isCheck)}
                className="w-full rounded-md h-12"
                style={{ backgroundColor: "#f34d1b" }}
              >
                <FiEdit />
                {t("BulkAction")}
              </Button>
            </div>

            <Button
              disabled={isCheck.length < 1}
              onClick={() => handleDeleteMany(isCheck)}
              className="ml-3 rounded-md h-12 bg-red-500"
              style={{ backgroundColor: "#f34d1b" }}
            >
              <span className="mr-3">
                <FiTrash2 />
              </span>
              {t("Delete")}
            </Button>
          </div>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                </TableCell>
                <TableCell>{t("catIdTbl")}</TableCell>
                <TableCell>{t("catIconTbl")}</TableCell>
                <TableCell>{t("Name")}</TableCell>
                <TableCell>{t("Description")}</TableCell>

                <TableCell className="text-center">
                  {t("catPublishedTbl")}
                </TableCell>
                <TableCell className="text-right">
                  {t("catActionsTbl")}
                </TableCell>
              </tr>
            </TableHeader>

            <CategoryTable
              data={curChildrenData}
              lang={lang}
              isCheck={isCheck}
              setIsCheck={setIsCheck}
              useParamId={id}
            />
          </Table>
          <TableFooter>
          {curChildrenData?.categories?.length > 10 && (
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
              totalResults={curChildrenData?.categories?.length}
              resultsPerPage={subCategoryLimit}
              onChange={handleChangePage}
              label="Table navigation"
            /> */}
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no categories right now." />
      )}
    </>
  );
};

export default ChildCategory;
