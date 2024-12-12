import React, { useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import { Player } from '@lottiefiles/react-lottie-player';

export default function RecipeList() {
  const { recipes, isLoading, ingredients, filters } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Player
          autoplay
          loop
          src="https://lottie.host/2a274d6c-6bfb-4e69-8591-9d9f55f35a74/UZkJGZnOmF.json"
          style={{ height: '200px', width: '200px' }}
        />
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
          Finding delicious recipes...
        </p>
      </div>
    );
  }

  // Filter recipes based on current filters
  const filteredRecipes = recipes.filter(recipe => {
    // Apply dietary filters
    if (filters.dietary.vegetarian && !recipe.vegetarian) return false;
    if (filters.dietary.vegan && !recipe.vegan) return false;
    if (filters.dietary.glutenFree && !recipe.glutenFree) return false;
    if (filters.dietary.dairyFree && !recipe.dairyFree) return false;

    // Apply cuisine filter
    if (filters.cuisine.length > 0 && !filters.cuisine.includes(recipe.area)) {
      return false;
    }

    return true;
  });

  if (filteredRecipes.length === 0 && ingredients.length > 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          No recipes found with these ingredients. Try adding different ingredients or adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRecipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => setSelectedRecipe(recipe)}
        />
      ))}
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          availableIngredients={ingredients}
        />
      )}
    </div>
  );
}