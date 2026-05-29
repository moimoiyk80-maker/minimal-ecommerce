import { Link } from "react-router-dom";

import { products }
from "../data/products";

import { useFavorite }
from "../context/FavoriteContext";

function FavoriteSection() {

  const { favorites } =
    useFavorite();

  const favoriteProducts =
    products.filter((item) =>
      favorites.includes(item.id)
    );

  if (
    favoriteProducts.length === 0
  ) {
    return null;
  }

  return (

    <section className="recent-section">

      <div className="section-head">

        <h2>
         관심 상품
        </h2>

      </div>

      <div className="recent-scroll">

        {favoriteProducts.map((item) => (

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

export default FavoriteSection;