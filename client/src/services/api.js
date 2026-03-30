import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gearmarket_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (payload) => api.post('/auth/login', payload),
  register: (payload) => api.post('/auth/register', payload),
};

export const publicationsService = {
  getAll: () => api.get('/publications'),
  getById: (id) => api.get(`/publications/${id}`),
  create: (payload) => api.post('/publications', payload),
  update: (id, payload) => api.put(`/publications/${id}`, payload),
  remove: (id) => api.delete(`/publications/${id}`),
};

export const favoritesService = {
  getAll: () => api.get('/favorites'),
  add: (publicationId) => api.post('/favorites', { publication_id: publicationId }),
  remove: (publicationId) => api.delete(`/favorites/${publicationId}`),
};

export const profileService = {
  get: () => api.get('/profile'),
};

export const messagesService = {
  getConversations: () => api.get('/messages'),
  getThread: (publicationId, userId) => api.get(`/messages/thread/${publicationId}/${userId}`),
  create: (payload) => api.post('/messages', payload),
};

export default api;
