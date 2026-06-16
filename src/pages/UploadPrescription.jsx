import React, { useState } from "react";
import {
  UploadCloud,
  ShieldCheck,
  Bot,
  Store,
} from "lucide-react";

export default function UploadPrescription() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Upload Prescription
        </h1>

        <p className="text-slate-500 mt-3 text-lg">
          Upload your prescription and we'll help you
          find medicines nearby.
        </p>
      </div>

      {/* Main Section */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Upload Area */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8">

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center">

            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
              <UploadCloud
                size={40}
                className="text-emerald-600"
              />
            </div>

            <h2 className="text-2xl font-semibold">
              Upload Prescription
            </h2>

            <p className="text-slate-500 mt-2">
              JPG, PNG and PDF files supported
            </p>

            <label className="mt-6">
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileUpload}
              />

              <span className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition">
                Choose File
              </span>
            </label>

            <p className="text-sm text-slate-400 mt-4">
              Maximum file size: 10 MB
            </p>
          </div>

          {file && (
            <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <p className="font-medium text-emerald-700">
                ✓ {file.name}
              </p>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6">

          <h3 className="text-xl font-semibold mb-6">
            Why Upload?
          </h3>

          <div className="space-y-6">

            <div className="flex gap-3">
              <Store
                size={20}
                className="text-emerald-600 mt-1"
              />

              <div>
                <p className="font-medium">
                  Check Availability
                </p>

                <p className="text-sm text-slate-500">
                  Find medicines available nearby.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <ShieldCheck
                size={20}
                className="text-emerald-600 mt-1"
              />

              <div>
                <p className="font-medium">
                  Secure Upload
                </p>

                <p className="text-sm text-slate-500">
                  Your prescription remains private.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Bot
                size={20}
                className="text-emerald-600 mt-1"
              />

              <div>
                <p className="font-medium">
                  AI Assistance
                </p>

                <p className="text-sm text-slate-500">
                  Understand medicines more easily.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Supported Formats */}
      <div className="mt-6 bg-white border border-slate-200 rounded-3xl p-6">

        <h3 className="font-semibold mb-4">
          Supported Formats
        </h3>

        <div className="flex flex-wrap gap-3">

          <span className="px-4 py-2 bg-slate-100 rounded-full text-sm">
            JPG
          </span>

          <span className="px-4 py-2 bg-slate-100 rounded-full text-sm">
            PNG
          </span>

          <span className="px-4 py-2 bg-slate-100 rounded-full text-sm">
            PDF
          </span>

          <span className="px-4 py-2 bg-slate-100 rounded-full text-sm">
            Max 10 MB
          </span>

        </div>
      </div>

    </div>
  );
}