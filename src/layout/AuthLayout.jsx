import { Outlet, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function AuthLayout() {
  const { currentUser } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-accent-bg)] font-sans">
      {/* Navbar from landing page */}
      <nav className="max-w-7xl w-full mx-auto flex justify-between items-center py-6 px-4 mb-4 z-20">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
          <div className="w-8 h-8 bg-[var(--color-primary-dark)] rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
          <div className="text-2xl font-bold tracking-tight uppercase text-[var(--color-primary-dark)]">Eternal</div>
        </Link>
        
        <div className="hidden md:flex space-x-8 text-sm font-semibold uppercase tracking-wider">
          <Link to="/" className="hover:text-[var(--color-primary)] transition">Beranda</Link>
          <Link to="/kamar" className="hover:text-[var(--color-primary)] transition">Daftar Kamar</Link>
          <Link to="/informasi" className="hover:text-[var(--color-primary)] transition">Informasi & Aturan</Link>
        </div>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <Link 
              to={currentUser.role === "owner" ? "/admin" : "/tenant"} 
              className="flex items-center gap-2.5 px-4 py-2 bg-[var(--color-tertiary)] border border-[var(--color-primary-light)] rounded-lg hover:bg-[var(--color-primary-light)]/40 transition shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                {currentUser.name.charAt(0)}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)] hidden sm:inline">
                {currentUser.name.split(" ")[0]} (Dashboard)
              </span>
            </Link>
          ) : (
            <>
              <Link to="/register" className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition inline-block text-center">
                Daftar Sekarang
              </Link>
              <Link to="/login" className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent-text)] hover:text-[var(--color-primary)] transition">Masuk</Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Form container */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        {/* Background Decorative */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--color-primary)]/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[var(--color-secondary)]/5 blur-3xl" />
        </div>

        <div className="w-full max-w-[420px] relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
