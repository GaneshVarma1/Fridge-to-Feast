import axios from 'axios';
import { Recipe } from '../types';

const API_KEY = '0f84da24e0b84f558da63fe37b2c893e'; // Replace with your actual API key
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchRecipes = async (ingredients: string[]): Promise<Recipe[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/findByIngredients`, {
      params: {
        apiKey: API_KEY,
        ingredients: ingredients.join(','),
        number: 12,
        ranking: 2,
        ignorePantry: true,
      },
    });
    
    // Get detailed recipe information for each result
    const detailedRecipes = await Promise.all(
      response.data.map(async (recipe: any) => {
        const details = await axios.get(`${BASE_URL}/${recipe.id}/information`, {
          params: {
            apiKey: API_KEY,
          },
        });
        return details.data;
      })
    );

    return detailedRecipes.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      vegetarian: recipe.vegetarian,
      vegan: recipe.vegan,
      glutenFree: recipe.glutenFree,
      dairyFree: recipe.dairyFree,
      ingredients: recipe.extendedIngredients.map((ing: any) => ing.original),
      instructions: recipe.analyzedInstructions[0]?.steps.map((step: any) => step.step) || [],
      nutrition: {
        calories: recipe.nutrition?.nutrients.find((n: any) => n.name === 'Calories')?.amount || 0,
        protein: recipe.nutrition?.nutrients.find((n: any) => n.name === 'Protein')?.amount || 0,
        carbs: recipe.nutrition?.nutrients.find((n: any) => n.name === 'Carbohydrates')?.amount || 0,
        fat: recipe.nutrition?.nutrients.find((n: any) => n.name === 'Fat')?.amount || 0,
      },
    }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};