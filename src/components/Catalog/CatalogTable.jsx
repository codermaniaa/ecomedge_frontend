import {
    TableBody,
    TableCell,
    Input,
    Avatar,
    TableRow,
  } from "@windmill/react-ui";
  //internal import
  import MainDrawer from "@/components/drawer/MainDrawer";
  import CheckBox from "@/components/form/CheckBox";
  import DeleteModal from "@/components/modal/DeleteModal";
  import EditDeleteButton from "@/components/table/EditDeleteButton";
  import useToggleDrawer from "@/hooks/useToggleDrawer";
  import { showingTranslateValue } from "@/utils/translate";
  import TaxDrawer from "../drawer/TaxDrawer";
  import useTaxSubmit from "@/hooks/useTaxSubmit";
  import LabelArea from "../form/LabelArea";
  import { useForm } from "react-hook-form";
  
  const CatalogTable = ({
    getAllList,
    isCheck,
    setIsCheck,
    currency,
    lang,
    handleUpdate,
    getCatalogDetails,
  }) => {
    const { title, serviceId, handleModalOpen } = useToggleDrawer();
  
    const handleClick = (e) => {
      const { id, checked } = e.target;
      // console.log("id", id, checked);
  
      setIsCheck([...isCheck, id]);
      if (!checked) {
        setIsCheck(isCheck.filter((item) => item !== id));
      }
    };
    return (
      <>
        {isCheck?.length < 1 && (
          <DeleteModal
            id={serviceId}
            title={title}
            setIsCheck={setIsCheck}
            fetchData={getCatalogDetails}
          />
        )}
        {/* 
      {isCheck?.length < 2 && (
        <MainDrawer>
          <TaxDrawer currency={currency} id={serviceId} />
        </MainDrawer>
      )} */}
  
        <TableBody>
          {getAllList?.map((item, i) => (
            <TableRow key={i}>
              {/* <TableCell>
              <CheckBox
                type="checkbox"
                name={tax?.taxName}
                id={tax.id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(tax._id)}
              />
            </TableCell> */}
  
              <TableCell>
                <div className="flex items-center">
                  {item?.brandLogo ? (
                    <Avatar
                      className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                      src={item?.brandLogo}
                      alt="product"
                    />
                  ) : (
                    <Avatar
                      src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                      alt="product"
                    />
                  )}
                  <div>
                    <h2 className="text-sm font-medium">{item?.brandName}</h2>
                  </div>
                </div>
              </TableCell>
  
              <TableCell>
                <span className="text-sm">{item?.description}</span>
              </TableCell>
              {/* <TableCell>
                <span className="text-sm">{item?.file}</span>
              </TableCell> */}
  
              <TableCell>
                <EditDeleteButton
                  id={item._id}
                  Product={item}
                  isCheck={isCheck}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  title={showingTranslateValue(item?.brandName, lang)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    );
  };
  
  export default CatalogTable;
  