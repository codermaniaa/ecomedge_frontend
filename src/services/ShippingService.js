import requests from "./httpService";

const shippingService = {
  getShipping: async ({ page, limit }) => {
    return requests.get(`/shipping?page=${page}&limit=${limit}`);
  },
  postShipping: async (body) => {
    return requests.post(`/shipping`, body);
  },
  getShippingById: async (id) => {
    return requests.get(`shippingmethodbyid?id=${id}`);
  },
  deleteShipping: async (id) => {
    return requests.delete(`/shipping/deleteshippingmethod/${id}`);
  },
};
export default shippingService;