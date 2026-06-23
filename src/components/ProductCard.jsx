import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function ProductCard({ product, onView }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addToCart } = useCart();
  const addToast = useToast();

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleOrder = () => {
    if (!selectedSize) {
      addToast("Please select a size", "error");
      return;
    }
    const message = `Hi, I want to order:\n\nProduct ID: ${product.id}\nName: ${product.name}\nSize: ${selectedSize}\nPrice: ₹${product.price}`;
    const url = `https://wa.me/917353364410?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast("Please select a size", "error");
      return;
    }
    addToCart(product, selectedSize);
    addToast(`${product.name} added to cart!`, "success");
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {!imgLoaded && <div className="skeleton product-skeleton" />}
        <img
          src={product.images[0]}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0 }}
        />
        <div className="product-quick-view" onClick={onView}>
          <span>Quick View</span>
        </div>
        {product.badge && (
          <span className={`badge badge-${product.badge}`}>
            {product.badge === "sale" ? `${discount}% OFF` : product.badge === "new" ? "New" : "Hot"}
          </span>
        )}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="sizes">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={selectedSize === size ? "active" : ""}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="price-row">
          <span className="price">₹{product.price}</span>
          {product.originalPrice && (
            <span className="original-price">₹{product.originalPrice}</span>
          )}
        </div>

        <div className="actions">
          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="view-btn" onClick={onView}>
            View
          </button>
        </div>

        <button className="order-btn" onClick={handleOrder}>
          Order on WhatsApp
        </button>
      </div>
    </div>
  );
}
