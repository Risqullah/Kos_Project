// src/components/PageHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = () => {
  return (
    <nav className="max-w-7xl mx-auto flex justify-between items-center py-6 px-4 mb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#4A3728] rounded flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </div>
        <div className="text-2xl font-bold tracking-tight uppercase">Ethernal</div>
      </div>
      
      <div className="hidden md:flex space-x-8 text-sm font-semibold uppercase tracking-wider">
        <Link to="/" className="hover:text-[#D69156] transition">Beranda</Link>
        <Link to="/kamar" className="hover:text-[#D69156] transition">Daftar Kamar</Link>
        <Link to="/informasi" className="hover:text-[#D69156] transition">Informasi & Aturan</Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-[#D69156] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-tighter hover:opacity-90 transition">
          Daftar Sekarang
        </button>
        <Link to="/login" className="text-sm font-bold uppercase tracking-tighter hover:underline">
          Masuk
        </Link>
      </div>
    </nav>
  );
};

export default PageHeader;