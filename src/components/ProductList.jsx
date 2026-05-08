import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

function ProductList({  products, onCardClick }) {
  return (
    <motion.div
     className="cardflex"
     layout
    >
    {products.map(item => (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <ProductCard item={item}  onClick={onCardClick} />
      </motion.div>
    ))}
  </motion.div>
  );
}

export default ProductList;