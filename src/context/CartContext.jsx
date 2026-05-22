import {
    createContext,
    useContext,
    useState,
    useEffect
  } from "react";
  
  const CartContext = createContext();
  
  export function CartProvider({
    children
  }) {
  
    const [cartItems, setCartItems] =
    useState(() => {

        const savedCart =
        localStorage.getItem("cart");

        return savedCart
        ? JSON.parse(savedCart)
        : [];
    });

    const [toastMessage, setToastMessage] =
     useState("");
  
    const addToCart = (product) => {
  
      setCartItems((prev) => {
  
        const existing = prev.find(
          (item) => item.id === product.id
        );
  
        if (existing) {
  
          return prev.map((item) =>
  
            item.id === product.id &&
            item.selectedSize === product.selectedSize &&
            item.selectedColor === product.selectedColor
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1
                }
              : item
          );
        }
  
        return [
          ...prev,
          {
            ...product,
            quantity: product.quantity
          }
        ];
      });

      setToastMessage(
        "장바구니에 담겼습니다."
      );
      
      setTimeout(() => {
        setToastMessage("");
      }, 2000);

    };

    const removeFromCart = (
        id,
        selectedSize,
        selectedColor
      ) => {
      
        setCartItems((prev) =>
          prev.filter(
            (item) =>
              !(
                item.id === id &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
              )
          )
        );
      };

      const updateQuantity = (
        id,
        selectedSize,
        selectedColor,
        type
      ) => {
      
        setCartItems((prev) =>
      
          prev.map((item) => {
      
            const isTarget =
      
              item.id === id &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor;
      
            if (!isTarget) {
              return item;
            }
      
            const newQuantity =
      
              type === "increase"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1);
      
            return {
              ...item,
              quantity: newQuantity
            };
          })
        );
      };

    useEffect(() => {

        localStorage.setItem(
          "cart",
          JSON.stringify(cartItems)
        );
      
      }, [cartItems]);
  
    return (
      <CartContext.Provider
        value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            toastMessage
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
  
  export function useCart() {
    return useContext(CartContext);
  }