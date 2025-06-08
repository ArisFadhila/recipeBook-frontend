import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../services/recipeService';
import { getFavorites } from '../services/favoriteService';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const recipeList = await getRecipes();
      setRecipes(recipeList);

      const token = localStorage.getItem('token');
      if (token) {
        const favoriteList = await getFavorites();
        setFavorites(favoriteList);
      } else {
        setFavorites([]);
      }
    } catch (err) {
      console.error('Gagal memuat data resep atau favorit', err);
    }
  };

  const handleDelete = (deletedId) => {
    setRecipes(recipes.filter((r) => r.id !== deletedId));
  };

  const refreshFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const updatedFavorites = await getFavorites();
        setFavorites(updatedFavorites);
      }
    } catch (err) {
      console.error('Gagal memuat ulang favorit', err);
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      filterCategory === 'All' || recipe.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Daftar Resep</h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari resep..."
          className="border rounded-xl px-4 py-2 w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded-xl px-4 py-2"
        >
          <option value="All">All</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Drink">Drink</option>
        </select>
      </div>

      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada resep ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={handleDelete}
              favoriteList={favorites}
              onUnfavorited={refreshFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
