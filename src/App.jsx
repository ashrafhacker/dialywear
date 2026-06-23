import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import Shop from "./layout/Shop";
import Footer from "./components/Footer";
import CategoriesPage from "./pages/CategoriesPage";
import Fabric from "./pages/Fabric";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Testimonials from "./pages/testimonials";
import ProductDetail from "./pages/ProductDetail";
import Feedback from "./pages/Feedback";
import CartDrawer from "./components/CartDrawer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import BackToTop from "./components/BackToTop";
import { pwaManifest } from "./pwa-manifest";

interface AppState {
  search: string;
  cartOpen: boolean;
  isOnline: boolean;
  showInstallPrompt: boolean;
}

function App() {
  const [search, setSearch] = useState<AppState["search"]>("");
  const [cartOpen, setCartOpen] = useState<AppState["cartOpen"]>(false);
  const [isOnline, setIsOnline] = useState<AppState["isOnline"]>(navigator.onLine);
  const [showInstallPrompt, setShowInstallPrompt] = useState<AppState["showInstallPrompt"]>(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
    // Implement PWA install logic here
    setShowInstallPrompt(false);
  };

  return (
    <BrowserRouter basename="/dialywear">
      <Navbar 
        search={search} 
        setSearch={setSearch} 
        onCartClick={() => setCartOpen(true)}
        isOnline={isOnline}
      />
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
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
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
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <Shop search={search} />
            <Footer />
          </>
        } />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/fabric" element={<Fabric />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WhatsAppFloat />
      <BackToTop />
      {!isOnline && (
        <div className="offline-banner" style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#ff6b6b',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <span>⚠️ You are offline. Some features may not work.</span>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
