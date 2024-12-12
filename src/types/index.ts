export interface Recipe {
  id: string;
  title: string;
  image: string;
  category: string;
  area: string;
  instructions: string[];
  ingredients: string[];
  tags: string[];
  video: string | null;
  source: string | null;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  matchPercentage?: number;
}

export interface DetailedMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  [key: string]: string | null; // For dynamic ingredient/measure properties
}

export interface FilterOptions {
  dietary: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
  };
  cuisine: string[];
}