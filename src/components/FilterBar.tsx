import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import { CUISINE_TYPES } from '../config/constants';

export default function FilterBar() {
  const { filters, setFilters } = useRecipes();

  const handleDietaryChange = (key: keyof typeof filters.dietary) => {
    setFilters({
      ...filters,
      dietary: {
        ...filters.dietary,
        [key]: !filters.dietary[key],
      },
    });
  };

  const handleCuisineChange = (cuisine: string) => {
    const newCuisines = filters.cuisine.includes(cuisine)
      ? filters.cuisine.filter((c) => c !== cuisine)
      : [...filters.cuisine, cuisine];
    setFilters({
      ...filters,
      cuisine: newCuisines,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Dietary Restrictions
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters.dietary).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleDietaryChange(key as keyof typeof filters.dietary)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                value
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Cuisine Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {CUISINE_TYPES.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => handleCuisineChange(cuisine)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filters.cuisine.includes(cuisine)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}