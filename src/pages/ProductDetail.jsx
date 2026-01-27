import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAPI } from "../redux/cartSlice";
import "./ProductDetail.css"; // ✅ CSS IMPORT

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        if (!res.ok) {
          throw new Error("Product not found");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  function handleAddToCart() {
    if (!token) {
      navigate("/login");
      return;
    }
console.log(product);

    dispatch(
      addToCartAPI({
        productId: product._id,
        token,
      })
    );
  }

  if (loading) return <h3 className="pd-status">Loading...</h3>;
  if (error) return <h3 className="pd-status error">{error}</h3>;

  return (
    <div className="product-detail">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-image"
      />

      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>₹{product.price}</h3>

        <button onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
