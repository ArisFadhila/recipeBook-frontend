import RecipeCard from '../RecipeCard';

const RecipeGrid = ({ recipes, onDelete, onUnfavorited, favorites = [] }) => {
  if (!recipes.length) {
    return <p className="text-center text-gray-500">Belum ada resep ditemukan.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={onDelete}
          isFavoriteView={favorites.includes(recipe.id)}
          onUnfavorited={onUnfavorited}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;
