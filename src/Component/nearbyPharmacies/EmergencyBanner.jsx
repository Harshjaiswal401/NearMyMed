import { ShieldAlert, PhoneCall } from "lucide-react";

export default function EmergencyBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <ShieldAlert size={24} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Medical Emergency?</h3>
          <p className="text-red-100 text-sm mt-0.5">
            Call <strong>108</strong> for ambulance · <strong>112</strong> for national emergency
          </p>
        </div>
      </div>
      <a
        href="tel:108"
        className="shrink-0 flex items-center gap-2 bg-white text-red-600 font-bold px-5 py-2.5 rounded-xl hover:scale-105 transition-transform text-sm"
      >
        <PhoneCall size={16} />
        Call 108
      </a>
    </div>
  );
}