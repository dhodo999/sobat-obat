import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Settings, 
  User, 
  LogOut, 
  Bell, 
  Search,
  Activity,
  Pill,
  HeartPulse
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to auth page
    navigate("/auth");
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-slate-100">
            <h1 className="text-2xl font-black text-blue-600 tracking-tight">Sobat Obat.</h1>
          </div>
          <nav className="p-4 space-y-2 mt-4">
            <a href="#" className="flexItems text-blue-700 bg-blue-50 px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3">
              <LayoutDashboard size={20} />
              Overview
            </a>
            <a href="#" className="flexItems text-slate-500 hover:text-blue-600 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3">
              <User size={20} />
              Profil Saya
            </a>
            <a href="#" className="flexItems text-slate-500 hover:text-blue-600 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3">
              <Activity size={20} />
              Riwayat Kesehatan
            </a>
            <a href="#" className="flexItems text-slate-500 hover:text-blue-600 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3">
              <Settings size={20} />
              Pengaturan
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flexItems text-red-500 hover:text-white hover:bg-red-500 px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3 group"
          >
            <LogOut size={20} className="group-hover:stroke-white transition-colors" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="md:hidden">
            {/* Mobile Logo Logo */}
            <h1 className="text-xl font-black text-blue-600 tracking-tight">Sobat Obat.</h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-md ml-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Cari obat, artikel, atau riwayat..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <button className="relative text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700">{userData?.name || "Pengguna"}</p>
                <p className="text-xs text-slate-500">{userData?.email || "Email tidak tersedia"}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg border-2 border-blue-200">
                {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
              <div className="relative z-10 max-w-xl">
                <h2 className="text-3xl font-black mb-2">Selamat Datang, {userData?.name?.split(" ")[0] || "Sobat"}! 👋</h2>
                <p className="text-blue-100 text-lg font-medium leading-relaxed">
                  Pantau terus kesehatanmu. Hari ini adalah hari yang baik untuk mulai mengatur jadwal minum obatmu.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none transform translate-x-1/4 translate-y-1/4">
                <HeartPulse size={240} />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Pengingat Hari Ini</h3>
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                    <Bell size={24} />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-800 mb-1">3 <span className="text-base text-slate-500 font-medium">Jadwal</span></div>
                <p className="text-sm text-green-600 font-bold flex items-center gap-1">Kamu belum melewatkan obat hari ini</p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Kotak Obat Saya</h3>
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Pill size={24} />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-800 mb-1">12 <span className="text-base text-slate-500 font-medium">Obat Aktif</span></div>
                <p className="text-sm text-slate-500 font-medium">2 obat hampir habis</p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Skor Kesehatan</h3>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Activity size={24} />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-800 mb-1">92%</div>
                <p className="text-sm text-emerald-600 font-bold flex items-center gap-1">↑ 4% dari minggu lalu</p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-slate-800">Jadwal Terdekat</h3>
                    <button className="text-blue-600 font-bold text-sm hover:underline">Lihat Semua</button>
                 </div>
                 <div className="space-y-4">
                    {/* Dummy Schedule Items */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="font-bold text-slate-800 text-lg">Paracetamol 500mg</p>
                            <p className="text-sm text-slate-500 font-medium">Sesudah Makan</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-blue-600 text-lg">13:00</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Siang</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-12 bg-orange-500 rounded-full"></div>
                          <div>
                            <p className="font-bold text-slate-800 text-lg">Vitamin C</p>
                            <p className="text-sm text-slate-500 font-medium">1x Sehari</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-orange-500 text-lg">19:00</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Malam</p>
                        </div>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                 <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
                   <User size={48} />
                 </div>
                 <h3 className="text-2xl font-black text-slate-800 mb-2">Profil Kamu</h3>
                 <p className="text-slate-500 font-medium mb-8 max-w-xs">{userData?.email}</p>
                 <button className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-xl transition-colors">
                   Lengkapi Profil Kesehatan
                 </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <nav className="md:hidden border-t border-slate-200 bg-white h-20 px-6 flex items-center justify-between shrink-0">
          <button className="flex flex-col items-center gap-1 text-blue-600">
            <LayoutDashboard size={24} />
            <span className="text-[10px] font-bold">Menu</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600">
            <Pill size={24} />
            <span className="text-[10px] font-bold">Obat</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600">
            <Activity size={24} />
            <span className="text-[10px] font-bold">Riwayat</span>
          </button>
          <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-red-400 hover:text-red-500 cursor-pointer">
            <LogOut size={24} />
            <span className="text-[10px] font-bold">Keluar</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default Dashboard;
