import React, { useState } from 'react';
import { ChefHat, Clock, Flame, X } from 'lucide-react';
import { useShoppingList } from '../context/ShoppingListContext';

interface QuickRecipe {
  title: string;
  ingredients: string[];
  time: string;
  difficulty: string;
  image: string;
  description: string;
  cuisine: string;
  spiceLevel?: string;
  instructions: string[];
}

const quickRecipes: QuickRecipe[] = [
  {
    title: "Shahi Paneer",
    ingredients: [
      "500g paneer, cubed",
      "2 cups heavy cream",
      "4 tomatoes, pureed",
      "2 onions, finely chopped",
      "1/2 cup cashews, soaked",
      "4 cloves garlic",
      "1-inch ginger",
      "2 tbsp butter",
      "1 tsp garam masala",
      "Salt to taste",
      "1 tsp red chili powder",
      "Fresh coriander for garnish"
    ],
    time: "30 mins",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600",
    description: "Rich and creamy curry made with cottage cheese in a tomato-based gravy",
    cuisine: "North Indian",
    spiceLevel: "Medium",
    instructions: [
      "Blend soaked cashews with cream to make a smooth paste",
      "Sauté onions until golden brown",
      "Add ginger-garlic paste and cook for 2 minutes",
      "Add tomato puree and spices, cook until oil separates",
      "Add the cashew-cream paste and simmer for 5 minutes",
      "Add paneer cubes and cook for another 5 minutes",
      "Garnish with cream and coriander leaves"
    ]
  },
  {
    title: "Veg Pulao",
    ingredients: [
      "2 cups basmati rice",
      "2 cups mixed vegetables (carrots, peas, beans)",
      "1 large onion, sliced",
      "2 tbsp ghee",
      "Whole spices (cardamom, cinnamon, cloves)",
      "2 bay leaves",
      "Salt to taste",
      "4 cups water"
    ],
    time: "25 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600",
    description: "Fragrant rice cooked with fresh vegetables and aromatic spices",
    cuisine: "Indian",
    spiceLevel: "Mild",
    instructions: [
      "Wash and soak rice for 30 minutes",
      "Heat ghee and add whole spices",
      "Add sliced onions and sauté until golden",
      "Add mixed vegetables and salt",
      "Add rice and water",
      "Cook until rice is done and fluffy",
      "Let it rest for 5 minutes before serving"
    ]
  },
  {
    title: "Chicken Pulao",
    ingredients: [
      "500g chicken, cut into pieces",
      "2 cups basmati rice",
      "2 onions, sliced",
      "2 tomatoes, chopped",
      "Whole spices (cardamom, cinnamon, cloves)",
      "2 tbsp oil",
      "Salt to taste",
      "Fresh mint and coriander"
    ],
    time: "35 mins",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=600",
    description: "Flavorful one-pot rice dish with tender chicken and aromatic spices",
    cuisine: "Indian",
    spiceLevel: "Medium",
    instructions: [
      "Marinate chicken with yogurt and spices for 30 minutes",
      "Heat oil and add whole spices",
      "Add sliced onions and cook until golden",
      "Add marinated chicken and cook until sealed",
      "Add rice and required water",
      "Cook until rice is done and chicken is tender",
      "Garnish with fresh herbs before serving"
    ]
  },
  {
    title: "Perugu Pachadi",
    ingredients: [
      "2 cups thick yogurt",
      "1 cucumber, grated",
      "2 green chilies, finely chopped",
      "Curry leaves",
      "1 tsp mustard seeds",
      "Salt to taste",
      "2 tbsp oil",
      "Fresh coriander"
    ],
    time: "15 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1616669944447-d65d41a222bd?auto=format&fit=crop&q=80&w=600",
    description: "Cooling South Indian yogurt-based side dish with fresh vegetables",
    cuisine: "South Indian",
    spiceLevel: "Mild",
    instructions: [
      "Beat yogurt until smooth",
      "Add grated cucumber and green chilies",
      "Heat oil and add mustard seeds",
      "Add curry leaves once seeds splutter",
      "Pour the tempering over the yogurt mixture",
      "Mix well and add salt",
      "Garnish with coriander leaves"
    ]
  },
  {
    title: "Aloo Bhaji",
    ingredients: [
      "4 potatoes, diced",
      "2 onions, chopped",
      "2 tomatoes, chopped",
      "2 green chilies",
      "1 tsp cumin seeds",
      "1 tsp turmeric powder",
      "Salt to taste",
      "2 tbsp oil"
    ],
    time: "20 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&q=80&w=600",
    description: "Classic potato curry with aromatic Indian spices",
    cuisine: "Indian",
    spiceLevel: "Medium",
    instructions: [
      "Heat oil and add cumin seeds",
      "Add chopped onions and sauté until golden",
      "Add tomatoes and cook until soft",
      "Add spices and diced potatoes",
      "Cover and cook until potatoes are tender",
      "Garnish with fresh coriander",
      "Serve hot with rotis or rice"
    ]
  },
  {
    title: "Goat Curry",
    ingredients: [
      "1kg goat meat, cut into pieces",
      "2 onions, finely chopped",
      "3 tomatoes, pureed",
      "2 tbsp ginger-garlic paste",
      "Whole spices (cardamom, cinnamon, cloves)",
      "2 tbsp oil",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    time: "45 mins",
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600",
    description: "Rich and spicy traditional goat curry with tender meat",
    cuisine: "Indian",
    spiceLevel: "Hot",
    instructions: [
      "Marinate goat meat with yogurt and spices",
      "Heat oil and add whole spices",
      "Add onions and cook until golden brown",
      "Add ginger-garlic paste and tomato puree",
      "Add marinated meat and cook on low heat",
      "Simmer until meat is tender",
      "Garnish with fresh coriander"
    ]
  }
];

export default function QuickRecipes() {
  const [selectedRecipe, setSelectedRecipe] = useState<QuickRecipe | null>(null);
  const { addItems } = useShoppingList();

  const handleAddToShoppingList = (ingredients: string[]) => {
    addItems(ingredients);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Featured Indian Recipes
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Discover these authentic Indian dishes perfect for your next meal!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickRecipes.map((recipe, index) => (
          <div
            key={index}
            onClick={() => setSelectedRecipe(recipe)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow animate-fade-in cursor-pointer"
          >
            <div className="relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full text-xs font-medium">
                {recipe.cuisine}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {recipe.title}
              </h3>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Clock className="w-4 h-4 mr-1" />
                {recipe.time}
                <span className="mx-2">•</span>
                <ChefHat className="w-4 h-4 mr-1" />
                {recipe.difficulty}
                {recipe.spiceLevel && (
                  <>
                    <span className="mx-2">•</span>
                    <Flame className={`w-4 h-4 mr-1 ${
                      recipe.spiceLevel === 'Hot' ? 'text-red-500' :
                      recipe.spiceLevel === 'Medium' ? 'text-orange-500' :
                      'text-green-500'
                    }`} />
                    {recipe.spiceLevel}
                  </>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {recipe.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {recipe.ingredients.slice(0, 4).map((ingredient, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full text-xs"
                  >
                    {ingredient.split(',')[0]}
                  </span>
                ))}
                {recipe.ingredients.length > 4 && (
                  <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full text-xs">
                    +{recipe.ingredients.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedRecipe.title}
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-emerald-500" />
                  {selectedRecipe.time}
                </div>
                <div className="flex items-center">
                  <ChefHat className="w-5 h-5 mr-2 text-emerald-500" />
                  {selectedRecipe.difficulty}
                </div>
                {selectedRecipe.spiceLevel && (
                  <div className="flex items-center">
                    <Flame className={`w-5 h-5 mr-2 ${
                      selectedRecipe.spiceLevel === 'Hot' ? 'text-red-500' :
                      selectedRecipe.spiceLevel === 'Medium' ? 'text-orange-500' :
                      'text-green-500'
                    }`} />
                    {selectedRecipe.spiceLevel}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleAddToShoppingList(selectedRecipe.ingredients)}
                    className="mt-4 w-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 py-2 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
                  >
                    Add to Shopping List
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                  <ol className="space-y-4">
                    {selectedRecipe.instructions.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-gray-600 dark:text-gray-400">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}