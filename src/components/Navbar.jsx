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
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Left: Main Navigation */}
      <div className="flex items-center gap-6 text-sm font-semibold text-orange-600">
        <Link to="/" className="hover:text-orange-800 transition-colors">Beranda</Link>
        {!hideLinks && (
          <>
            <Link to="/recipes" className="hover:text-orange-800 transition-colors">Daftar Resep</Link>
            <Link to="/add" className="hover:text-orange-800 transition-colors">Tambah Resep</Link>
            <Link to="/favorites" className="hover:text-orange-800 transition-colors">Favorit</Link>
          </>
        )}
      </div>

      {/* Right: Auth & User Info */}
      <div className="flex items-center gap-4 text-sm">
        {user ? (
          <>
            <div className="flex items-center gap-2 text-gray-700">
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