import { useState, useEffect } from 'react';
import { fetchIngredientList } from '../services/ingredients';

export function useIngredients() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadIngredients() {
      try {
        const list = await fetchIngredientList();
        setIngredients(list);
      } catch (err) {
        setError('Failed to load ingredients');
      } finally {
        setIsLoading(false);
      }
    }

    loadIngredients();
  }, []);

  return { ingredients, isLoading, error };
}