import { api } from './api';

export const addressService = {
  getMyAddresses: () => api.get('/addresses'),
  getAddressById: (id) => api.get(`/addresses/${id}`),
  createAddress: (data) => api.post('/addresses', data),
  updateAddress: (id, data) => api.put(`/addresses/${id}`, data),
  deleteAddress: (id) => api.delete(`/addresses/${id}`),
  setDefaultAddress: (id) => api.put(`/addresses/${id}/default`),
};
