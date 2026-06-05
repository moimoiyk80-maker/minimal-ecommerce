import { useFavorites }
from "../context/FavoriteContext";

import ProductCarouselSection
from "./ProductCarouselSection";

import { products }
from "../data/products";

function FavoriteSection() { 

  const {
    favorites
  } = useFavorites();

  const favoriteProducts =
  products.filter(
    (item) =>
      favorites.includes(item.id)
  );

  return (
    <ProductCarouselSection
      title="관심 상품"
      products={favoriteProducts}
    />
  );
}

export default FavoriteSection;