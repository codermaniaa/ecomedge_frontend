import requests from "./httpServices";

const CategoryServices = {
  getShowingCategory: async () => {
    return requests.get("/category/show");

  },
  getBrandCatalog: async () => {
    return requests.get("/brandcatalog");
  },
};

export default CategoryServices;
