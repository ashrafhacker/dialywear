import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ search, setSearch, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const handleClose = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {menuOpen && <div className="overlay" onClick={handleClose} />}

      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="DialyWear" className="nav-logo-img" />
          </Link>
        </div>

        <div className="nav-center">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search products..."
              className="search-bar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={`nav-right ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={handleClose}>Home</Link>
          <Link to="/categories" onClick={handleClose}>Categories</Link>
          <Link to="/fabric" onClick={handleClose}>Fabric</Link>
          <Link to="/testimonials" onClick={handleClose}>Testimonials</Link>
          <Link to="/about" onClick={handleClose}>About</Link>
          <Link to="/contact" onClick={handleClose}>Contact</Link>
          <div className="nav-cart-desktop">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button className="cart-btn" onClick={onCartClick} aria-label="Open cart">
              <span className="cart-icon">🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        <div className="nav-mobile-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button className="cart-btn" onClick={onCartClick} aria-label="Open cart">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
}
