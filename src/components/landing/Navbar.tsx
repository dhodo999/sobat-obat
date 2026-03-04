import { useEffect, useState } from "react";
import LogoSVG from "@/assets/images/SobatObat_full.svg";

const Navbar = () => {
  const [isScrolled, SetIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        SetIsScrolled(true);
      } else {
        SetIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <img src={LogoSVG} alt="Sobat Obat Logo" className="h-14 w-auto" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Kotak Obat
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Edukasi
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Riwayat
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Tentang Kami
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1 text-slate-600 font-medium cursor-pointer hover:text-slate-900">
              <span>ID</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm shadow-blue-600/20">
              Masuk
            </button>
            <div className="md:hidden flex items-center">
              <button className="text-slate-600 hover:text-slate-900 focus:outline-none">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
