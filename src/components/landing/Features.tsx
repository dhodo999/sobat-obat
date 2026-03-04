const Features = () => {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-3">
            Kenapa Memilih Kami
          </h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            Satu Platform, Segudang Solusi Kesehatan
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Sobat Obat hadir untuk memberikan Anda ketenangan pikiran dengan menyediakan data medis yang valid dan mudah dicerna oleh siapa saja.
          </p>
        </div>

        {/* 3-Column Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">Pencarian Cepat</h4>
            <p className="text-slate-600 leading-relaxed">
              Temukan informasi obat secara instan hanya dengan mengetikkan nama merek, kandungan aktif, atau gejala penyakit Anda.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">Akurasi Medis Terjamin</h4>
            <p className="text-slate-600 leading-relaxed">
              Seluruh data obat kurasi dan diverifikasi berdasarkan standar farmasi resmi dan jurnal medis terpercaya.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">Peringatan Interaksi Obat</h4>
            <p className="text-slate-600 leading-relaxed">
              Cegah risiko berbahaya dengan sistem pendeteksi otomatis yang memberi peringatan jika obat bertabrakan satu sama lain.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
