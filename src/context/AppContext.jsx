import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppProvider({ children }) {
  const navigate = useNavigate();

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [currentPage, setCurrentPage] = useState("/");

  function handleNavigation(path) {
    navigate(path);
    setCurrentPage(path);
  }

  return (
    <AppContext.Provider
      value={{
        handleNavigation,
        showLoginForm,
        setShowLoginForm,
        currentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}