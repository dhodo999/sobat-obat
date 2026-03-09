import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import LogoSVG from "@/assets/images/SobatObat_full.svg";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, SetIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link
            to="/"
            className="flex-shrink-0 flex items-center cursor-pointer"
          >
            <img src={LogoSVG} alt="Sobat Obat Logo" className="h-14 w-auto" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/kotak-obat"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Kotak Obat
            </Link>
            <Link
              to="/edukasi"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Edukasi
            </Link>
            <Link
              to="/riwayat"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Riwayat
            </Link>
            <Link
              to="/tentang-kami"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Tentang Kami
            </Link>
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
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20 rounded-lg"
            >
              <Link to="/login">Masuk</Link>
            </Button>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-blue-600 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? (
                  // 'X' Close Icon
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // 'Hamburger' Menu Icon
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-xl absolute w-full left-0 top-full rounded-b-2xl overflow-hidden z-50"
          >
            <div className="flex flex-col px-6 py-2 pb-8 border-t border-slate-100">
              {/* User Profile Mockup */}
              <div className="flex items-center justify-between py-6 border-b border-slate-100 mb-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-slate-200">
                    {/* Placeholder Avatar */}
                    <img
                      src="https://ui-avatars.com/api/?name=User&background=eff6ff&color=2563eb"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      Hai, Pengguna
                    </div>
                    <div className="text-xs text-slate-500">user@email.com</div>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {/* Links styled with bottom borders */}
              <Link
                to="/kotak-obat"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-5 text-slate-700 text-base font-medium border-b border-slate-100 flex justify-between items-center hover:text-blue-600 transition-colors"
              >
                Kotak Obat
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                to="/edukasi"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-5 text-slate-700 text-base font-medium border-b border-slate-100 flex justify-between items-center hover:text-blue-600 transition-colors"
              >
                Edukasi
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7-7"
                  />
                </svg>
              </Link>
              <Link
                to="/riwayat"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-5 text-slate-700 text-base font-medium border-b border-slate-100 flex justify-between items-center hover:text-blue-600 transition-colors"
              >
                Riwayat
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7-7"
                  />
                </svg>
              </Link>
              <Link
                to="/tentang-kami"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-5 text-slate-700 text-base font-medium flex justify-between items-center hover:text-blue-600 transition-colors"
              >
                Tentang Kami
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7-7"
                  />
                </svg>
              </Link>
              {/* Language/Region Dropdown Button Mockup */}
              <div className="mt-10">
                <button className="w-full flex items-center justify-between px-5 py-4 border border-slate-200 rounded-2xl text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-slate-500"
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
                    ID
                  </div>
                  <svg
                    className="w-4 h-4 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
