import useProducts from "../hooks/useProducts";
import ProductItem from "../components/ProductItem";
import { useSelector } from "react-redux";
import "./Home.css";

function Home() {
  const { products, loading, error } = useProducts();
  const search = useSelector((state) => state.cart.search);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h3 className="status">Loading products...</h3>;
  if (error) return <h3 className="status error">{error}</h3>;

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Home;
