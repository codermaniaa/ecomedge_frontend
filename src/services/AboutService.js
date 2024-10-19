import requests from "./httpService";

const AboutService = {
  getAbout: async ({ page, limit }) => {
    return requests.get(`/about?page=${page}&limit=${limit}`);
  },
  postAbout: async (body) => {
    return requests.post(`/about`, body);
  },
};
export default AboutService;
