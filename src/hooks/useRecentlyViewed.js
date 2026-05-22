import { useEffect, useState } from "react";

const STORAGE_KEY = "recently-viewed";

function useRecentlyViewed() {

  const [recentProducts, setRecentProducts] =
    useState([]);

  useEffect(() => {

    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setRecentProducts(JSON.parse(stored));
    }

  }, []);

  const addRecentlyViewed = (product) => {

    setRecentProducts((prev) => {
  
      const updated = [
  
        product,
  
        ...prev.filter(
          (item) => item.id !== product.id
        )
  
      ].slice(0, 4);
  
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );
  
      return updated;
    });
  };

  return {
    recentProducts,
    addRecentlyViewed
  };
}

export default useRecentlyViewed;