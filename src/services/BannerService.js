import requests from "./httpService";

const BannerService = {
  getBanner: async ({ page, limit }) => {
    return requests.get(`/promotion?page=${page}&limit=${limit}`);
  },
  postBanner: async (body) => {
    return requests.post(`/promotion`, body);
  },
  getBannerById: async (id) => {
    return requests.get(`/promotion/getpromotionmethodbyid=${id}`);
  },
  deleteBanner: async (body) => {
    return requests.post(`/promotion/deletepromotionbyid`,body);
  },
};
export default BannerService;