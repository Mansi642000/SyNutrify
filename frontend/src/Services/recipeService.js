import axios from "axios";

const API_KEY = "34dc858a4ac64d6e82c699711e3201dc"; // replace with your key
const BASE_URL = "https://api.spoonacular.com/recipes";

export const searchRecipes = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query: query,
        addRecipeNutrition: true, // include nutrition info
        number: 10, // number of results to return
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { results: [] };
  }
};
