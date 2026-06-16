import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchSection() {
  return (
    <div className="grid grid-cols-12 gap-3 mt-8">
      <div className="col-span-6 relative">
        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          className="w-full border rounded-xl py-3 pl-11"
          placeholder="Search pharmacy..."
        />
      </div>

      <select className="col-span-3 border rounded-xl px-4">
        <option>Within 2 km</option>
      </select>

      <button className="col-span-3 border rounded-xl flex items-center justify-center gap-2">
        <SlidersHorizontal size={18} />
        Filters
      </button>
    </div>
  );
}