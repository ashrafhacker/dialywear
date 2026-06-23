import { useEffect, useState } from "react";
import "../styles/hero.css";

const slides = [
  {
    desktop: "/hero/ls2.png",
    mobile: "/hero/pr1.png",
    title: ['Elevate Your Style with ', 'DialyWear'],
    subtitle: "Discover timeless pieces crafted for modern living",
    cta: "Shop Now",
  },
  {
    desktop: "/hero/ls3.png",
    mobile: "/hero/pr2.png",
    title: ['New Season ', 'Arrivals'],
    subtitle: "Fresh fits designed to stand out effortlessly",
    cta: "Explore Collection",
  },
  {
    desktop: "/hero/ls1.png",
    mobile: "/hero/pr3.png",
    title: ['Minimal. Modern. ', 'You.'],
    subtitle: "Where simplicity meets sophistication",
    cta: "Discover More",
  },
  {
    desktop: "/hero/ls4.png",
    mobile: "/hero/pr4.png",
    title: ['Effortless ', 'Everyday'],
    subtitle: "Style that moves with you",
    cta: "Explore Now",
  },
  {
    desktop: "/hero/ls6.png",
    mobile: "/hero/pr5.png",
    title: ['Own Your ', 'Moment'],
    subtitle: "Smart, breathable and made for your lifestyle",
    cta: "Discover Now",
  },
  {
    desktop: "/hero/ls5.png",
    mobile: "/hero/pr6.png",
    title: ['Redefining Casual ', 'Luxury'],
    subtitle: "Soft tones, bold presence",
    cta: "Explore Collection",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const handleScrollToProducts = () => {
    const section = document.getElementById("products");
    if (!section) return;
    const y = section.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="hero">
      {slides.map((slide, index) => {
        const bgImage = isMobile ? slide.mobile : slide.desktop;
        return (
          <div
            key={index}
            className={`hero-slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="overlay" />
            <div className="hero-content">
              <h1>
                {slide.title[0]}
                <span className="highlight">{slide.title[1]}</span>
              </h1>
              <p>{slide.subtitle}</p>
              <button onClick={handleScrollToProducts}>{slide.cta}</button>
            </div>
          </div>
        );
      })}

      <button className="arrow left" onClick={prevSlide} aria-label="Previous slide">
        ‹
      </button>
      <button className="arrow right" onClick={nextSlide} aria-label="Next slide">
        ›
      </button>

      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === current ? "active" : ""}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
}
