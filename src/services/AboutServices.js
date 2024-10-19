import requests from "./httpServices";

const AboutServices = {
  getAbout: async () => {
    return requests.get("/about");
  },
  getContact: async () => {
    return requests.get("/setting/global/all");
  },
  getState: async () => {
    return requests.get("/state");
  },
  getContact: async (body) => {
    return requests.post("/contact", body);
  },
};

export default AboutServices;
