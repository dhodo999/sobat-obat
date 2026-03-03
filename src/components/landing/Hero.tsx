const Hero = () => {
  return (
    // The main section padding gives it breathing room from the Navbar.
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* We use CSS Grid to split desktop into 2 columns. On mobile (default), it's 1 column. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="max-w-2xl">
            {/* Small trusted badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 text-blue-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Platform Informasi Obat No. 1
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.15]">
              Cari & Pahami <br className="hidden sm:block" />
              <span className="text-blue-600">Obat-obatan</span> dengan<br className="hidden sm:block" /> 
              Lebih Mudah.
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              Dapatkan informasi detail, indikasi, dosis, dan efek samping obat secara akurat dalam hitungan detik untuk kesehatan Anda.
            </p>
            
            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex justify-center items-center px-6 py-3.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                Mulai Pencarian
              </button>
              
              <button className="inline-flex justify-center items-center px-6 py-3.5 rounded-lg bg-white text-slate-700 font-medium hover:bg-slate-50 border border-slate-200 transition-colors">
                Pelajari Fitur
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Optional Social Proof/Trust metrics */}
            <div className="mt-10 pt-10 border-t border-slate-200/60 flex items-center gap-6">
              <div>
                <div className="text-2xl font-bold text-slate-900">10k+</div>
                <div className="text-sm text-slate-500 font-medium">Data Obat</div>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <div className="text-2xl font-bold text-slate-900">100%</div>
                <div className="text-sm text-slate-500 font-medium">Akurat & Terpercaya</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Elements */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Decorative background blobs to mimic modern SaaS feel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-200/30 blur-3xl rounded-full -z-10"></div>
            
            {/* The actual image or mock UI */}
            <div className="relative rounded-2xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden transform transition-transform hover:-translate-y-1 duration-500">
              {/* Fake Browser/App Header Bar */}
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              
              {/* Mock Content inside the "browser" */}
              <div className="p-6 bg-slate-50/50">
                 {/* This is a placeholder for a real image. You can replace this whole inner div with <img src={YourImage} /> later */}
                 <div className="w-full h-64 bg-slate-200/50 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-6 text-slate-400">
                   <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg>
                   <span>Ilustrasi Dashboard Obat</span>
                 </div>
              </div>
            </div>
            
            {/* Secondary Floating UI element overlapping */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <div className="font-bold text-slate-900 line-clamp-1">Paracetamol 500mg</div>
                  <div className="text-xs text-slate-500">Ditemukan dalam 0.2s</div>
                </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
