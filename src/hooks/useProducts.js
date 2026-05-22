import { useMemo } from "react";

function useProducts(
  products,
  filters,
  sort,
  search
) {

  const filteredProducts = useMemo(() => {

    const normalizedSearch =
      search.trim().toLowerCase();

    return products.filter((item) => {

      const categoryMatch =
        filters.category === "전체" ||
        item.category === filters.category;

      const colorMatch =
        filters.color === "전체" ||
        item.color === filters.color;

      const searchMatch =
        item.name
          ?.toLowerCase()
          .includes(normalizedSearch) || false;

      return (
        categoryMatch &&
        colorMatch &&
        searchMatch
      );

    });

  }, [products, filters, search]);

  const sortedProducts = useMemo(() => {

    return [...filteredProducts].sort((a, b) => {

      if (sort === "low") {
        return Number(a.price) - Number(b.price);
      }

      if (sort === "high") {
        return Number(b.price) - Number(a.price);
      }

      return 0;

    });

  }, [filteredProducts, sort]);

  return {
    filteredProducts,
    sortedProducts
  };
}

export default useProducts;