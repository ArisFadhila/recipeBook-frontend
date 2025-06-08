import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://recipebook-backend-production.up.railway.app/api',
});
export const getFavorites = () => {
  return axiosInstance.get('/favorites');
};
// Middleware untuk menyisipkan token di setiap request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default instance;
