import { useState, useCallback } from 'react';
import { Recipe } from '../types';
import { findRecipes } from '../services/recipeService';

export function useRecipeSearch() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchRecipes = useCallback(async (ingredients: string[]) => {
    if (!ingredients.length) {
      setError('Please add at least one ingredient');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await findRecipes(ingredients);
      setRecipes(results);
      
      if (results.length === 0) {
        setError('No recipes found with these ingredients. Try adding more basic ingredients!');
      }
    } catch (err) {
      setError('Failed to search recipes. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    recipes,
    isLoading,
    error,
    searchRecipes,
  };
}