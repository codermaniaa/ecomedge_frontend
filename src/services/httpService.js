import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}`,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let adminInfo;
  if (localStorage.getItem("adminToken")) {
    adminInfo = JSON.parse(localStorage.getItem("adminToken"));
  }

  let company;

  if (Cookies.get("company")) {
    company = Cookies.get("company");
  }

  // console.log('Admin Http Services Cookie Read : ' + company);
  // let companyName = JSON.stringify(company);
  // console.log("adminInfo", adminInfo);

  return {
    ...config,
    headers: {
      authtoken: adminInfo ? adminInfo.token : null,
      company: company ? company : null,
    },
  };
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, headers).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url, body) => instance.delete(url, body).then(responseBody),
};

export default requests;
