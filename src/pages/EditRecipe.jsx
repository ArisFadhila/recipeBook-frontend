import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axiosInstance';
import { Input, Textarea } from '../components/common/input';
import Button from '../components/common/button';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    category: 'Main Course',
    image: null,
    image_url: '',
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/recipes/${id}`);
        setFormData(res.data);
      } catch (error) {
        setMessage('Gagal memuat data resep');
      }
    };
    fetchRecipe();
  }, [id]);

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

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.ingredients.trim() ||
      !formData.steps.trim()
    ) {
      setMessage('❌ Semua field wajib diisi!');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('ingredients', formData.ingredients);
    data.append('steps', formData.steps);
    data.append('category', formData.category);

    if (formData.image) {
      data.append('image', formData.image);
    } else if (formData.image_url) {
      data.append('image_url', formData.image_url);
    }

    try {
      await axios.put(`/recipes/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('✅ Resep berhasil diupdate!');
      setTimeout(() => navigate('/recipes'), 1000);
    } catch (error) {
      console.error(error);
      setMessage('❌ Gagal mengupdate resep');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto px-4 sm:px-6 py-6 bg-white rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-center">Edit Resep</h2>

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
        label="Bahan-bahan"
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
        <span className="block mb-1 font-semibold">Kategori</span>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option>Main Course</option>
          <option>Snack</option>
          <option>Drink</option>
          <option>Dessert</option>
        </select>
      </label>

      <label className="block">
        <span className="block mb-1 font-semibold">Ganti Gambar (opsional)</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
      </label>

      {(preview || formData.image_url) && (
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Preview Gambar:</p>
          <img
            src={preview || `http://localhost:5000${formData.image_url}`}
            alt="Preview"
            className="mx-auto h-40 sm:h-48 w-full object-cover rounded border"
          />
        </div>
      )}

      {message && (
        <p
          className={`text-center text-sm font-medium ${
            message.includes('✅') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <Button type="submit">Update Resep</Button>

      <div className="h-10 sm:hidden" /> {/* ruang bawah ekstra di HP */}
    </form>
  );
};

export default EditRecipe;
