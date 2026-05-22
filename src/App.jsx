import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import {
  AnimatePresence
} from "framer-motion";

import {
  Search,
  Sun,
  Moon,
  ShoppingBag,
  X
} from "lucide-react";

import { products } from "./data/products";

import ProductList from "./components/ProductList";
import SkeletonCard from "./components/SkeletonCard";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import Toast from "./components/Toast";
import EmptyState from "./components/EmptyState";
import PageWrapper from "./components/PageWrapper";
import RecentlyViewed from "./components/RecentlyViewed";

import { useCart } from "./context/CartContext";

import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";

import useProducts from "./hooks/useProducts";
import useScrollLock from "./hooks/useScrollLock";
import useDebounce from "./hooks/useDebounce";

import "./variables.css";
import "./App.css";

function App() {
  
  const location = useLocation(); 

  const params = new URLSearchParams(
    window.location.search
  );

  const [search, setSearch] = useState(
    params.get("search") || ""
  );

  const debouncedSearch =
  useDebounce(search, 300);

  const [filters, setFilters] = useState({
    category:
      params.get("category") || "전체",

    color:
      params.get("color") || "전체"
  });

  const [sort, setSort] = useState(
    params.get("sort") || "default"
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }

  }, [darkMode]);

  const SORT_LABELS = {
    default: "기본정렬",
    low: "가격 낮은순",
    high: "가격 높은순"
  };

  const [sortModalOpen, setSortModalOpen] =
    useState(false);

  const { sortedProducts } = useProducts(
      products,
      filters,
      sort,
      debouncedSearch
  );

  const { toastMessage } = useCart();

  useScrollLock(sortModalOpen);

  useEffect(() => {

    const handleEsc = (e) => {

      if (e.key === "Escape") {
        setSortModalOpen(false);
      }
    };

    if (sortModalOpen) {
      window.addEventListener(
        "keydown",
        handleEsc
      );
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleEsc
      );
    };

  }, [sortModalOpen]);

  useEffect(() => {

    const query = new URLSearchParams();

    if (filters.category !== "전체") {
      query.set(
        "category",
        filters.category
      );
    }

    if (filters.color !== "전체") {
      query.set(
        "color",
        filters.color
      );
    }

    if (sort !== "default") {
      query.set("sort", sort);
    }

    if (search.trim()) {
      query.set("search", search);
    }

    const queryString = query.toString();

    const newUrl = queryString
      ? `?${queryString}`
      : window.location.pathname;

    window.history.replaceState(
      {},
      "",
      newUrl
    );

  }, [filters, sort, search]);

  return (
    <>
    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

      <Route
        path="/"
        element={
          <PageWrapper>
          <div>

            <Header />

            <button
              className="theme-toggle"
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {darkMode ? (

              <Sun size={18} />

              ) : (

              <Moon size={18} />

              )}
            </button>

            <div className="sticky-controls">

              <div className="search-wrap">

                <div className="search-box">

                <Search
                  size={18}
                  strokeWidth={2}
                  className="search-icon"
                />

                  <input
                    type="text"
                    placeholder="상품 검색"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="search-input"
                  />

                  {search && (

                    <button
                      className="search-clear"
                      onClick={() => setSearch("")}
                    >
                      <X size={16} />
                    </button>

                  )}

                </div>

              </div>

              <FilterBar
                filters={filters}
                setFilters={setFilters}
                sort={sort}
                setSort={setSort}
                setSortModalOpen={
                  setSortModalOpen
                }
                sortedProducts={sortedProducts}
              />

            </div>

            {sortModalOpen && (

              <div
                className="sort-modal-backdrop"
                role="presentation"
                onClick={() =>
                  setSortModalOpen(false)
                }
              >

                <div
                  className="sort-modal-sheet"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="sort-modal-title"
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >

                  <div
                    className="sort-modal-handle"
                    aria-hidden
                  />

                  <p
                    id="sort-modal-title"
                    className="sort-modal-title"
                  >
                    정렬
                  </p>

                  <ul className="sort-modal-list">

                    {[
                      "default",
                      "low",
                      "high"
                    ].map((key) => (

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
                    onClick={() =>
                      setSortModalOpen(false)
                    }
                  >
                    닫기
                  </button>

                </div>

              </div>

            )}

            {loading ? (

              <div className="cardflex">

                {Array.from({
                  length: 6
                }).map((_, index) => (

                  <SkeletonCard key={index} />

                ))}

              </div>

            ) : sortedProducts.length === 0 ? (

              <EmptyState
              onReset={() => {
                setFilters({
                  category: "전체",
                  color: "전체"
                });
            
                setSort("default");
                setSearch("");
              }}
            />

            ) : (
             <>
              <ProductList
                products={sortedProducts}
                search={search}
              />

              <RecentlyViewed />  
            </>           

            )}

          </div>
          </PageWrapper> 
        }
      />

      <Route
        path="/product/:id"
        element={<ProductDetail />}
      />
      <Route
        path="/cart"
        element={<CartPage />}
      />  
      <Route
        path="*"
        element={<NotFound />}
      />   

    </Routes>

    </AnimatePresence>

    <Toast message={toastMessage} />
   </>
  );
}

export default App;