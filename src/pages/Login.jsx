import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('✅ Login berhasil');
      setTimeout(() => navigate('/recipes'), 1000);
    } catch (err) {
      setMessage('❌ Email atau password salah');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full border p-2 rounded" />
      {message && <p className="text-center text-sm">{message}</p>}
      <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded">Login</button>
    </form>
  );
};

export default Login;
