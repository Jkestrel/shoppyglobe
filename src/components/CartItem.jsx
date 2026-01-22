import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/cartSlice";
import "./CartItem.css";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />

      <div className="cart-info">
        <h4>{item.title}</h4>
        <p>₹{item.price}</p>

        <div className="qty-controls">
          <button onClick={() => dispatch(decreaseQty(item.id))}>−</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
        </div>

        <button
          className="remove"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
