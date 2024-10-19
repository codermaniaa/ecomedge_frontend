import requests from "./httpServices";

const OrderServices = {
  addOrder: async (body, headers) => {
    return requests.post("/order/add", body, headers);
  },

  createPaymentIntent: async (body) => {
    return requests.post("/order/create-payment-intent", body);
  },

  getOrderCustomer: async ({ page = 1, limit = 8 }) => {
    return requests.get(`/order?limit=${limit}&page=${page}`);
  },
  getOrderById: async (id, body) => {
    return requests.get(`/order/${id}`, body);
  },
  taxCredential: async (body) => {
    return requests.post("/tax/taxaccordingstate", body);
  },
  getRequestForPrice: async ({ page = 1, limit = 8 }) => {
    return requests.get(`askforprice?limit=${limit}&page=${page}`);
  },
};

export default OrderServices;
