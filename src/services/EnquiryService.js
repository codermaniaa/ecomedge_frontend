import requests from "./httpServices";

const EnquiryService = {
  getEnquiry: async () => {
    return requests.get("/enquiry");
  },
  PostEnquiry: async (body) => {
    return requests.post("/enquiry",body);
  },
  getaskforprice: async () => {
    return requests.get("/askforprice");
  },
  Postaskforprice: async (body) => {
    return requests.post("/askforprice",body);
  },
};

export default EnquiryService;