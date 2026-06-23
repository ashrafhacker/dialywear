import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        zIndex: 999,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "#FFD54F",
        color: "#1A1A1A",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
