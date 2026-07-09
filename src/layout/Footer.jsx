import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto rounded-t-3xl bg-[var(--color-primary-dark)] text-white py-10 px-8 md:px-12 mt-12 shadow-inner">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition w-max">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-[var(--color-primary-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <div className="text-xl font-bold tracking-tight uppercase font-serif">Eternal Kost</div>
          </Link>
          <p className="text-xs text-white/70 leading-relaxed font-sans max-w-sm">
            Hunian kos khusus wanita premium yang aman, bersih, dan nyaman. Dilengkapi sistem keamanan smart key dan fasilitas lengkap di lokasi strategis.
          </p>
        </div>
        
        <div className="md:col-span-3 space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-light)] border-b border-white/10 pb-2">Navigasi</h5>
          <ul className="space-y-2 text-xs text-white/70 font-sans font-medium">
            <li><Link to="/" className="hover:text-white hover:underline transition">Beranda</Link></li>
            <li><Link to="/kamar" className="hover:text-white hover:underline transition">Reservasi Kamar</Link></li>
            <li><Link to="/informasi" className="hover:text-white hover:underline transition">Informasi & Aturan</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-light)] border-b border-white/10 pb-2">Hubungi Kami</h5>
          <ul className="space-y-2 text-xs text-white/70 font-sans font-medium">
            <li>WhatsApp: +62 812-3456-7890</li>
            <li>Email: info@eternal.com</li>
            <li>Alamat: Jl. Topaz No. 7, Kota Surabaya</li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-6 border-t border-white/10 text-[10px] text-white/40 tracking-[0.2em] uppercase font-sans font-bold">
        Copyright &copy; 2026 Eternal Kost. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
