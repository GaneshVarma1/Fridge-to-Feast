import React, { useState } from 'react';
import { Clock, Users, Leaf, X } from 'lucide-react';
import { Recipe } from '../types';
import { Player } from '@lottiefiles/react-lottie-player';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
  availableIngredients: string[];
}

export default function RecipeDetail({ recipe, onClose, availableIngredients }: RecipeDetailProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const isIngredientAvailable = (ingredient: string) => {
    return availableIngredients.some(available =>
      ingredient.toLowerCase().includes(available.toLowerCase())
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {recipe.title}
          </h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-emerald-500" />
              {recipe.category}
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-emerald-500" />
              {recipe.area}
            </div>
            {recipe.vegetarian && (
              <div className="flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-emerald-500" />
                Vegetarian
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className={`flex items-center ${
                      isIngredientAvailable(ingredient)
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Instructions</h3>
              <div className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      index === currentStep
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{index + 1}.</span>
                      <p>{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {recipe.video && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Video Tutorial</h3>
              <a
                href={recipe.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-emerald-500 hover:text-emerald-600"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}