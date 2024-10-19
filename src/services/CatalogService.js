import requests from "./httpService";

const CatalogService = {
  getCatalog: async ({ page, limit }) => {
    return requests.get(`/brandcatalog?page=${page}&limit=${limit}`);
  },
  postCatalog: async (body) => {
    return requests.post(`/brandcatalog`, body);
  },
  getCatalogById: async (id) => {
    return requests.get(`/brandcatalog/getBrandCatalogById?id=${id}`);
  },
  deleteCatalog: async (id) => {
    return requests.delete(`/brandcatalog/deleteBrandCatalogById/${id}`);
  },
};
export default CatalogService;
