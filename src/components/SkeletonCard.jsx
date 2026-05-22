import "./SkeletonCard.css";

function SkeletonCard() {
  return (
    <div className="product-card skeleton-card">

  <div className="product-image-wrap">

    <div className="skeleton-image" />

  </div>

  <div className="product-info skeleton-content">

    <div className="skeleton-line skeleton-title" />

    <div className="skeleton-line skeleton-price" />

  </div>

</div>
  );
}

export default SkeletonCard;