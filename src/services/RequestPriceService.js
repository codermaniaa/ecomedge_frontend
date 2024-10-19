import requests from "./httpService";

const RequestPriceService = {
  getRequestPrice: async ({ page, limit,searchQuery,status }) => {
    return requests.get(`/askforprice?page=${page}&limit=${limit}&searchQuery=${searchQuery}&status=${status}`);
  },
  getRequestPriceById: async (id) => {
    return requests.get(`/askforprice/askforpricebyid?id=${id}`);
  },
  postEnquiryStatus: async (body) => {
    return requests.post(`/productRequest/statuschange`, body);
  },
};
export default RequestPriceService;
