import Navbar from './Component/Navbar';
import AIAssistant from './pages/AIAssistant';
import FindMedicine from './pages/FindMedicine';
import HealthLibrary from './pages/HealthLibrary';
import NearbyPharmacies from './pages/NearbyPharmacies';
import UploadPrescriptionPage from './pages/UploadPrescriptionPage';
import OrderMedicinesPage from './pages/OrderMedicinesPage';
import Emergency from './pages/Emergency';
import Payment from './pages/Payment';
import { Routes, Route } from "react-router-dom";
import LoginForm from './Component/LoginForm';
import Home from './pages/Home';
import { useAppContext } from './context/AppContext';
import NotFound from './pages/NotFound';
import CartDrawer from './Component/CartDrawer';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

function App() {
  const { showLoginForm, setShowLoginForm } = useAppContext();

  return (
    <div className='w-screen bg-gray-50 min-h-screen overflow-x-hidden relative'>
      {showLoginForm && (
        <div className="fixed z-[99] inset-0">
          <div
            onClick={() => setShowLoginForm(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          />
          <LoginForm />
        </div>
      )}
      
      {/* Global Shopping Cart Drawer */}
      <CartDrawer />
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/find-medicines" element={<FindMedicine />} />
        <Route path="/health-library" element={<HealthLibrary />} />
        <Route path="/upload-prescription" element={<UploadPrescriptionPage />} />
        <Route path="/nearby-pharmacies" element={<NearbyPharmacies />} />
        <Route path="/order-medicines" element={<OrderMedicinesPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;