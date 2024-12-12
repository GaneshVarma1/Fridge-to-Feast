import React from 'react';
import { Clock, Users, Leaf } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
    >
      <div className="relative h-48">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        {recipe.matchPercentage && (
          <span className="absolute top-2 left-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs">
            {recipe.matchPercentage}% Match
          </span>
        )}
        {recipe.vegetarian && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <Leaf className="w-3 h-3 mr-1" />
            Vegetarian
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {recipe.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {recipe.category}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {recipe.area}
          </div>
        </div>
      </div>
    </div>
  );
}