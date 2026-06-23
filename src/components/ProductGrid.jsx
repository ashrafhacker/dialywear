import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import "../styles/products.css";

export default function ProductGrid({ products, filters, search }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const searchTerm = search.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm) ||
        String(p.id).toLowerCase().includes(searchTerm);

      const matchesCategory =
        filters.category.length === 0 ||
        filters.category.includes(p.category);

      const matchesFabric =
        filters.fabric.length === 0 ||
        filters.fabric.includes(p.fabric);

      const matchesSize =
        filters.size.length === 0 ||
        filters.size.some((s) => p.sizes.includes(s));

      const matchesPrice = p.price <= filters.price[1];

      return matchesSearch && matchesCategory && matchesFabric && matchesSize && matchesPrice;
    });

    if (filters.sort === "Price Low to High") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (filters.sort === "Price High to Low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters, search]);

  return (
    <>
      <h1 className="section-title">Explore Collections</h1>

      {filteredProducts.length === 0 ? (
        <p className="no-products">No products found matching your criteria.</p>
      ) : (
        <div id="products" className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
