import { useState } from "react";
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

function App() {
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <BrowserRouter basename="/dialywear">
      <Navbar search={search} setSearch={setSearch} onCartClick={() => setCartOpen(true)} />
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
    </BrowserRouter>
  );
}

export default App;
