import PharmacyCard from "./PharmacyCard";

export default function PharmacyList({ pharmacies }) {
  return (
    <div className="space-y-4">
      {pharmacies.map((pharmacy) => (
        <PharmacyCard
          key={pharmacy.id}
          pharmacy={pharmacy}
        />
      ))}
    </div>
  );
}