export default function EmergencyBanner() {
  return (
    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mt-6 flex justify-between items-center">

      <div>
        <h3 className="font-bold text-red-600">
          Need Medicines Urgently?
        </h3>

        <p className="text-gray-600">
          Find 24-hour pharmacies available right now.
        </p>
      </div>

      <button className="bg-red-500 text-white px-6 py-3 rounded-xl">
        Find Emergency Pharmacies
      </button>

    </div>
  );
}