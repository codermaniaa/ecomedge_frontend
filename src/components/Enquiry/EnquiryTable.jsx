import { TableBody, TableCell, Input, TableRow } from "@windmill/react-ui";
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
import { AiFillEye } from "react-icons/ai";
import SelectEnquiryStatus from "../form/SelectEnquiryStatus";
import { NavLink } from "react-router-dom";

//internal import

const EnquiryTable = ({
  EnquiryData,
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
        {EnquiryData?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-sm">{item?.zipCode}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <div>
                  <h2 className="text-sm font-medium">{item?.productName}</h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{item?.quantity}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.phone}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.address}</span>
            </TableCell>
            <TableCell>
              <a
                href={`${item?.productImage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-sm flex justify-center items-center gap-1 cursor-pointer">
                  {" "}
                  <AiFillEye /> view more
                </span>
              </a>
            </TableCell>
            <TableCell>
              <SelectEnquiryStatus orderStatus={item?.status} id={item?._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default EnquiryTable;
