import { Recipe } from '../types';
import { COMMON_INGREDIENTS } from '../config/constants';

export function calculateMatchPercentage(recipe: Recipe, userIngredients: string[]) {
  const requiredIngredients = recipe.ingredients.filter(
    ing => !COMMON_INGREDIENTS.some(common => 
      ing.toLowerCase().includes(common)
    )
  );

  const availableIngredients = recipe.ingredients.filter(recipeIng =>
    userIngredients.some(userIng => 
      recipeIng.toLowerCase().includes(userIng)
    )
  );

  const missingIngredients = recipe.ingredients.filter(ing => 
    !userIngredients.some(userIng => 
      ing.toLowerCase().includes(userIng)
    )
  );

  const matchPercentage = (availableIngredients.length / recipe.ingredients.length) * 100;

  return {
    matchPercentage,
    availableIngredients,
    missingIngredients
  };
}