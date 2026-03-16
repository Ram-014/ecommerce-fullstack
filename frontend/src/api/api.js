import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth APIs
export const registerUser  = (data) => API.post('/auth/register', data);
export const loginUser     = (data) => API.post('/auth/login', data);

// Product APIs
export const getProducts       = ()         => API.get('/products');
export const getProductById    = (id)       => API.get(`/products/${id}`);
export const searchProducts    = (keyword)  => API.get(`/products/search?keyword=${keyword}`);
export const getByCategory     = (category) => API.get(`/products/category/${category}`);
export const createProduct     = (data)     => API.post('/products', data);
export const updateProduct     = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct     = (id)       => API.delete(`/products/${id}`);

// Cart APIs
export const getCart      = ()              => API.get('/cart');
export const addToCart    = (data)          => API.post('/cart/add', data);
export const updateCart   = (id, qty)       => API.put(`/cart/update/${id}?quantity=${qty}`);
export const removeFromCart = (id)          => API.delete(`/cart/remove/${id}`);

// Order APIs
export const placeOrder   = (data)  => API.post('/orders/place', data);
export const getMyOrders  = ()      => API.get('/orders');
export const getOrderById = (id)    => API.get(`/orders/${id}`);
export const cancelOrder  = (id)    => API.put(`/orders/${id}/cancel`);

export default API;
