import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a 
              href="https://www.linkedin.com/in/sriganeshshiramshetty/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400"
            >
              Designed by Sri Ganesh Shiramshetty
            </a>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/varmaaa.x_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/sriganeshshiramshetty/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:sriganeshshiram@gmail.com"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}