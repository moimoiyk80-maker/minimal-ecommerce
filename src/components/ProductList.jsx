import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

function ProductList({  products, search, onCardClick }) {
  return (
    <motion.div className="cardflex">
      {products.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{
            y: -2
          }}
          transition={{ duration: 0.18 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ProductCard
            item={item}
            search={search}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ProductList;