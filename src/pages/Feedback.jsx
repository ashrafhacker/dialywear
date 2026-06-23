import { useState, useRef, useCallback } from "react";
import { products } from "../data/product";
import { useToast } from "../context/ToastContext";
import { getFeedback, saveFeedback } from "../data/feedbackData";
import "../styles/feedback.css";

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="fb-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`fb-star ${star <= (hover || value) ? "active" : ""}`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
          aria-label={`${star} star`}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill={star <= (hover || value) ? "#f5c518" : "none"} stroke="#f5c518" strokeWidth="1.5">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function PhotoUpload({ photos, setPhotos }) {
  const inputRef = useRef(null);

  const handleFiles = useCallback((files) => {
    const valid = [];
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) continue;
      if (!file.type.startsWith("image/")) continue;
      valid.push(file);
    }
    if (valid.length + photos.length > 6) valid.length = 6 - photos.length;

    valid.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotos((prev) => [...prev, { data: e.target.result, name: file.name }]);
      };
      reader.readAsDataURL(file);
    });
  }, [photos.length, setPhotos]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    handleFiles([...e.dataTransfer.files]);
  }, [handleFiles]);

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fb-photo-section">
      <label className="fb-label">Photos (optional, max 6)</label>
      <div
        className={`fb-dropzone ${photos.length > 0 ? "has-photos" : ""}`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
      >
        {photos.length === 0 ? (
          <div className="fb-dropzone-empty">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
            <p>Drop images here or click to browse</p>
            <span>JPG, PNG, WEBP — max 5MB each</span>
          </div>
        ) : (
          <div className="fb-photo-grid" onClick={(e) => e.stopPropagation()}>
            {photos.map((ph, i) => (
              <div key={i} className="fb-photo-thumb">
                <img src={ph.data} alt="" />
                <button
                  type="button"
                  className="fb-photo-remove"
                  onClick={() => removePhoto(i)}
                >
                  ✕
                </button>
              </div>
            ))}
            {photos.length < 6 && (
              <button
                type="button"
                className="fb-photo-add"
                onClick={() => inputRef.current?.click()}
              >
                +
              </button>
            )}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => { handleFiles([...e.target.files]); e.target.value = ""; }}
        />
      </div>
    </div>
  );
}

