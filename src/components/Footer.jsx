// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto rounded-t-[3rem] footer-bg text-white p-12 md:p-20 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-[#634819]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <div className="text-2xl font-bold tracking-tight uppercase">Ethernal</div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h5 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-4">Fitur</h5>
          <ul className="space-y-3 text-sm opacity-60 font-light uppercase tracking-tighter">
            <li><a href="#" className="hover:opacity-100">Kelola Hunian</a></li>
            <li><a href="#" className="hover:opacity-100">Kelola Hunian</a></li>
            <li><a href="#" className="hover:opacity-100">Kelola Hunian</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h5 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-4">Hubungi Kami</h5>
          <ul className="space-y-3 text-sm opacity-60 font-light uppercase tracking-tighter">
            <li><a href="#" className="hover:opacity-100">Contact Us</a></li>
            <li><a href="#" className="hover:opacity-100">Testimoni</a></li>
            <li><a href="#" className="hover:opacity-100">Hubungi Kami</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-white/10 text-[10px] opacity-40 tracking-[0.3em] uppercase">
        Copyright Ethernal 2024
      </div>
    </footer>
  );
};

export default Footer;