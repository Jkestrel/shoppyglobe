import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCartAPI,
  updateCartAPI
} from "../redux/cartSlice";
import "./CartItem.css";

function CartItem({ cartProduct ={} }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const product = cartProduct?.product || {}
  

  return (
    <div className="cart-product">
      <img src={product.thumbnail} alt={product.title} />

      <div className="cart-info">
        <h4>{product.title}</h4>
        <p>₹{product.price}</p>

        <div className="qty-controls">
          <button onClick={() => {
            if (cartProduct.quantity > 1) {
              dispatch(
                updateCartAPI({
                  cartItemId: cartProduct._id,
                  quantity: cartProduct.quantity - 1,
                  token,
                })
              );
            }
          }}>−</button>
          <span>{cartProduct.quantity}</span>
          <button onClick={() => dispatch(
            updateCartAPI({
              cartItemId: cartProduct._id,
              quantity: cartProduct.quantity + 1,
              token,
            })
          )
          }>+</button>
        </div>

        <button
          className="remove"
          onClick={() => dispatch(removeFromCartAPI({cartItemId: cartProduct._id, token}))}
        >
          Remove
        </button>
      </div>
    </div >
  );
}

export default CartItem;
