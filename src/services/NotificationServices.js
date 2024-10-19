import requests from "./httpServices";

const NotificationServices = {

    //store setting all function
  getAllNotification: async () => {
    return requests.get("notification/all");
  },
};
export default NotificationServices;