import React from 'react';
import { Recipe } from '../types';
import { ShoppingCart, ChefHat, AlertCircle } from 'lucide-react';
import { useShoppingList } from '../context/ShoppingListContext';

interface RecipeSuggestionsProps {
  recipe: Recipe;
  availableIngredients: string[];
}

export default function RecipeSuggestions({ recipe, availableIngredients }: RecipeSuggestionsProps) {
  const { addItems } = useShoppingList();
  const missingIngredients = recipe.ingredients.filter(
    ingredient => !availableIngredients.some(
      available => ingredient.toLowerCase().includes(available.toLowerCase())
    )
  );

  const matchPercentage = Math.round(
    ((recipe.ingredients.length - missingIngredients.length) / recipe.ingredients.length) * 100
  );

  // Only show suggestions for recipes with high match percentage
  if (matchPercentage < 75) return null;

  const handleAddToShoppingList = () => {
    addItems(missingIngredients);
  };

  const isSimpleRecipe = recipe.ingredients.length <= 7;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md ${
      isSimpleRecipe ? 'border-2 border-emerald-500' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            {isSimpleRecipe && <ChefHat className="w-4 h-4 mr-2 text-emerald-500" />}
            {matchPercentage}% Match
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isSimpleRecipe && 'Quick & Easy Recipe! '}
            {missingIngredients.length === 0 ? (
              <span className="flex items-center text-emerald-500">
                <ChefHat className="w-4 h-4 mr-1" />
                You have everything needed!
              </span>
            ) : (
              <span className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Just need {missingIngredients.length} more {missingIngredients.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </p>
        </div>
      </div>

      {missingIngredients.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Missing Items:
          </h4>
          <ul className="space-y-2">
            {missingIngredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-gray-600 dark:text-gray-400"
              >
                <span className="w-4 h-4 mr-2 flex items-center justify-center">•</span>
                {ingredient}
              </li>
            ))}
          </ul>
          <button
            onClick={handleAddToShoppingList}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 rounded-md hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add Missing Items to Shopping List
          </button>
        </div>
      )}
    </div>
  );
}