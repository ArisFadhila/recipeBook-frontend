import axios from './axiosInstance';

const API_URL = 'http://localhost:5000/api/auth';

export const register = (data) => axios.post(`${API_URL}/register`, data);

export const login = (data) => axios.post(`${API_URL}/login`, data);

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
