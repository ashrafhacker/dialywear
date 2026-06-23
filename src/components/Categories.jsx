import { useRef, useEffect } from "react";
import "../styles/categories.css";

const categories = [
  {
    name: "Half Sleeves T Shirt",
    tagline: "Elevate your everyday style",
    image: "/cat/hs.png",
  },
  {
    name: "Full sleeves T Shirt",
    tagline: "Modern elegance redefined",
    image: "/cat/fs.png",
  },
  {
    name: "Round Neck T Shirt",
    tagline: "Comfort meets style",
    image: "/cat/rn.png",
  },
  {
    name: "Round Neck Drop Shoulder",
    tagline: "Complete your look",
    image: "/cat/ds.png",
  },
  {
    name: "Over Size",
    tagline: "Step into confidence",
    image: "/cat/os.png",
  },
  {
    name: "Track Pants",
    tagline: "Fresh drops just for you",
    image: "/cat/tp.png",
  },
];

export default function FeaturedCategories() {
  const scrollRef = useRef();

  // AUTO SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      const container = scrollRef.current;

      if (!container) return;

      const maxScrollLeft =
        container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 3000); // every 3s

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="featured-categories">
      <div className="fc-header">
        <span className="section-label">Categories</span>
        <h2>Explore <span className="brand-text">Collections</span></h2>
      </div>

      {/* Scroll Buttons */}
      <button className="fc-scroll-btn left" onClick={() => scroll("left")}>
        &#10094;
      </button>
      <button className="fc-scroll-btn right" onClick={() => scroll("right")}>
        &#10095;
      </button>

      {/* Scroll Container */}
      <div className="fc-container" ref={scrollRef}>
        {categories.map((cat, index) => (
          <div className="fc-card" key={index}>
            <img src={cat.image} alt={cat.name} />

            <div className="fc-overlay">
              <h3>{cat.name}</h3>
              <p>{cat.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}