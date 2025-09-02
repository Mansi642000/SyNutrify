import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/RecipeSearch?q=${encodeURIComponent(query)}`);
      setQuery(""); // clear input after search
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
      {/* Project Name with Icon on Left */}
      <div className="flex items-center">
        <svg
          className="w-8 h-8 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l4-4 4 4-4 4z" />
        </svg>
        <h1 className="text-xl font-bold text-green-400">SyNutrify</h1>
      </div>

      {/* Navigation Links on Right */}
      <div className="flex items-center space-x-6 text-white">
        <Link to="/" className="hover:text-green-300">
          Home
        </Link>
        <Link to="/about" className="hover:text-green-300">
          About
        </Link>

        {token ? (
          <>
            <Link to="/dashboard" className="hover:text-green-300">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-green-300 focus:outline-none"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-green-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
