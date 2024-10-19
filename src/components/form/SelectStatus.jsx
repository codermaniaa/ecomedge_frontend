import React, { useContext } from "react";
import { Select } from "@windmill/react-ui";
import { notifySuccess, notifyError } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import OrderServices from "@/services/OrderServices";
import { pdf } from "@react-pdf/renderer";
import InvoiceForDownload from "@/components/invoice/InvoiceForDownload";
import { useTranslation } from "react-i18next";
import useAsync from "@/hooks/useAsync";
import SettingServices from "@/services/SettingServices";

const SelectStatus = ({ id, order }) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "₹";
  const { data: orderData } = useAsync(() => OrderServices.getOrderById(id));

  const handleChangeStatus = async (id, status) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("status", status);

      if (status === "Delivered" ) {
        const pdfBlob = await generatePDFBlob();
        if (pdfBlob) {
          formData.append("file", pdfBlob, "invoice.pdf");
        } else {
          notifyError("Failed to generate PDF");
          return;
        }
      }

      const headers = {
        // No need to set Content-Type header to multipart/form-data, the browser will set it automatically
        // when FormData is used
        // Other necessary headers, such as authorization tokens, can be added here
      };

      const data = await OrderServices.getOrderaction(formData, headers);
      if (data.success) {
        notifySuccess(data.message);
        setIsUpdate(true);
      } else {
        notifyError(data.message || "Failed to update status");
      }
    } catch (error) {
      notifyError(error.message || "An error occurred");
    }
  };

  const generatePDFBlob = async () => {
    try {
      if (!orderData || !globalSetting) {
        console.error("Missing data for PDF generation");
        return null;
      }
      orderData.status = "Delivered";
      const doc = (
        <InvoiceForDownload
          data={orderData}
          currency={currency}
          globalSetting={globalSetting}
        />
      );

      const asPdf = pdf([]);
      asPdf.updateContainer(doc);
      return await asPdf.toBlob();
    } catch (error) {
      console.error("Error generating PDF Blob:", error);
      return null;
    }
  };

  return (
    <Select
      style={{ width: "120px" }}
      onChange={(e) => handleChangeStatus(id, e.target.value)}
      className="border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none"
    >
      <option value="status" defaultValue hidden>
        {order?.status}
      </option>
      <option defaultValue={order?.status === "Delivered"} value="Delivered">
        Delivered
      </option>
      <option defaultValue={order?.status === "Pending"} value="Pending">
        Pending
      </option>
      <option defaultValue={order?.status === "Processing"} value="Processing">
        Processing
      </option>
      <option defaultValue={order?.status === "Cancel"} value="Cancel">
        Cancel
      </option>
    </Select>
  );
};

export default SelectStatus;
