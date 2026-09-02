import { Link } from "react-router-dom";
import { articles } from "../data/articles";
import logo from "../assets/logo.png";
import bgImage from "../assets/near-my-med-bg.jpeg";
import {
  Search,
  Upload,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";
export default function Home() {
  return (
    <div>
      {/* HeroSection */}
    <section className="w-full px-6 py-8">
      <div className="relative min-h-120 overflow-hidden rounded-[40px]  bg-slate-50">

        {/* Right Side Image */}
        <div className="absolute right-0 top-0 h-full w-[48%] rounded-l-[60px] overflow-hidden">
          <img
            src={bgImage}
            alt="Medicine Search"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-gray-50 via-gray-100/85 to-transparent"></div>

        {/* Content */}
        <div className="w-full relative z-10 flex items-center h-full min-h-120 ">

          <div className="w-[60%] px-2">

            {/* Heading */}
            <h1 className="mt-8 text-6xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-slate-900">
              Find Medicines
              <span className="text-emerald-600"> Near You.</span>
            </h1>

            <h2 className="mt-2 text-6xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-slate-900">
              Know Before You Go.
            </h2>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-md leading-relaxed w-3/4 font-bold text-gray-400">
              Search medicines, compare stock availability in nearby
              pharmacies, upload prescriptions and get AI-powered
              healthcare assistance instantly.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-10">

              <button className="px-8 py-4 rounded-2xl bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-700 transition-all duration-300">
                Search Medicines
              </button>

              <button className="px-8 py-4 rounded-2xl bg-white border border-slate-300 text-slate-700 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300">
                Upload Prescription
              </button>

            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-8 mt-12 text-gray-400 font-medium">

              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>Real-Time Availability</span>
              </div>

              <div className="flex items-center gap-2">
                <span>🏥</span>
                <span>Trusted Pharmacies</span>
              </div>

              <div className="flex items-center gap-2">
                <span>🤖</span>
                <span>AI Powered</span>
              </div>

              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span>Secure & Reliable</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>

      
      {/* Stats Section */}
      <section className="w-full px-6 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4">

            <div className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                📦
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  15L+
                </h3>
                <p className="text-sm text-slate-500">
                  Medicines Indexed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 border-l border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                🏥
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  60K+
                </h3>
                <p className="text-sm text-slate-500">
                  Partner Pharmacies
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 border-l border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
                🔍
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  2Cr+
                </h3>
                <p className="text-sm text-slate-500">
                  Searches
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 border-l border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                👥
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  1.2M+
                </h3>
                <p className="text-sm text-slate-500">
                  Active Users
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>



      <section className="w-full mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-6">

          <div className="group bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all">
            <Search className="text-emerald-600 mb-5" size={32} />
            <h3 className="font-semibold text-xl mb-2">
              Search Medicine
            </h3>
            <p className="text-slate-500 text-sm">
              Find medicine availability in nearby pharmacies.
            </p>

            <ArrowRight
              className="mt-6 text-emerald-600 group-hover:translate-x-2 transition"
              size={18}
            />
          </div>

          <div className="group bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all">
            <Upload className="text-violet-600 mb-5" size={32} />
            <h3 className="font-semibold text-xl mb-2">
              Upload Prescription
            </h3>
            <p className="text-slate-500 text-sm">
              AI extracts medicines and checks availability.
            </p>

            <ArrowRight
              className="mt-6 text-violet-600 group-hover:translate-x-2 transition"
              size={18}
            />
          </div>

          <div className="group bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all">
            <MapPin className="text-blue-600 mb-5" size={32} />
            <h3 className="font-semibold text-xl mb-2">
              Find Pharmacies
            </h3>
            <p className="text-slate-500 text-sm">
              Compare nearby pharmacies and prices.
            </p>

            <ArrowRight
              className="mt-6 text-blue-600 group-hover:translate-x-2 transition"
              size={18}
            />
          </div>

          <div className="group bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all">
            <Sparkles className="text-orange-500 mb-5" size={32} />
            <h3 className="font-semibold text-xl mb-2">
              AI Assistant
            </h3>
            <p className="text-slate-500 text-sm">
              Ask medicine related questions instantly.
            </p>

            <ArrowRight
              className="mt-6 text-orange-500 group-hover:translate-x-2 transition"
              size={18}
            />
          </div>

        </div>
      </section>
{/* Cards Section */}
      
      {/* AI Assistant Section */}

{/* Articles */}
<section className="w-[90%] mx-auto overflow-hidden">

  {/* Heading */}
  <div className="flex items-center justify-between mb-8 px-2">
    <div>
      <h2 className="text-3xl font-bold text-slate-900">
        Health & Wellness Articles
      </h2>

      <p className="text-slate-500 mt-2">
        Stay informed with expert health insights and medicine guides.
      </p>
    </div>
  </div>

  {/* Scroll Area */}
  <div className="relative overflow-hidden">

    {/* Left Fade */}
    <div className="absolute left-0 top-0 z-10 h-full w-36
      bg-gradient-to-r from-gray-50 to-transparent
      pointer-events-none"
    />

    {/* Right Fade */}
    <div className="absolute right-0 top-0 z-10 h-full w-36
      bg-gradient-to-l from-gray-50 to-transparent
      pointer-events-none"
    />

    {/* Article Track */}
    <div className="article-track gap-6">

      {[...articles, ...articles].map((article, index) => (

        <Link
          to={`/article/${article.id}`}
          key={index}
          className="block"
        >

          {/* CARD */}
<div
  className="
    group
    w-80
    h-[620px]
    shrink-0
    rounded-3xl
    overflow-hidden
    flex
    flex-col

    bg-white
    border
    border-slate-200

    text-slate-900

    shadow-[0_8px_30px_rgba(15,23,42,0.08)]
    hover:shadow-[0_20px_45px_rgba(37,99,235,0.16)]
    hover:-translate-y-2

    transition-all
    duration-300
  "
>
  
  {/* IMAGE */}
  <div className="relative h-48 shrink-0 overflow-hidden">

    <img
      src={article.image}
      alt={article.title}
      className="
        w-full
        h-full
        object-cover
        transition-transform
        duration-500
        group-hover:scale-105
      "
    />

    {/* Image overlay */}
    <div
      className="
        absolute inset-0
        bg-gradient-to-t
        from-slate-950/50
        via-transparent
        to-transparent
      "
    />

    {/* Category */}
    <span
      className="
        absolute
        top-4
        left-4

        text-xs
        font-semibold

        bg-white/90
        backdrop-blur-md

        text-blue-700

        px-3
        py-1.5

        rounded-full

        shadow-sm
      "
    >
      {article.category}
    </span>

  </div>


  {/* CONTENT */}
  <div className="p-5 flex flex-col flex-1">

    {/* Accent */}
    <div
      className="
        w-10
        h-1
        rounded-full

        bg-gradient-to-r
        from-yellow-400
        to-green-500

        mb-4
      "
    />

    {/* Title */}
    <h3
      className="
        font-bold
        text-xl
        leading-snug

        text-slate-900

        group-hover:text-green-600
        transition-colors
        duration-300
      "
    >
      {article.title}
    </h3>


    {/* Description */}
    <p
      className="
        text-slate-500
        text-sm
        leading-relaxed

        mt-3

        line-clamp-5
      "
    >
      {article.description}
    </p>


    {/* Author */}
    <div className="flex items-center gap-3 mt-5">

      {/* Avatar */}
      <div
        className="
          w-9
          h-9
          rounded-full

          bg-green-100
          border
          border-green-200

          flex
          items-center
          justify-center

          text-sm
          font-bold
          text-green-600

          shrink-0
        "
      >
        {article.author?.charAt(0)?.toUpperCase()}
      </div>

      <div>
        <p className="text-xs text-slate-400">
          Written by
        </p>

        <p className="text-sm font-semibold text-slate-700">
          {article.author}
        </p>
      </div>

    </div>


    {/* Bottom */}
    <div
      className="
        mt-auto
        pt-5

        flex
        items-center
        justify-between

        border-t
        border-slate-100
      "
    >

      <span className="text-sm text-slate-400">
        {article.readTime}
      </span>


      {/* Arrow */}
      <span
        className="
          w-9
          h-9
          rounded-full

          bg-slate-50
          border
          border-slate-200

          flex
          items-center
          justify-center

          text-lg
          text-slate-500

          group-hover:bg-green-600
          group-hover:text-white
          group-hover:border-green-600

          transition-all
          duration-300
        "
      >
        →
      </span>

    </div>

  </div>

</div>

        </Link>

      ))}

    </div>

  </div>

</section>

      <section className="w-[90%] mx-auto mt-20">
  <div className="text-center mb-12 ">

    <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
      Trusted by Thousands
    </span>

    <h2 className="text-4xl font-bold text-slate-900 mt-4">
      What People Say About NearMyMed
    </h2>

    <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
      Helping users locate medicines, compare pharmacies and get
      instant AI-powered assistance.
    </p>

  </div>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-300">

      <div className="text-yellow-400 text-xl">
        ★★★★★
      </div>

      <p className="text-slate-600 mt-4">
        Found Dolo 650 in less than 2 minutes.
        The pharmacy locator saved me a lot of time.
      </p>

      <div className="mt-6">
        <h4 className="font-semibold text-slate-900">
          Rahul Sharma
        </h4>
        <p className="text-sm text-slate-500">
          Verified User
        </p>
      </div>

    </div>

    <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-300">

      <div className="text-yellow-400 text-xl">
        ★★★★★
      </div>

      <p className="text-slate-600 mt-4">
        Uploading prescriptions is extremely easy.
        The AI assistant answered all my questions.
      </p>

      <div className="mt-6">
        <h4 className="font-semibold text-slate-900">
          Priya Verma
        </h4>
        <p className="text-sm text-slate-500">
          Verified User
        </p>
      </div>

    </div>

    <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-300">

      <div className="text-yellow-400 text-xl">
        ★★★★★
      </div>

      <p className="text-slate-600 mt-4">
        Real-time inventory helped me find
        medicines that were unavailable elsewhere.
      </p>

      <div className="mt-6">
        <h4 className="font-semibold text-slate-900">
          Amit Singh
        </h4>
        <p className="text-sm text-slate-500">
          Verified User
        </p>
      </div>

    </div>

  </div>

</section>

<footer className="bg-gray-200 border-t border-slate-200 mt-24">

  <div className="max-w-7xl mx-auto px-6 py-16">

    <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12">

      {/* Brand */}
      <div>

      <div className="flex items-center gap-3">

          <div className="w-14 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
            <img
            src={logo}
            alt="NearMyMed Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Near<span className="text-emerald-600">MyMed</span>
          </h2>
        </div>

    </div>

        <p className="mt-5 text-slate-500 leading-7">
          Helping users find medicines nearby, compare
          pharmacy availability, upload prescriptions and
          access AI-powered healthcare assistance.
        </p>

        <div className="flex gap-3 mt-6">

          <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 transition">
            F
          </button>

          <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 transition">
            I
          </button>

          <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 transition">
            X
          </button>

          <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 transition">
            in
          </button>

        </div>

      </div>

      {/* Know Us */}
      <div>

        <h3 className="font-semibold text-slate-900 text-lg mb-5">
          Know Us
        </h3>

        <ul className="space-y-3 text-slate-500">

          <li className="hover:text-emerald-600 cursor-pointer">About Us</li>
          <li className="hover:text-emerald-600 cursor-pointer">Contact Us</li>
          <li className="hover:text-emerald-600 cursor-pointer">Press Coverage</li>
          <li className="hover:text-emerald-600 cursor-pointer">Careers</li>
          <li className="hover:text-emerald-600 cursor-pointer">Business Partnership</li>
          <li className="hover:text-emerald-600 cursor-pointer">Become a Health Partner</li>
          <li className="hover:text-emerald-600 cursor-pointer">Corporate Governance</li>

        </ul>

      </div>

      {/* Our Services */}
      <div>

        <h3 className="font-semibold text-slate-900 text-lg mb-5">
          Our Services
        </h3>

        <ul className="space-y-3 text-slate-500">

          <li className="hover:text-emerald-600 cursor-pointer">Search Medicines</li>
          <li className="hover:text-emerald-600 cursor-pointer">Nearby Pharmacies</li>
          <li className="hover:text-emerald-600 cursor-pointer">Medicine Availability</li>
          <li className="hover:text-emerald-600 cursor-pointer">Upload Prescription</li>
          <li className="hover:text-emerald-600 cursor-pointer">AI Medicine Assistant</li>
          <li className="hover:text-emerald-600 cursor-pointer">Emergency Services</li>
          <li className="hover:text-emerald-600 cursor-pointer">Health Articles</li>

        </ul>

      </div>

      {/* Policies */}
      <div>

        <h3 className="font-semibold text-slate-900 text-lg mb-5">
          Our Policies
        </h3>

        <ul className="space-y-3 text-slate-500">

          <li className="hover:text-emerald-600 cursor-pointer">Privacy Policy</li>
          <li className="hover:text-emerald-600 cursor-pointer">Terms & Conditions</li>
          <li className="hover:text-emerald-600 cursor-pointer">Editorial Policy</li>
          <li className="hover:text-emerald-600 cursor-pointer">Return Policy</li>
          <li className="hover:text-emerald-600 cursor-pointer">IP Policy</li>
          <li className="hover:text-emerald-600 cursor-pointer">Grievance Redressal Policy</li>
          <li className="hover:text-emerald-600 cursor-pointer">Fake Jobs & Fraud Disclaimer</li>

        </ul>

      </div>

      {/* Connect With Us */}
      <div>

        <h3 className="font-semibold text-slate-900 text-lg mb-5">
          Connect With Us
        </h3>

        <div className="space-y-4 text-slate-500">

          <p className="hover:text-emerald-600 cursor-pointer">
            📧 support@nearmymed.com
          </p>

          <p className="hover:text-emerald-600 cursor-pointer">
            📞 +91 98765 43210
          </p>

          <p className="hover:text-emerald-600 cursor-pointer">
            📍 Bhopal, Madhya Pradesh
          </p>

          <p>
            🕒 Available 24/7
          </p>

        </div>

        <div className="mt-6 flex flex-wrap gap-2">

          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
            Verified
          </span>

          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
            AI Powered
          </span>

          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
            Secure
          </span>

        </div>

      </div>

    </div>

    {/* Disclaimer */}

    <div className="border-t  border-slate-300 mt-14 pt-8">

      <p className="text-sm text-slate-500 text-center max-w-4xl mx-auto leading-7">
        NearMyMed does not provide medical advice, diagnosis,
        or treatment. Information available on this platform
        is for informational purposes only and should not be
        considered a substitute for professional medical advice.
      </p>

    </div>

    {/* Bottom */}

    <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

      <p className="text-slate-500 text-sm">
        © 2026 NearMyMed. All rights reserved.
      </p>

      <div className="flex flex-wrap gap-6 text-sm text-slate-500">

        <a href="#" className="hover:text-emerald-600">
          Privacy
        </a>

        <a href="#" className="hover:text-emerald-600">
          Terms
        </a>

        <a href="#" className="hover:text-emerald-600">
          Cookies
        </a>

        <a href="#" className="hover:text-emerald-600">
          Sitemap
        </a>

      </div>

    </div>

  </div>

</footer>
    </div>
  )
}