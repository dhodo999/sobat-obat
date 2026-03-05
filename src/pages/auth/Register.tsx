import { Link } from "react-router-dom";
import LogoSVG from "@/assets/images/SobatObat_full.svg";

const Register = () => {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Form Section */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link to="/">
              <img className="h-12 w-auto" src={LogoSVG} alt="Sobat Obat" />
            </Link>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-slate-900">
              Selamat Datang
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Sudah punya akun?{" "}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                Masuk sekarang
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <form className="space-y-6" action="#" method="POST">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
                  Alamat Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-xl border-0 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-xl border-0 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-slate-600">
                    Ingat saya
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                    Lupa password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="button" // Change to "submit" when connecting to backend
                  className="flex w-full justify-center rounded-xl bg-blue-600 px-3 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Masuk ke Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Graphic Section (Hidden on Mobile) */}
      <div className="relative hidden w-0 flex-1 lg:block bg-blue-600 border-l border-blue-700 overflow-hidden">
        <div className="absolute inset-0 w-full h-full object-cover bg-gradient-to-br from-blue-600 to-blue-800" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-12 text-center">
           <svg className="w-24 h-24 mb-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
           <h2 className="text-4xl font-black tracking-tight mb-4">Informasi Obat Akurat,<br/>Di Ujung Jari Anda.</h2>
           <p className="text-xl text-blue-100 max-w-lg">Cek interaksi obat, simpan riwayat konsumsi, dan kelola kesehatan Anda dengan bantuan AI.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
