import { api } from './api';

export const orderService = {
  checkout: (data) => api.post('/orders/checkout', data),
  getMyOrders: (params = {}) => api.get('/orders/my-orders', { params }),
  getOrderById: (id) => api.get(`/orders/${id}`),
  getAllOrders: (params = {}) => api.get('/orders', { params }),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};
