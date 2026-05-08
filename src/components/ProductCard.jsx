function ProductCard({  item, onClick }) {
    return (
      <div 
      onClick={() => onClick(item)}
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        cursor: "pointer",
        borderRadius: "8px"
      }}>
        <img
        src={item.image}        alt={item.name}
        onError={(e) => e.target.style.display = "none"}
        style={{  width: "100%",
          aspectRatio: "3 / 4",
          objectFit: "cover" }}
        />
        <p>{item.name}</p>
        <p>{item.price}원</p>
      </div>
    );
  }
  
  export default ProductCard;