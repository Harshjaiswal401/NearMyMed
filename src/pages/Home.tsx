import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowLeftRight, Building2, AlertTriangle, Bot, ScanLine,
  Upload, Shield, Zap, MapPin, Activity, Pill, Heart, Clock, Users,
  TrendingUp, ChevronRight, Star, Ambulance, Microscope, Brain,
} from 'lucide-react';

const quickActions = [
  { label: 'Search by Name', route: '/search/name', icon: <Search size={20} />, color: 'from-blue-500 to-blue-600', glow: 'neon-blue', text: 'text-blue-400' },
  { label: 'Find Alternatives', route: '/alternatives/cheap', icon: <ArrowLeftRight size={20} />, color: 'from-indigo-500 to-indigo-600', glow: 'neon-violet', text: 'text-indigo-400' },
  { label: 'Nearby Pharmacy', route: '/pharmacy/directions', icon: <Building2 size={20} />, color: 'from-teal-500 to-teal-600', glow: 'neon-cyan', text: 'text-teal-400' },
  { label: 'Emergency', route: '/emergency/pharmacy', icon: <AlertTriangle size={20} />, color: 'from-red-500 to-red-600', glow: 'neon-red', text: 'text-red-400', isEmergency: true },
  { label: 'AI Assistant', route: '/ai/medicine', icon: <Bot size={20} />, color: 'from-violet-500 to-violet-600', glow: 'neon-violet', text: 'text-violet-400' },
  { label: 'Scan Medicine', route: '/scan/medicine', icon: <ScanLine size={20} />, color: 'from-cyan-500 to-cyan-600', glow: 'neon-cyan', text: 'text-cyan-400' },
  { label: 'Upload Rx', route: '/upload/prescription', icon: <Upload size={20} />, color: 'from-orange-500 to-orange-600', text: 'text-orange-400' },
  { label: 'Check Symptoms', route: '/ai/symptoms', icon: <Activity size={20} />, color: 'from-pink-500 to-pink-600', text: 'text-pink-400' },
];

const features = [
  {
    icon: <Zap size={22} className="text-yellow-400" />,
    title: 'Real-Time Availability',
    desc: 'Instantly check which pharmacies have your medicine in stock across your city.',
    bg: 'from-yellow-500/10 to-orange-500/5',
    border: 'border-yellow-500/15',
  },
  {
    icon: <Brain size={22} className="text-violet-400" />,
    title: 'AI-Powered Insights',
    desc: 'Get intelligent medicine info, symptom checks, and health advice from our AI.',
    bg: 'from-violet-500/10 to-indigo-500/5',
    border: 'border-violet-500/15',
  },
  {
    icon: <MapPin size={22} className="text-blue-400" />,
    title: 'Location Intelligence',
    desc: 'Find nearest pharmacies, hospitals, and emergency services using GPS.',
    bg: 'from-blue-500/10 to-cyan-500/5',
    border: 'border-blue-500/15',
  },
  {
    icon: <Shield size={22} className="text-green-400" />,
    title: 'Safe Alternatives',
    desc: 'Discover cheaper or safer medicine alternatives effortlessly.',
    bg: 'from-green-500/10 to-teal-500/5',
    border: 'border-green-500/15',
  },
];

const stats = [
  { label: 'Medicines Tracked', value: '50,000+', icon: '💊', color: 'text-blue-400' },
  { label: 'Active Users', value: '1.2M+', icon: '👥', color: 'text-indigo-400' },
  { label: 'Pharmacies Listed', value: '8,500+', icon: '🏪', color: 'text-teal-400' },
  { label: 'Avg. Response Time', value: '<2s', icon: '⚡', color: 'text-yellow-400' },
];

