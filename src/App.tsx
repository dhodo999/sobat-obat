import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";

const App = () => {
    return (
        // The main wrapper for the entire page
        <div className="min-h-screen bg-white">
            
            {/* 1. Our Sticky Navigation Bar */}
            <Navbar />

            {/* Main content area */}
            <main>
                {/* 2. The Hero Section (First Impression) */}
                <Hero />
                
                {/* 3. The Search Feature Section */}
                <section className="bg-white py-20 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                                Telusuri Database Obat
                            </h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Cari berdasarkan nama obat, merek dagang, atau indikasi untuk menemukan informasi yang paling relevan.
                            </p>
                        </div>
                    </div>
                </section>
                
                {/* Note: You will add <Features />, <HowItWorks />, and <Footer /> here later! */}
            </main>
        </div>
    );
};

export default App;
