import axios from 'axios';
import { Recipe } from '../types';
import { THEMEALDB_API_URL } from '../config/constants';

export async function findRecipes(ingredients: string[]): Promise<Recipe[]> {
  if (!ingredients.length) return [];

  try {
    // Search for each ingredient individually to get more results
    const searchPromises = ingredients.map(async (ingredient) => {
      const response = await axios.get(`${THEMEALDB_API_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
      return response.data.meals || [];
    });

    const searchResults = await Promise.all(searchPromises);
    const allMeals = searchResults.flat();

    // Remove duplicates based on meal ID
    const uniqueMeals = Array.from(
      new Set(allMeals.map((meal: any) => meal.idMeal))
    ).map(id => 
      allMeals.find((meal: any) => meal.idMeal === id)
    );

    // Get detailed information for each meal
    const detailedRecipes = await Promise.all(
      uniqueMeals.map(async (meal: any) => {
        try {
          const response = await axios.get(`${THEMEALDB_API_URL}/lookup.php?i=${meal.idMeal}`);
          const detailedMeal = response.data.meals[0];
          
          // Extract ingredients and measures
          const recipeIngredients: string[] = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = detailedMeal[`strIngredient${i}`];
            const measure = detailedMeal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
              recipeIngredients.push(`${measure?.trim() || ''} ${ingredient.trim()}`.toLowerCase());
            }
          }

          // Calculate match percentage
          const matchCount = ingredients.reduce((count, userIng) => {
            return count + (recipeIngredients.some(recipeIng => 
              recipeIng.includes(userIng.toLowerCase()) ||
              userIng.toLowerCase().includes(recipeIng)
            ) ? 1 : 0);
          }, 0);

          const matchPercentage = Math.round((matchCount / ingredients.length) * 100);

          // Only include recipes with at least one matching ingredient
          if (matchCount === 0) return null;

          return {
            id: detailedMeal.idMeal,
            title: detailedMeal.strMeal,
            image: detailedMeal.strMealThumb,
            category: detailedMeal.strCategory,
            area: detailedMeal.strArea,
            instructions: detailedMeal.strInstructions.split('\r\n').filter(Boolean),
            ingredients: recipeIngredients,
            tags: detailedMeal.strTags ? detailedMeal.strTags.split(',') : [],
            video: detailedMeal.strYoutube,
            source: detailedMeal.strSource,
            vegetarian: !recipeIngredients.some(ing => 
              ['chicken', 'beef', 'pork', 'meat', 'fish'].some(meat => 
                ing.includes(meat)
              )
            ),
            vegan: false,
            glutenFree: true,
            dairyFree: true,
            matchPercentage
          };
        } catch (error) {
          console.error(`Error fetching details for meal ${meal.idMeal}:`, error);
          return null;
        }
      })
    );

    // Filter out null results and sort by match percentage
    return detailedRecipes
      .filter((recipe): recipe is Recipe => recipe !== null)
      .sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));

  } catch (error) {
    console.error('Error finding recipes:', error);
    return [];
  }
}