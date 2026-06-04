import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="font-['Plus_Jakarta_Sans'] bg-[#F8F5F2] text-[#4A3728] min-h-screen">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-6 px-4 mb-4">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4A3728] rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </div>
            <div className="text-2xl font-bold tracking-tight uppercase">Ethernal</div>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-semibold uppercase tracking-wider">
            <Link to="/" className="hover:text-[#D69156] transition">Beranda</Link>
            <Link to="/fitur" className="hover:text-[#D69156] transition">Fitur</Link>
            <Link to="/testimoni" className="hover:text-[#D69156] transition">Testimoni</Link>
            <Link to="/faq" className="hover:text-[#D69156] transition">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
            <button className="bg-[#D69156] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-tighter hover:opacity-90 transition">Daftar Sekarang</button>
            <Link to="/login" className="text-sm font-bold uppercase tracking-tighter hover:underline">Masuk</Link>
        </div>
      </nav>

      {/* Konten Halaman (Home, dll akan dirender di sini) */}
      <Outlet />

      {/* Footer */}
      <footer className="max-w-7xl mx-auto rounded-t-[3rem] bg-[#634819] text-white p-12 md:p-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#634819]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </div>
                    <div className="text-2xl font-bold tracking-tight uppercase">Ethernal</div>
                </div>
            </div>
            
            <div className="space-y-6">
                <h5 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-4">Fitur</h5>
                <ul className="space-y-3 text-sm opacity-60 font-light uppercase tracking-tighter">
                    <li><Link to="/" className="hover:opacity-100">Kelola Hunian</Link></li>
                </ul>
            </div>

            <div className="space-y-6">
                <h5 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-4">Hubungi Kami</h5>
                <ul className="space-y-3 text-sm opacity-60 font-light uppercase tracking-tighter">
                    <li><Link to="/" className="hover:opacity-100">Contact Us</Link></li>
                </ul>
            </div>
        </div>
        <div className="text-center pt-8 border-t border-white/10 text-[10px] opacity-40 tracking-[0.3em] uppercase">
            Copyright Ethernal 2024
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;