import { Recipe } from '../types';

export const basicRecipes: Recipe[] = [
  {
    id: 'egg-fried-rice',
    title: 'Egg Fried Rice',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600',
    category: '15 mins',
    area: 'Asian',
    instructions: [
      'Cook rice according to package instructions',
      'Scramble eggs in a separate pan',
      'Heat oil in a wok or large pan',
      'Add cooked rice and stir-fry',
      'Add scrambled eggs and seasonings',
      'Mix well and serve hot'
    ],
    ingredients: [
      'Cooked Rice',
      'Eggs',
      'Oil',
      'Soy Sauce',
      'Green Onions',
      'Salt',
      'Pepper'
    ],
    tags: ['quick', 'easy', 'asian'],
    video: null,
    source: null,
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: true
  },
  {
    id: 'paneer-curry',
    title: 'Simple Paneer Curry',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600',
    category: '25 mins',
    area: 'Indian',
    instructions: [
      'Dice paneer into cubes',
      'Sauté onions until golden',
      'Add tomatoes and spices',
      'Cook until tomatoes are soft',
      'Add paneer and simmer',
      'Garnish with fresh coriander'
    ],
    ingredients: [
      'Paneer',
      'Onions',
      'Tomatoes',
      'Ginger Garlic Paste',
      'Garam Masala',
      'Oil',
      'Salt'
    ],
    tags: ['indian', 'vegetarian', 'curry'],
    video: null,
    source: null,
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: false
  },
  {
    id: 'chicken-pasta',
    title: 'Simple Chicken Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=600',
    category: '20 mins',
    area: 'Italian',
    instructions: [
      'Cook pasta according to package instructions',
      'Season and cook diced chicken',
      'Sauté garlic and onions',
      'Add chicken and pasta',
      'Mix with sauce and seasonings',
      'Serve hot with garnish'
    ],
    ingredients: [
      'Pasta',
      'Chicken Breast',
      'Garlic',
      'Onions',
      'Olive Oil',
      'Salt',
      'Pepper'
    ],
    tags: ['italian', 'pasta', 'quick'],
    video: null,
    source: null,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: true
  }
];