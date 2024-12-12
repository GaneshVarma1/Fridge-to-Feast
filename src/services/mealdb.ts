import axios from 'axios';
import { THEMEALDB_API_URL, COMMON_INGREDIENTS } from '../config/constants';
import { Recipe, DetailedMeal } from '../types';
import { transformMealToRecipe } from '../utils/transformers';

export async function searchByIngredient(ingredients: string[]): Promise<Recipe[]> {
  if (!ingredients.length) return [];

  try {
    // Search for each ingredient individually to get more results
    const searchPromises = ingredients.map(async (ingredient) => {
      const response = await axios.get(`${THEMEALDB_API_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
      return response.data.meals || [];
    });

    const searchResults = await Promise.all(searchPromises);
    
    // Combine all results and remove duplicates
    const uniqueMealIds = Array.from(
      new Set(
        searchResults.flat().map((meal: any) => meal.idMeal)
      )
    );

    // Get detailed information for each meal
    const detailedMeals = await Promise.all(
      uniqueMealIds.map(async (mealId) => {
        try {
          const response = await axios.get(`${THEMEALDB_API_URL}/lookup.php?i=${mealId}`);
          return response.data.meals?.[0];
        } catch (error) {
          console.error(`Error fetching details for meal ${mealId}:`, error);
          return null;
        }
      })
    );

    // Transform and calculate matches
    const recipes = detailedMeals
      .filter((meal): meal is DetailedMeal => meal !== null)
      .map(meal => {
        const recipe = transformMealToRecipe(meal);
        const matchPercentage = calculateMatchPercentage(recipe, ingredients);
        return { ...recipe, matchPercentage };
      });

    // Show recipes with at least 2 matching ingredients, sorted by match percentage
    return recipes
      .filter(recipe => (recipe.matchPercentage || 0) > 0)
      .sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
}

function calculateMatchPercentage(recipe: Recipe, userIngredients: string[]): number {
  const recipeIngredients = recipe.ingredients
    .map(ing => ing.toLowerCase())
    .filter(ing => !COMMON_INGREDIENTS.some(common => ing.includes(common)));

  const userIngs = userIngredients.map(ing => ing.toLowerCase());

  // Count matching ingredients with partial matching
  const matchingCount = userIngs.reduce((count, userIng) => {
    return count + (recipeIngredients.some(ing => 
      ing.includes(userIng) || userIng.includes(ing)
    ) ? 1 : 0);
  }, 0);

  // Calculate percentage based on recipe ingredients (excluding common ingredients)
  return Math.round((matchingCount / Math.max(recipeIngredients.length, 1)) * 100);
}