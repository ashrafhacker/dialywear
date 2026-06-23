import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import "../styles/footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const addToast = useToast();

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      addToast("Please enter a valid email", "error");
      return;
    }
    addToast("Subscribed successfully!", "success");
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h2 className="logo-text">DialyWear</h2>
          <p>Premium clothing designed for modern lifestyles.</p>
        </div>

        <div className="footer-col">
          <h4>Social Media</h4>
          <ul>
            <li><a href="https://www.instagram.com/dailywearindia" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://wa.me/917353364410" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/feedback">Give Feedback</Link></li>
            <li>FAQs</li>
            <li>Shipping &amp; Returns</li>
            <li>Order Tracking</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>DialyWear</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li>Privacy Policy</li>
            <li>Terms &amp; Conditions</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Subscribe</h4>
          <div className="newsletter">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe}>Subscribe</button>
          </div>
          <div className="socials">
            <a href="https://www.instagram.com/dailywearindia" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} DialyWear. All rights reserved.</p>
        <div className="payments">
          <span>Visa</span>
          <span>MasterCard</span>
          <span>UPI</span>
        </div>
      </div>
    </footer>
  );
}
