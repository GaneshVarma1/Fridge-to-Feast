import axios from 'axios';
import { THEMEALDB_API_URL } from '../config/constants';

// Cache for ingredient list
let ingredientListCache: string[] | null = null;

export async function fetchIngredientList(): Promise<string[]> {
  if (ingredientListCache) {
    return ingredientListCache;
  }

  try {
    const response = await axios.get(`${THEMEALDB_API_URL}/list.php?i=list`);
    if (response.data.meals) {
      ingredientListCache = response.data.meals.map((item: any) => item.strIngredient);
      return ingredientListCache;
    }
    return [];
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return [];
  }
}