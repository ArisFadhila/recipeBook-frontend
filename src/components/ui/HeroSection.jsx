import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="text-center py-16 px-4 bg-gradient-to-br from-orange-100 to-yellow-50 rounded-2xl shadow-md">
      <h1 className="text-4xl font-extrabold text-orange-600 mb-4">Selamat Datang di RecipeBook 🍳</h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
        Temukan, simpan, dan bagikan resep favoritmu! Jelajahi berbagai kategori makanan dari hidangan utama, cemilan, minuman, hingga dessert.
      </p>
      <Link to="/recipes">
        <button className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition">
          Masuk ke Buku Resep
        </button>
      </Link>
    </section>
  );
};

export default HeroSection;
