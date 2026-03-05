import { motion } from "framer-motion";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 w-full pt-32 pb-20">
        {/* SECTION 1: Header / Visi Misi */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* SECTION 3: The Team / Contact Action */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
              {/* Top Pill Badge */}
              <div className="inline-block mb-6">
                <span className="bg-white border border-blue-200 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
                  Tim Profesional Kami
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Mengenal Lebih Dekat <br className="hidden md:block" /> Sobat
                <span className="text-blue-600">Obat</span>
              </h2>

              {/* Subtext */}
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 max-w-3xl mx-auto font-medium">
                Kami percaya setiap orang berhak mengerti obat apa yang masuk ke
                dalam tubuh mereka tanpa harus kebingungan membaca istilah medis
                yang rumit.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                {/* Outline Button */}
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-colors">
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
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  Kunjungi Profile Kami
                </button>

                {/* Solid Fill Button */}
                <button className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all border border-transparent">
                  Hubungi Kami
                </button>
              </div>
            </section>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
