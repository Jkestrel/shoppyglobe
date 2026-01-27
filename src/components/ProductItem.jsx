import { Link } from "react-router-dom";
import "./ProductItem.css";

function ProductItem({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
      />

      <h3>{product.title}</h3>
      <p>₹{product.price}</p>

      <Link to={`/product/${product._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ProductItem;
