import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/product";
import { useLocation } from "react-router-dom";

export default function Shop({ search }) {
  const [filters, setFilters] = useState({
    category: [],
    fabric: [],
    size: [],
    price: [300, 1000],
    sort: "",
  });

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    if (category) {
      setFilters((prev) => ({
        ...prev,
        category: [category],
      }));
      setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [location.search]);

  return (
    <div className="shop-page">
      <Filter filters={filters} setFilters={setFilters} />
      <div className="shop-content">
        <ProductGrid
          products={products}
          filters={filters}
          search={search}
        />
      </div>
    </div>
  );
}
