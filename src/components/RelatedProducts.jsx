import ProductCarouselSection
from "./ProductCarouselSection";

function RelatedProducts({
  products
}) {

  return (
    <ProductCarouselSection
      title="함께 보면 좋은 상품"
      products={products}
    />
  );
}

export default RelatedProducts;