import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AppProvider from './Context/AppContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <App className="w-screen min-h-screen overflow-x-hidden" />
    </AppProvider>
    
  </BrowserRouter>
)
