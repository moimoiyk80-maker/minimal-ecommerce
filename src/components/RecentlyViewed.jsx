import { Link } from "react-router-dom";

import useRecentlyViewed
from "../hooks/useRecentlyViewed";

function RecentlyViewed() {

  const { recentProducts } =
    useRecentlyViewed();

  if (recentProducts.length === 0) {
    return null;
  }

  return (

    <section className="recent-section">

      <div className="recent-header">

        <h2>
          최근 본 상품
        </h2>

      </div>

      <div className="recent-scroll">

        {recentProducts.map((item) => (

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
              />

            </div>

            <div className="recent-info">

              <p className="recent-name">
                {item.name}
              </p>

              <p className="recent-price">
                {item.price}원
              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default RecentlyViewed;