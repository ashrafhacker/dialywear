import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const STORAGE_KEY = "dialywear_cart";

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find(
        (item) => item.id === action.product.id && item.size === action.size
      );
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id && item.size === action.size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [
        ...state,
        {
          id: action.product.id,
          name: action.product.name,
          price: action.product.price,
          image: action.product.images[0],
          size: action.size,
          qty: 1,
        },
      ];
    }
    case "REMOVE_ITEM":
      return state.filter(
        (item) => !(item.id === action.id && item.size === action.size)
      );
    case "UPDATE_QTY":
      return state.map((item) =>
        item.id === action.id && item.size === action.size
          ? { ...item, qty: Math.max(1, action.qty) }
          : item
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size) => {
    dispatch({ type: "ADD_ITEM", product, size });
  };

  const removeFromCart = (id, size) => {
    dispatch({ type: "REMOVE_ITEM", id, size });
  };

  const updateQty = (id, size, qty) => {
    dispatch({ type: "UPDATE_QTY", id, size, qty });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
