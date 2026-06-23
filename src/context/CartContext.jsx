import { createContext, useContext, useReducer, useEffect } from "react";

const STORAGE_KEY = "dialywear_cart";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  badge?: "sale" | "new" | "hot";
  discountPrice?: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
}

interface CartState {
  cart: CartItem[];
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQty: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function cartReducer(state: CartState, action: any): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.cart.find(
        (item) => item.id === action.product.id && item.size === action.size
      );
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === action.product.id && item.size === action.size
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        };
      }
      return {
        cart: [
          ...state.cart,
          {
            id: action.product.id,
            name: action.product.name,
            price: action.product.price,
            image: action.product.images[0],
            size: action.size,
            qty: 1,
          },
        ]
      };
    }
    case "REMOVE_ITEM":
      return {
        cart: state.cart.filter(
          (item) => !(item.id === action.id && item.size === action.size)
        )
      };
    case "UPDATE_QTY":
      return {
        cart: state.cart.map((item) =>
          item.id === action.id && item.size === action.size
            ? { ...item, qty: Math.max(1, action.qty) }
            : item
        )
      };
    case "CLEAR":
      return { cart: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartState, dispatch] = useReducer(cartReducer, { cart: [] }, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState.cart));
  }, [cartState.cart]);

  const addToCart = (product: Product, size: string) => {
    dispatch({ type: "ADD_ITEM", product, size });
  };

  const removeFromCart = (id: string, size: string) => {
    dispatch({ type: "REMOVE_ITEM", id, size });
  };

  const updateQty = (id: string, size: string, qty: number) => {
    dispatch({ type: "UPDATE_QTY", id, size, qty });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const cartCount = cartState.cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartState.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const value: CartContextValue = {
    cart: cartState.cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
