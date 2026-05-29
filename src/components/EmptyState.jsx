import { motion } from "framer-motion";
import { Search } from "lucide-react";

function EmptyState({ onReset }) {

  return (

    <motion.div
      className="empty-state"
      initial={{
        opacity: 0,
        y: 12
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.28
      }}
    >

      <Search
        size={48}
        strokeWidth={2}
        className="empty-icon"
      />

      <h2>
        원하는 상품이 없어요
      </h2>

      <p>
        검색어나 필터를 변경해서
        상품을 찾아보세요.
      </p>

      <button
        className="empty-reset"
        onClick={onReset}
      >
        필터 초기화
      </button>

    </motion.div>
  );
}

export default EmptyState;