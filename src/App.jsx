
import Navbar from './Component/Navbar'
import AIAssistant from './pages/AIAssistant'
import FindMedicine from './pages/FindMedicine'
import HealthLibrary from './pages/HealthLibrary'
import NearbyPharmacies from './pages/NearbyPharmacies'
import UploadPrescription from './pages/UploadPrescription'
// import Emergency from './pages/Emergency'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';

function App() {
  
  return (
    <div className='w-screen bg-gray-50 min-h-screen'>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/find-medicines" element={<FindMedicine />} />
        <Route path="/health-library" element={<HealthLibrary />} />
        <Route path="/upload-prescription" element={<UploadPrescription />} />
        <Route path="/nearby-pharmacies" element={<NearbyPharmacies />} />
        {/* 
        
        <Route path="/emergency" element={<Emergency />} /> */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    
    </div>
    
  );
}

export default App;