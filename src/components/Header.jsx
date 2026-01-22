import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../redux/cartSlice";
import "./Header.css";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

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
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
      </nav>
    </header>
  );
}

export default Header;
