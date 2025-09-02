import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await axios.get(`${BASE_URL}/${id}/information`, {
          params: { apiKey: API_KEY, includeNutrition: true }, // include nutrition
        });
        setRecipe(res.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!recipe) return <p className="text-white">Recipe not found.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Back Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-400 flex items-center gap-2 transition-colors duration-200"
        >
          ⬅ Back
        </button>
      </div>

      {/* Title & Image */}
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-lg rounded-xl mb-6 shadow-lg"
      />

      {/* Ingredients */}
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        {recipe.extendedIngredients?.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      {/* Instructions */}
      <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
        {recipe.instructions ? (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          />
        ) : recipe.analyzedInstructions?.length > 0 ? (
          <ol className="relative border-l-2 border-green-500 pl-6 space-y-4">
            {recipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number} className="pb-4 relative group">
                <div className="absolute -left-7 top-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white z-10">
                  {step.number}
                </div>
                <p className="pl-8 text-gray-200 leading-relaxed">{step.step}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-400 italic">
            No detailed instructions available for this recipe.
          </p>
        )}
      </div>

      {/* Nutrition Info */}
      {recipe.nutrition?.nutrients && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Nutrition Info</h2>
          <ul className="list-disc list-inside">
            {recipe.nutrition.nutrients.slice(0, 5).map((nutrient, idx) => (
              <li key={idx}>
                {nutrient.name}: {nutrient.amount}
                {nutrient.unit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* YouTube or Source Link */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Watch Video / Source</h2>
        {recipe.sourceUrl ? (
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {recipe.sourceName || "View Full Recipe"}
          </a>
        ) : (
          <p>No video/source link available.</p>
        )}
      </div>
    </div>
  );
}
