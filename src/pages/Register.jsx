import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setMessage('✅ Registrasi berhasil. Silakan login.');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setMessage('❌ Gagal registrasi');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center">Registrasi</h2>
      <input type="text" name="name" placeholder="Nama" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full border p-2 rounded" />
      {message && <p className="text-center text-sm">{message}</p>}
      <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded">Daftar</button>
    </form>
  );
};

export default Register;
