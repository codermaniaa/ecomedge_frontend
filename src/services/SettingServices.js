import requests from "./httpServices";

const SettingServices = {
  //store setting all function
  getOnlineStoreSetting: async () => {
    return requests.get("/setting/store/all");
  },
  //store customization setting all function
  getStoreCustomizationSetting: async () => {
    return requests.get("/setting/store/customization/all");
  },

  getShowingLanguage: async () => {
    return requests.get(`/language/show`);
  },

  getGlobalSetting: async () => {
    return requests.get("/setting/global/all");
  },
  getHomeBanner: async () => {
    return requests.get("/homepage/homepagebanner");
  },
  getPromotionBanner: async () => {
    return requests.get("/promotion");
  },
  getSettingFooter: async () => {
    return requests.get("/setting/global/all");
  },
  getShippingDetails: async () => {
    return requests.get("/shipping");
  },
};

export default SettingServices;
