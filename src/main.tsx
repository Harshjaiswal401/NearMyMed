import 'leaflet/dist/leaflet.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { FirebaseProvider } from "./context/FirebaseContext";

createRoot(document.getElementById("root")!).render(
  <FirebaseProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </FirebaseProvider>
);
