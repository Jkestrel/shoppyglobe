import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../redux/cartSlice";
import { logout } from "../redux/authSlice";
import "./Header.css";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  return (
    <header className="header">
      <h1 className="logo">🛒 ShoppyGlobe</h1>

      <input
        type="text"
        placeholder="Search products..."
        className="search"
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      <nav>
        <div>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart ({cartItems.length})</Link>
        </div>
        <div>{token ? (
          <button onClick={() => dispatch(logout())}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
