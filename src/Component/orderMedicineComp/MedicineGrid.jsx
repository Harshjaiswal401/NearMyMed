import { medicines } from "../../data/medicines";
import MedicineCard from "./MedicineCard";

export default function MedicineGrid() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
        />
      ))}
    </div>
  );
}