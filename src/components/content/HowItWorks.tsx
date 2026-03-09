import Consultant from "./Consultant";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <section className="bg-slate-50 py-24 border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              AI Interaksi Obat & Gaya Hidup
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Ikuti langkah-langkah penggunaan untuk memaksimalkan hasil
              analisis.
            </p>
          </div>

          {/* Tutorial / Steps Section (Horizontal Layout for better readability) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4 w-full">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center relative">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Pilih Obat Anda
              </h3>
              <p className="text-slate-500">
                Gunakan fitur pencarian teks atau scan botol fisik obat yang
                akan Anda konsumsi.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center relative">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Ceritakan Kondisi
              </h3>
              <p className="text-slate-500">
                Tulis aktivitas atau apa yang akan Anda makan/minum bersama obat
                tersebut.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center relative">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Terima Analisis
              </h3>
              <p className="text-slate-500">
                AI akan memvalidasi apakah rincian Anda aman secara medis hanya
                dalam hitungan detik.
              </p>
            </div>
          </div>

          {/* Interactive Consultant Module */}
          <Consultant />
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
