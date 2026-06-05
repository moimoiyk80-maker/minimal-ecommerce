import { Link } from "react-router-dom";

function ProductCarouselSection({
  title,
  products
}) {

  if (!products.length) {
    return null;
  }

  return (

    <section className="recent-section">

      <div className="recent-header">

        <h2>
          {title}
        </h2>

      </div>

      <div className="recent-scroll">

        {products.map((item) => (

          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="recent-card"
          >

            <div className="recent-image-wrap">

              <img
                src={item.image}
                alt={item.name}
                className="recent-image"
                loading="lazy"
              />

            </div>

            <div className="recent-info">

              <p className="recent-name">
                {item.name}
              </p>

              <p className="recent-price">
                {item.price.toLocaleString()}원
              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default ProductCarouselSection;