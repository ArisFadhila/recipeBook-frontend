import axios from './axiosInstance';

const API_URL = 'https://recipebook-backend-production.up.railway.app/api/auth';

export const register = (data) => axios.post(`${API_URL}/register`, data);

export const login = (data) => axios.post(`${API_URL}/login`, data);

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
