const STORAGE_KEYS = {
  FAVORITES: 'fridgeToFeast_favorites',
  RECENT_SEARCHES: 'fridgeToFeast_recentSearches',
  THEME: 'fridgeToFeast_theme',
} as const;

export function getFavorites(): string[] {
  const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  return favorites ? JSON.parse(favorites) : [];
}

export function addToFavorites(recipeId: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(recipeId)) {
    localStorage.setItem(
      STORAGE_KEYS.FAVORITES,
      JSON.stringify([...favorites, recipeId])
    );
  }
}

export function removeFromFavorites(recipeId: string): void {
  const favorites = getFavorites();
  localStorage.setItem(
    STORAGE_KEYS.FAVORITES,
    JSON.stringify(favorites.filter(id => id !== recipeId))
  );
}

export function getRecentSearches(): string[] {
  const searches = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
  return searches ? JSON.parse(searches) : [];
}

export function addRecentSearch(ingredients: string[]): void {
  const searches = getRecentSearches();
  const newSearch = ingredients.sort().join(',');
  const updatedSearches = [
    newSearch,
    ...searches.filter(search => search !== newSearch),
  ].slice(0, 5);
  
  localStorage.setItem(
    STORAGE_KEYS.RECENT_SEARCHES,
    JSON.stringify(updatedSearches)
  );
}