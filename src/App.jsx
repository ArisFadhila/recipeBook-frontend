import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import RecipeForm from './components/RecipeForm';
import EditRecipe from './pages/EditRecipe';
import RecipeDetail from './pages/RecipeDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import FavoriteRecipes from './pages/FavoriteRecipes';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar /> {/* ✅ gunakan Navbar dinamis */}
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/add"element={<PrivateRoute><RecipeForm /></PrivateRoute>}/>
            <Route path="/recipes/edit/:id"element={<PrivateRoute><EditRecipe /></PrivateRoute>}/>
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites"element={<PrivateRoute><FavoriteRecipes /></PrivateRoute>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
