import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./Auth.css";

// SVG Icons for the social login buttons
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.6v-3h2.4V9.41c0-2.38 1.4-3.69 3.58-3.69 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48V12h2.66l-.43 3h-2.23v6.8C18.56 20.87 22 16.84 22 12z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9H12.7v1.56h.05c.47-.89 1.62-1.83 3.33-1.83 3.56 0 4.22 2.34 4.22 5.39v6.33zM5.34 7.45a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
  </svg>
);

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const location = useLocation();

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Determine the initial state based on the route
    if (location.pathname === "/register") {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  }, [location.pathname]);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Password tidak sama!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Switch to login view after successful registration
        setIsSignUp(false);
        setPassword(""); // clear password for safety
        setConfirmPassword("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token
        localStorage.setItem("token", data.token);
        // Save basic user info if needed
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Berhasil masuk!");
        window.location.href = "/"; // redirect to home
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper font-sans text-slate-800">
      <div className={`auth-container ${isSignUp ? "active" : ""}`}>
        <Link
          to="/"
          className="absolute top-4 left-4 md:top-8 md:left-8 text-slate-700 hover:text-blue-600 font-bold transition flex items-center justify-center gap-2 bg-white w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-2.5 rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] ring-1 ring-slate-100 z-50 hover:shadow-xl hover:-translate-y-0.5"
          aria-label="Kembali ke Beranda"
        >
          <svg
            className="w-5 h-5 md:w-4 md:h-4 stroke-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="hidden md:inline">Kembali ke Beranda</span>
        </Link>

        {/* Sign Up Panel */}
        <div className="form-container sign-up">
          <form
            onSubmit={handleRegister}
            className="px-8 sm:px-16 md:px-24 h-full flex flex-col justify-start md:justify-center items-center text-center bg-white pt-24 pb-8 md:pt-0 overflow-y-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-black mb-6 text-slate-800 tracking-tight">
              Buat Akun
            </h1>
            <Input
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 mb-4 py-8 px-6 text-lg rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500 transition-all font-medium"
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 mb-4 py-8 px-6 text-lg rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500 transition-all font-medium"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 mb-4 py-8 px-6 text-lg rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500 transition-all font-medium"
              required
            />
            <Input
              type="password"
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 mb-2 py-8 px-6 text-lg rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500 transition-all font-medium"
              required
            />
            <span className="text-sm text-slate-500 mt-2 mb-3 block font-medium">
              atau daftar menggunakan
            </span>
            <div className="social-icons flex gap-4 mb-2 !mt-2">
              <a
                href="#"
                className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors text-slate-600"
              >
                <GoogleIcon />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors text-slate-600"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors text-slate-600"
              >
                <GithubIcon />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors text-slate-600"
              >
                <LinkedinIcon />
              </a>
            </div>
            {error && isSignUp && (
              <span className="text-sm text-red-500 mb-4 block font-bold bg-red-50 py-2 px-4 rounded-lg w-full">
                {error}
              </span>
            )}

            <Button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold tracking-widest uppercase px-16 py-8 h-auto text-lg rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all w-full md:w-auto"
            >
              {loading ? "Memproses..." : "Daftar"}
            </Button>

            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className="md:hidden mt-6 text-base text-slate-600 font-medium hover:text-blue-600 transition-colors"
            >
              Sudah punya akun?{" "}
              <span className="text-blue-600 font-bold underline">Masuk</span>
            </button>
          </form>
        </div>

        {/* Sign In Panel */}
        <div className="form-container sign-in">
          <form
            onSubmit={handleLogin}
            className="px-8 sm:px-16 md:px-24 h-full flex flex-col justify-start md:justify-center items-center text-center bg-white pt-24 pb-8 md:pt-0 overflow-y-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-black mb-6 text-slate-800 tracking-tight">
              Masuk
            </h1>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 mb-4 py-8 px-6 text-lg rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500 transition-all font-medium"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 mb-2 py-8 px-6 text-lg rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500 transition-all font-medium"
              required
            />
            <span className="text-sm text-slate-500 mt-2 mb-3 block font-medium">
              atau masuk menggunakan
            </span>
            <div className="social-icons flex gap-4 mb-2 !mt-2">
              <a
                href="#"
                className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors text-slate-600"
              >
                <GoogleIcon />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors text-slate-600"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors text-slate-600"
              >
                <GithubIcon />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors text-slate-600"
              >
                <LinkedinIcon />
              </a>
            </div>
            {error && !isSignUp && (
              <span className="text-sm text-red-500 mb-4 block font-bold bg-red-50 py-2 px-4 rounded-lg w-full">
                {error}
              </span>
            )}

            <a
              href="#"
              className="text-base text-blue-600 hover:text-blue-800 hover:underline mb-8 mt-4 block w-full text-right font-medium transition-colors"
            >
              Lupa Password Anda?
            </a>

            <Button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold tracking-widest uppercase px-16 py-8 h-auto text-lg rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all w-full md:w-auto"
            >
              {loading ? "Memproses..." : "Masuk"}
            </Button>

            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className="md:hidden mt-6 text-base text-slate-600 font-medium hover:text-blue-600 transition-colors"
            >
              Belum punya akun?{" "}
              <span className="text-blue-600 font-bold underline">Daftar</span>
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left px-8 sm:px-16 md:px-24 text-center text-white flex flex-col items-center justify-center">
              <h1 className="text-4xl lg:text-5xl font-black mb-6 drop-shadow-md tracking-tight">
                Selamat Datang Kembali!
              </h1>
              <p className="text-blue-100 mb-10 text-lg leading-relaxed max-w-[320px] mx-auto font-medium shadow-black/5 flex-1 max-h-24">
                Masukkan detail personal anda dan bergabung kembali bersama
                Sobat Obat.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSignUp(false)}
                className="text-white border-2 border-white hover:bg-white hover:text-blue-700 font-bold tracking-widest uppercase px-16 py-8 h-auto text-lg rounded-2xl bg-transparent transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Sign In
              </Button>
            </div>
            <div className="toggle-panel toggle-right px-8 sm:px-16 md:px-24 text-center text-white flex flex-col items-center justify-center">
              <h1 className="text-4xl lg:text-5xl font-black mb-6 drop-shadow-md tracking-tight">
                Halo, Sobat!
              </h1>
              <p className="text-blue-100 mb-10 text-lg leading-relaxed max-w-[320px] mx-auto font-medium shadow-black/5 flex-1 max-h-24">
                Daftarkan diri anda dengan personal detail untuk mengeksplor
                fitur website.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSignUp(true)}
                className="text-white border-2 border-white hover:bg-white hover:text-blue-700 font-bold tracking-widest uppercase px-16 py-8 h-auto text-lg rounded-2xl bg-transparent transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
