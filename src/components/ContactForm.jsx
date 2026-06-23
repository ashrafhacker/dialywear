import { useState } from "react";
import { useToast } from "../hooks/useToast";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const addToast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      addToast("Please fill all required fields", "error");
      return;
    }

    setSending(true);

    try {
      const message = `*New Enquiry from DialyWear*\n\nName: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject || "N/A"}\nMessage: ${form.message}`;
      const url = `https://wa.me/917353364410?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

      addToast("Message sent successfully!", "success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      addToast("Failed to send message. Try again.", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name *"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email *"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Your Message *"
        rows="5"
        value={form.message}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send Message"}
      </button>

      <a
        href="https://wa.me/917353364410?text=Hello%20I%20am%20interested%20in%20your%20products"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        Chat on WhatsApp
      </a>
    </form>
  );
}
