import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  Building,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Info,
  QrCode,
  ArrowLeft,
  RotateCw
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Address form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Bhopal");
  const [stateName, setStateName] = useState("Madhya Pradesh");
  const [pincode, setPincode] = useState("");

  // Payment states
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi, card, netbanking
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  // Specific option selections inside payment modal
  const [selectedUpiApp, setSelectedUpiApp] = useState("gpay");
  const [selectedBank, setSelectedBank] = useState("hdfc");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const deliveryFee = cartTotal > 0 ? 40 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty. Please add medicines first.");
      return;
    }
    // Validation
    if (!fullName || !phone || !address || !pincode) {
      alert("Please fill in all the required delivery fields.");
      return;
    }
    // Open payment gateway
    setShowRazorpay(true);
  };

  const handlePayNow = () => {
    // Validate card details if card method is selected
    if (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert("Please fill in card number, expiry, and CVV.");
      return;
    }

    setPaymentProcessing(true);

    // Simulate 2-second processing loader
    setTimeout(() => {
      setPaymentProcessing(false);
      setShowRazorpay(false);
      clearCart();
      navigate("/order-success");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 relative">
      
      {/* ────────────────── Simulated Razorpay Gateway Overlay ────────────────── */}
      {showRazorpay && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden relative shadow-2xl flex flex-col text-slate-100">
            
            {/* Payment Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-6 border-b border-indigo-900 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Secured by Razorpay</span>
                <h3 className="font-extrabold text-lg text-white">NearMyMed Checkout</h3>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-medium">Amount to Pay</p>
                <p className="text-xl font-black text-emerald-400">₹{grandTotal.toFixed(2)}</p>
              </div>
            </div>

            {/* Payment Processing State */}
            {paymentProcessing ? (
              <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">
                <RotateCw className="animate-spin text-emerald-400" size={48} />
                <div className="space-y-2">
                  <h4 className="font-bold text-lg text-white">Processing Transaction</h4>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Connecting to your payment provider. Please do not refresh, close, or hit the back button.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Gateway Main Grid */}
                <div className="grid grid-cols-3 min-h-[300px]">
                  
                  {/* Left Method Tabs */}
                  <div className="col-span-1 border-r border-slate-800 bg-slate-950 flex flex-col pt-4">
                    <button
                      onClick={() => setPaymentMethod("upi")}
                      className={`flex flex-col items-center gap-1 py-4 text-xs font-bold transition border-l-4 ${
                        paymentMethod === "upi"
                          ? "border-blue-500 bg-slate-900 text-blue-400"
                          : "border-transparent text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <QrCode size={18} />
                      UPI Apps
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`flex flex-col items-center gap-1 py-4 text-xs font-bold transition border-l-4 ${
                        paymentMethod === "card"
                          ? "border-blue-500 bg-slate-900 text-blue-400"
                          : "border-transparent text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <CreditCard size={18} />
                      Cards
                    </button>
                    <button
                      onClick={() => setPaymentMethod("netbanking")}
                      className={`flex flex-col items-center gap-1 py-4 text-xs font-bold transition border-l-4 ${
                        paymentMethod === "netbanking"
                          ? "border-blue-500 bg-slate-900 text-blue-400"
                          : "border-transparent text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <Building size={18} />
                      Net Banking
                    </button>
                  </div>

                  {/* Right Tab Content */}
                  <div className="col-span-2 p-6 flex flex-col justify-between">
                    
                    {/* UPI apps selector */}
                    {paymentMethod === "upi" && (
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select UPI App</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {["gpay", "phonepe", "paytm", "bhim"].map((app) => (
                            <button
                              key={app}
                              type="button"
                              onClick={() => setSelectedUpiApp(app)}
                              className={`p-3 border rounded-xl text-center text-xs font-semibold capitalize transition ${
                                selectedUpiApp === app
                                  ? "border-blue-500 bg-blue-500/10 text-blue-400 font-bold"
                                  : "border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300"
                              }`}
                            >
                              {app === "gpay" ? "Google Pay" : app === "phonepe" ? "PhonePe" : app === "paytm" ? "Paytm" : "BHIM UPI"}
                            </button>
                          ))}
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-bold uppercase">Or Enter UPI ID / VPA</label>
                          <input
                            type="text"
                            placeholder="username@okaxis"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none text-white focus:border-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Card inputs */}
                    {paymentMethod === "card" && (
                      <div className="space-y-3.5">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Credit or Debit Card</h4>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-bold uppercase">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4111 2222 3333 4444"
                            maxLength="19"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs outline-none text-white focus:border-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 font-bold uppercase">Expiry Date</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              maxLength="5"
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs outline-none text-white focus:border-blue-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 font-bold uppercase">CVV</label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="123"
                              maxLength="3"
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs outline-none text-white focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Net Banking Selector */}
                    {paymentMethod === "netbanking" && (
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Bank</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {["hdfc", "sbi", "icici", "axis"].map((bank) => (
                            <button
                              key={bank}
                              type="button"
                              onClick={() => setSelectedBank(bank)}
                              className={`p-3 border rounded-xl text-center text-xs font-semibold capitalize transition ${
                                selectedBank === bank
                                  ? "border-blue-500 bg-blue-500/10 text-blue-400 font-bold"
                                  : "border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300"
                              }`}
                            >
                              {bank === "hdfc" ? "HDFC Bank" : bank === "sbi" ? "State Bank of India" : bank === "icici" ? "ICICI Bank" : "Axis Bank"}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action controls */}
                    <div className="pt-6 border-t border-slate-800 mt-6 flex justify-between gap-4 items-center">
                      <button
                        onClick={() => setShowRazorpay(false)}
                        className="text-xs font-bold text-slate-500 hover:text-slate-300 flex items-center gap-1.5"
                      >
                        <ArrowLeft size={13} />
                        Cancel
                      </button>
                      <button
                        onClick={handlePayNow}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2"
                      >
                        Pay ₹{grandTotal.toFixed(2)}
                        <ChevronRight size={13} />
                      </button>
                    </div>

                  </div>

                </div>
                {/* Gateway footer */}
                <div className="px-6 py-4 bg-slate-950 border-t border-slate-850 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="text-emerald-500" size={13} /> Secure 256-bit SSL</span>
                  <span>Razorpay Standard V3.5</span>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {/* ────────────────── Main Page Content ────────────────── */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumb / Nav */}
        <button
          onClick={() => navigate("/order-medicines")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition"
        >
          <ArrowLeft size={14} />
          Back to Medicines
        </button>

        {/* Page Heading */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Secure Checkout
          </h1>
          <p className="text-sm text-slate-500">
            Provide delivery coordinates and proceed to secure checkout verification.
          </p>
        </div>

        {/* Outer Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column Address Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <span className="w-2.5 h-5.5 bg-emerald-600 rounded-full"></span>
                Delivery Coordinates
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <User size={13} className="text-slate-400" />
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Enter full name"
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none rounded-xl px-4 py-3 text-sm transition"
                  />
                </div>

                {/* Mobile Phone */}
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone size={13} className="text-slate-400" />
                    10-digit phone number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="[0-9]{10}"
                    placeholder="Phone number"
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none rounded-xl px-4 py-3 text-sm transition"
                  />
                </div>

                {/* Shipping Address */}
                <div className="space-y-1.5 col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={13} className="text-slate-400" />
                    Delivery Street Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Flat/House No, Building, Street, Area name"
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none rounded-xl px-4 py-3 text-sm transition"
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="City"
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none rounded-xl px-4 py-3 text-sm transition"
                  />
                </div>

                {/* Pincode */}
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Pincode <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                    pattern="[0-9]{6}"
                    placeholder="6-digit pincode"
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none rounded-xl px-4 py-3 text-sm transition"
                  />
                </div>

              </div>

              {/* Secure Notice */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-slate-500">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Secure Transaction Guarantee</span>
                  We use industry-standard encryption protocols. Your data remains fully protected. Deliveries are dispatched using temperature-controlled bags to keep medicines safe.
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/10 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Proceed to Pay ₹{grandTotal.toFixed(2)}
                  <ChevronRight size={16} />
                </button>
              </div>

            </form>
          </div>

          {/* Right Column Order Summary */}
          <div className="space-y-6">
            
            {/* Items Summary list */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
              
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 pb-1 border-b border-slate-100">
                Order Summary
              </h3>

              {cart.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">Your cart is empty.</p>
              ) : (
                <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between gap-3 text-xs">
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-800">{item.brandName}</p>
                        <p className="text-[10px] text-slate-400">Qty: {item.quantity} • ₹{item.discountedPrice.toFixed(2)} each</p>
                      </div>
                      <span className="font-bold text-slate-700 text-right">
                        ₹{(item.discountedPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price list */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-slate-700">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-slate-700">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-150 my-1.5"></div>
                <div className="flex justify-between text-sm font-extrabold text-slate-800">
                  <span>Total Amount</span>
                  <span className="text-emerald-600 text-base">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

            </div>

            {/* Need help sidebar card */}
            <div className="bg-emerald-950 text-emerald-100 rounded-3xl p-6 space-y-4">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Info size={16} />
                Need Assistance?
              </h4>
              <p className="text-[11px] leading-relaxed">
                If you face issues with processing your checkout or uploads, click the button below to seek guidance from our virtual helper assistant.
              </p>
              <button
                onClick={() => navigate("/ai-assistant")}
                className="w-full py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition"
              >
                Talk to AI Assistant
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
