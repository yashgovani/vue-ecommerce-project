import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// product category api call
export const fetchCategories = () => apiClient.get("/product-category");
export const addProdcutCategory = (category) =>
  apiClient.post("/product-category", category);
export const updateProductCategory = (category) =>
  apiClient.put(`/product-category/${category.id}`, category);
export const deleteProductCategory = (categoryId) =>
  apiClient.delete(`/product-category/${categoryId}`);

// products api call
export const fetchProducts = () => apiClient.get("/shop-items");
export const createProducts = (product) =>
  apiClient.post("/shop-items", product);
export const updateProducts = (product) =>
  apiClient.put(`/shop-items/${product.id}`, product);
export const deleteProducts = (productId) =>
  apiClient.delete(`/shop-items/${productId}`);

// dashboard api call
export const fetchDashboardData = () => apiClient.get("/user/dashboard");
