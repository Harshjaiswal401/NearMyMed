import { PhoneCall, ShieldAlert, MapPin, Clock, ArrowRight, AlertTriangle, Heart } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const EMERGENCY_NUMBERS = [
  { name: "National Emergency", number: "112", icon: "🚨", color: "bg-red-500", desc: "Police, Fire & Ambulance" },
  { name: "Ambulance", number: "108", icon: "🚑", color: "bg-rose-500", desc: "Emergency medical services" },
  { name: "Police", number: "100", icon: "👮", color: "bg-blue-600", desc: "Law enforcement" },
  { name: "Fire Brigade", number: "101", icon: "🔥", color: "bg-orange-500", desc: "Fire department" },
  { name: "Women Helpline", number: "1091", icon: "👩", color: "bg-purple-500", desc: "Women in distress" },
  { name: "Poison Control", number: "1800-116-117", icon: "☠️", color: "bg-amber-600", desc: "Accidental poisoning" },
];

const QUICK_TIPS = [
  { icon: "🫁", title: "Difficulty Breathing", action: "Call 108 immediately" },
  { icon: "💊", title: "Medicine Overdose", action: "Call Poison Control: 1800-116-117" },
  { icon: "🫀", title: "Chest Pain", action: "Call 112 — possible cardiac event" },
  { icon: "🩸", title: "Severe Bleeding", action: "Apply pressure, call 108" },
  { icon: "🧠", title: "Loss of Consciousness", action: "Do not move patient, call 112" },
  { icon: "🤕", title: "Head Injury", action: "Keep still, call 108" },
];

export default function Emergency() {
  const { handleNavigation } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 to-rose-700 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/30">
              <ShieldAlert size={44} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Emergency Services
          </h1>
          <p className="text-red-100 mt-4 text-lg max-w-2xl mx-auto">
            In a medical emergency, every second counts. Call the right number immediately.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-2xl px-6 py-3 text-sm font-medium backdrop-blur-sm">
            <Clock size={16} />
            Available 24 hours · 7 days a week · Free to call
          </div>
        </div>
      </section>

      {/* Emergency Numbers Grid */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex items-center gap-3 mb-8">
          <AlertTriangle className="text-red-500" size={24} />
          <h2 className="text-2xl font-bold text-slate-900">Emergency Helplines</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EMERGENCY_NUMBERS.map(({ name, number, icon, color, desc }) => (
            <a
              key={name}
              href={`tel:${number}`}
              className="group bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4"
            >
              <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900">{name}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
                <div className="flex items-center gap-2 mt-2">
                  <PhoneCall size={14} className="text-red-500" />
                  <span className="text-xl font-black text-red-600 tracking-wide">{number}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* First Response Tips */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-rose-500" size={24} />
          <h2 className="text-2xl font-bold text-slate-900">Quick First-Response Guide</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUICK_TIPS.map(({ icon, title, action }) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition-all"
            >
              <span className="text-3xl">{icon}</span>
              <h3 className="font-bold text-slate-900 mt-4">{title}</h3>
              <p className="text-sm text-red-600 font-semibold mt-2 flex items-center gap-1">
                <ArrowRight size={14} />
                {action}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Find Nearby Section */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <MapPin size={40} className="text-emerald-200 shrink-0" />
            <div>
              <h3 className="text-2xl font-bold">Find Nearby Pharmacies</h3>
              <p className="text-emerald-100 mt-1">Locate open pharmacies near you for urgent medicine needs.</p>
            </div>
          </div>
          <button
            onClick={() => handleNavigation("/nearby-pharmacies")}
            className="shrink-0 bg-white text-emerald-700 font-bold px-7 py-3 rounded-2xl hover:scale-105 transition-transform"
          >
            Find Now
          </button>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-6 pb-12 text-center">
        <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
          ⚠️ NearMyMed provides this information for reference only. In an actual emergency, always call the appropriate helpline immediately. Do not delay seeking professional medical help.
        </p>
      </div>
    </div>
  );
}
