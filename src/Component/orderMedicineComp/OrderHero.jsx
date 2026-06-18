import { Upload } from "lucide-react";

export default function OrderHero() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-500">
      <div className="max-w-7xl mx-auto px-4 py-16 text-white">
        <h1 className="text-5xl font-bold">
          Order Medicines Online
        </h1>

        <p className="mt-4 text-lg text-green-100">
          Find medicines from nearby pharmacies and get them delivered.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold">
            Search Medicines
          </button>

          <button className="border border-white px-6 py-3 rounded-xl flex items-center gap-2">
            <Upload size={18} />
            Upload Prescription
          </button>
        </div>
      </div>
    </div>
  );
}