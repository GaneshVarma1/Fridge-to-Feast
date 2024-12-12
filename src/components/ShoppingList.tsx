import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { useShoppingList } from '../context/ShoppingListContext';

export default function ShoppingList() {
  const { items, removeItem, clearList } = useShoppingList();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ShoppingCart className="w-5 h-5 text-emerald-500 mr-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Shopping List ({items.length})
            </h3>
          </div>
          <button
            onClick={clearList}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Clear All
          </button>
        </div>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between text-gray-700 dark:text-gray-300"
            >
              <span>{item}</span>
              <button
                onClick={() => removeItem(item)}
                className="p-1 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}