const trendingMeds = [
  { name: 'Paracetamol 500mg', brand: 'Calpol', category: 'Analgesic', price: '₹12', rating: 4.8, trend: '12%' },
  { name: 'Amoxicillin 250mg', brand: 'Amoxil', category: 'Antibiotic', price: '₹45', rating: 4.6, trend: '8%' },
  { name: 'Metformin 500mg', brand: 'Glucophage', category: 'Antidiabetic', price: '₹28', rating: 4.7, trend: '5%' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080c14]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#080c14]">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-3xl animate-orb" />
          <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-3xl animate-orb" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-3xl" />
          {/* Grid */}
          <div className="absolute inset-0 bg-dark-grid opacity-60" />
          {/* Radial fade */}
          <div className="absolute inset-0 bg-radial-gradient" style={{ background: 'radial-gradient(ellipse at center top, transparent 30%, #080c14 80%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 glass border border-white/10 rounded-full px-5 py-2 text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-slate-300">AI-Powered · Real-Time · Trusted by <span className="text-blue-400">1.2M+</span> Users</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
              <span className="text-white">Medicine </span>
              <span className="text-gradient">at Your</span>
              <br />
              <span className="text-white">Fingertips</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              NearMyMed helps you find medicines, discover alternatives, locate pharmacies,
              and access emergency healthcare — all powered by cutting-edge AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/search/name')}
                className="flex items-center justify-center gap-2.5 bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-500 transition shadow-2xl neon-blue text-sm"
              >
                <Search size={18} />
                Search Medicine Now
              </button>
              <button
                onClick={() => navigate('/emergency/pharmacy')}
                className="flex items-center justify-center gap-2.5 bg-red-500/10 border border-red-500/30 text-red-400 font-bold px-8 py-4 rounded-2xl hover:bg-red-500/20 transition text-sm animate-pulse-red"
              >
                <AlertTriangle size={18} />
                Emergency Help
              </button>
            </div>
          </div>

          {/* Floating cards decoration */}
          <div className="hidden md:flex justify-center mt-16 gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {['💊 Paracetamol found · 24 pharmacies', '🏥 City Hospital · 2.3 km away', '🤖 AI: Take with food'].map((text, i) => (
              <div key={i} className="glass rounded-2xl px-5 py-3 text-sm text-slate-300 border border-white/8 animate-float" style={{ animationDelay: `${i * 1.5}s` }}>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#080c14] to-transparent" />
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass rounded-3xl border border-white/8 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/5 overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4 px-6 py-6 group hover:bg-white/3 transition">
              <span className="text-3xl">{s.icon}</span>
              <div>
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-white">Quick Actions</h2>
            <p className="text-slate-500 text-sm mt-1">Everything you need, one tap away</p>
          </div>
          <span className="text-xs text-slate-500 glass border border-white/8 px-4 py-2 rounded-full">8 features</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.route}
              onClick={() => navigate(action.route)}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl glass border border-white/8 transition-all duration-300 hover:-translate-y-2 group ${
                action.isEmergency ? 'hover:border-red-500/30 animate-pulse-red' : 'hover:border-blue-500/20 hover:bg-white/5'
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <span className={`text-xs font-semibold text-center leading-tight ${action.isEmergency ? 'text-red-400' : 'text-slate-300'} group-hover:text-white transition`}>
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Why <span className="text-gradient">NearMyMed?</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm">Everything you need for smarter healthcare decisions</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className={`bg-gradient-to-br ${f.bg} rounded-3xl p-7 border ${f.border} hover:scale-105 transition-all duration-300 group cursor-pointer`}
            >
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform border border-white/10">
                {f.icon}
              </div>
              <h3 className="font-bold text-white mb-2 text-base">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative bg-gradient-to-r from-red-900/40 via-red-800/30 to-red-900/20 rounded-3xl p-8 md:p-12 border border-red-500/20 overflow-hidden neon-red">
          <div className="absolute right-0 top-0 bottom-0 w-64 opacity-5 flex items-center justify-center">
            <Heart size={300} />
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Emergency Services · 24/7</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-3">Need Urgent Help?</h3>
              <p className="text-red-200/70 text-sm max-w-md">
                Access emergency pharmacies, hospitals, and ambulance services instantly. Our AI locates the nearest help in seconds.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={() => navigate('/emergency/ambulance')}
                className="flex items-center gap-2 bg-white text-red-700 font-black px-8 py-4 rounded-2xl hover:bg-red-50 transition text-sm shadow-xl"
              >
                <Ambulance size={18} />
                Call Ambulance
              </button>
              <button
                onClick={() => navigate('/emergency/hospital')}
                className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-300 font-bold px-8 py-4 rounded-2xl hover:bg-red-500/30 transition text-sm"
              >
                <MapPin size={18} />
                Find Hospital
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Searches */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-white">Trending Medicines</h2>
            <p className="text-slate-500 text-sm mt-1">Most searched in the last 24 hours</p>
          </div>
          <button className="text-blue-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingMeds.map((med) => (
            <button
              key={med.name}
              onClick={() => navigate('/search/name')}
              className="glass rounded-2xl border border-white/8 p-6 text-left hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 group hover:border-blue-500/30 hover:neon-blue"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-2xl">
                  💊
                </div>
                <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1.5 rounded-full flex items-center gap-1">
                  <TrendingUp size={10} /> {med.trend}
                </span>
              </div>
              <h4 className="font-bold text-white text-sm group-hover:text-blue-300 transition">{med.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{med.brand} · {med.category}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-blue-400 font-black text-sm">{med.price}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Star size={11} className="text-yellow-400 fill-yellow-400" /> {med.rating}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* AI Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative bg-gradient-to-r from-violet-900/30 via-blue-900/20 to-indigo-900/30 rounded-3xl p-8 md:p-12 border border-violet-500/15 overflow-hidden">
          <div className="absolute inset-0 bg-dark-grid opacity-30" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Bot size={16} className="text-violet-400" />
                <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">AI-Powered</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-3">
                Your Personal<br /><span className="text-gradient">Health AI</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
                Ask anything about medicines, check drug interactions, analyze symptoms, and get personalized health advice — 24/7.
              </p>
              <button
                onClick={() => navigate('/ai/medicine')}
                className="flex items-center gap-2.5 bg-violet-600 text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-violet-500 transition shadow-xl neon-violet text-sm"
              >
                <Bot size={16} />
                Try MedAI Now
              </button>
            </div>

            <div className="glass rounded-2xl border border-white/8 p-5 max-w-xs w-full">
              <div className="space-y-3">
                {[
                  { role: 'user', text: 'What is Metformin used for?' },
                  { role: 'ai', text: 'Metformin is a first-line medication for type 2 diabetes. It lowers blood sugar by reducing glucose production in the liver.' },
                ].map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-xl text-xs max-w-[80%] ${m.role === 'user' ? 'bg-blue-600 text-white' : 'glass border border-white/8 text-slate-300'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xs">
                Rx
              </div>
              <span className="text-white font-black">NearMyMed</span>
              <span className="text-xs text-slate-500">· AI Healthcare Platform</span>
            </div>
            <p className="text-xs text-slate-600 text-center">
              © 2025 NearMyMed. Built with ❤️ for better healthcare access. Not a substitute for professional medical advice.
            </p>
            <div className="flex gap-4 text-xs text-slate-500">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
