import { useState } from "react";
import SearchObat from "../ui/searchObat";
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
              <div className="flex mb-4 border-b border-slate-100 pb-4 shrink-0">
                <button
                  onClick={() => setActiveTab("text")}
                  className={`pb-2 px-4 text-sm font-bold transition-colors ${activeTab === "text" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Cari Obat
                </button>
                <button
                  onClick={() => setActiveTab("image")}
                  className={`pb-2 px-4 text-sm font-bold transition-colors ${activeTab === "image" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Scan Foto
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 min-h-0">
                {activeTab === "text" && (
                  <div className="animate-in fade-in duration-300">
                    <SearchObat onSelect={handleSelectMed} />
                  </div>
                )}
                {activeTab === "image" && (
                  <div className="animate-in fade-in duration-300 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-100 hover:border-blue-400 cursor-pointer transition-colors group mt-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      Unggah Label Obat
                    </h4>
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
