// src/Services/spoonacular.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export const searchByQuery = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        query: query,   // search by keyword in title
        number: 30,     // show more results (increase if needed)
        addRecipeInformation: true, // gives us full info like image, title, etc.
      },
      headers: {
        "x-api-key": API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
