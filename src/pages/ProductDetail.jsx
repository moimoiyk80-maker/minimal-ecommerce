import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import {
  useState,
  useEffect
} from "react";
import { useCart } from "../context/CartContext";
import PageWrapper from "../components/PageWrapper";
import useRecentlyViewed
from "../hooks/useRecentlyViewed";

function ProductDetail() {

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] =
  useState(1);

    const [selectedSize, setSelectedSize] =
    useState("M");

    const [selectedColor, setSelectedColor] =
    useState(product.color);

    const { addToCart } = useCart();

    const {
      addRecentlyViewed
    } = useRecentlyViewed();

    const totalPrice =
    product.price * quantity; 

    useEffect(() => {

      if (product) {
        addRecentlyViewed(product);
      }
    
    }, [product]);

  if (!product) {
    return (
     <PageWrapper>
      <div style={{ padding: "40px" }}>
        <h2>상품을 찾을 수 없습니다.</h2>

        <Link to="/">
          홈으로 이동
        </Link>
      </div>
     </PageWrapper>
    );
  }

  return (
   <PageWrapper>
    <div className="detail-page">

      <Link
        to="/"
        className="detail-back"
      >
        ← 돌아가기
      </Link>

      <div className="detail-layout">

        <div className="detail-image-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="detail-image"
          />
        </div>

        <div className="detail-info">

          <h1>
            {product.name}
          </h1>

          <p className="detail-price">
            {product.price}원
          </p>

          <p className="detail-desc">
            미니멀한 실루엣과
            편안한 착용감을
            중심으로 제작된 제품입니다.
          </p>

          <div className="detail-option">

            <p>컬러</p>

            <div className="detail-chip-wrap">

                {["black", "white", "gray"].map(
                (color) => (

                <button
                    key={color}
                    className={
                    selectedColor === color
                        ? "detail-chip active"
                        : "detail-chip"
                    }
                    onClick={() =>
                    setSelectedColor(color)
                    }
                >
                    {color}
                </button>

                ))}
            </div>

            </div>

            <div className="detail-option">

            <p>사이즈</p>

            <div className="detail-chip-wrap">

                {["S", "M", "L"].map((size) => (

                <button
                    key={size}
                    className={
                    selectedSize === size
                        ? "detail-chip active"
                        : "detail-chip"
                    }
                    onClick={() =>
                    setSelectedSize(size)
                    }
                >
                    {size}
                </button>

                ))}

            </div>

            </div>

            <div className="detail-option">

            <p>수량</p>

            <div className="quantity-wrap">

                <button
                onClick={() =>
                    setQuantity((prev) =>
                    Math.max(1, prev - 1)
                    )
                }
                >
                -
                </button>

                <span>{quantity}</span>

                <button
                onClick={() =>
                    setQuantity((prev) =>
                    prev + 1
                    )
                }
                >
                +
                </button>

            </div>

            </div>

            <p className="detail-total">
            총 금액 : {totalPrice}원
            </p>

            <button
                className="detail-buy"
                onClick={() =>
                    addToCart({
                    ...product,
                    selectedColor,
                    selectedSize,
                    quantity
                    })
                }
                >
                장바구니 담기
                </button>

        </div>

      </div>

    </div>
   </PageWrapper> 
  );
}

export default ProductDetail;