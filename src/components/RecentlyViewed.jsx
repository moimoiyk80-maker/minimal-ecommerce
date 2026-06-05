import useRecentlyViewed
from "../hooks/useRecentlyViewed";

import ProductCarouselSection
from "./ProductCarouselSection";

function RecentlyViewed() {

  const { recentProducts } =
    useRecentlyViewed();

  return (

    <ProductCarouselSection
      title="최근 본 상품"
      products={recentProducts}
    />

  );
}

export default RecentlyViewed;