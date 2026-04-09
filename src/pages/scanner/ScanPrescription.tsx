import { ClipboardList } from 'lucide-react';
import { PageLayout } from '../../components/Layout';

export default function ScanPrescription() {
  return (
    <PageLayout
      icon={<ClipboardList size={26} className="text-blue-400" />}
      title="Scan Prescription"
      subtitle="Use AI OCR to digitize your doctor's prescription and extract medicine details automatically."
      badge="OCR Powered"
      badgeColor="blue"
    >
      <div className="glass rounded-3xl border border-white/8 p-8 md:p-12 text-center">
        <div className="w-24 h-24 bg-blue-500/10 border-2 border-dashed border-blue-500/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <ClipboardList size={40} className="text-blue-400" />
        </div>
        <h2 className="font-black text-white text-2xl mb-3">Scan Your Prescription</h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Point your camera at a doctor's prescription or upload an image. Our AI will extract all medicine names, dosages, and instructions automatically.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-500 transition shadow-lg text-sm">
            📷 Open Camera
          </button>
          <button className="flex items-center justify-center gap-2 glass border border-white/15 text-slate-300 font-bold px-8 py-3.5 rounded-2xl hover:bg-white/8 transition text-sm">
            📁 Upload Image
          </button>
        </div>
        <p className="text-xs text-slate-600 mt-6">Supports JPG, PNG, PDF · Max 10MB</p>
      </div>
    </PageLayout>
  );
}
