import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deleteRecipe } from '../services/recipeService';
import { addFavorite, removeFavorite } from '../services/favoriteService';

const RecipeCard = ({ recipe, onDelete, isFavoriteView = false, onUnfavorited }) => {
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(isFavoriteView);

  const imageSrc = recipe.image_url
    ? `http://localhost:5000${recipe.image_url}`
    : '/placeholder.png';

  const handleDelete = async () => {
    const confirm = window.confirm(`Yakin ingin menghapus resep "${recipe.title}"?`);
    if (!confirm) return;

    try {
      setLoading(true);
      await deleteRecipe(recipe.id);
      if (onDelete) onDelete(recipe.id);
    } catch (err) {
      alert('❌ Gagal menghapus resep');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    try {
      if (isFav) {
        await removeFavorite(recipe.id);
        setIsFav(false);
        if (onUnfavorited) onUnfavorited();
        alert('❌ Resep dihapus dari favorit');
      } else {
        await addFavorite(recipe.id);
        setIsFav(true);
        alert('✅ Resep ditambahkan ke favorit!');
      }
    } catch (err) {
      alert('❌ Gagal mengubah status favorit');
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      <img
        src={imageSrc}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-orange-600">{recipe.title}</h3>
          <p className="text-sm text-gray-500 italic">Kategori: {recipe.category}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mt-auto">
          {/* Tombol Edit hanya muncul jika BUKAN di halaman favorit */}
          {!isFavoriteView && (
            <Link
              to={`/recipes/edit/${recipe.id}`}
              className="bg-green-50 text-green-700 hover:bg-green-100 py-1 px-3 rounded-xl text-center transition"
            >
              ✏️ Edit
            </Link>
          )}

          <Link
            to={`/recipes/${recipe.id}`}
            className="bg-blue-50 text-blue-600 hover:bg-blue-100 py-1 px-3 rounded-xl text-center transition"
          >
            👁️ Lihat
          </Link>

          {/* Tombol Hapus hanya muncul jika BUKAN di halaman favorit */}
          {!isFavoriteView && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="col-span-2 bg-red-50 text-red-500 hover:bg-red-100 py-1 px-3 rounded-xl text-center transition disabled:opacity-50"
            >
              {loading ? 'Menghapus...' : '🗑️ Hapus'}
            </button>
          )}

          {/* Tombol Favorit tetap muncul di semua halaman */}
          <button
            onClick={handleFavorite}
            className="col-span-2 bg-pink-50 text-pink-600 hover:bg-pink-100 py-1 px-3 rounded-xl text-center transition"
          >
            {isFav ? '💖 Favorit' : '🤍 Tambah Favorit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
