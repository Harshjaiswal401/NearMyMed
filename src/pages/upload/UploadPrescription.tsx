import { FileText } from 'lucide-react';
import { PageLayout } from '../../components/Layout';

export default function UploadPrescription() {
  return (
    <PageLayout
      icon={<FileText size={26} className="text-blue-400" />}
      title="Upload Prescription"
      subtitle="Digitize your prescription using AI. Extract medicine names, dosages, and instructions automatically."
      badge="OCR + AI"
      badgeColor="blue"
    >
      {/* Upload Zone */}
      <div className="glass rounded-3xl border-2 border-dashed border-blue-500/25 p-12 md:p-16 text-center hover:border-blue-500/45 transition-all cursor-pointer group mb-6">
        <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
          <FileText size={36} className="text-blue-400" />
        </div>
        <h2 className="font-black text-white text-xl mb-2">Upload your prescription</h2>
        <p className="text-slate-500 text-sm mb-6">JPG, PNG, or PDF · Up to 10MB · Handwritten or printed</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-blue-600 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-500 transition shadow-lg text-sm">
            📁 Upload File
          </button>
          <button className="glass border border-white/15 text-slate-300 font-bold px-8 py-3.5 rounded-2xl hover:bg-white/8 transition text-sm">
            📷 Take Photo
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="glass rounded-3xl border border-white/8 p-6">
        <h3 className="font-black text-white text-lg mb-5">How it works</h3>
        <div className="space-y-3">
          {[
            { step: '1', text: 'Upload or photograph your prescription', icon: '📤' },
            { step: '2', text: 'AI OCR extracts all text from the image', icon: '🔍' },
            { step: '3', text: 'Medicines, dosages & frequency are identified', icon: '💊' },
            { step: '4', text: 'Find pharmacies with all medicines in stock', icon: '🏥' },
          ].map((s) => (
            <div key={s.step} className="flex items-center gap-4 glass rounded-xl border border-white/5 p-4">
              <span className="w-8 h-8 bg-blue-500/15 border border-blue-500/25 rounded-lg flex items-center justify-center text-blue-400 font-black text-sm flex-shrink-0">{s.step}</span>
              <span className="text-xl">{s.icon}</span>
              <p className="text-slate-300 text-sm">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-3 bg-green-500/5 border border-green-500/15 rounded-xl p-4">
          <span className="text-green-400 text-lg">🔒</span>
          <p className="text-xs text-slate-500">Your prescription is encrypted and processed securely. We never store personal medical information.</p>
        </div>
      </div>
    </PageLayout>
  );
}
