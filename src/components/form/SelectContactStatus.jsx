import React, { useContext } from "react";
import { Select } from "@windmill/react-ui";

//internal import
import { notifySuccess, notifyError } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import ContactService from "@/services/ContactService";

const SelectContactStatus = ({ id, order, orderStatus }) => {
  // console.log('id',id ,'order',order)
  const { setIsUpdate } = useContext(SidebarContext);
  const handleChangeStatus = (id, status) => {
    // return notifyError("CRUD operation is disabled for this option!");
    ContactService.postContactStatus({ id: id, status: status })
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
        <option defaultValue={orderStatus === "Resolve"} value="Resolve">
          Resolve
        </option>
        <option defaultValue={orderStatus === "Pending"} value="Pending">
          Pending
        </option>
        <option defaultValue={orderStatus === "Processing"} value="Processing">
          Processing
        </option>
        <option defaultValue={orderStatus === "Cancel"} value="Cancel">
          Cancel
        </option>
      </Select>
    </>
  );
};

export default SelectContactStatus;
