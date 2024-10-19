import React, { useContext } from "react";
import { Select } from "@windmill/react-ui";

//internal import
import OrderServices from "@/services/OrderServices";
import { notifySuccess, notifyError } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import EnquiryService from "@/services/EnquiryService";

const SelectEnquiryStatus = ({ id, order,orderStatus }) => {
  // console.log('id',id ,'order',order)
  const { setIsUpdate } = useContext(SidebarContext);
  const handleChangeStatus = (id, status) => {
    return notifyError("CRUD operation is disabled for this option!");
    EnquiryService.postEnquiryStatusChange(id, { status: status })
      .then((res) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err) => notifyError(err.message));
  };

  return (
    <>
      <Select style={{ width: '120px' }}
        onChange={(e) => handleChangeStatus(id, e.target.value)}
        className="border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none"
      >
        <option value="status" defaultValue hidden>
          {orderStatus}
        </option>
        <option defaultValue={orderStatus === "Delivered"} value="Delivered">
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
    </>
  );
};

export default SelectEnquiryStatus;
