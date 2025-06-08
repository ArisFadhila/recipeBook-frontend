import { useState } from 'react';
import axios from '../services/axiosInstance'; // Pastikan ini sesuai dengan path axios instance Anda
import { Input, Textarea } from './common/input';
import Button from './common/button';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    category: 'Main Course',
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // 🚨 Validasi manual
  if (
    !formData.title.trim() ||
    !formData.description.trim() ||
    !formData.ingredients.trim() ||
    !formData.steps.trim()
  ) {
    setMessage('❌ Semua field wajib diisi!');
    return;
  }

  setLoading(true);
  const data = new FormData();
  // ...


    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('ingredients', formData.ingredients);
    data.append('steps', formData.steps);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.post('http://localhost:5000/api/recipes', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('✅ Resep berhasil ditambahkan!');
      setFormData({
        title: '',
        description: '',
        ingredients: '',
        steps: '',
        category: 'Main Course',
        image: null,
      });
      setPreview(null);
    } catch (error) {
      console.error(error);
      setMessage('❌ Gagal menambahkan resep');
    } finally {
      setLoading(false);
    }
  };

  return (
<form
  onSubmit={handleSubmit}
  className="max-w-xl mx-auto mt-10 p-6 bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-lg space-y-5"
>
  <h2 className="text-3xl font-bold text-center text-orange-600">Tambah Resep Baru</h2>

  <Input
    name="title"
    label="Judul Resep"
    value={formData.title}
    onChange={handleChange}
    required
  />

  <Textarea
    name="description"
    label="Deskripsi"
    value={formData.description}
    onChange={handleChange}
    required
  />

  <Textarea
    name="ingredients"
    label="Bahan-bahan (pisahkan dengan koma)"
    value={formData.ingredients}
    onChange={handleChange}
    required
  />

  <Textarea
    name="steps"
    label="Langkah-langkah"
    value={formData.steps}
    onChange={handleChange}
    required
  />

  <label className="block">
    <span className="block mb-1 font-semibold text-gray-700">Kategori</span>
    <select
      name="category"
      value={formData.category}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      <option>Main Course</option>
      <option>Snack</option>
      <option>Drink</option>
      <option>Dessert</option>
    </select>
  </label>

  <label className="block">
    <span className="block mb-1 font-semibold text-gray-700">Gambar Resep</span>
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="w-full"
    />
  </label>

  {preview && (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-2">Preview Gambar:</p>
      <img
        src={preview}
        alt="Preview"
        className="mx-auto h-48 object-cover rounded-lg shadow border"
      />
    </div>
  )}

  {message && (
    <p
      className={`text-center text-sm font-semibold ${
        message.includes('✅') ? 'text-green-600' : 'text-red-500'
      }`}
    >
      {message}
    </p>
  )}
    <div className="text-center">
  <Button type="submit" disabled={loading}>
    {loading ? 'Menyimpan...' : 'Simpan Resep'}
  </Button>
  </div>
</form>

  );
};

export default RecipeForm;
