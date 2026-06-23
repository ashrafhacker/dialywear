import "../pages/about.css";

export default function About() {
  return (
    <div className="about-page">

      {/* 1. HERO */}
      <section className="about-hero">
        <div className="hero-content">
                <img src="/logo.png" alt="Brand Logo" className="hero-logo" />
          <h1>Crafting Style. Defining Identity.</h1>
          <p>More than clothing — it's a statement of who you are.</p>
        </div>
      </section>

      {/* 2. BRAND STORY */}
      <section className="about-section story">
        <div className="about-container">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Born from a passion for modern fashion, our brand was created to redefine everyday wear.
              We believe clothing should not just look good, but feel effortless and expressive.
            </p>
          </div>
          <div className="about-image">
            <img src="logo.png" alt="Brand Story" />
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="about-section mission">
        <div className="mission-grid">
          <div className="card">
            <h3>Our Mission</h3>
            <p>To deliver premium clothing that blends comfort, style, and confidence.</p>
          </div>
          <div className="card">
            <h3>Our Vision</h3>
            <p>To become a leading modern fashion brand recognized for quality and innovation.</p>
          </div>
        </div>
      </section>

      {/* 4. USP */}
      <section className="about-section usp">
        <h2>What Makes Us Different</h2>
        <div className="usp-grid">
          <div className="usp-card">Premium Fabrics</div>
          <div className="usp-card">Modern Design</div>
          <div className="usp-card">Perfect Fit</div>
          <div className="usp-card">Quality Craftsmanship</div>
        </div>
      </section>


      {/* 6. FOUNDER */}
      <section className="about-section founder">
        <div className="founder-card">
          <img src="/fabricpics/fpic.jpeg" alt="Founder" />
          <h3>Mohammed Nawaz</h3>
          <p>"We believe fashion should empower individuality."</p>
        </div>
      </section>

      {/* 7. VALUES */}
      <section className="about-section values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div>Quality First</div>
          <div>Transparency</div>
          <div>Sustainability</div>
          <div>Customer Focus</div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="about-cta">
        <h2>Discover Your Style</h2>
        <button onClick={() => window.location.href = "/dialywear/#products"}>
          Shop Now
        </button>
      </section>

    </div>
  );
}