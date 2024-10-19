import { TableBody, TableCell, Input, TableRow } from "@windmill/react-ui";
//internal import
import MainDrawer from "@/components/drawer/MainDrawer";
import ProductDrawer from "@/components/drawer/ProductDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";
import TaxDrawer from "../drawer/TaxDrawer";
import useTaxSubmit from "@/hooks/useTaxSubmit";
import LabelArea from "../form/LabelArea";
import { useForm } from "react-hook-form";

//internal import

const TaxTable = ({
  TaxList,
  isCheck,
  setIsCheck,
  currency,
  lang,
  handleUpdate,
  getTaxDetails,
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
        <DeleteModal id={serviceId} title={title} fetchData={getTaxDetails} />
      )}
      {/* 
      {isCheck?.length < 2 && (
        <MainDrawer>
          <TaxDrawer currency={currency} id={serviceId} />
        </MainDrawer>
      )} */}

      <TableBody>
        {TaxList?.map((tax, i) => (
          <TableRow key={i + 1}>
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
                <div>
                  <h2 className="text-sm font-medium">{tax?.taxName}</h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {tax.taxType === "percentage"
                  ? tax?.amount + "%"
                  : "₹ " + tax?.amount}
              </span>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={tax._id}
                Product={tax}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(tax?.title, lang)}
              
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TaxTable;
