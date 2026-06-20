
import Navbar from './Component/Navbar'
import AIAssistant from './pages/AIAssistant'
import FindMedicine from './pages/FindMedicine'
import HealthLibrary from './pages/HealthLibrary'
import NearbyPharmacies from './pages/NearbyPharmacies'
import UploadPrescription from './pages/UploadPrescription'
import OrderMedicines from './pages/OrderMedicines'
// import Emergency from './pages/Emergency'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './Component/LoginForm';
import Home from './pages/Home';
import { useAppContext } from './context/AppContext';
function App() {
  const { showLoginForm, setShowLoginForm } = useAppContext();

  return (
      <div  className='w-screen bg-gray-50 min-h-screen overflow-y-hidden'>
        {showLoginForm && (
        <div className="fixed z-99 inset-0">
        <div onClick={()=>setShowLoginForm(false)} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          
        </div>
         
        <LoginForm />

        </div>
      )}
      <Navbar/>
       
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/find-medicines" element={<FindMedicine />} />
        <Route path="/health-library" element={<HealthLibrary />} />
        <Route path="/upload-prescription" element={<UploadPrescription />} />
        <Route path="/nearby-pharmacies" element={<NearbyPharmacies />} />
        <Route path="/order-medicines" element={<OrderMedicines />} />
        {/* 
        
        <Route path="/emergency" element={<Emergency />} /> */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      

    </div>
    
  );
}

export default App;
