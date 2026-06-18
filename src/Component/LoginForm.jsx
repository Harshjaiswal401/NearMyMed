import { Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, MapPin } from "lucide-react";
import { useAppContext } from "../Context/AppContext";
import { useState } from "react";
export default function LoginForm() {
  const { showLoginForm, setShowLoginForm } = useAppContext();
  // Which login method is active: "email" or "mobile"
  const [loginMethod, setLoginMethod] = useState("email");
  
  // formData holds every field across both flows in one state object
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobile: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // One handler updates whichever field fired the event, keyed by name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const switchMethod = (method) => {
    setLoginMethod(method);
    setOtpSent(false);
    setErrors({});
  };

  const handleSendOtp = () => {
    if (!/^\d{10}$/.test(formData.mobile)) {
      setErrors({ mobile: "Enter a valid 10-digit mobile number" });
      return;
    }
    setErrors({});
    setOtpSent(true);
    // In a real app: call your backend to dispatch the OTP here
    console.log("OTP sent to", formData.mobile);
    setShowLoginForm(false); 
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Submitting formData:", formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    }
    setShowLoginForm(false); // Close the login form after submission
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{4,6}$/.test(formData.otp)) {
      setErrors({ otp: "Enter the OTP sent to your phone" });
      return;
    }
    setErrors({});
    console.log("Submitting formData:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  const handleGoogleLogin = () => {
    // Hook up your real OAuth flow (Firebase, NextAuth, Supabase, etc.) here
    console.log("Continue with Google clicked");
  };

  return (
    
      <div
       className="absolute w-full max-w-sm left-1/2 top-1/2 z-[100]
       -translate-x-1/2 -translate-y-1/2 ">
        <div className="bg-white border popup border-slate-200 rounded-2xl shadow-sm p-8">
          {/* Brand header, matching NearMyMed's mark */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
              <MapPin className="h-5 w-5 text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Near<span className="text-emerald-600">MyMed</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">Log in to find medicines near you</p>
          </div>

          {/* Method switcher */}
          <div className="mb-6 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => switchMethod("email")}
              className={`rounded-md py-2 text-sm font-medium transition ${
                loginMethod === "email"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => switchMethod("mobile")}
              className={`rounded-md py-2 text-sm font-medium transition ${
                loginMethod === "mobile"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Mobile OTP
            </button>
          </div>

          {/* Email + password flow */}
          {loginMethod === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full rounded-lg bg-slate-50 border ${
                      errors.email ? "border-rose-400" : "border-slate-200"
                    } pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition`}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-rose-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full rounded-lg bg-slate-50 border ${
                      errors.password ? "border-rose-400" : "border-slate-200"
                    } pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-rose-500">{errors.password}</p>}
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 transition"
              >
                Log In
              </button>
            </form>
          )}

          {/* Mobile + OTP flow */}
          {loginMethod === "mobile" && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Mobile number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={handleChange}
                    disabled={otpSent}
                    placeholder="98765 43210"
                    className={`w-full rounded-lg bg-slate-50 border ${
                      errors.mobile ? "border-rose-400" : "border-slate-200"
                    } pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition disabled:bg-slate-100 disabled:text-slate-500`}
                  />
                </div>
                {errors.mobile && <p className="mt-1.5 text-xs text-rose-500">{errors.mobile}</p>}
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 transition"
                >
                  Send OTP
                </button>
              ) : (
                <>
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Enter OTP
                    </label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="6-digit code"
                        className={`w-full rounded-lg bg-slate-50 border ${
                          errors.otp ? "border-rose-400" : "border-slate-200"
                        } pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition`}
                      />
                    </div>
                    {errors.otp && <p className="mt-1.5 text-xs text-rose-500">{errors.otp}</p>}
                    <p className="mt-1.5 text-xs text-slate-400">
                      Sent to {formData.mobile}.{" "}
                      <button type="button" onClick={handleSendOtp} className="text-emerald-600 hover:text-emerald-700">
                        Resend
                      </button>
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 transition"
                  >
                    Verify & Log In
                  </button>
                </>
              )}
            </form>
          )}

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 py-2.5 transition"
          >
            <svg className="h-4 w-4" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.8 14-4.9l-6.5-5.4C29.6 35.4 27 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.6 39.6 16.2 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.5 5.4C41.5 35.9 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z" />
            </svg>
            Continue with Google
          </button>

          {submitted && (
            <p className="mt-4 text-center text-sm text-emerald-600">Logged in successfully</p>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            New here?{" "}
            <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700">
              Create an account
            </a>
          </p>
        </div>

        {/* Live view of the formData state, handy for debugging */}
        {/* <pre className="mt-4 text-xs text-slate-400 bg-white border border-slate-200 rounded-lg p-3 overflow-x-auto">
          {JSON.stringify(formData, null, 2)}
        </pre> */}
      </div>
    
  );
}
