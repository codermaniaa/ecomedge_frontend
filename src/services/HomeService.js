import requests from "./httpService";

const homeService = {
  getHome: async ({ page, limit }) => {
    return requests.get(`/homepage/homepagebanner?page=${page}&limit=${limit}`);
  },
  postHome: async (body) => {
    return requests.post(`/homepage/homepagebanner`, body);
  },
  deleteHome: async (body) => {
    return requests.post(`/homepage/deletehomepagebanner`, body);
  },
};
export default homeService;
