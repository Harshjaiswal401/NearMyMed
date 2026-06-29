import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import medicines from "../data/medicines";
import {
  Pill,
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Info,
  ShoppingCart,
  Plus,
  Minus,
  Sparkles,
  Check,
  X,
  AlertCircle
} from "lucide-react";

export default function OrderMedicinesPage() {
  const { cart, addToCart, updateQuantity: updateCartQuantity } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [sortBy, setSortBy] = useState("relevance");
  const [toastMessage, setToastMessage] = useState(null);
  
  // Read search query from URL parameter `?search=...`
  const searchQuery = searchParams.get("search") || "";

  // Get unique categories for sidebar filters
  const categoriesList = useMemo(() => {
    return Array.from(new Set(medicines.map((m) => m.category)));
  }, []);

  // Sync category state with search query or page load
  // If search query is actually a category name, select it
  useEffect(() => {
    if (searchQuery) {
      const matchedCategory = categoriesList.find(
        (c) => c.toLowerCase() === searchQuery.toLowerCase()
      );
      if (matchedCategory && !selectedCategories.includes(matchedCategory)) {
        setSelectedCategories([matchedCategory]);
      }
    }
  }, [searchQuery, categoriesList]);

  // Handle Category filter toggle
  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Toast helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filter & Sort medicines
  const filteredMedicines = useMemo(() => {
    let result = [...medicines];

    // 1. Filter by global search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.brandName.toLowerCase().includes(q) ||
          m.saltComposition.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.manufacturer.toLowerCase().includes(q)
      );
    }

    // 2. Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((m) => selectedCategories.includes(m.category));
    }

    // 3. Filter by price
    result = result.filter((m) => m.discountedPrice <= maxPrice);

    // 4. Sort results
    if (sortBy === "price-low") {
      result.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (sortBy === "discount") {
      result.sort((a, b) => {
        const discountA = ((a.price - a.discountedPrice) / a.price) * 100;
        const discountB = ((b.price - b.discountedPrice) / b.price) * 100;
        return discountB - discountA;
      });
    } else if (sortBy === "name-az") {
      result.sort((a, b) => a.brandName.localeCompare(b.brandName));
    }

    return result;
  }, [searchQuery, selectedCategories, maxPrice, sortBy]);

  // Clear all filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(3500);
    setSortBy("relevance");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-emerald-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-700/50 animate-bounce">
          <Check className="text-emerald-400 shrink-0" size={18} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Hero Banner Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white py-12 px-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500 opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-teal-400 opacity-5 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-700/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-600/30">
              <Sparkles size={12} />
              100% Genuine Indian Medicines
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              NearMyMed E-Pharmacy
            </h1>
            <p className="text-emerald-100/90 text-sm md:text-base max-w-lg">
              Order online from certified local pharmacies at discounted prices with fast door-to-door delivery.
            </p>
          </div>
          <div className="flex gap-4 self-stretch md:self-auto items-stretch">
            <div className="bg-emerald-700/30 backdrop-blur-sm border border-emerald-600/30 p-4 rounded-2xl flex flex-col justify-center flex-1 md:flex-none text-center">
              <span className="text-2xl font-bold text-emerald-300">100%</span>
              <span className="text-[10px] text-emerald-100/80 mt-0.5">Quality Assured</span>
            </div>
            <div className="bg-emerald-700/30 backdrop-blur-sm border border-emerald-600/30 p-4 rounded-2xl flex flex-col justify-center flex-1 md:flex-none text-center">
              <span className="text-2xl font-bold text-emerald-300">Save up to 20%</span>
              <span className="text-[10px] text-emerald-100/80 mt-0.5">On top brands</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* ────────────────── Left Sidebar Filters ────────────────── */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 sticky top-24">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Filter size={18} className="text-emerald-600" />
                  Filters
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-slate-400 hover:text-emerald-600 transition"
                >
                  Reset All
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">
                  Categories
                </h4>
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {categoriesList.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer text-slate-600 hover:text-slate-900 transition text-sm group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4.5 w-4.5 cursor-pointer"
                      />
                      <span className="font-medium group-hover:translate-x-0.5 transition-transform duration-150">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3 border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">
                    Price Range
                  </h4>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Under ₹{maxPrice}
                  </span>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="15"
                    max="3500"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                    <span>₹15</span>
                    <span>₹1,500</span>
                    <span>₹3,500</span>
                  </div>
                </div>
              </div>

              {/* Safety banner */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-600 font-semibold text-xs">
                  <AlertCircle size={14} className="shrink-0" />
                  Prescription Notice
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Medicines tagged with <span className="bg-rose-50 text-rose-600 px-1 rounded font-medium">Rx</span> require a valid doctor's prescription upload before checking out.
                </p>
              </div>

            </div>
          </div>

          {/* ────────────────── Right Main Grid ────────────────── */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Catalog Info & Sorting Header */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="space-y-1 text-center sm:text-left self-stretch sm:self-auto">
                <h2 className="text-xl font-bold text-slate-800">
                  {searchQuery ? "Search Results" : "All Medicines"}
                </h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-slate-500">
                  <span>Showing {filteredMedicines.length} products</span>
                  {searchQuery && (
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      Query: "{searchQuery}"
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.delete("search");
                          setSearchParams(params);
                        }}
                        className="hover:text-rose-500 font-bold ml-0.5 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sorting & Filter Actions */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-slate-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
                    Sort By:
                  </span>
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold rounded-2xl px-4 py-2.5 pr-8 focus:outline-none cursor-pointer transition"
                  >
                    <option value="relevance">Popularity / Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Biggest Savings</option>
                    <option value="name-az">Brand Name: A to Z</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                </div>
              </div>

            </div>

            {/* Empty State */}
            {filteredMedicines.length === 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm py-16 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <Pill size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  No matching medicines found
                </h3>
                <p className="text-slate-500 text-sm mt-2 max-w-sm">
                  We couldn't find any products fitting your search or selected filters. Try broadening your criteria.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Medicines Cards Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredMedicines.map((med) => {
                // Find item in cart to show quantity controls if already added
                const cartItem = cart?.find((item) => item.id === med.id);
                const discountPercentage = Math.round(((med.price - med.discountedPrice) / med.price) * 100);

                return (
                  <div
                    key={med.id}
                    className="bg-white border border-slate-200 hover:border-emerald-200 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                  >
                    {/* Prescription Badge */}
                    <div className="absolute top-4 left-4 z-10 flex gap-1.5">
                      {med.prescriptionRequired ? (
                        <span className="bg-rose-50 text-rose-600 border border-rose-100 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
                          Rx
                        </span>
                      ) : (
                        <span className="bg-slate-50 text-slate-500 border border-slate-100 text-[10px] font-semibold px-2 py-0.5 rounded-lg">
                          OTC
                        </span>
                      )}
                      {discountPercentage > 0 && (
                        <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                          {discountPercentage}% OFF
                        </span>
                      )}
                    </div>

                    {/* Stock Status Badge */}
                    {!med.inStock && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    {/* Medicine Visual Box */}
                    <div className="h-36 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:scale-102 transition-transform duration-300 mb-4 shrink-0 relative overflow-hidden mt-2">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-slate-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Pill size={40} className="text-slate-300 group-hover:text-emerald-500 transition-colors duration-300" />
                    </div>

                    {/* Info */}
                    <div className="space-y-1.5 flex-1 flex flex-col justify-between mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                          {med.manufacturer}
                        </span>
                        <h4 className="font-bold text-slate-800 text-base leading-snug group-hover:text-emerald-700 transition-colors mt-0.5">
                          {med.brandName}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5" title={med.saltComposition}>
                          {med.saltComposition}
                        </p>
                        <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-md mt-2">
                          {med.category}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="pt-3 border-t border-slate-50 mt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-extrabold text-emerald-600">
                            ₹{med.discountedPrice.toFixed(2)}
                          </span>
                          {med.price > med.discountedPrice && (
                            <span className="text-xs font-semibold text-slate-400 line-through">
                              ₹{med.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-1 shrink-0">
                      {!med.inStock ? (
                        <button
                          disabled
                          className="w-full py-2.5 bg-slate-100 border border-slate-200 text-slate-400 font-semibold text-sm rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          Out of Stock
                        </button>
                      ) : cartItem ? (
                        <div className="flex items-center justify-between border border-emerald-200 rounded-xl bg-emerald-50/50 p-1">
                          <button
                            onClick={() => updateCartQuantity(med.id, cartItem.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm transition active:scale-90"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-sm text-emerald-800">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(med.id, cartItem.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm transition active:scale-90"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            addToCart(med);
                            showToast(`Added ${med.brandName} to your cart.`);
                          }}
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/10 active:scale-98"
                        >
                          <ShoppingCart size={15} />
                          Add to Cart
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
