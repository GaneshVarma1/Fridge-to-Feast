import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Search } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { searchByIngredient } from '../services/mealdb';
import { BASIC_INGREDIENTS } from '../config/constants';

export default function IngredientInput() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { ingredients, setIngredients, setRecipes, setIsLoading } = useRecipes();

  useEffect(() => {
    // Filter suggestions based on input
    if (input.trim()) {
      const filtered = BASIC_INGREDIENTS.filter(ingredient =>
        ingredient.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input]);

  useEffect(() => {
    // Close suggestions when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
    setInput('');
    setShowSuggestions(false);
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await searchByIngredient(ingredients);
      setRecipes(results);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              handleAddIngredient(input.trim());
            }
          }}
          placeholder="Type an ingredient..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        {input.trim() && (
          <button
            onClick={() => handleAddIngredient(input.trim())}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
          >
            <Plus className="w-5 h-5 text-emerald-500" />
          </button>
        )}

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleAddIngredient(suggestion)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {ingredients.map((ingredient) => (
          <span
            key={ingredient}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
          >
            {ingredient}
            <button
              onClick={() => handleRemoveIngredient(ingredient)}
              className="ml-2 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>

      {ingredients.length > 0 && (
        <button
          onClick={handleSearch}
          className="mt-6 w-full bg-emerald-500 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-emerald-600 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span>Find Recipes</span>
        </button>
      )}
    </div>
  );
}