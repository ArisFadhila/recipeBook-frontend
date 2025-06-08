import { useEffect, useState } from 'react';
import { getFavorites } from '../services/favoriteService';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites();
      setFavorites(res.data);
    } catch (err) {
      console.error('Gagal memuat resep favorit');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">💖 Resep Favorit Saya</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada resep favorit.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavoriteView={true}
              onUnfavorited={fetchFavorites} // 🔥 dipanggil ulang jika user unfavorite
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipes;
