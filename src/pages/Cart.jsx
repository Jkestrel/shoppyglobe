import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item?.product?.price * item?.quantity ,
    0
  );

  if (items.length === 0) {
    return <h3 className="empty">Your cart is empty</h3>;
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>

      {items.map((item) => (
        <CartItem key={item.id} cartProduct={item} />
      ))}

      <h3>Total: ₹{total}</h3>

      <Link to="/checkout">
        <button className="checkout-btn">Proceed to Checkout</button>
      </Link>
    </div>
  );
}

export default Cart;
