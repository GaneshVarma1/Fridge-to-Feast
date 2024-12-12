import React, { createContext, useContext, useState } from 'react';
import { Recipe, FilterOptions } from '../types';

interface RecipeContextType {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}

const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  setRecipes: () => {},
  isLoading: false,
  setIsLoading: () => {},
  ingredients: [],
  setIngredients: () => {},
  filters: {
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    },
    cuisine: []
  },
  setFilters: () => {}
});

export const useRecipes = () => useContext(RecipeContext);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    },
    cuisine: []
  });

  return (
    <RecipeContext.Provider value={{
      recipes,
      setRecipes,
      isLoading,
      setIsLoading,
      ingredients,
      setIngredients,
      filters,
      setFilters
    }}>
      {children}
    </RecipeContext.Provider>
  );
}