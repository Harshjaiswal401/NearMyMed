import pharmacies from "../data/pharmacies";

import NearbyPharmaciesHeader from "../Component/nearbyPharmacies/NearbyPharmaciesHeader";
import SearchSection from "../Component/nearbyPharmacies/SearchSection";
import FilterChips from "../Component/nearbyPharmacies/FilterChips";
import PharmacyList from "../Component/nearbyPharmacies/PharmacyList";
import MapPanel from "../Component/nearbyPharmacies/MapPanel";
import EmergencyBanner from "../Component/nearbyPharmacies/EmergencyBanner";

export default function NearbyPharmacies() {
  return (
    <div className="bg-slate-50 min-h-screen">

      <div className="max-w-[1600px] mx-auto px-6 py-8">

        <NearbyPharmaciesHeader />

        <SearchSection />

        <FilterChips />

        <div className="grid lg:grid-cols-[1fr_700px] gap-6 mt-6">

          <div>
            <PharmacyList pharmacies={pharmacies} />
            <EmergencyBanner />
          </div>

          <MapPanel />

        </div>

      </div>

    </div>
  );
}