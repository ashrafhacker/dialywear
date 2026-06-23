import { useState } from "react";
import "../styles/filter.css";

export default function Filter({ filters, setFilters }) {
  const [open, setOpen] = useState(false);

  const toggleMulti = (key, value) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((item) => item !== value)
          : [...prev[key], value],
      };
    });
  };

  const removeFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item !== value),
    }));
  };

  const resetPrice = () => {
    setFilters((prev) => ({
      ...prev,
      price: [300, 1000],
    }));
  };

  return (
    <>
      <button className="filter-btn" onClick={() => setOpen(true)}>
        Filters
      </button>

      {open && <div className="overlay filter-overlay" onClick={() => setOpen(false)} />}

      <aside className={`filter ${open ? "open" : ""}`}>
        <div className="filter-inner">
          <div className="filter-header">
            <h2>Filters</h2>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            {[
              "Round Neck Shirts",
              "Down Shoulder",
              "T Shirts (Collar)",
              "Track Pants",
              "Combos",
            ].sort().map((c) => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={filters.category.includes(c)}
                  onChange={() => toggleMulti("category", c)}
                />
                {c}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Fabric</h4>
            {["Popcorn", "Zebra Jacquard", "Cotton Blend", "Mxeno Lycra Knit", "Popcorn + Mxeno Lycra Knit"].map((t) => (
              <label key={t}>
                <input
                  type="checkbox"
                  checked={filters.fabric.includes(t)}
                  onChange={() => toggleMulti("fabric", t)}
                />
                {t}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Price</h4>
            <input
              type="range"
              min="300"
              max="1000"
              value={filters.price[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  price: [0, Number(e.target.value)],
                }))
              }
            />
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "6px" }}>
              ₹300 - ₹{filters.price[1]}
            </p>
          </div>

          <div className="filter-group">
            <h4>Size</h4>
            <div className="sizes">
              {["36", "38", "40", "42", "44"].map((s) => (
                <button
                  key={s}
                  className={filters.size.includes(s) ? "active" : ""}
                  onClick={() => toggleMulti("size", s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Sort By</h4>
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sort: e.target.value }))
              }
            >
              <option value="">Default</option>
              <option value="Price Low to High">Price Low to High</option>
              <option value="Price High to Low">Price High to Low</option>
            </select>
          </div>

          {(filters.category.length > 0 ||
            filters.fabric.length > 0 ||
            filters.size.length > 0 ||
            filters.price[1] !== 1000) && (
            <div className="active-filters">
              {filters.category.map((c) => (
                <span key={c} onClick={() => removeFilter("category", c)}>
                  {c} ✕
                </span>
              ))}
              {filters.fabric.map((f) => (
                <span key={f} onClick={() => removeFilter("fabric", f)}>
                  {f} ✕
                </span>
              ))}
              {filters.size.map((s) => (
                <span key={s} onClick={() => removeFilter("size", s)}>
                  {s} ✕
                </span>
              ))}
              {filters.price[1] !== 1000 && (
                <span onClick={() => resetPrice()}>
                  Under ₹{filters.price[1]} ✕
                </span>
              )}
            </div>
          )}

          <div className="filter-actions">
            <button
              className="clear"
              onClick={() =>
                setFilters({
                  category: [],
                  fabric: [],
                  size: [],
                  price: [300, 1000],
                  sort: "",
                })
              }
            >
              Clear All
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
