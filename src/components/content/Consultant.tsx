import { useState } from "react";
import type { IObat } from "../../server/models/obat";
import SearchObat from "../ui/searchObat";
import ScanObat from "../ui/scanObat";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const Consultant = () => {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const [selectedMeds, setSelectedMeds] = useState<IObat[]>([]);
  const [lifestyleContext, setLifestyleContext] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleSelectMed = (med: IObat) => {
    if (!selectedMeds.find((m) => m._id === med._id)) {
      setSelectedMeds([...selectedMeds, med]);
    }
  };

  const handleRemoveMed = (medId: string) => {
    setSelectedMeds(selectedMeds.filter((m) => m._id !== medId));
  };

  const handleAnalyze = async () => {
    // Pastikan ada obat yang dipilih atau gambar yang disekstrak
    if (selectedMeds.length === 0 && !capturedImage) return;

    setIsAnalyzing(true);
    setAiResult(null);
    try {
      // 1. Ambil Token JWT dari localStorage (untuk deteksi GUEST / FREE / PREMIUM)
      const token = localStorage.getItem("token");
      // 2. Siapkan Data
      const payload = {
        image: capturedImage,
        medications: selectedMeds.map((m) => m.nama_obat),
        lifestyleContext: lifestyleContext,
      };
      // 3. Tembak API Backend
      const response = await fetch("/api/scan-ocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Jika token ada, selipkan ke Header Authorization
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      // 4. Tangani Error (Termasuk Error 429 Rate Limit 3x dari GUEST!)
      if (!response.ok) {
        setAiResult(
          `⚠️ PERHATIAN: ${data.error || "Gagal menghubungi server"}`,
        );
        return;
      }
      // 5. Format hasil JSON dari Groq AI menjadi teks yang rapi
      if (data.result && data.result.status_risiko) {
        const formattedResult = `🚨 STATUS: ${data.result.status_risiko}\n\n📖 PENJELASAN:\n${data.result.penjelasan_medis}\n\n💡 SARAN:\n- ${data.result.saran_tindakan.join("\n- ")}`;
        setAiResult(formattedResult);
      } else {
        // Fallback jika respons bukan JSON
        setAiResult(data.peringatan || JSON.stringify(data.result));
      }
    } catch (error) {
      console.error(error);
      setAiResult("⚠️ Terjadi kesalahan jaringan saat mengontak sistem AI.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
      {/* Left Column: Search & Scan */}
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

        <Card className="flex flex-col max-h-[600px] w-full border-slate-100 shadow-sm">
          <CardContent className="p-6 flex flex-col h-full">
            <Tabs
              defaultValue="text"
              value={activeTab}
              onValueChange={(val) => setActiveTab(val as "text" | "image")}
              className="w-full flex-1 flex flex-col min-h-0"
            >
              <div className="flex justify-center mb-6 shrink-0 relative z-10 w-full">
                <TabsList className="grid w-full max-w-[400px] grid-cols-2 rounded-full p-1 bg-slate-100/80">
                  <TabsTrigger value="text" className="rounded-full font-bold">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Cari Obat
                  </TabsTrigger>
                  <TabsTrigger value="image" className="rounded-full font-bold">
                    <svg
                      className="w-4 h-4 mr-2"
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
                    Scan Foto
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 min-h-0">
                <TabsContent
                  value="text"
                  className="mt-0 outline-none animate-in fade-in duration-300 h-full"
                >
                  <SearchObat onSelect={handleSelectMed} />
                </TabsContent>
                <TabsContent
                  value="image"
                  className="mt-4 outline-none animate-in fade-in duration-300 min-h-[300px] h-full"
                >
                  {capturedImage ? (
                    <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
                      <img
                        src={capturedImage}
                        alt="Hasil Scan"
                        className="w-full max-h-64 object-contain rounded-lg mb-4 shadow-sm"
                      />
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setCapturedImage(null)}
                          className="flex-1 py-6 bg-white border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm"
                        >
                          Ulangi
                        </Button>
                        <Button
                          onClick={handleAnalyze}
                          disabled={isAnalyzing}
                          className="flex-1 py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm"
                        >
                          <svg
                            className="w-5 h-5 mr-2"
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
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <ScanObat onImageCapture={(img) => setCapturedImage(img)} />
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: AI Consultant Form */}
      <div className="lg:col-span-5 flex flex-col justify-start w-full">
        <Card className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 rounded-2xl shadow-xl border-blue-800 text-white flex flex-col sticky top-24 max-h-[600px] overflow-hidden">
          <CardContent className="p-4 md:p-8 flex flex-col h-full">
            <div className="flex items-center mb-6 shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 border border-blue-400/30">
                <svg
                  className="w-5 h-5 text-blue-300"
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
              </div>
              <h3 className="text-xl font-bold tracking-tight">AI Konsultan</h3>
            </div>

            <div className="mb-6 shrink-0">
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Konteks Gaya Hidup / Makanan (Opsional)
              </label>
              <Textarea
                value={lifestyleContext}
                onChange={(e) => setLifestyleContext(e.target.value)}
                placeholder="Cth: Saya mau minum ini bareng es kopi susu..."
                className="w-full bg-white/10 border-white/20 rounded-xl p-4 text-sm text-white placeholder:text-blue-200/50 focus-visible:ring-blue-400 focus-visible:bg-white/20 transition-all resize-none h-28"
              />
            </div>

            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={
                (selectedMeds.length === 0 && !capturedImage) || isAnalyzing
              }
              className="w-full shrink-0 bg-blue-500 hover:bg-blue-400 text-white font-bold py-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 text-base"
            >
              {isAnalyzing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Menganalisis...
                </>
              ) : (
                "Cek Interaksi Sekarang"
              )}
            </Button>

            <div className="mt-8 overflow-y-auto custom-scrollbar flex-1 min-h-0">
              {aiResult && (
                <div className="p-5 bg-white/10 border border-emerald-400/30 rounded-xl animate-in zoom-in-95">
                  <div className="flex items-center text-emerald-300 mb-3 font-bold text-sm">
                    <svg
                      className="w-5 h-5 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Hasil Analisis Aman
                  </div>
                  <p className="text-base text-blue-50 leading-relaxed font-light whitespace-pre-wrap">
                    {aiResult}
                  </p>
                </div>
              )}
              {selectedMeds.length === 0 && !aiResult && (
                <div className="text-center text-sm text-blue-200/60 p-4 border border-dashed border-white/20 rounded-xl py-6 mt-4 flex flex-col items-center justify-center gap-3 h-full min-h-[150px]">
                  <svg
                    className="w-8 h-8 text-blue-400/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                  Silakan cari dan pilih obat dari panel di samping terlebih
                  dahulu.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Consultant;
