import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { featuredProducts } from "../data/product";

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="section">
      <div className="fc-header" style={{ marginBottom: "32px" }}>
        <span className="section-label">Featured</span>
        <h2 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1px" }}>
          Trending <span className="brand-text">Now</span>
        </h2>
      </div>

      <div className="product-grid">
        {featuredProducts.slice(0, 6).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
