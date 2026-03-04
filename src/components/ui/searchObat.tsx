import { useState, useEffect } from "react";
import type { IObat } from "../../server/models/obat";

// NEW: We tell TypeScript this component accepts an 'onSelect' function as a prop
interface SearchObatProps {
  onSelect?: (med: IObat) => void;
}

const SearchObat: React.FC<SearchObatProps> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IObat[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error("Failed to fetch data");
        setResults([]);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      } else {
        setResults([]);
        setSearched(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Search Input Area */}
      <form onSubmit={handleSearch} className="relative group shrink-0">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-12 pr-32 py-4 bg-white border-2 border-slate-200 rounded-2xl leading-5 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-0 sm:text-lg transition-all shadow-sm hover:border-slate-300"
          placeholder="Ketik nama obat atau merek dagang (misal: Paracetamol)..."
        />
        <div className="absolute inset-y-2 right-2 flex items-center">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Mencari...
              </span>
            ) : (
              "Cari"
            )}
          </button>
        </div>
      </form>

      {/* Results Area */}
      <div className="mt-8 flex-1 min-h-0 flex flex-col">
        {loading && results.length === 0 && (
          <div className="flex justify-center items-center py-12 shrink-0">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-10 w-10 bg-blue-200 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <div className="text-center py-12 bg-slate-50 border border-slate-100 rounded-2xl shrink-0">
            <svg
              className="mx-auto h-12 w-12 text-slate-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-slate-900 mb-1">
              Obat Tidak Ditemukan
            </h3>
            <p className="text-slate-500">
              Kami tidak menemukan data untuk pencarian "{query}". Coba keyword
              lain.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="flex-1 overflow-y-auto pr-2 pb-2 custom-scrollbar">
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end mb-4 px-2 sticky top-0 bg-white/80 backdrop-blur-md z-10 py-2">
                <h3 className="text-lg font-bold text-slate-800">
                  Hasil Pencarian
                </h3>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {results.length} obat ditemukan
                </span>
              </div>

              {results.map((obat) => (
                <div
                  key={obat._id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden relative text-left group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                  <div className="flex flex-col gap-5">
                    {/* Top half: Basic Info */}
                    <div className="border-b border-slate-100 pb-4 flex flex-col">
                      <h4 className="text-xl font-black text-slate-900 mb-2">
                        {obat.nama_obat}
                      </h4>
                      {obat.merek_dagang && (
                        <div className="inline-block bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-semibold mb-3 self-start">
                          {obat.merek_dagang}
                        </div>
                      )}

                      <p className="text-sm text-slate-600 line-clamp-3">
                        {obat.deskripsi_obat}
                      </p>

                      {onSelect && (
                        <button
                          onClick={() => onSelect(obat)}
                          className="mt-4 w-full flex items-center justify-center bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold py-2.5 px-4 rounded-xl border border-blue-200 hover:border-transparent transition-all group-hover:shadow-md"
                        >
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
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Pilih Obat Ini
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center text-emerald-700 mb-1.5">
                          <svg
                            className="w-4 h-4 mr-1.5 shrink-0"
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
                          <span className="font-bold text-xs uppercase tracking-wider line-clamp-1">
                            Indikasi
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 line-clamp-2">
                          {obat.penyakit_sesuai_dengan_obat}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center text-blue-700 mb-1.5">
                          <svg
                            className="w-4 h-4 mr-1.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-bold text-xs uppercase tracking-wider line-clamp-1">
                            Dosis & Aturan
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 line-clamp-2">
                          {obat.dosis_dan_aturan_pakai_obat}
                        </p>
                      </div>

                      <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 sm:col-span-2">
                        <div className="flex items-center text-amber-700 mb-1.5">
                          <svg
                            className="w-4 h-4 mr-1.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          <span className="font-bold text-xs uppercase tracking-wider line-clamp-1">
                            Peringatan
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 line-clamp-2">
                          {obat.peringatan_sebelum_mengonsumsi_obat}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchObat;
