import { api } from './api';

export const productService = {
  getAllProducts: (params = {}) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  searchProducts: (q, params = {}) => api.get('/products', { params: { ...params, q } }),
  getProductsByCategory: (category, params = {}) => api.get('/products', { params: { ...params, category } }),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};
