import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import HighlightedText from "./HighlightedText";

function ProductCard({ item, search }) {

  const [imageLoaded, setImageLoaded] =
  useState(false);

  return (

    <Link
      to={`/product/${item.id}`}
      className="card-link"
    >

      <motion.div
        className="product-card"

        initial={{
          opacity: 0,
          y: 8
        }}

        whileInView={{
          opacity: 1,
          y: 0
        }}

        viewport={{
          once: true,
          amount: 0.15
        }}

        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
      >

        <div className="product-image-wrap">

        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={
            imageLoaded
              ? "product-image loaded"
              : "product-image"
          }
        />

        </div>

        <div className="product-info">

        <p className="product-name">

          <HighlightedText
            text={item.name}
            highlight={search}
          />

        </p>

          <p className="product-price">
            {item.price}원
          </p>

        </div>

       </motion.div>

    </Link>
  );
}

export default ProductCard;