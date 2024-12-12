import { DetailedMeal, Recipe } from '../types';
import { COMMON_INGREDIENTS } from '../config/constants';

export function transformMealToRecipe(meal: DetailedMeal, userIngredients: string[] = []): Recipe {
  // Extract ingredients and measurements
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof DetailedMeal];
    const measure = meal[`strMeasure${i}` as keyof DetailedMeal];
    
    if (ingredient && ingredient.trim()) {
      const fullIngredient = measure && measure.trim() 
        ? `${measure.trim()} ${ingredient.trim()}`
        : ingredient.trim();
      ingredients.push(fullIngredient.toLowerCase());
    }
  }

  // Calculate match percentage
  const matchingIngredients = ingredients.filter(ing => 
    userIngredients.some(userIng => 
      ing.includes(userIng.toLowerCase()) && 
      !COMMON_INGREDIENTS.includes(userIng.toLowerCase())
    )
  );

  const totalNonCommonIngredients = ingredients.filter(ing => 
    !COMMON_INGREDIENTS.some(common => ing.includes(common.toLowerCase()))
  ).length;

  const matchPercentage = totalNonCommonIngredients > 0
    ? Math.round((matchingIngredients.length / totalNonCommonIngredients) * 100)
    : 0;

  // Split instructions into steps
  const instructions = meal.strInstructions
    .split(/[.!?]+/)
    .map(step => step.trim())
    .filter(step => step.length > 0);

  // Extract tags
  const tags = meal.strTags 
    ? meal.strTags.split(',').map(tag => tag.trim())
    : [];

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    instructions,
    ingredients,
    tags,
    video: meal.strYoutube,
    source: meal.strSource,
    vegetarian: isVegetarian(ingredients),
    vegan: isVegan(ingredients),
    glutenFree: isGlutenFree(ingredients),
    dairyFree: isDairyFree(ingredients),
    matchPercentage
  };
}

// Helper functions for dietary restrictions
function isVegetarian(ingredients: string[]): boolean {
  const nonVegIngredients = ['chicken', 'beef', 'pork', 'fish', 'meat', 'bacon', 'ham'];
  return !ingredients.some(ing => 
    nonVegIngredients.some(meat => ing.includes(meat))
  );
}

function isVegan(ingredients: string[]): boolean {
  const nonVeganIngredients = [
    'chicken', 'beef', 'pork', 'fish', 'meat', 'egg', 'milk', 
    'cream', 'cheese', 'butter', 'honey', 'yogurt'
  ];
  return !ingredients.some(ing => 
    nonVeganIngredients.some(animal => ing.includes(animal))
  );
}

function isGlutenFree(ingredients: string[]): boolean {
  const glutenIngredients = ['flour', 'bread', 'pasta', 'wheat', 'barley', 'rye'];
  return !ingredients.some(ing =>
    glutenIngredients.some(gluten => ing.includes(gluten))
  );
}

function isDairyFree(ingredients: string[]): boolean {
  const dairyIngredients = ['milk', 'cream', 'cheese', 'butter', 'yogurt'];
  return !ingredients.some(ing =>
    dairyIngredients.some(dairy => ing.includes(dairy))
  );
}