import type { IObat } from "../../server/models/obat";

interface ConsultantProps {
  selectedMeds: IObat[];
  lifestyleContext: string;
  setLifestyleContext: (value: string) => void;
  isAnalyzing: boolean;
  aiResult: string | null;
  handleAnalyze: () => void;
}

const Consultant: React.FC<ConsultantProps> = ({
  selectedMeds,
  lifestyleContext,
  setLifestyleContext,
  isAnalyzing,
  aiResult,
  handleAnalyze,
}) => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 rounded-2xl p-6 md:p-8 shadow-xl border border-blue-800 text-white flex flex-col sticky top-24 max-h-[600px]">
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

      {/* Context Input */}
      <div className="mb-6 shrink-0">
        <label className="block text-blue-200 text-sm font-medium mb-2">
          Konteks Gaya Hidup / Makanan (Opsional)
        </label>
        <textarea
          value={lifestyleContext}
          onChange={(e) => setLifestyleContext(e.target.value)}
          placeholder="Cth: Saya mau minum ini bareng es kopi susu..."
          className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-sm text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all resize-none h-28"
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={selectedMeds.length === 0 || isAnalyzing}
        className="w-full shrink-0 bg-blue-500 hover:bg-blue-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
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
      </button>

      {/* AI Response Area */}
      <div className="mt-8 overflow-y-auto custom-scrollbar">
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
            <p className="text-base text-blue-50 leading-relaxed font-light">
              {aiResult}
            </p>
          </div>
        )}

        {selectedMeds.length === 0 && !aiResult && (
          <div className="text-center text-sm text-blue-200/60 p-4 border border-dashed border-white/20 rounded-xl py-6 mt-4 flex items-center justify-center">
            Silakan cari dan pilih obat dari panel di samping terlebih dahulu.
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultant;
