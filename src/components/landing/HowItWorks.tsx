import { useState } from "react";
import SearchObat from "../ui/searchObat";
import ScanObat from "../ui/scanObat";
import Consultant from "./Consultant";
import type { IObat } from "../../server/models/obat";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");

  // NEW STATE: Keep track of medicines the user has selected
  const [selectedMeds, setSelectedMeds] = useState<IObat[]>([]);

  // NEW STATE: Keep track of user's lifestyle context
  const [lifestyleContext, setLifestyleContext] = useState("");

  // NEW STATE: AI Loading & Results
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  // NEW STATE: Image Capturer
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleSelectMed = (med: IObat) => {
    // Prevent adding duplicates
    if (!selectedMeds.find((m) => m._id === med._id)) {
      setSelectedMeds([...selectedMeds, med]);
    }
  };

  const handleRemoveMed = (medId: string) => {
    setSelectedMeds(selectedMeds.filter((m) => m._id !== medId));
  };

  const handleAnalyze = () => {
    if (selectedMeds.length === 0) return;

    setIsAnalyzing(true);
    setAiResult(null);

    // Simulate AI API Call
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiResult(
        "Berdasarkan analisis AI: Tidak ada interaksi mayor yang ditemukan antara paracetamol dan rutinitas minum kopi Anda. Namun, disarankan untuk memberi jeda 1-2 jam antara minum obat dan konsumsi kafein untuk mencegah iritasi lambung ringan.",
      );
    }, 2000);
  };

  return (
    <section className="bg-slate-50 py-24 border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            AI Interaksi Obat & Gaya Hidup
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Pilih obat yang akan Anda konsumsi, ceritakan aktivitas Anda (misal:
            "saya mau minum kopi"), dan biarkan AI kami menganalisis
            keamanannya.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            {selectedMeds.length > 0 && (
              <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm animate-in fade-in shrink-0">
                <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Obat yang Anda Pilih ({selectedMeds.length}):
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMeds.map((med) => (
                    <div
                      key={med._id}
                      className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 text-sm font-medium"
                    >
                      {med.nama_obat}
                      <button
                        onClick={() => handleRemoveMed(med._id)}
                        className="ml-2 text-blue-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col max-h-[600px] w-full">
              <div className="flex justify-center mb-6 shrink-0 relative z-10">
                <div className="bg-slate-100 p-1.5 rounded-full inline-flex shadow-inner">
                  <button
                    onClick={() => setActiveTab("text")}
                    className={`relative px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${
                      activeTab === "text"
                        ? "text-blue-700 bg-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      Cari Obat
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("image")}
                    className={`relative px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${
                      activeTab === "image"
                        ? "text-blue-700 bg-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                      Scan Foto
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 min-h-0">
                {activeTab === "text" && (
                  <div className="animate-in fade-in duration-300">
                    <SearchObat onSelect={handleSelectMed} />
                  </div>
                )}
                {activeTab === "image" && (
                  <div className="animate-in fade-in duration-300 mt-4 min-h-[300px]">
                    {capturedImage ? (
                      <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
                        <img
                          src={capturedImage}
                          alt="Hasil Scan"
                          className="w-full max-h-64 object-contain rounded-lg mb-4 shadow-sm"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => setCapturedImage(null)}
                            className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors shadow-sm"
                          >
                            Ulangi
                          </button>
                          <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            Analisis AI
                          </button>
                        </div>
                      </div>
                    ) : (
                      <ScanObat
                        onImageCapture={(img) => setCapturedImage(img)}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-start">
            <Consultant
              selectedMeds={selectedMeds}
              lifestyleContext={lifestyleContext}
              setLifestyleContext={setLifestyleContext}
              isAnalyzing={isAnalyzing}
              aiResult={aiResult}
              handleAnalyze={handleAnalyze}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
