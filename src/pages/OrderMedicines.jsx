import MedicineGrid from "../Component/orderMedicineComp/MedicineGrid";
import OrderHero from "../Component/orderMedicineComp/OrderHero";
import SearchMedicineBar from "../Component/orderMedicineComp/SearchMedicineBar";
import QuickCategories from "../Component/orderMedicineComp/QuickCategories";
import DeliveryBanner from "../Component/orderMedicineComp/DeliveryBanner";
import TrustSection from "../Component/orderMedicineComp/TrustSection";
import CartSummary from "../Component/orderMedicineComp/CartSummary";
import SavingsCard from "../Component/orderMedicineComp/SavingsCard";
import RecommendedMedicines from "../Component/orderMedicineComp/RecommendedMedicines";
import RefillCard from "../Component/orderMedicineComp/RefillCard";
import EmergencyOrderBanner from "../Component/orderMedicineComp/EmergencyOrderBanner";

const OrderMedicines = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      
      <OrderHero />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <SearchMedicineBar />

        <QuickCategories />

        <DeliveryBanner />

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          
          <div className="lg:col-span-2 space-y-6">
            <MedicineGrid />
            <RecommendedMedicines />
            <TrustSection />
            <RefillCard />
            <EmergencyOrderBanner />
          </div>

          <div>
            <div className="sticky top-24 space-y-4">
              <SavingsCard />
              <CartSummary />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default OrderMedicines;