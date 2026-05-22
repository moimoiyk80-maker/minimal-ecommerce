

const CATEGORY_OPTIONS = [
  { label: "전체", value: "전체" },
  { label: "상의", value: "상의" },
  { label: "하의", value: "하의" }
];

const COLOR_OPTIONS = [
  { label: "전체", value: "전체" },
  { label: "블랙", value: "black" },
  { label: "화이트", value: "white" },
  { label: "그레이", value: "gray" }
];

const getColorLabel = (value) => {
  return COLOR_OPTIONS.find(
    (item) => item.value === value
  )?.label;
};

const getCategoryLabel = (value) => {
  return CATEGORY_OPTIONS.find(
    (item) => item.value === value
  )?.label;
};

const SORT_LABELS = {
  default: "기본정렬",
  low: "가격 낮은순",
  high: "가격 높은순"
};

function FilterBar({
  filters,
  setFilters,
  sort,
  setSort,
  setSortModalOpen,
  sortedProducts
}) {
  return (
    <>
      <div className="filter-container">
        <h3>카테고리</h3>

        {CATEGORY_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={
              filters.category === option.value
                ? "active"
                : ""
            }
            onClick={() =>
              setFilters({
                ...filters,
                category: option.value
              })
            }
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="filter-container">
        <h3>색상</h3>

        {COLOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={
              filters.color === option.value
                ? "active"
                : ""
            }
            onClick={() =>
              setFilters({
                ...filters,
                color: option.value
              })
            }
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="selected-filter-container">

      {filters.category !== "전체" && (
    <span className="filter-chip">
      {getCategoryLabel(filters.category)}
    </span>
  )}

  {filters.color !== "전체" && (
    <span className="filter-chip">
      {getColorLabel(filters.color)}
    </span>
  )}

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
        <p>
          총 {sortedProducts.length}개 상품
        </p>

        <button
          type="button"
          onClick={() =>
            setSortModalOpen(true)
          }
        >
          {SORT_LABELS[sort]}
        </button>
      </div>
    </>
  );
}

export default FilterBar;