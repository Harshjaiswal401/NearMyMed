import React, { useState, useRef } from "react";
import {
  Upload,
  Camera,
  FileText,
  CheckCircle,
  AlertTriangle,
  User,
  MapPin,
  ShieldCheck,
  Clock,
  Sparkles,
  Info,
  ChevronRight,
  RefreshCw,
  X
} from "lucide-react";

export default function UploadPrescriptionPage() {
  // State variables
  const [file, setFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showCameraMock, setShowCameraMock] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  
  // Form states
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  
  // Submit state
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, parsing, success
  const [toastMessage, setToastMessage] = useState("");
  
  const fileInputRef = useRef(null);

  // File Handlers
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus("idle");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setUploadStatus("idle");
    }
  };

  // Mock Camera Action
  const triggerCamera = () => {
    setShowCameraMock(true);
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
    }, 1500); // simulate focusing/connecting
  };

  const captureMockPhoto = () => {
    // Generate a mock file
    const mockFile = {
      name: `captured_prescription_${Date.now()}.jpg`,
      size: 145820,
      type: "image/jpeg",
      isMock: true
    };
    setFile(mockFile);
    setShowCameraMock(false);
    showToast("Prescription captured successfully!");
  };

  // Toast notifier
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      showToast("Please upload or take a photo of your prescription first.");
      return;
    }

    if (!patientName || !patientAge || !phone || !address || !pincode) {
      showToast("Please fill in all the required patient and delivery details.");
      return;
    }

    // Step 1: Uploading
    setUploadStatus("uploading");
    
    // Step 2: Parsing
    setTimeout(() => {
      setUploadStatus("parsing");
    }, 1500);

    // Step 3: Success
    setTimeout(() => {
      setUploadStatus("success");
      showToast("Prescription uploaded & verified! Our pharmacist will contact you shortly.");
    }, 3500);
  };

  const removeSelectedFile = () => {
    setFile(null);
    setUploadStatus("idle");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700/50 animate-bounce max-w-sm">
          <CheckCircle className="text-emerald-400 shrink-0" size={18} />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Camera Mock Modal */}
      {showCameraMock && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl">
            <button
              onClick={() => setShowCameraMock(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 p-2 rounded-full transition"
            >
              <X size={18} />
            </button>

            <div className="p-6 text-center space-y-4">
              <h3 className="text-white font-bold text-lg">Simulating Camera Access</h3>
              
              <div className="h-64 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
                {isCapturing ? (
                  <div className="text-center space-y-3">
                    <RefreshCw className="animate-spin text-emerald-500 mx-auto" size={32} />
                    <p className="text-xs text-slate-400 font-medium">Accessing camera stream...</p>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 space-y-2 px-6">
                    <div className="w-full h-full opacity-30 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 absolute inset-0 animate-pulse"></div>
                    <div className="border border-emerald-500/40 w-48 h-36 rounded-xl flex items-center justify-center relative">
                      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-500"></div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-500"></div>
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-500"></div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-500"></div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Position Prescription Here</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  disabled={isCapturing}
                  onClick={captureMockPhoto}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Camera size={16} />
                  Capture Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck size={14} className="text-emerald-600" />
            100% Secure & HIPAA-Compliant Encryption
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Upload Doctor's Prescription
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl">
            Upload your prescription. Our licensed pharmacist will review it, verify the dosage, and help prepare your medication order.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Columns (Upload and Form) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Upload Area Box */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              
              <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
                Step 1: Upload Your File
              </h2>

              {/* Drag Drop Field */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                  isDragActive
                    ? "border-emerald-500 bg-emerald-50/40"
                    : "border-slate-300 hover:border-emerald-400 bg-slate-50/50 hover:bg-slate-50"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                />

                {file ? (
                  <div className="space-y-4 relative z-10">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <FileText size={24} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-slate-800 text-sm line-clamp-1 max-w-xs mx-auto">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        Size: {(file.size / 1024).toFixed(1)} KB • format: {file.type || "Attached File"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelectedFile();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-100 px-3 py-1.5 rounded-xl shadow-sm transition"
                    >
                      <X size={12} />
                      Remove Prescription
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 relative z-10">
                    <div className="w-16 h-16 bg-white border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-105 group-hover:text-emerald-600 group-hover:border-emerald-100 shadow-sm transition-all duration-300">
                      <Upload size={28} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-slate-700 text-sm">
                        Drag and drop your prescription here
                      </p>
                      <p className="text-xs text-slate-400">
                        Supports JPEG, PNG or PDF (Max 10MB)
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-600/10 transition inline-block">
                        Choose File from Device
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Take Photo Button */}
              {!file && (
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or</span>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>
              )}

              {!file && (
                <button
                  type="button"
                  onClick={triggerCamera}
                  className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2.5 active:scale-99"
                >
                  <Camera size={16} className="text-emerald-600" />
                  Take Photo (Use Device Camera)
                </button>
              )}

            </div>

            {/* Patient Details & Delivery Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              
              <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
                Step 2: Enter Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                
                {/* Patient Name */}
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <User size={13} className="text-slate-400" />
                    Patient Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    placeholder="Enter full name"
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none rounded-xl px-4 py-3 text-sm transition"
                  />
                </div>

                {/* Patient Age */}
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Patient Age <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    required
                    min="1"
                    max="120"
                    placeholder="Enter age in years"
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none rounded-xl px-4 py-3 text-sm transition"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Gender <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                      className="w-full bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none rounded-xl px-4 py-3 text-sm transition appearance-none cursor-pointer"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none rounded-xl px-4 py-3 text-sm transition"
                  />
                </div>

                {/* Pincode */}
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={13} className="text-slate-400" />
                    Delivery Pincode <span className="text-rose-500">*</span>
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

                {/* Address */}
                <div className="space-y-1.5 col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Full Delivery Address <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows="3"
                    placeholder="Flat/House No, Building, Street, Area name, Landmark"
                    className="w-full bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none rounded-xl px-4 py-3 text-sm transition resize-none"
                  ></textarea>
                </div>

              </div>

              {/* Submission Logic & States */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                
                {uploadStatus === "uploading" && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600 flex items-center gap-2">
                        <RefreshCw className="animate-spin text-emerald-600" size={14} />
                        Uploading prescription file...
                      </span>
                      <span className="text-emerald-600">30%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full w-[30%] transition-all duration-500"></div>
                    </div>
                  </div>
                )}

                {uploadStatus === "parsing" && (
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 space-y-2 animate-pulse">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-emerald-800 flex items-center gap-2">
                        <Sparkles className="text-emerald-600" size={14} />
                        AI Pharmacist OCR scanning & extracting items...
                      </span>
                      <span className="text-emerald-700">75%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full w-[75%] transition-all duration-500"></div>
                    </div>
                  </div>
                )}

                {uploadStatus === "success" && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2 flex flex-col items-center">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                      <CheckCircle size={20} />
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">Upload Success!</h4>
                    <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                      Your prescription has been securely recorded. An executive will call you to confirm the items, quantity, and delivery time.
                    </p>
                  </div>
                )}

                {uploadStatus !== "success" && (
                  <button
                    type="submit"
                    disabled={!file || uploadStatus === "uploading" || uploadStatus === "parsing"}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    Upload & Continue
                    <ChevronRight size={16} />
                  </button>
                )}

              </div>

            </form>

          </div>

          {/* Right Column: Guidelines & Safeguards */}
          <div className="space-y-6">
            
            {/* Guidelines Panel */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
              
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Info size={18} className="text-emerald-600 shrink-0" />
                Prescription Guidelines
              </h3>
              
              <ul className="space-y-4">
                <li className="flex gap-3 text-xs leading-relaxed text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Doctor's Info Visible</span>
                    Ensure the doctor's name, degree, registration number, and signature are visible.
                  </div>
                </li>
                <li className="flex gap-3 text-xs leading-relaxed text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Date of Prescription</span>
                    Prescription must show a valid date. Most prescriptions are valid for 6 months.
                  </div>
                </li>
                <li className="flex gap-3 text-xs leading-relaxed text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Dosage Details</span>
                    The dosage, frequency, and duration of the medicines should be clearly written.
                  </div>
                </li>
                <li className="flex gap-3 text-xs leading-relaxed text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Legibility</span>
                    Avoid uploading blurry, cropped, or dim images. Use plain flat lighting.
                  </div>
                </li>
              </ul>

              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex gap-3 text-[11px] text-amber-700 leading-relaxed font-medium">
                <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                We do not dispense Schedule H1 / X drugs (e.g. strong narcotics/psychotropics) without strict manual vetting.
              </div>

            </div>

            {/* Safeguard & Trust Panel */}
            <div className="bg-emerald-900 text-emerald-100 rounded-3xl p-6 space-y-5 shadow-lg relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-500 opacity-10 rounded-full blur-xl -mr-10 -mb-10"></div>
              
              <h3 className="font-bold text-white text-base">
                Why trust NearMyMed?
              </h3>

              <div className="space-y-4">
                
                <div className="flex gap-3 text-xs leading-relaxed">
                  <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">End-to-End Encryption</span>
                    Your documents are stored securely and encrypted. They are never shared with third parties.
                  </div>
                </div>

                <div className="flex gap-3 text-xs leading-relaxed">
                  <Clock size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Quick Review in 15 Mins</span>
                    A certified pharmacist reads and processes your prescriptions within minutes.
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
