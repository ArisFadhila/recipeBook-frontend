import axios from './axiosInstance';

const API_URL = 'http://localhost:5000/api/recipes';

export const getRecipes = async (params = {}) => {
  const res = await axios.get(API_URL, { params });
  return res.data;
};

export const getRecipeById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createRecipe = async (formData) => {
  const res = await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateRecipe = async (id, formData) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteRecipe = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
export const addFavorite = (recipeId) => {
  return axios.post(`/favorites`, { recipeId });
};
