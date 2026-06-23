import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/product";
import { useCart } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";
import ProductCard from "../components/ProductCard";
import "../styles/product-detail.css";

const sizeChart = {
  "36": { chest: "36", length: "26", shoulder: "16" },
  "38": { chest: "38", length: "27", shoulder: "17" },
  "40": { chest: "40", length: "28", shoulder: "18" },
  "42": { chest: "42", length: "28.5", shoulder: "18.5" },
  "44": { chest: "44", length: "29", shoulder: "19" },
  "3XL": { chest: "48", length: "30", shoulder: "20" },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const { addToCart } = useCart();
  const addToast = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className="not-found">
        <h1>Product Not Found</h1>
        <Link to="/">Back to Shop</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast("Please select a size", "error");
      return;
    }
    for (let i = 0; i < qty; i++) {
      addToCart(product, selectedSize);
    }
    addToast(`${product.name} x${qty} added to cart!`, "success");
  };

  const handleOrder = () => {
    if (!selectedSize) {
      addToast("Please select a size", "error");
      return;
    }
    const msg = `Hi, I want to order:\n\nProduct: ${product.name} (${product.id})\nSize: ${selectedSize}\nQty: ${qty}\nPrice: ₹${product.price * qty}`;
    window.open(`https://wa.me/917353364410?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="product-detail-page" key={id}>
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/#products">{product.category}</Link> / <span>{product.name}</span>
      </div>

      <div className="pd-main">
        <div className="pd-gallery">
          <div className="pd-main-img">
            <img src={product.images[activeImg]} alt={product.name} />
            {product.badge && (
              <span className={`badge badge-${product.badge} pd-badge`}>
                {product.badge === "sale" ? `${discount}% OFF` : product.badge === "new" ? "New" : "Hot"}
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="pd-thumbs">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className={activeImg === i ? "active" : ""}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="pd-info">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-price-row">
            <span className="pd-price">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="pd-original">₹{product.originalPrice}</span>
                <span className="pd-discount">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="pd-desc">{product.description}</p>

          <div className="pd-meta">
            <div className="pd-meta-item">
              <span className="pd-meta-label">Fabric</span>
              <span className="pd-meta-value">{product.fabric}</span>
            </div>
            <div className="pd-meta-item">
              <span className="pd-meta-label">Fit</span>
              <span className="pd-meta-value">Regular Fit</span>
            </div>
            <div className="pd-meta-item">
              <span className="pd-meta-label">Sleeves</span>
              <span className="pd-meta-value">
                {product.id.startsWith("ds") || product.id.startsWith("os") ? "Drop Shoulder" :
                 product.id.startsWith("plhs") || product.id.startsWith("TS") ? "Half Sleeves" :
                 product.id.startsWith("fs") ? "Full Sleeves" : "Half Sleeves"}
              </span>
            </div>
          </div>

          <div className="pd-size-section">
            <div className="pd-size-header">
              <h4>Select Size</h4>
              <button className="pd-size-chart-btn" onClick={() => setShowSizeChart(!showSizeChart)}>
                Size Chart ▾
              </button>
            </div>
            <div className="pd-sizes">
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

            {showSizeChart && (
              <div className="pd-size-chart">
                <table>
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Chest (in)</th>
                      <th>Length (in)</th>
                      <th>Shoulder (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((s) => (
                      <tr key={s}>
                        <td><strong>{s}</strong></td>
                        <td>{sizeChart[s]?.chest || "—"}</td>
                        <td>{sizeChart[s]?.length || "—"}</td>
                        <td>{sizeChart[s]?.shoulder || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="pd-qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <button className="pd-add-cart" onClick={handleAddToCart}>
            Add to Cart — ₹{product.price * qty}
          </button>
          <button className="pd-order" onClick={handleOrder}>
            Order on WhatsApp
          </button>

          <div className="pd-highlights">
            <div className="pd-highlight">
              <span>✓</span> Premium Quality
            </div>
            <div className="pd-highlight">
              <span>✓</span> Free Shipping
            </div>
            <div className="pd-highlight">
              <span>✓</span> Easy Returns
            </div>
            <div className="pd-highlight">
              <span>✓</span> Cash on Delivery
            </div>
          </div>
        </div>
      </div>

      <section className="pd-details-section">
        <h2>Product <span className="brand-text">Details</span></h2>
        <div className="pd-details-grid">
          <div className="pd-detail-card">
            <h4>Fabric & Care</h4>
            <ul>
              <li>Made from premium {product.fabric.toLowerCase()} fabric</li>
              <li>Breathable and skin-friendly material</li>
              <li>Machine wash cold with similar colors</li>
              <li>Tumble dry low or hang to dry</li>
              <li>Do not bleach or iron directly on print</li>
            </ul>
          </div>
          <div className="pd-detail-card">
            <h4>Fit & Style</h4>
            <ul>
              <li>Regular fit — true to size</li>
              <li>Designed for everyday comfort</li>
              <li>Modern cut with clean finish</li>
              <li>Pre-shrunk fabric</li>
              <li>Tagless neck label for comfort</li>
            </ul>
          </div>
          <div className="pd-detail-card">
            <h4>Shipping & Returns</h4>
            <ul>
              <li>Free shipping on orders above ₹499</li>
              <li>Delivery within 5-7 business days</li>
              <li>Easy 7-day return policy</li>
              <li>Full refund or exchange available</li>
              <li>Cash on delivery available</li>
            </ul>
          </div>
        </div>
      </section>

      {similarProducts.length > 0 && (
        <section className="pd-similar">
          <h2>More in <span className="brand-text">{product.category}</span></h2>
          <div className="product-grid">
            {similarProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onView={() => window.location.href = `/dialywear/product/${p.id}`}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
