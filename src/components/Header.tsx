import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Player } from '@lottiefiles/react-lottie-player';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className={`lottie-container ${isDarkMode ? 'dark' : ''}`}>
              <Player
                autoplay
                loop
                src="https://lottie.host/3d3d41a6-3de5-4de7-9995-bef4debbcaca/p5OXLVzpQt.json"
                style={{ height: '40px', width: '40px' }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid slice',
                  clearCanvas: true,
                  progressiveLoad: true,
                  hideOnTransparent: true,
                }}
                playerState="playing"
                className={isDarkMode ? 'invert' : ''}
              />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Fridge to Feast
            </h1>
          </div>
          <nav className="flex items-center space-x-8">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}