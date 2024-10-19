import requests from "./httpService";

const EnquiryService = {
  getEnquiry: async ({ page, limit }) => {
    return requests.get(`/enquiry?page=${page}&limit=${limit}`);
  },
  postEnquiryStatus: async (body) => {
    return requests.post(`/productRequest/statuschange`, body);
  },
  postEnquiryStatusChange: async (body) => {
    return requests.post(`/enquiry/action`, body);
  },
};
export default EnquiryService;