function FeedbackCard({ entry }) {
  const initials = entry.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="fbc-card">
      <div className="fbc-header">
        <div className="fbc-avatar">{initials}</div>
        <div>
          <h4>{entry.name}</h4>
          <span className="fbc-meta">{entry.place} · {new Date(entry.date).toLocaleDateString()}</span>
        </div>
        <div className="fbc-rating">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < entry.rating ? "#f5c518" : "none"} stroke="#f5c518" strokeWidth="1.5">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          ))}
        </div>
      </div>
      {entry.product && <span className="fbc-product">Product: {entry.product}</span>}
      <p className="fbc-text">{entry.feedback}</p>
      {entry.photos && entry.photos.length > 0 && (
        <div className="fbc-photos">
          {entry.photos.map((ph, i) => (
            <img key={i} src={ph.data} alt="" />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Feedback() {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", place: "", product: "", feedback: "" });
  const [feedbackList, setFeedbackList] = useState(() => getFeedback());
  const [sending, setSending] = useState(false);
  const addToast = useToast();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.feedback) {
      addToast("Please fill in your name and feedback", "error");
      return;
    }
    if (rating === 0) {
      addToast("Please give a star rating", "error");
      return;
    }

    const entry = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      place: form.place,
      product: form.product,
      feedback: form.feedback,
      rating,
      photos,
      date: new Date().toISOString(),
    };

    setSending(true);
    try {
      // Save locally
      saveFeedback(entry);
      setFeedbackList(getFeedback());

      // Send via WhatsApp
      const msg = [
        `*New Feedback – DialyWear*`,
        `Name: ${form.name}`,
        `Email: ${form.email || "—"}`,
        `Phone: ${form.phone || "—"}`,
        `Place: ${form.place || "—"}`,
        `Product: ${form.product || "—"}`,
        `Rating: ${"★".repeat(rating)}${"☆".repeat(5 - rating)}`,
        `Feedback: ${form.feedback}`,
        `Photos: ${photos.length > 0 ? `${photos.length} attached` : "None"}`,
      ].join("\n");

      window.open(`https://wa.me/917353364410?text=${encodeURIComponent(msg)}`, "_blank");

      addToast("Feedback submitted! Thank you.", "success");
      setStep(3);
      setForm({ name: "", email: "", phone: "", place: "", product: "", feedback: "" });
      setRating(0);
      setPhotos([]);
    } catch {
      addToast("Something went wrong. Please try again.", "error");
    } finally {
      setSending(false);
    }
  };

  const allProducts = [{ id: "", name: "General Feedback" }, ...products];

  return (
    <div className="feedback-page">
      {/* Hero */}
      <section className="fb-hero">
        <div className="fb-hero-content">
          <span className="section-label">Share Your Experience</span>
          <h1>We Value Your <span className="brand-text">Feedback</span></h1>
          <p>Your honest opinion helps us improve and serve you better.</p>
        </div>
      </section>

      {/* Form */}
      <section className="fb-form-section">
        <div className="fb-form-card">
          <div className="fb-steps">
            <div className={`fb-step ${step >= 1 ? "active" : ""}`}>
              <span className="fb-step-num">1</span> Rate
            </div>
            <div className="fb-step-line" />
            <div className={`fb-step ${step >= 2 ? "active" : ""}`}>
              <span className="fb-step-num">2</span> Write
            </div>
            <div className="fb-step-line" />
            <div className={`fb-step ${step >= 3 ? "active" : ""}`}>
              <span className="fb-step-num">3</span> Done
            </div>
          </div>

          {step === 1 && (
            <div className="fb-step-content">
              <h3>How was your experience?</h3>
              <StarRating value={rating} onChange={setRating} />
              <div className="fb-rating-labels">
                <span>Terrible</span>
                <span>Poor</span>
                <span>Okay</span>
                <span>Good</span>
                <span>Amazing</span>
              </div>
              <button className="fb-btn" disabled={rating === 0} onClick={() => setStep(2)}>
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <form className="fb-form" onSubmit={handleSubmit}>
              <h3>Share your thoughts</h3>
              <div className="fb-form-row">
                <input
                  name="name"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="fb-form-row">
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                />
                <input
                  name="place"
                  placeholder="City / Location"
                  value={form.place}
                  onChange={handleChange}
                />
              </div>
              <select name="product" value={form.product} onChange={handleChange}>
                {allProducts.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              <textarea
                name="feedback"
                placeholder="Write your feedback *"
                rows="4"
                value={form.feedback}
                onChange={handleChange}
                required
              />
              <PhotoUpload photos={photos} setPhotos={setPhotos} />
              <div className="fb-rating-display">
                Rating: {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < rating ? "#f5c518" : "none"} stroke="#f5c518" strokeWidth="1.5" style={{ verticalAlign: "middle" }}>
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <div className="fb-form-actions">
                <button type="button" className="fb-btn fb-btn-ghost" onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="fb-btn" disabled={sending}>
                  {sending ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="fb-step-content fb-done">
              <div className="fb-done-icon">✓</div>
              <h3>Thank You!</h3>
              <p>Your feedback means the world to us.</p>
              <button className="fb-btn" onClick={() => { setStep(1); setRating(0); }}>
                Submit Another
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Recent Feedback */}
      {feedbackList.length > 0 && (
        <section className="fb-recent">
          <h2>Recent <span className="brand-text">Feedback</span></h2>
          <div className="fbc-grid">
            {feedbackList.slice(0, 12).map((entry) => (
              <FeedbackCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
