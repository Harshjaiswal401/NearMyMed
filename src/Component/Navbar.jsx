import {
  Search,
  MapPin,
  Smartphone,
  ShieldAlert,
  Pill,
  Store,
  Upload,
  Bot,
  BookOpen,
  ChevronDown,
  House,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useAppContext } from "../context/AppContext.jsx";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { INDIAN_CITIES, SEARCH_MOCK_DATA } from "../data/locationData.js";
import medicinesData from "../data/medicines.js";

import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const {
    handleNavigation,
    setShowLoginForm,
    currentPage,
    selectedLocation,
    setSelectedLocation,
  } = useAppContext();

  const { cart, cartItemCount, setIsCartDrawerOpen } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Location dropdown ──────────────────────────────────────────────────
  const [locationOpen, setLocationOpen] = useState(false);
  const locationRef = useRef(null);

  // ── Search ─────────────────────────────────────────────────────────────
  const [searchValue, setSearchValue] = useState("");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const searchRef = useRef(null);

// Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setLocationOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Compute search suggestions
  const query = searchValue.trim().toLowerCase();
  const filtered = {
    medicines: query
      ? medicinesData
          .filter(
            (m) =>
              m.brandName.toLowerCase().includes(query) ||
              m.saltComposition.toLowerCase().includes(query)
          )
          .map((m) => ({ name: m.brandName, category: m.category, icon: "💊" }))
          .slice(0, 3)
      : medicinesData
          .map((m) => ({ name: m.brandName, category: m.category, icon: "💊" }))
          .slice(0, 3),
    diseases: query
      ? SEARCH_MOCK_DATA.diseases.filter((d) => d.name.toLowerCase().includes(query)).slice(0, 2)
      : SEARCH_MOCK_DATA.diseases.slice(0, 2),
    pharmacies: query
      ? SEARCH_MOCK_DATA.pharmacies.filter((p) => p.name.toLowerCase().includes(query)).slice(0, 2)
      : SEARCH_MOCK_DATA.pharmacies.slice(0, 2),
  };
  const hasResults = filtered.medicines.length + filtered.diseases.length + filtered.pharmacies.length > 0;

  const handleSearchSubmit = (val) => {
    const q = (val || searchValue).trim();
    if (!q) return;
    setSearchDropdownOpen(false);
    navigate(`/order-medicines?search=${encodeURIComponent(q)}`);
    setSearchValue("");
  };

  const navItems = [
    { path: "/", label: "Home", icon: House },
    { path: "/find-medicines", label: "Find Medicines", icon: Pill },
    { path: "/nearby-pharmacies", label: "Nearby Pharmacies", icon: Store },
    { path: "/upload-prescription", label: "Upload Prescription", icon: Upload },
    { path: "/order-medicines", label: "Order Medicines", icon: ShoppingCart },
    { path: "/ai-assistant", label: "AI Assistant", icon: Bot },
    { path: "/health-library", label: "Health Library", icon: BookOpen },
  ];

  const handleNav = (path) => {
    handleNavigation(path);
    setMobileMenuOpen(false);
  };

  const selectedCityLabel = INDIAN_CITIES.find((c) => c.value === selectedLocation)?.label ?? selectedLocation;

  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
      {/* Top Navbar */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => handleNav("/")}
        >
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
            <img
              src={logo}
              alt="NearMyMed Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <h2 className="text-xl font-bold leading-none">
              Near<span className="text-emerald-600">MyMed</span>
            </h2>
          </div>
        </div>

        {/* ── Location Dropdown ───────────────────────────────────────── */}
        <div ref={locationRef} className="hidden lg:block relative shrink-0">
          <button
            onClick={() => setLocationOpen((o) => !o)}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-2xl bg-white hover:border-emerald-300 transition cursor-pointer"
          >
            <MapPin size={16} className="text-emerald-600" />
            <span className="font-medium text-slate-700 text-sm max-w-[110px] truncate">
              {selectedCityLabel}
            </span>
            <ChevronDown
              size={14}
              className={`text-slate-500 transition-transform duration-200 ${locationOpen ? "rotate-180" : ""}`}
            />
          </button>

          {locationOpen && (
            <div className="absolute top-full mt-2 left-0 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Select City
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto py-1">
                {INDIAN_CITIES.map((city) => (
                  <button
                    key={city.value}
                    onClick={() => {
                      setSelectedLocation(city.value);
                      setLocationOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                      selectedLocation === city.value
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <MapPin size={13} className={selectedLocation === city.value ? "text-emerald-600" : "text-slate-400"} />
                    {city.label}
                    {selectedLocation === city.value && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Smart Search Bar ────────────────────────────────────────── */}
        <div ref={searchRef} className="flex-1 relative">
          <div className="flex items-center border border-slate-200 rounded-2xl px-4 py-2.5 bg-white shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-500 transition">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setSearchDropdownOpen(true);
              }}
              onFocus={() => setSearchDropdownOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit();
                if (e.key === "Escape") setSearchDropdownOpen(false);
              }}
              placeholder="Search medicines, diseases, or pharmacy..."
              className="flex-1 px-3 bg-transparent outline-none text-slate-700 text-sm"
            />
            {searchValue && (
              <button
                onClick={() => { setSearchValue(""); setSearchDropdownOpen(false); }}
                className="text-slate-400 hover:text-slate-600 shrink-0"
              >
                <X size={14} />
              </button>
            )}
            <button
              onClick={() => handleSearchSubmit()}
              className="hidden md:flex ml-2 px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition shrink-0"
            >
              Search
            </button>
          </div>

          {/* Smart Dropdown */}
          {searchDropdownOpen && hasResults && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden">
              {/* Medicines */}
              {filtered.medicines.length > 0 && (
                <div>
                  <div className="px-4 py-2 border-b border-slate-50 bg-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span>💊</span> Medicines
                    </p>
                  </div>
                  {filtered.medicines.map((med) => (
                    <button
                      key={med.name}
                      onMouseDown={() => handleSearchSubmit(med.name)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50 transition text-left group"
                    >
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-sm shrink-0">
                        {med.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 group-hover:text-emerald-700">{med.name}</p>
                        <p className="text-xs text-slate-400">{med.category}</p>
                      </div>
                      <Search size={12} className="ml-auto text-slate-300 group-hover:text-emerald-400" />
                    </button>
                  ))}
                </div>
              )}

              {/* Diseases */}
              {filtered.diseases.length > 0 && (
                <div className="border-t border-slate-100">
                  <div className="px-4 py-2 border-b border-slate-50 bg-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span>🩺</span> Diseases / Symptoms
                    </p>
                  </div>
                  {filtered.diseases.map((d) => (
                    <button
                      key={d.name}
                      onMouseDown={() => handleSearchSubmit(d.name)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition text-left group"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm shrink-0">
                        {d.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 group-hover:text-blue-700">{d.name}</p>
                        <p className="text-xs text-slate-400">{d.desc}</p>
                      </div>
                      <Search size={12} className="ml-auto text-slate-300 group-hover:text-blue-400" />
                    </button>
                  ))}
                </div>
              )}

              {/* Pharmacies */}
              {filtered.pharmacies.length > 0 && (
                <div className="border-t border-slate-100">
                  <div className="px-4 py-2 border-b border-slate-50 bg-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span>🏥</span> Pharmacies
                    </p>
                  </div>
                  {filtered.pharmacies.map((ph) => (
                    <button
                      key={ph.name}
                      onMouseDown={() => handleSearchSubmit(ph.name)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-violet-50 transition text-left group"
                    >
                      <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center text-sm shrink-0">
                        {ph.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 group-hover:text-violet-700">{ph.name}</p>
                        <p className="text-xs text-slate-400">{ph.desc}</p>
                      </div>
                      <Search size={12} className="ml-auto text-slate-300 group-hover:text-violet-400" />
                    </button>
                  ))}
                </div>
              )}

              {/* View all results */}
              <div className="border-t border-slate-100 px-4 py-2.5 bg-slate-50">
                <button
                  onMouseDown={() => handleSearchSubmit()}
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition"
                >
                  <Search size={12} />
                  {searchValue ? `Search all results for "${searchValue}"` : "Browse all categories"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Download App — hidden on small */}
        <button className="hidden xl:flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition font-medium text-sm shrink-0">
          <Smartphone size={16} />
          Download App
        </button>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 bg-white transition shrink-0 cursor-pointer"
          aria-label="View Cart"
        >
          <ShoppingCart size={18} />
          {cartItemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center bg-emerald-500 text-white text-[10px] font-bold h-5.5 w-5.5 rounded-full ring-2 ring-white animate-pulse">
              {cartItemCount}
            </span>
          )}
        </button>

        {/* Login */}
        <button
          className="hidden sm:block px-4 py-2.5 rounded-xl border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-600 hover:text-white transition text-sm shrink-0"
          onClick={() => setShowLoginForm(true)}
        >
          Login / Sign Up
        </button>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg border border-slate-200 text-slate-700"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Bottom Menu */}
      <div className="hidden md:block border-t border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center gap-8 text-sm font-medium overflow-x-auto scrollbar-hide">
            {navItems.map(({ path, label, icon: Icon }) => (
              <div key={path} className="group relative py-3.5 shrink-0">
                <button
                  onClick={() => handleNav(path)}
                  className={`flex items-center gap-1.5 transition ${
                    currentPage === path
                      ? "text-emerald-600"
                      : "text-slate-700"
                  } hover:text-emerald-600`}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                  {label === "Order Medicines" && cartItemCount > 0 && (
                    <span className="inline-flex items-center justify-center bg-emerald-600 text-white text-[10px] font-bold h-4 w-4 rounded-full ml-1 shrink-0 animate-pulse">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <div
                  className={`absolute bottom-0 left-0 h-[3px] bg-emerald-600 rounded-full transition-all duration-300 group-hover:w-full ${
                    currentPage === path ? "w-full" : "w-0"
                  }`}
                />
              </div>
            ))}

            {/* Emergency — pushed to right */}
            <div className="group relative py-3.5 ml-auto shrink-0">
              <button
                onClick={() => handleNav("/emergency")}
                className={`flex items-center gap-1.5 font-semibold transition ${
                  currentPage === "/emergency"
                    ? "text-red-500"
                    : "text-slate-700"
                } hover:text-red-600`}
              >
                <ShieldAlert size={15} />
                Emergency
              </button>
              <div
                className={`absolute bottom-0 left-0 h-[3px] bg-red-500 rounded-full transition-all duration-300 group-hover:w-full ${
                  currentPage === "/emergency" ? "w-full" : "w-0"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-lg">
          {/* Mobile Location Selector */}
          <div className="px-4 pt-3">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">
              Your Location
            </label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none"
              >
                {INDIAN_CITIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="px-4 py-3 space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <button
                key={path}
                onClick={() => handleNav(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  currentPage === path
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} />
                <span className="flex-1 text-left">{label}</span>
                {label === "Order Medicines" && cartItemCount > 0 && (
                  <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => handleNav("/emergency")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                currentPage === "/emergency"
                  ? "bg-red-50 text-red-600"
                  : "text-slate-700 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <ShieldAlert size={18} />
              Emergency
            </button>
            <div className="pt-2 pb-1">
              <button
                onClick={() => { setShowLoginForm(true); setMobileMenuOpen(false); }}
                className="w-full px-4 py-3 rounded-xl border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-600 hover:text-white transition text-sm"
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}