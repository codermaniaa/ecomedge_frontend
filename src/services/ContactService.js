import requests from "./httpService";

const ContactService = {
  getContact: async ({ page, limit }) => {
    return requests.get(`/contact?page=${page}&limit=${limit}`);
  },
  postContactStatus: async (body) => {
    return requests.post(`/contact/action`, body);
  },
};
export default ContactService;
