import { useState, useEffect } from "react";
import { 
  CreditCard, 
  Wallet, 
  Truck, 
  Lock, 
  CheckCircle, 
  ArrowLeft, 
  ShoppingBag, 
  Loader2, 
  ShieldCheck 
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Payment() {
  const { cart, clearCart, handleNavigation } = useAppContext();

  // Redirect if cart is empty (unless we are showing the success screen)
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (!isSuccess && (!cart || cart.length === 0)) {
      handleNavigation("/order-medicines");
    }
  }, [cart, isSuccess, handleNavigation]);

  // Form States
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    houseNo: "",
    locality: "",
    city: "Bhopal",
    state: "Madhya Pradesh"
  });

  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' | 'upi' | 'cod'
  
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  const [upi, setUpi] = useState({
    upiId: ""
  });

  // Errors state
  const [errors, setErrors] = useState({});

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const processingSteps = [
    "Establishing secure payment tunnel...",
    "Validating address and stock reservation...",
    "Contacting bank gateway...",
    "Finalizing order details..."
  ];

  // Calculations
  const subtotal = cart ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
  const mrpTotal = cart ? cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0) : 0;
  const discount = mrpTotal - subtotal;
  const deliveryFee = subtotal >= 500 ? 0 : 40;
  const grandTotal = subtotal + deliveryFee;

  // Formatting helpers
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setAddress({ ...address, phone: val });
    if (errors.phone) setErrors({ ...errors, phone: "" });
  };

  const handlePincodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setAddress({ ...address, pincode: val });
    if (errors.pincode) setErrors({ ...errors, pincode: "" });
  };

  const handleCardNumberChange = (e) => {
    // Format card number with spaces every 4 digits
    let val = e.target.value.replace(/\D/g, "").slice(0, 16);
    let formatted = val.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCard({ ...card, number: formatted });
    if (errors.cardNumber) setErrors({ ...errors, cardNumber: "" });
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + "/" + val.slice(2);
    }
    setCard({ ...card, expiry: val });
    if (errors.cardExpiry) setErrors({ ...errors, cardExpiry: "" });
  };

  const handleCvvChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCard({ ...card, cvv: val });
    if (errors.cardCvv) setErrors({ ...errors, cardCvv: "" });
  };

  const validateForm = () => {
    let tempErrors = {};

    // Address Validations
    if (!address.fullName.trim()) tempErrors.fullName = "Full name is required";
    if (address.phone.length !== 10) tempErrors.phone = "Phone number must be exactly 10 digits";
    if (address.pincode.length !== 6) tempErrors.pincode = "PIN code must be exactly 6 digits";
    if (!address.houseNo.trim()) tempErrors.houseNo = "Flat / House No. is required";
    if (!address.locality.trim()) tempErrors.locality = "Locality / Area is required";

    // Payment Validations
    if (paymentMethod === "card") {
      const plainCard = card.number.replace(/\s/g, "");
      if (plainCard.length !== 16) tempErrors.cardNumber = "Card number must be 16 digits";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) tempErrors.cardExpiry = "Expiry must be in MM/YY format";
      if (card.cvv.length !== 3) tempErrors.cardCvv = "CVV must be 3 digits";
      if (!card.name.trim()) tempErrors.cardName = "Cardholder name is required";
    } else if (paymentMethod === "upi") {
      if (!upi.upiId.trim()) {
        tempErrors.upiId = "UPI ID is required";
      } else if (!upi.upiId.includes("@")) {
        tempErrors.upiId = "Invalid UPI ID format (must contain @)";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Trigger simulation
    setIsProcessing(true);
    setProcessingStep(0);
  };

  // Processing Step simulator
  useEffect(() => {
    if (!isProcessing) return;

    if (processingStep < processingSteps.length) {
      const timer = setTimeout(() => {
        setProcessingStep((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Completed, show success
      const generatedId = "NMM-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }
  }, [isProcessing, processingStep]);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-8 text-center border border-slate-100 animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle size={48} className="animate-bounce" />
          </div>
          
          <h1 className="text-2xl font-bold text-slate-800">Order Confirmed!</h1>
          <p className="text-slate-500 mt-2">
            Your medicines are being packed and will be delivered from a local pharmacy in Bhopal within 2 hours.
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 my-6 text-left border border-slate-100 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Order ID:</span>
              <span className="font-bold text-slate-800">{orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Delivery Address:</span>
              <span className="font-semibold text-slate-700 max-w-[200px] text-right truncate">
                {address.houseNo}, {address.locality}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Amount Paid:</span>
              <span className="font-bold text-emerald-700">₹{grandTotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Payment Mode:</span>
              <span className="font-medium text-slate-700 uppercase">
                {paymentMethod === "card" ? "Credit/Debit Card" : paymentMethod === "upi" ? "UPI" : "Cash on Delivery"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleNavigation("/")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
            >
              Go to Home Screen
            </button>
            <button
              onClick={() => handleNavigation("/order-medicines")}
              className="w-full text-emerald-600 font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition"
            >
              Order More Medicines
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 relative">
      {/* Loading Secure Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
            <h3 className="font-bold text-lg text-slate-800">Processing Your Payment</h3>
            <p className="text-slate-500 text-sm mt-1">Please do not refresh or click back</p>
            <div className="mt-6 bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs font-medium text-emerald-700">
              {processingSteps[processingStep] || "Completing transaction..."}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        {/* Back navigation */}
        <button 
          onClick={() => handleNavigation("/order-medicines")}
          className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium transition text-sm mb-6 bg-white py-2 px-4 rounded-xl border border-slate-100 shadow-sm"
        >
          <ArrowLeft size={16} />
          Back to Medicines
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-sm shadow-emerald-200">
            <Lock size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Secure Checkout</h1>
            <p className="text-slate-500 text-xs flex items-center gap-1 mt-0.5 font-medium">
              <ShieldCheck size={14} className="text-emerald-600" />
              128-bit SSL encrypted connection
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Left Columns - Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery address */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-50">
                <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                1. Delivery Address
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => {
                      setAddress({ ...address, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: "" });
                    }}
                    placeholder="Enter your full name"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-50/50"
                  />
                  {errors.fullName && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1">Phone Number (10 digits)</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter 10-digit number"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-50/50"
                  />
                  {errors.phone && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1">PIN Code (6 digits)</label>
                  <input
                    type="text"
                    required
                    value={address.pincode}
                    onChange={handlePincodeChange}
                    placeholder="e.g. 462001"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-50/50"
                  />
                  {errors.pincode && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.pincode}</p>}
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1">Flat / House No. / Building</label>
                  <input
                    type="text"
                    required
                    value={address.houseNo}
                    onChange={(e) => {
                      setAddress({ ...address, houseNo: e.target.value });
                      if (errors.houseNo) setErrors({ ...errors, houseNo: "" });
                    }}
                    placeholder="Flat/House no, Wing, Floor"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-50/50"
                  />
                  {errors.houseNo && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.houseNo}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-600 text-xs font-semibold mb-1">Locality / Area / Street</label>
                  <input
                    type="text"
                    required
                    value={address.locality}
                    onChange={(e) => {
                      setAddress({ ...address, locality: e.target.value });
                      if (errors.locality) setErrors({ ...errors, locality: "" });
                    }}
                    placeholder="Locality, Sector, Area Name"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-50/50"
                  />
                  {errors.locality && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.locality}</p>}
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1">City</label>
                  <input
                    type="text"
                    disabled
                    value={address.city}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-100/80 text-slate-500 cursor-not-allowed font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1">State</label>
                  <input
                    type="text"
                    disabled
                    value={address.state}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-100/80 text-slate-500 cursor-not-allowed font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Payment options */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-50">
                <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                2. Select Payment Method
              </h2>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-50 rounded-2xl border border-slate-100">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-1 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    paymentMethod === "card"
                      ? "bg-white text-emerald-700 shadow-sm border border-slate-100"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <CreditCard size={16} />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-1 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    paymentMethod === "upi"
                      ? "bg-white text-emerald-700 shadow-sm border border-slate-100"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Wallet size={16} />
                  <span>UPI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-1 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    paymentMethod === "cod"
                      ? "bg-white text-emerald-700 shadow-sm border border-slate-100"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Truck size={16} />
                  <span>COD</span>
                </button>
              </div>

              {/* Forms details for selected method */}
              <div className="pt-2">
                {paymentMethod === "card" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-slate-600 text-xs font-semibold mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        required={paymentMethod === "card"}
                        value={card.name}
                        onChange={(e) => {
                          setCard({ ...card, name: e.target.value });
                          if (errors.cardName) setErrors({ ...errors, cardName: "" });
                        }}
                        placeholder="John Doe"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-50/50"
                      />
                      {errors.cardName && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.cardName}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-600 text-xs font-semibold mb-1">Card Number</label>
                      <input
                        type="tel"
                        required={paymentMethod === "card"}
                        value={card.number}
                        onChange={handleCardNumberChange}
                        placeholder="xxxx xxxx xxxx xxxx"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-50/50 font-mono tracking-wider"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-600 text-xs font-semibold mb-1">Expiry Date</label>
                        <input
                          type="text"
                          required={paymentMethod === "card"}
                          value={card.expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-50/50 text-center"
                        />
                        {errors.cardExpiry && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.cardExpiry}</p>}
                      </div>

                      <div>
                        <label className="block text-slate-600 text-xs font-semibold mb-1">CVV</label>
                        <input
                          type="password"
                          required={paymentMethod === "card"}
                          value={card.cvv}
                          onChange={handleCvvChange}
                          placeholder="***"
                          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-50/50 text-center"
                        />
                        {errors.cardCvv && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-slate-600 text-xs font-semibold mb-1">Virtual Payment Address (VPA)</label>
                      <input
                        type="text"
                        required={paymentMethod === "upi"}
                        value={upi.upiId}
                        onChange={(e) => {
                          setUpi({ ...upi, upiId: e.target.value });
                          if (errors.upiId) setErrors({ ...errors, upiId: "" });
                        }}
                        placeholder="username@okhdfcbank"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-50/50 font-medium"
                      />
                      {errors.upiId && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.upiId}</p>}
                      <p className="text-[11px] text-slate-400 mt-1 font-medium">
                        Enter your GPay, PhonePe or BHIM UPI ID. A request will be sent to your app.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="bg-emerald-50/40 rounded-2xl p-4 border border-emerald-100 text-slate-700 text-sm animate-in fade-in duration-200">
                    <p className="leading-relaxed">
                      💡 Cash on Delivery is available. Please pay the delivery agent in cash or scan the agent's UPI code at the time of delivery.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Columns - Order summary */}
          <div>
            <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-5">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 pb-2">
                <ShoppingBag size={18} className="text-slate-500" />
                Items Selected
              </h2>

              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {cart && cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 font-medium truncate max-w-[150px]">
                      {item.name} <span className="text-xs font-bold text-emerald-700">x{item.quantity}</span>
                    </span>
                    <span className="font-semibold text-slate-700">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{mrpTotal}</span>
                </div>

                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Medicines Discount</span>
                  <span>-₹{discount}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charges</span>
                  <span>{deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex justify-between font-bold text-xl text-slate-850">
                <span>Grand Total</span>
                <span className="text-emerald-700">₹{grandTotal}</span>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock size={16} />
                {paymentMethod === "cod" ? "Place COD Order" : "Pay & Order Now"}
              </button>

              <div className="text-[10px] text-slate-400 text-center mt-2 leading-relaxed">
                By completing the order, you agree to our Terms and Conditions. All medical items are fulfilled by licensed local pharmacies in Bhopal.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
