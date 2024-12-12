import React, { createContext, useContext, useState, useCallback } from 'react';

interface ShoppingListContextType {
  items: string[];
  addItems: (items: string[]) => void;
  removeItem: (item: string) => void;
  clearList: () => void;
}

const ShoppingListContext = createContext<ShoppingListContextType>({
  items: [],
  addItems: () => {},
  removeItem: () => {},
  clearList: () => {},
});

export const useShoppingList = () => useContext(ShoppingListContext);

export function ShoppingListProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  const addItems = useCallback((newItems: string[]) => {
    setItems(current => {
      const uniqueItems = [...new Set([...current, ...newItems])];
      return uniqueItems;
    });
  }, []);

  const removeItem = useCallback((item: string) => {
    setItems(current => current.filter(i => i !== item));
  }, []);

  const clearList = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <ShoppingListContext.Provider value={{ items, addItems, removeItem, clearList }}>
      {children}
    </ShoppingListContext.Provider>
  );
}