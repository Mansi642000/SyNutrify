import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/about";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeSearch from "./pages/RecipeSearch";
import NutritionChecker from "./pages/NutritionChecker";
import AddRecipes from "./pages/AddRecipes";


function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();

  // hide navbar on login/register pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {!hideNavbar && <Navbar />}

      <main className="flex-grow p-6">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/addrecipe"
            element={isAuthenticated ? <AddRecipes /> : <Navigate to="/login" />}
          />

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/recipesearch" element={<RecipeSearch />} />
          <Route path="/nutrition" element={<NutritionChecker />} />
          <Route path="/addrecipe" element={<AddRecipes />} />
        </Routes>
      </main>

      {!hideNavbar && <Footer />}
    </div>
  );
}
export default App;
