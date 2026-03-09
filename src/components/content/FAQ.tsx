import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "Bagaimana cara kerja pencarian interaksi obat?",
      answer:
        "Sobat Obat menggunakan teknologi AI untuk menganalisis kandungan dua atau lebih obat yang Anda masukkan. Sistem kami membandingkan bahan aktifnya dengan database medis terpercaya untuk mendeteksi potensi interaksi berbahaya atau efek samping sebelum Anda mengonsumsinya secara bersamaan.",
    },
    {
      question: "Apakah hasil analisis AI di Sobat Obat 100% akurat?",
      answer:
        "Meskipun ditenagai oleh AI canggih dan berbasis data medis terkini, hasil analisis dari Sobat Obat bersifat informatif dan tidak dapat menggantikan diagnosis, nasihat, atau resep dari dokter profesional. Selalu konsultasikan dengan dokter atau apoteker Anda sebelum mengubah rutinitas obat.",
    },
    {
      question: "Apakah aman menscan kemasan obat saya ke dalam website?",
      answer:
        "Sangat aman. Foto kemasan obat yang Anda unggah hanya digunakan sementara untuk mengekstrak informasi nama dan kandungan obat, dan kami tidak menyimpan foto atau mengaitkannya dengan data pribadi Anda tanpa izin.",
    },
    {
      question: "Adakah biaya untuk menggunakan fitur-fitur ini?",
      answer:
        "Fitur pencarian teks dan edukasi dasar dapat digunakan secara gratis! Untuk fitur tingkat lanjut seperti pemindaian AI presisi tinggi dan penyimpanan riwayat konsultasi tak terbatas, kami menyediakan paket berlangganan yang terjangkau.",
    },
    {
      question: "Bagaimana jika obat saya tidak ditemukan di database?",
      answer:
        "Database kami terus diperbarui secara berkala. Jika obat Anda tidak ditemukan, Anda dapat mencoba mengetikkan nama zat aktifnya atau menghubungi tim dukungan kami. Pastikan Anda tidak mengonsumsi obat secara bersamaan jika belum terverifikasi keamanannya.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24 pb-32 border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Pertanyaan Seputar Sobat Obat
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Temukan jawaban dari pertanyaan yang paling sering diajukan oleh
              pengguna kami terkait fitur dan keamanan AI interaksi obat.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200 rounded-xl px-6 bg-slate-50/50 data-[state=open]:bg-white data-[state=open]:border-blue-200 data-[state=open]:shadow-sm transition-all"
                >
                  <AccordionTrigger className="text-left font-bold text-slate-800 hover:text-blue-600 hover:no-underline py-5 text-base md:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed text-base pb-6 pt-1">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
