import { useState, useCallback, useEffect } from 'react';
import { Recipe } from '../types';
import { getFavorites, addToFavorites, removeFromFavorites } from '../utils/localStorage';
import { getMealDetails } from '../services/mealdb';

export function useFavorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    setIsLoading(true);
    const favoriteIds = getFavorites();
    
    try {
      const recipes = await Promise.all(
        favoriteIds.map(id => getMealDetails(id))
      );
      setFavoriteRecipes(recipes.filter(Boolean) as Recipe[]);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleFavorite = useCallback(async (recipe: Recipe) => {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(recipe.id);
    
    if (isFavorite) {
      removeFromFavorites(recipe.id);
      setFavoriteRecipes(current => 
        current.filter(r => r.id !== recipe.id)
      );
    } else {
      addToFavorites(recipe.id);
      setFavoriteRecipes(current => [...current, recipe]);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favoriteRecipes,
    isLoading,
    toggleFavorite,
    isFavorite: useCallback(
      (recipeId: string) => getFavorites().includes(recipeId),
      []
    ),
  };
}