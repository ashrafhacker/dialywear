import { useCart } from "../context/CartContext";
import "../styles/cart.css";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, updateQty, cartTotal } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const items = cart
      .map(
        (item) =>
          `${item.name} (Size: ${item.size}) x${item.qty} - ₹${item.price * item.qty}`
      )
      .join("\n");

    const message = `Hi, I want to order:\n\n${items}\n\nTotal: ₹${cartTotal}`;
    const url = `https://wa.me/917353364410?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className={`cart-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <div className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart ({cart.length})</h2>
          <button className="cart-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div className="cart-item" key={`${item.id}-${item.size}-${idx}`}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-meta">Size: {item.size}</p>
                  <p className="cart-item-price">₹{item.price}</p>
                  <div className="cart-item-actions">
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                    >
                      −
                    </button>
                    <span className="cart-qty">{item.qty}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                    >
                      +
                    </button>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Order on WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
