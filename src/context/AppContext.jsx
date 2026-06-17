import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppProvider({ children }) {
  const navigate = useNavigate();

  const [showLoginForm, setShowLoginForm] = useState(false);

  function handleNavigation(path) {
    navigate(path);
  }

  return (
    <AppContext.Provider
      value={{
        handleNavigation,
        showLoginForm,
        setShowLoginForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}