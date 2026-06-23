import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import "../styles/navbar.css";

interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
  onCartClick: () => void;
  isOnline?: boolean;
}

export default function Navbar({ search, setSearch, onCartClick, isOnline }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  const handleClose = () => setMenuOpen(false);

  // Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstallClick = () => {
    setShowInstallPrompt(false);
  };

  return (
    <nav className="navbar">
      {menuOpen && <div className="overlay" onClick={handleClose} />}

      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img src="https://raw.githubusercontent.com/ashrafhacker/dialywear/main/public/logo.png" alt="DialyWear" className="nav-logo-img" />
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

      {showInstallPrompt && (
        <div className="install-prompt" style={{
          position: 'fixed',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #FFD54F, #f5a623)',
          color: '#000',
          padding: '12px 24px',
          borderRadius: '8px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          margin: '0 auto',
          width: 'fit-content',
          maxWidth: '90%'
        }}>
          <span style={{ fontWeight: '600' }}>Install DialyWear for better mobile experience</span>
          <button 
            onClick={handleInstallClick}
            style={{
              background: '#000',
              color: '#fff',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Install
          </button>
        </div>
      )}
    </nav>
  );
}
