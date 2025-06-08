// src/components/ui/RecipeDetailCard.jsx

import { Link } from 'react-router-dom';

const RecipeDetailCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
      <img
        src={`http://localhost:5000${recipe.image_url}`}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg shadow"
      />

      <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
      <p className="text-sm text-gray-500 font-medium">Kategori: {recipe.category}</p>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Deskripsi</h2>
        <p className="text-gray-700">{recipe.description}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Bahan-bahan</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {recipe.ingredients.split(',').map((item, i) => (
            <li key={i}>{item.trim()}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Langkah-langkah</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          {recipe.steps
            .split('\n')
            .filter(Boolean)
            .map((step, i) => (
              <li key={i}>{step.trim()}</li>
            ))}
        </ol>
      </section>

      <div className="pt-4">
        <Link to="/recipes" className="text-blue-600 hover:underline text-sm">
          ← Kembali ke daftar resep
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetailCard;
