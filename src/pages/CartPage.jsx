import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PageWrapper from "../components/PageWrapper";
import { ArrowLeft,  ShoppingBag} from "lucide-react";

function CartPage() {

  const {
        cartItems,
        removeFromCart,
        updateQuantity
      } = useCart();

  const totalItems =
      cartItems.reduce(
        (acc, item) =>
          acc + item.quantity,
        0
      );
 
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {

    return (
      <PageWrapper>
  
        <div className="cart-empty">
  
         <div className="cart-header sticky-controls">        

            <Link
              to="/"
              className="detail-icon-button"
              aria-label="뒤로가기"
            >
              <ArrowLeft size={20} />
            </Link>

            <h1>Cart</h1>

          </div> 
  
          <div className="cart-empty-content">
  
            <ShoppingBag
              size={44}
              strokeWidth={1.8}
              className="cart-empty-icon"
            />
  
            <h2>
              장바구니가 비어 있습니다
            </h2>
  
            <p>
              마음에 드는 상품을 담아보세요.
            </p>
  
            <Link
              to="/"
              className="cart-empty-button"
            >
              쇼핑 계속하기
            </Link>
  
          </div>
  
        </div>
  
      </PageWrapper>
    );
  }

  return (
   <PageWrapper>
    <div className="cart-page">

      <div className="cart-header sticky-controls">        

        <Link
          to="/"
          className="detail-icon-button"
          aria-label="뒤로가기"
        >
          <ArrowLeft size={20} />
        </Link>

        <h1>Cart</h1>

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
 
              <div className="cart-infolist">

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
                    {(item.price * item.quantity).toLocaleString()}원
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

              </div>  

        ))}

      </div>
    
        <div className="cart-summary-sticky">

          <div className="cart-summary">

            <div className="cart-summary-top">

              <span>
                총 상품 수
              </span>

              <strong>
                {totalItems}개
              </strong>

            </div>

            <div className="cart-summary-price">
              
              <span>
                총 합계 금액
              </span>

              <strong>
                {totalPrice.toLocaleString()}원
              </strong>

            </div>

            <button
              className="cart-order-button"
            >
              주문하기
            </button>

          </div>

        </div>

    </div>
   </PageWrapper> 
  );
}

export default CartPage;