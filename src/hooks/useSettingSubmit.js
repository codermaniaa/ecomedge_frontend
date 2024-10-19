import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import SettingServices from "@/services/SettingServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const useSettingSubmit = (id) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const [isSave, setIsSave] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resSettingId, setResSettingId] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // return notifyError("CRUD operation is disabled for this option!");
    try {
      setIsSubmitting(true);
      // const settingData = {
      //   name: "globalSetting",
      //   setting: {
      //     number_of_image_per_product: data.number_of_image_per_product,
      //     shop_name: data.shop_name,
      //     address: data.address,
      //     company_name: data.company_name,
      //     vat_number: data.vat_number,
      //     post_code: data.post_code,
      //     contact: data.contact,
      //     email: data.email,
      //     website: data.website,
      //     receipt_size: data.receipt_size,
      //     default_currency: data.default_currency,
      //     default_time_zone: data.default_time_zone,
      //     default_date_format: data.default_date_format,
      //   },
      // };
      const socialMedia = [
        { name: "facebook", medialink: data?.facebook },
        { name: "instagram", medialink: data.Instagram },
        { name: "linkedIn", medialink: data.LinkedIn },
      ];
      const settingData = {
        // name: "globalSetting",
        id: resSettingId?resSettingId:'',
        numberOfImagePerProduct: parseInt(data.number_of_image_per_product, 10),
        shopName: data.shop_name,
        address: data.address,
        companyName: data.company_name,
        // vat_number: data.vat_number,
        postCode: data.post_code,
        contact: data.contact,
        email: data.email,
        website: data.website,
        receiptSize: data.receipt_size,
        defaultCurrency: data.default_currency,
        defaultTimeZone: data.default_time_zone,
        defaultDateFormat: data.default_date_format,
        socialMedia: socialMedia,
      };

      // console.log('global setting', globalSettingData);
      // return;

      if (resSettingId) {
        const res = await SettingServices.updateGlobalSetting(settingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        // window.location.reload();
        notifySuccess(res.message);
      } else {
        const res = await SettingServices.addGlobalSetting(settingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        // window.location.reload();
        notifySuccess(res.message);
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err.message);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await SettingServices.getGlobalSetting();
        // console.log("res>>>", res);
        if (res) {
          setResSettingId(res?.globalSetting?._id);
          setIsSave(false);
          setValue(
            "number_of_image_per_product",
            res?.globalSetting?.numberOfImagePerProduct
          );
          setValue("shop_name", res?.globalSetting?.shopName);
          setValue("address", res?.globalSetting?.address);
          setValue("company_name", res?.globalSetting?.companyName);
          // setValue("vat_number", res?.globalSetting?.vat_number);
          setValue("post_code", res?.globalSetting?.postCode);
          setValue("contact", res?.globalSetting?.contact);
          setValue("email", res?.globalSetting?.email);
          setValue("website", res?.globalSetting?.website);
          setValue("receipt_size", res?.globalSetting?.receiptSize);
          setValue("default_currency", res?.globalSetting?.defaultCurrency);
          setValue("default_time_zone", res?.globalSetting?.defaultTimeZone);
          setValue(
            "default_date_format",
            res?.globalSetting?.defaultDateFormat
          );
          setValue("facebook", res?.globalSetting?.socialMedia[0].medialink);
          setValue("Instagram", res?.globalSetting?.socialMedia[1].medialink);
          setValue("LinkedIn", res?.globalSetting?.socialMedia[2].medialink);
        }
      } catch (err) {
        notifyError(err ? err?.response?.data?.message : err.message);
      }
    })();
  }, [resSettingId]);

  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSave,
    isSubmitting,
  };
};

export default useSettingSubmit;
