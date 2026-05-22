import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PageWrapper from "../components/PageWrapper";

function CartPage() {

  const {
        cartItems,
        removeFromCart,
        updateQuantity
      } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {

    return (
      <PageWrapper> 
      <div className="cart-empty">

        <h2>
          장바구니가 비어 있습니다.
        </h2>

        <Link
          to="/"
          className="cart-back"
        >
          쇼핑 계속하기
        </Link>

      </div>
      </PageWrapper>
    );
  }

  return (
   <PageWrapper>
    <div className="cart-page">

      <div className="cart-header">

        <h1>Cart</h1>

        <Link
          to="/"
          className="cart-back"
        >
          ← 계속 쇼핑하기
        </Link>

      </div>

      <div className="cart-list">

        {cartItems.map((item, index) => (

          <div
            key={`${item.id}-${index}`}
            className="cart-item"
          >

            <img
              src={item.image}
              alt={item.name}
              className="cart-image"
            />

            <div className="cart-info">

              <h3>
                {item.name}
              </h3>

              <p>
                컬러 :
                {" "}
                {item.selectedColor}
              </p>

              <p>
                사이즈 :
                {" "}
                {item.selectedSize}
              </p>

              <div className="cart-quantity">

                <button
                    onClick={() =>
                    updateQuantity(
                        item.id,
                        item.selectedSize,
                        item.selectedColor,
                        "decrease"
                    )
                    }
                >
                    -
                </button>

                <span>
                    {item.quantity}
                </span>

                <button
                    onClick={() =>
                    updateQuantity(
                        item.id,
                        item.selectedSize,
                        item.selectedColor,
                        "increase"
                    )
                    }
                >
                    +
                </button>

                </div>

            </div>

            <p className="cart-price">
              {item.price * item.quantity}원
            </p>
            <button
                className="cart-remove"
                onClick={() =>
                    removeFromCart(
                    item.id,
                    item.selectedSize,
                    item.selectedColor
                    )
                }
                >
                삭제
            </button>

          </div>

        ))}

      </div>

      <div className="cart-total">

        <p>
          총 금액
        </p>

        <strong>
          {totalPrice}원
        </strong>

      </div>

    </div>
   </PageWrapper> 
  );
}

export default CartPage;