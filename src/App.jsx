import { useState, useEffect } from "react";
import { products } from "./data/products";
import ProductList from "./components/ProductList";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";

const SORT_LABELS = {
  default: "기본정렬",
  low: "가격 낮은순",
  high: "가격 높은순",
};

function App() {
  const [filters, setFilters] = useState({
    category: "전체",
    color: "전체"
  });
  
  const [sort, setSort] = useState("default");
  const [sortModalOpen, setSortModalOpen] = useState(false);

  useEffect(() => {
    if (!sortModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sortModalOpen]);

  const filteredProducts = products.filter(item => {
    const categoryMatch =
      filters.category === "전체" || item.category === filters.category;
  
    const colorMatch =
      filters.color === "전체" || item.color === filters.color;
  
    return categoryMatch && colorMatch;
  });
 
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return Number(a.price) - Number(b.price);
    if (sort === "high") return Number(b.price) - Number(a.price);
    return 0;
  });


  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSortModalOpen(false);
        setSelectedProduct(null);
      }
    };
  
    if (sortModalOpen || selectedProduct) {
      window.addEventListener("keydown", handleEsc);
    }
  
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [sortModalOpen, selectedProduct]);

  return (
    <div>
      <h1>컬렉션</h1>

      <div >
        <div className="filter-container">
          <h3>카테고리</h3>
          <button className={filters.category === "전체" ? "active" : ""}
                  onClick={() => setFilters({ ...filters, category: "전체" })}>전체</button>
          <button className={filters.category === "상의" ? "active" : ""}
                  onClick={() => setFilters({ ...filters, category: "상의" })}>상의</button>
          <button className={filters.category === "하의" ? "active" : ""}
                  onClick={() => setFilters({ ...filters, category: "하의" })}>하의</button>
         </div>
         <div className="filter-container">
          <h3>색상</h3>
          <button className={filters.color === "전체" ? "active" : ""}
                  onClick={() => setFilters({ ...filters, color: "전체" })}>전체</button>
          <button className={filters.color === "black" ? "active" : ""}
                  onClick={() => setFilters({ ...filters, color: "black" })}>블랙</button>
          <button className={filters.color === "white" ? "active" : ""}
                  onClick={() => setFilters({ ...filters, color: "white" })}>화이트</button>
          <button className={filters.color === "gray" ? "active" : ""}
                  onClick={() => setFilters({ ...filters, color: "gray" })}>그레이</button>
         </div>

         <div className="selected-filter-container">
            
            {/*<strong>선택된 필터 :</strong>*/}

            <AnimatePresence>
              {filters.category !== "전체" && (
                <motion.span
                layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    backgroundColor:"#9ca3af",
                    color:"#000",
                    borderRadius: "20px",
                    fontSize:"14px"
                  }}
                >
                  카테고리 : {filters.category}
                </motion.span>
              )}
              {filters.color !== "전체" && (
                <motion.span
                layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    backgroundColor:"#9ca3af",
                    color:"#000",
                    borderRadius: "20px",
                    fontSize:"14px"
                  }}
                >
                  색상 : {filters.color}
                </motion.span>
              )}
            </AnimatePresence>
            
            <button
              onClick={() => {
                setFilters({
                  category: "전체",
                  color: "전체"
                });
                setSort("default"); 
              }}
            >
              필터 초기화
          </button>
          
              

                      
         </div>

         <div className="filter-footer"> 
          <p>총 {sortedProducts.length}개 상품</p>  
          {/*<h3>정렬</h3>*/}
          <button type="button" onClick={() => setSortModalOpen(true)} 
                  style={{    display: "flex",
                           alignItems: "center"}}>
            {SORT_LABELS[sort]} <svg width="20" height="20" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16L6 10H18L12 16Z" fill="#000000"/></svg>
          </button>
         </div> 
      </div>

      {sortModalOpen && (
        <div
          className="sort-modal-backdrop"
          role="presentation"
          onClick={() => setSortModalOpen(false)}
        >
          <div
            className="sort-modal-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sort-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sort-modal-handle" aria-hidden />
            <p id="sort-modal-title" className="sort-modal-title">
              정렬
            </p>
            <ul className="sort-modal-list">
              {(["default", "low", "high"]).map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    className={
                      sort === key
                        ? "sort-modal-item sort-modal-item--active"
                        : "sort-modal-item"
                    }
                    onClick={() => {
                      setSort(key);
                      setSortModalOpen(false);
                    }}
                  >
                    {SORT_LABELS[key]}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="sort-modal-close"
              onClick={() => setSortModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}          

      {sortedProducts.length === 0 ? (
        <p style={{ marginTop: "20px" }}>
          조건에 맞는 상품이 없습니다.
        </p>
      ) : (
        <ProductList
          products={sortedProducts}
          onCardClick={setSelectedProduct}
        />
      )}

{selectedProduct && (
      <div
        onClick={() => setSelectedProduct(null)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            padding: "20px",
            width: "90%",
            maxWidth: "400px",
            borderRadius: "16px",
            margin: "100px auto"
          }}
        >
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              borderRadius: "12px",
              marginBottom: "16px"
            }}
          />
          <h2 style={{color:"#08060d"}}>{selectedProduct.name}</h2>
          <p style={{color:"#6b6375"}}>{selectedProduct.price}원</p>
          <button onClick={() => setSelectedProduct(null)} style={{color:"#6b6375", marginTop:"10px"}}>닫기</button>
        </div>
      </div>
    )}

    </div>  
    
  );

  
}

export default App;