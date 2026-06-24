
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Calendar, ArrowRight, ShieldCheck, Printer } from "lucide-react";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [deliveryEta, setDeliveryEta] = useState("");

  useEffect(() => {
    // Generate a random Order ID (e.g. #NMM-84729)
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setOrderId(`#NMM-${randomNum}`);

    // Generate expected delivery time (Tomorrow by 2:00 PM)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const day = tomorrow.toLocaleDateString("en-IN", { weekday: "long" });
    const dateStr = tomorrow.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    setDeliveryEta(`${day}, ${dateStr} by 2:00 PM`);
  }, []);

  return (
    <div className="min-h-[80-screen] bg-slate-50 text-slate-800 py-16 px-4 flex items-center justify-center">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-xl text-center relative overflow-hidden space-y-8">

        {/* Decorative backdrop glow */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl -mt-16 pointer-events-none"></div>

        {/* Animated Green Checkmark Check */}
        <div className="relative mx-auto w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner animate-pulse">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping"></div>
          <Check size={36} className="text-emerald-600 stroke-[3]" />
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <span className="text-[10px] bg-emerald-500 text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Payment Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Thank you for shopping with NearMyMed. We've sent a detailed confirmation invoice receipt to your registered phone number and email.
          </p>
        </div>

        {/* Order Stats Table */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 divide-y divide-slate-200/40 text-left text-sm max-w-md mx-auto">
          <div className="pb-3.5 flex justify-between items-center">
            <span className="text-slate-400 font-medium">Order Reference ID</span>
            <span className="font-extrabold text-slate-800 text-sm tracking-wide bg-white px-3 py-1 rounded-lg border border-slate-200">
              {orderId}
            </span>
          </div>
          <div className="py-3.5 flex justify-between items-center">
            <span className="text-slate-400 font-medium">Payment Status</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck size={14} /> Completed
            </span>
          </div>
          <div className="pt-3.5 flex justify-between items-start gap-4">
            <span className="text-slate-400 font-medium shrink-0">Estimated Delivery</span>
            <span className="font-bold text-slate-800 text-right flex items-center gap-1.5 justify-end">
              <Calendar size={14} className="text-emerald-600" />
              {deliveryEta}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 transition flex items-center justify-center gap-2 active:scale-98"
          >
            Continue Shopping
            <ArrowRight size={15} />
          </button>

          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2 active:scale-98"
          >
            <Printer size={15} />
            Print Receipt
          </button>
        </div>

        {/* Security badge footer */}
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
          <ShieldCheck size={12} className="text-emerald-500" />
          NearMyMed Trusted Pharmacist Networks
        </p>

      </div>
    </div>
  );
}
