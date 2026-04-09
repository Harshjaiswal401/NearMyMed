import { Camera } from 'lucide-react';
import { PageLayout } from '../../components/Layout';

export default function UploadMedicine() {
  return (
    <PageLayout
      icon={<Camera size={26} className="text-orange-400" />}
      title="Upload Medicine Image"
      subtitle="Upload a photo of your medicine for AI-powered identification and detailed information."
      badge="AI Photo Recognition"
      badgeColor="orange"
      headerGradient="from-orange-600/15 via-amber-500/5 to-transparent"
      accentColor="orange"
    >
      {/* Upload Zone */}
      <div className="glass rounded-3xl border-2 border-dashed border-orange-500/25 p-12 md:p-16 text-center hover:border-orange-500/45 transition-all cursor-pointer group mb-6">
        <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
          <Camera size={36} className="text-orange-400" />
        </div>
        <h2 className="font-black text-white text-xl mb-2">Drop your image here</h2>
        <p className="text-slate-500 text-sm mb-6">Drag & drop or click to browse. Supports JPG, PNG, WEBP up to 10MB</p>
        <button className="bg-orange-600 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-orange-500 transition shadow-lg text-sm">
          Browse Files
        </button>
      </div>

      {/* Tips */}
      <div className="glass rounded-2xl border border-white/8 p-6">
        <h3 className="font-bold text-white mb-4 text-sm">📸 Tips for better recognition</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { tip: 'Ensure the medicine label is fully visible', icon: '✅' },
            { tip: 'Use good lighting for clearer images', icon: '💡' },
            { tip: 'Keep the image in focus and sharp', icon: '🎯' },
            { tip: 'Crop to show only the medicine strip/box', icon: '✂️' },
          ].map((item) => (
            <div key={item.tip} className="flex items-center gap-3 text-xs text-slate-400">
              <span>{item.icon}</span>
              <span>{item.tip}</span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
