export default function EmergencyOrderBanner() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-3xl p-6 mt-6">
      <h2 className="text-red-600 text-xl font-bold">
        🚨 Emergency Medicine Needed?
      </h2>

      <p className="mt-2 text-gray-600">
        Find the nearest open pharmacy instantly.
      </p>

      <button className="mt-4 bg-red-500 text-white px-5 py-2 rounded-xl">
        Find Nearby Pharmacy
      </button>
    </div>
  );
}