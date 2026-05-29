import {
    createContext,
    useContext,
    useState,
    useEffect
  } from "react";
  
  const FavoriteContext =
    createContext();
  
  const STORAGE_KEY = "favorites";
  
  export function FavoriteProvider({
    children
  }) {
  
    const [favorites, setFavorites] =
      useState(() => {
  
        const saved =
          localStorage.getItem(
            STORAGE_KEY
          );
  
        return saved
          ? JSON.parse(saved)
          : [];
      });
  
    const toggleFavorite = (id) => {
  
      setFavorites((prev) => {
  
        if (prev.includes(id)) {
  
          return prev.filter(
            (item) => item !== id
          );
        }
  
        return [...prev, id];
      });
    };
  
    const isFavorite = (id) => {
  
      return favorites.includes(id);
    };
  
    useEffect(() => {
  
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      );
  
    }, [favorites]);
  
    return (
      <FavoriteContext.Provider
        value={{
          favorites,
          toggleFavorite,
          isFavorite
        }}
      >
        {children}
      </FavoriteContext.Provider>
    );
  }
  
  export function useFavorite() {
  
    return useContext(
      FavoriteContext
    );
    
   
  }