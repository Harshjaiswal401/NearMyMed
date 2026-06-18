import { Search } from "lucide-react";

export default function SearchMedicineBar() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 -mt-8 relative z-10">
      <div className="flex items-center gap-3">
        <Search className="text-gray-400" />

        <input
          type="text"
          placeholder="Search medicines..."
          className="w-full outline-none"
        />
      </div>
    </div>
  );
}