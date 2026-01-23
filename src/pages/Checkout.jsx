import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Checkout.css";

function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setOrderPlaced(true);
    dispatch(clearCart());

    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  if (items.length === 0 && !orderPlaced) {
    return <h3 className="empty">Your cart is empty</h3>;
  }

  return (
    <div className="checkout">
      {orderPlaced ? (
        <h2 className="success">✅ Order placed successfully!</h2>
      ) : (
        <>
          <h2>Checkout</h2>

          <form onSubmit={handleSubmit} className="checkout-form">
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Address" required />

            <button type="submit">Place Order</button>
          </form>

          <div className="summary">
            <h3>Order Summary</h3>
            {items.map((item) => (
              <p key={item.id}>
                {item.title} × {item.quantity}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
