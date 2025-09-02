import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchByQuery } from "../Services/spoonacular"; // ✅ correct service import

export default function RecipeSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchByQuery(query).then((data) => {
        setResults(data);
        setLoading(false);
      });
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">
        Search results for:{" "}
        <span className="text-yellow-400">{query}</span>
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-gray-800 rounded-2xl shadow-md p-4"
            >
              <Link to={`/recipe/${recipe.id}`}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <h3 className="mt-4 text-lg font-semibold">
                  {recipe.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
    );
  }