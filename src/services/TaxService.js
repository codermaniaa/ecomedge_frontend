import requests from "./httpService";

const TaxService = {
  getTax: async ({ page, limit }) => {
    return requests.get(`/tax?page=${page}&limit=${limit}`);
  },
  postTax: async (body) => {
    return requests.post(`/tax`, body);
  },
  getTaxById: async (id) => {
    return requests.get(`/tax/taxbyid`);
  },
  deleteTax: async (body) => {
    return requests.post(`/tax/deletetax`, body);
  },
};
export default TaxService;
