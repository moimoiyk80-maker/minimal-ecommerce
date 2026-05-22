import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

function Header() {

  const { cartItems } = useCart();

  const totalCount = cartItems.reduce(
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
        /> Cart
        </span>

        {totalCount > 0 && (

          <span className="cart-badge"> 
            {totalCount}
          </span>

        )}

      </Link>

    </header>
  );
}

export default Header;