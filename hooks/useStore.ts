import { useState, useEffect } from 'react';

export function useStore() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const [intent, setIntentState] = useState<{ category?: string; location?: string }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const storedFavs = localStorage.getItem('bll_favorites');
    const storedRecent = localStorage.getItem('bll_recent');
    const storedIntent = localStorage.getItem('bll_intent');

    if (storedFavs) setFavorites(JSON.parse(storedFavs));
    if (storedRecent) setRecentlyViewed(JSON.parse(storedRecent));
    if (storedIntent) setIntentState(JSON.parse(storedIntent));
    
    setIsLoaded(true);
  }, []);

  // Sync favorites to LocalStorage
  const toggleFavorite = (id: number) => {
    const newFavs = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    
    setFavorites(newFavs);
    localStorage.setItem('bll_favorites', JSON.stringify(newFavs));
  };

  // Add to recently viewed (manage limits)
  const addRecentlyViewed = (id: number) => {
    // Filter out existing and add to front, limit to 6
    const newRecent = [id, ...recentlyViewed.filter(recentId => recentId !== id)].slice(0, 6);
    
    setRecentlyViewed(newRecent);
    localStorage.setItem('bll_recent', JSON.stringify(newRecent));
  };

  const setIntent = (newIntent: { category?: string; location?: string }) => {
    const updated = { ...intent, ...newIntent };
    setIntentState(updated);
    localStorage.setItem('bll_intent', JSON.stringify(updated));
  };

  return {
    favorites,
    recentlyViewed,
    intent,
    toggleFavorite,
    addRecentlyViewed,
    setIntent,
    isFavorite: (id: number) => favorites.includes(id),
    isLoaded
  };
}
