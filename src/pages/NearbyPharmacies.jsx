import { useState, useMemo } from "react";
import pharmacies from "../data/pharmacies";
import PharmacyCard from "../Component/nearbyPharmacies/PharmacyCard";
import EmergencyBanner from "../Component/nearbyPharmacies/EmergencyBanner";
import { Search, SlidersHorizontal, MapPin, Store, Clock, Star, X, ChevronDown } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { INDIAN_CITIES } from "../data/locationData";

const PAGE_SIZE = 12;

export default function NearbyPharmacies() {
  const { selectedLocation } = useAppContext();
  const cityLabel = INDIAN_CITIES.find((c) => c.value === selectedLocation)?.label ?? selectedLocation;

  // City-filtered base list — recomputed when selectedLocation changes
  const cityPharmacies = useMemo(
    () => pharmacies.filter((p) => p.city === selectedLocation),
    [selectedLocation]
  );

  // Derived AREAS from city-filtered list
  const AREAS = useMemo(
    () => ["All Areas", ...Array.from(new Set(cityPharmacies.map((p) => p.area))).sort()],
    [cityPharmacies]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState("distance");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Reset area filter and page when the user switches city
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => {
    setSelectedArea("All Areas");
    setPage(1);
  }, [selectedLocation]);

  const FILTER_CHIPS = [
    { key: "open", label: "Open Now", icon: "🟢" },
    { key: "24h", label: "24 Hours", icon: "🌙" },
    { key: "delivery", label: "Home Delivery", icon: "🚚" },
    { key: "consult", label: "Online Consult", icon: "💬" },
    { key: "generic", label: "Generic / Jan Aushadhi", icon: "🌿" },
    { key: "hospital", label: "Hospital Pharmacy", icon: "🏥" },
    { key: "4plus", label: "4+ Rating", icon: "⭐" },
  ];

  const toggleFilter = (key) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...cityPharmacies];

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Area filter
    if (selectedArea !== "All Areas") {
      list = list.filter((p) => p.area === selectedArea);
    }

    // Tag / boolean filters
    if (activeFilters.includes("open"))     list = list.filter((p) => p.isOpen);
    if (activeFilters.includes("24h"))      list = list.filter((p) => p.is24Hours);
    if (activeFilters.includes("delivery")) list = list.filter((p) => p.hasDelivery);
    if (activeFilters.includes("consult"))  list = list.filter((p) => p.hasOnlineConsult);
    if (activeFilters.includes("4plus"))    list = list.filter((p) => p.rating >= 4);
    if (activeFilters.includes("generic"))  list = list.filter((p) => p.tags.some((t) => t.toLowerCase().includes("generic") || t.toLowerCase().includes("jan")));
    if (activeFilters.includes("hospital")) list = list.filter((p) => p.tags.some((t) => t.toLowerCase().includes("hospital")));

    // Sort
    if (sortBy === "distance") list.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "reviews") list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [searchQuery, selectedArea, activeFilters, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openCount = filtered.filter((p) => p.isOpen).length;
  const avgRating = filtered.length
    ? (filtered.reduce((s, p) => s + p.rating, 0) / filtered.length).toFixed(1)
    : "—";

  const clearAll = () => {
    setSearchQuery("");
    setSelectedArea("All Areas");
    setActiveFilters([]);
    setSortBy("distance");
    setPage(1);
  };

  const hasAnyFilter = searchQuery || selectedArea !== "All Areas" || activeFilters.length > 0;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-emerald-500 rounded-full" />
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">{cityLabel}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Nearby Pharmacies</h1>
          <p className="text-slate-500 mt-1 text-sm">
            {cityPharmacies.length} verified pharmacies across {selectedLocation} — find the nearest open one.
          </p>
        </div>

        {/* ── Stats Bar ──────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: Store, label: "Total Found", value: filtered.length, color: "text-emerald-600", bg: "bg-emerald-50" },
            { icon: Clock, label: "Open Now", value: openCount, color: "text-green-600", bg: "bg-green-50" },
            { icon: Star, label: "Avg Rating", value: avgRating, color: "text-amber-500", bg: "bg-amber-50" },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon size={20} className={color} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Search + Controls ──────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                placeholder="Search pharmacy name, area, or service..."
                className="w-full pl-9 pr-9 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Area dropdown */}
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                value={selectedArea}
                onChange={(e) => { setSelectedArea(e.target.value); setPage(1); }}
                className="pl-8 pr-8 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none dark:bg-gray-800 dark:text-white dark:border-gray-600 min-w-[160px]"
              >
                {AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-8 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
              >
                <option value="distance">Sort: Nearest</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="reviews">Sort: Most Reviewed</option>
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters((s) => !s)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition ${showFilters ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-200 text-slate-700 hover:border-emerald-400"}`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilters.length > 0 && (
                <span className="bg-white text-emerald-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* Filter chips */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="flex flex-wrap gap-2">
                {FILTER_CHIPS.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => toggleFilter(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                      activeFilters.includes(key)
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400"
                    }`}
                  >
                    <span>{icon}</span>
                    {label}
                  </button>
                ))}
                {hasAnyFilter && (
                  <button onClick={clearAll} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition">
                    <X size={12} /> Clear All
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Active filter pills ────────────────────────────── */}
        {hasAnyFilter && (
          <div className="flex flex-wrap gap-2 mb-4 text-xs">
            {searchQuery && (
              <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full">
                🔍 "{searchQuery}"
                <button onClick={() => setSearchQuery("")}><X size={11} /></button>
              </span>
            )}
            {selectedArea !== "All Areas" && (
              <span className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full">
                📍 {selectedArea}
                <button onClick={() => setSelectedArea("All Areas")}><X size={11} /></button>
              </span>
            )}
            {activeFilters.map((f) => {
              const chip = FILTER_CHIPS.find((c) => c.key === f);
              return chip ? (
                <span key={f} className="flex items-center gap-1 bg-violet-50 border border-violet-200 text-violet-700 px-3 py-1 rounded-full">
                  {chip.icon} {chip.label}
                  <button onClick={() => toggleFilter(f)}><X size={11} /></button>
                </span>
              ) : null;
            })}
            <span className="text-slate-400 flex items-center">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        )}

        {/* ── Results ────────────────────────────────────────── */}
        {paginated.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-semibold text-slate-700 text-lg">No pharmacies found</h3>
            <p className="text-slate-400 text-sm mt-2">Try a different search or remove some filters.</p>
            <button onClick={clearAll} className="mt-4 px-5 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginated.map((pharmacy) => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            ))}
          </div>
        )}

        {/* ── Pagination ─────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ← Prev
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let p;
                if (totalPages <= 7) p = i + 1;
                else if (page <= 4) p = i + 1;
                else if (page >= totalPages - 3) p = totalPages - 6 + i;
                else p = page - 3 + i;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition ${page === p ? "bg-emerald-600 text-white" : "border border-slate-200 text-slate-600 hover:border-emerald-400"}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        )}

        <div className="mt-6">
          <EmergencyBanner />
        </div>

      </div>
    </div>
  );
}