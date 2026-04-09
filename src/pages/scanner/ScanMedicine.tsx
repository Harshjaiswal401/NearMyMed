import { useState } from 'react';
import { Camera, ScanLine, CheckCircle } from 'lucide-react';
import { PageLayout } from '../../components/Layout';

export default function ScanMedicine() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<null | { name: string; brand: string; strength: string; category: string; price: string }>(null);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setResult({ name: 'Paracetamol IP 500mg', brand: 'Calpol (GlaxoSmithKline)', strength: '500mg', category: 'Analgesic/Antipyretic', price: '₹45 / strip of 15' });
    }, 2200);
  };

  return (
    <PageLayout
      icon={<ScanLine size={26} className="text-cyan-400" />}
      title="Scan Medicine"
      subtitle="Point your camera at any medicine strip, bottle, or box to instantly identify it using AI."
      badge="AI Vision"
      badgeColor="cyan"
      headerGradient="from-cyan-600/15 via-blue-500/5 to-transparent"
      accentColor="cyan"
    >
      {/* Camera View Simulation */}
      <div className="glass rounded-3xl border border-cyan-500/20 overflow-hidden mb-6">
        <div className="relative bg-black/60 h-72 md:h-96 flex flex-col items-center justify-center">
          {/* Corner guides */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-8 h-8 border-2 border-cyan-400 ${i < 2 ? 'border-b-0' : 'border-t-0'} ${i % 2 === 0 ? 'border-r-0' : 'border-l-0'} rounded-sm`} />
          ))}

          {scanning ? (
            <div className="text-center">
              <div className="relative mx-auto w-20 h-20 mb-4">
                <div className="w-20 h-20 border-4 border-cyan-400/20 rounded-full" />
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" />
              </div>
              <p className="text-cyan-300 font-bold">Scanning...</p>
              <p className="text-slate-500 text-xs mt-1">Analyzing medicine with AI Vision</p>
              {/* Scan line */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bounce" style={{ top: '50%' }} />
            </div>
          ) : result ? (
            <div className="text-center">
              <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
              <p className="text-green-400 font-bold">Medicine Identified!</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/10 border-2 border-dashed border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera size={28} className="text-cyan-400" />
              </div>
              <p className="text-slate-400 font-semibold">Position medicine in frame</p>
              <p className="text-slate-600 text-xs mt-1">Ensure good lighting for best results</p>
            </div>
          )}
        </div>

        <div className="p-5 flex gap-3">
          <button
            onClick={handleScan}
            disabled={scanning}
            className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-3.5 rounded-xl hover:bg-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <ScanLine size={18} />
            {scanning ? 'Scanning...' : 'Start Scan'}
          </button>
          <button className="flex items-center gap-2 glass border border-white/10 text-slate-400 px-5 py-3.5 rounded-xl hover:text-white transition text-sm font-semibold">
            <Camera size={16} />
            Upload
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="animate-fade-in-up glass rounded-3xl border border-green-500/20 p-6 neon-cyan">
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle size={22} className="text-green-400" />
            <h2 className="font-black text-white text-lg">Medicine Identified</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Medicine Name', value: result.name },
              { label: 'Brand', value: result.brand },
              { label: 'Strength', value: result.strength },
              { label: 'Category', value: result.category },
              { label: 'Price', value: result.price },
            ].map((item) => (
              <div key={item.label} className={`glass rounded-xl p-4 border border-white/8 ${item.label === 'Medicine Name' ? 'col-span-2' : ''}`}>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-white font-bold text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
