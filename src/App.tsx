import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import QuickRecipes from './components/QuickRecipes';
import FilterBar from './components/FilterBar';
import ShoppingList from './components/ShoppingList';
import { ThemeProvider } from './context/ThemeContext';
import { ShoppingListProvider } from './context/ShoppingListContext';
import { RecipeProvider } from './context/RecipeContext';
import { Player } from '@lottiefiles/react-lottie-player';
import { useTheme } from './context/ThemeContext';

function MainContent() {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <Header />
      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className={`lottie-container ${isDarkMode ? 'dark' : ''}`}>
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/d37cc8f1-2c6d-4346-920d-7e1a8239c202/Szfx5nkRhA.json"
                  style={{ height: '300px', width: '300px' }}
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                    clearCanvas: true,
                    progressiveLoad: true,
                    hideOnTransparent: true,
                  }}
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Turn Your Ingredients into Delicious Meals
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Enter the ingredients you have, and we'll show you what you can make!
            </p>
          </div>
          <IngredientInput />
          <FilterBar />
          <RecipeList />
          <QuickRecipes />
        </div>
      </main>
      <ShoppingList />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ShoppingListProvider>
        <RecipeProvider>
          <MainContent />
        </RecipeProvider>
      </ShoppingListProvider>
    </ThemeProvider>
  );
}