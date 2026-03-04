import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const Riwayat = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 w-full pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Riwayat Saya
        </h1>
        <p className="text-slate-600 mb-8">
          Lihat riwayat konsultasi sebelumnya.
        </p>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-slate-700">
            Riwayat Masih Kosong
          </h2>
          <p className="mt-2 text-slate-500">
            Mulai konsultasi untuk menyimpan riwayat konsultasi.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Riwayat;
