import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

function Header() {

  const { cartItems } = useCart();

  const cartCount =
  cartItems.reduce(
    (acc, item) =>
      acc + item.quantity,
    0
  );

  return (
    <header className="header">

      <Link
        to="/"
        className="header-logo"
      >
        COLLECTION
      </Link>

      <Link
        to="/cart"
        className="header-cart"
        >

        <span>
        <ShoppingBag
          size={20}
          strokeWidth={2}
        />
        </span>

        {cartCount > 0 && (
          <span className="cart-badge">
            {cartCount}
          </span>
        )}

      </Link>

    </header>
  );
}

export default Header;