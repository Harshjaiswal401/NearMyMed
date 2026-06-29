import { Home, ArrowLeft } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function NotFound() {
  const { handleNavigation } = useAppContext();

  return (
    <div className="min-h-[calc(100vh-9rem)] bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Big 404 */}
        <div className="text-[9rem] font-black text-emerald-100 leading-none select-none">
          404
        </div>

        <div className="mt-2">
          <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
          <p className="text-slate-500 mt-3 leading-relaxed">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all hover:scale-105"
          >
            <Home size={18} />
            Back to Home
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-slate-300 text-slate-700 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
