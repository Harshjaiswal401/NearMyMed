import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLoginForm, setShowLoginForm] = useState(false);
  // Sync currentPage with the actual browser URL so direct navigation
  // (back/forward, deep links) also updates the active nav indicator.
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const [cart, setCart] = useState([]);

  // ── Location & Search state ───────────────────────────────────────────
  const [selectedLocation, setSelectedLocation] = useState("Bhopal");
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  function handleNavigation(path) {
    navigate(path);
    setCurrentPage(path);
  }

  const addToCart = (medicine) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === medicine.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        handleNavigation,
        showLoginForm,
        setShowLoginForm,
        currentPage,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        // Location
        selectedLocation,
        setSelectedLocation,
        // Global Search
        globalSearchQuery,
        setGlobalSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}