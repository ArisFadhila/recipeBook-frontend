import axios from './axiosInstance';

// Tambah ke favorit
export const addFavorite = (recipeId) =>
  axios.post(`/favorites/${recipeId}`);

// Hapus dari favorit
export const removeFavorite = (recipeId) =>
  axios.delete(`/favorites/${recipeId}`);

// Ambil semua resep favorit user
export const getFavorites = () =>
  axios.get('/favorites');

