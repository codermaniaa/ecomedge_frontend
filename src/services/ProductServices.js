import requests from "./httpServices";

const ProductServices = {
  getShowingProducts: async () => {
    return requests.get("/products/show");
  },
  getShowingStoreProducts: async ({ category = "", title = "" }) => {
    return requests.get(`/products/store?category=${category}&title=${title}`);
  },
  getSearchSuggestProducts: async ({ query = "" }) => {
    return requests.get(`/homepage/search?searchQuery=${query}&limit=8&page=1`);
  },
  getDiscountedProducts: async () => {
    return requests.get("/products/discount");
  },  

  getProductBySlug: async (slug) => {
    return requests.get(`/products/${slug}`);
  },
};

export default ProductServices;
