import React, { useState } from "react";
import {
  Search,
  HeartPulse,
  Pill,
  Activity,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Brain,
  Apple,
  Stethoscope,
} from "lucide-react";

export default function HealthLibrary() {
  const [search, setSearch] = useState("");

  const libraryData = [
    {
      title: "Diabetes",
      type: "Disease",
      icon: HeartPulse,
      description: "Learn symptoms, causes, treatment and prevention.",
    },
    {
      title: "Hypertension",
      type: "Disease",
      icon: HeartPulse,
      description: "Understand high blood pressure and heart health.",
    },
    {
      title: "Asthma",
      type: "Disease",
      icon: Stethoscope,
      description: "Breathing condition affecting airways.",
    },
    {
      title: "Paracetamol",
      type: "Medicine",
      icon: Pill,
      description: "Used for fever and mild pain relief.",
    },
    {
      title: "Ibuprofen",
      type: "Medicine",
      icon: Pill,
      description: "Anti-inflammatory pain relief medicine.",
    },
    {
      title: "Headache",
      type: "Symptom",
      icon: Activity,
      description: "Common symptom with various causes.",
    },
    {
      title: "Fever",
      type: "Symptom",
      icon: Activity,
      description: "Body temperature higher than normal.",
    },
    {
      title: "Mental Wellness",
      type: "Health Guide",
      icon: Brain,
      description: "Tips for managing stress and anxiety.",
    },
    {
      title: "Healthy Nutrition",
      type: "Nutrition",
      icon: Apple,
      description: "Balanced diet and healthy lifestyle guidance.",
    },
  ];

  const filteredData = libraryData.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase())
  );

  const trending = [
    "Diabetes",
    "Fever",
    "Migraine",
    "Vitamin D",
    "Asthma",
    "Blood Pressure",
  ];

  const featuredArticles = [
    {
      title: "Understanding Diabetes",
      description:
        "Everything you need to know about symptoms, causes and management.",
    },
    {
      title: "Heart Health Guide",
      description:
        "Protect your heart with healthy habits and regular monitoring.",
    },
    {
      title: "Mental Wellness",
      description:
        "Simple ways to improve focus, mood and emotional health.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#86efac,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#bbf7d0,transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full font-medium mb-6">
              <ShieldCheck size={16} />
              Trusted Medical Knowledge
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900">
              Health
              <span className="text-emerald-600"> Library</span>
            </h1>

            <p className="max-w-3xl mx-auto text-slate-600 text-lg mt-6">
              Explore trusted information about diseases, medicines,
              symptoms, wellness and preventive healthcare.
            </p>

            <div className="mt-10 max-w-2xl mx-auto relative">
              <Search
                size={22}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search diseases, medicines, symptoms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/90 backdrop-blur-xl border border-emerald-200 rounded-2xl py-4 pl-14 pr-4 shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-200"
              />
            </div>

            <div className="flex justify-center flex-wrap gap-3 mt-8">
              {trending.map((item) => (
                <button
                  key={item}
                  className="px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm font-medium hover:bg-emerald-50 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ["500+", "Articles"],
            ["200+", "Medicines"],
            ["100+", "Conditions"],
            ["24/7", "Health Access"],
          ].map(([num, label]) => (
            <div
              key={label}
              className="bg-white rounded-3xl p-6 shadow-md border border-emerald-100 text-center"
            >
              <h3 className="text-3xl font-bold text-emerald-600">{num}</h3>
              <p className="text-slate-600 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Browse Categories
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">
          {[
            { name: "Diseases", icon: HeartPulse },
            { name: "Medicines", icon: Pill },
            { name: "Symptoms", icon: Activity },
            { name: "Nutrition", icon: Apple },
            { name: "Mental Health", icon: Brain },
            { name: "Health Guides", icon: BookOpen },
          ].map((cat) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.name}
                className="bg-white rounded-3xl p-6 border border-emerald-100 shadow hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                <Icon className="text-emerald-600 mb-4" size={34} />
                <h3 className="font-semibold">{cat.name}</h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="text-emerald-600" />
          <h2 className="text-3xl font-bold">Featured Articles</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <div
              key={article.title}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">
                {article.title}
              </h3>

              <p className="text-emerald-50 mb-6">
                {article.description}
              </p>

              <button className="flex items-center gap-2 font-semibold">
                Read Article
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* HEALTH LIBRARY ITEMS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Health Resources
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-6 shadow-md border border-emerald-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-5">
                  <Icon size={28} className="text-emerald-600" />
                </div>

                <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                  {item.type}
                </span>

                <h3 className="text-xl font-bold mt-4 text-slate-900">
                  {item.title}
                </h3>

                <p className="text-slate-600 mt-3">
                  {item.description}
                </p>

                <button className="mt-5 flex items-center gap-2 text-emerald-600 font-semibold">
                  View Details
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-[32px] p-10 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Stay Informed. Stay Healthy.
          </h2>

          <p className="max-w-2xl mx-auto text-emerald-100">
            Access reliable health information anytime and make better
            healthcare decisions with Near My Med.
          </p>

          <button className="mt-6 px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:scale-105 transition">
            Explore More
          </button>
        </div>
      </section>
    </div>
  );
}