import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RecipeDetailCard from '../components/ui/RecipeDetailCard';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://recipebook-backend-production.up.railway.app/api/recipes/${id}`);
        console.log('Data resep dari API:', res.data); 
        setRecipe(res.data);
      } catch (err) {
        setError('Gagal memuat resep.');
      }
    };
    fetchRecipe();
  }, [id]);

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!recipe) return <p className="text-center mt-10">Memuat...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <RecipeDetailCard recipe={recipe} />
    </div>
  );
};

export default RecipeDetail;
