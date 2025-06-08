import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const hideLinks = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
      {/* Atas: Navigasi utama */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm font-semibold text-orange-600">
        <Link to="/" className="hover:text-orange-800 transition-colors">Beranda</Link>
        {!hideLinks && (
          <>
            <Link to="/recipes" className="hover:text-orange-800 transition-colors">Daftar Resep</Link>
            <Link to="/add" className="hover:text-orange-800 transition-colors">Tambah Resep</Link>
            <Link to="/favorites" className="hover:text-orange-800 transition-colors">Favorit</Link>
          </>
        )}
      </div>

      {/* Bawah: Info user & login/logout */}
      <div className="flex justify-center sm:justify-end items-center gap-3 text-sm">
        {user ? (
          <>
            <div className="flex items-center gap-1 text-gray-700">
              <span role="img" aria-label="user" className="text-lg">👤</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 transition-colors font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-orange-600 hover:text-orange-800 transition-colors">Login</Link>
            <Link to="/register" className="text-orange-600 hover:text-orange-800 transition-colors">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
