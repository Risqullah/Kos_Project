import React from 'react';

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto space-y-12 p-4 md:p-8">
      {/* Hero Section */}
      <section className="relative h-[650px] w-full overflow-hidden rounded-[2rem]">
        <img 
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2000" 
          alt="Gedung Ethernal" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20 text-white">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight uppercase tracking-tight">
              Membawa Ketenangan<br />Dalam Setiap Sudut
            </h1>
            
            <div className="flex flex-col md:flex-row items-end gap-12">
              <div className="max-w-md">
                <p className="text-sm md:text-base opacity-90 leading-relaxed font-light">
                  Ethernal menyederhanakan cara Anda menemukan hunian. Kami menyediakan ruang eksklusif dengan layanan setara hotel untuk kenyamanan jangka panjang.
                </p>
              </div>
              <button className="bg-[#D69156] text-white px-10 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition">
                Mari Lihat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Siapa Kami */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#D3C1B0] rounded-[2rem] p-10 flex flex-col items-center justify-center text-[#4A3728] h-[350px] text-center">
          <div className="w-24 h-24 bg-[#B89F86] rounded-full mb-8 flex items-center justify-center font-bold text-white uppercase text-xs">
            Gambar
          </div>
          <div className="grid grid-cols-2 gap-8 w-full">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Total Kamar</p>
              <span className="text-4xl font-bold">17</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Kamar Tersedia</p>
              <span className="text-4xl font-bold">5</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[2rem] p-12 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold uppercase tracking-tight">Siapa Kami</h2>
          <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
            <p>Di Ethernal, kami memahami tantangan mencari hunian yang memadukan estetika, kualitas, dan fungsionalitas. Kami hadir untuk mendefinisikan ulang konsep kos di perkotaan.</p>
            <p>Sebagai penyedia solusi hunian utama, misi kami adalah menyederhanakan hidup Anda melalui desain interior yang tenang dan pelayanan yang penuh perhatian.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10">
        <h2 className="text-2xl font-bold uppercase text-center mb-16 tracking-widest">Bagaimana Kami Mempermudah Hidup Anda</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[2rem] shadow-sm text-center space-y-4 h-[350px] flex flex-col justify-end">
            <h3 className="text-lg font-bold uppercase">Layanan Kebersihan</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Kami memastikan setiap sudut ruang Anda selalu dalam kondisi terbaik tanpa Anda harus repot.</p>
          </div>
          <div className="bg-white p-10 rounded-[2rem] shadow-sm text-center space-y-4 h-[350px] flex flex-col justify-end">
            <h3 className="text-lg font-bold uppercase">Keamanan 24/7</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Privasi dan keamanan Anda adalah prioritas utama kami dengan sistem akses pintar dan penjagaan berkala.</p>
          </div>
          <div className="bg-white p-10 rounded-[2rem] shadow-sm text-center space-y-4 h-[350px] flex flex-col justify-end">
            <h3 className="text-lg font-bold uppercase">Area Komunal</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Nikmati fasilitas bersama mulai dari rooftop lounge hingga ruang kerja yang tenang dan inspiratif.</p>
          </div>
        </div>
      </section>

      {/* Grid Detail */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
        <div className="md:col-span-3 bg-[#E6DED5] p-8 rounded-[2rem] h-[280px] flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase mb-4">Solusi Lengkap</h4>
            <p className="text-[10px] text-gray-500">Kami mengelola semua aspek kenyamanan Anda, menghemat waktu dan pikiran.</p>
          </div>
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.243a1 1 0 10-1.414-1.414l-.707.707a1 1 0 101.414 1.414l.707-.707zM16 18a1 1 0 100-2 1 1 0 000 2z"></path>
            </svg>
          </div>
        </div>

        <div className="md:col-span-3 bg-[#E6DED5] p-8 rounded-[2rem] h-[280px] flex flex-col justify-center text-center">
          <h4 className="text-xs font-bold uppercase mb-4">Dukungan Siap Sedia</h4>
          <p className="text-[10px] text-gray-500">Layanan perbaikan dan keluhan tersedia kapan saja untuk Anda.</p>
        </div>

        <div className="md:col-span-6 bg-[#E6DED5] p-12 rounded-[2rem] h-[280px] flex flex-col justify-center text-center">
          <h4 className="text-xl font-bold uppercase mb-4">Tanpa Batasan Variasi</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">Berbagai tipe kamar tersedia mulai dari Standard hingga Penthouse untuk menyesuaikan kebutuhan Anda.</p>
        </div>

        <div className="md:col-span-6 bg-[#E6DED5] p-12 rounded-[2rem] h-[280px] flex flex-col justify-center text-center">
          <h4 className="text-xl font-bold uppercase mb-4">Kualitas Unggul</h4>
          <p className="text-xs text-gray-500">Interior didesain oleh ahli untuk kenyamanan maksimal.</p>
        </div>

        <div className="md:col-span-6 bg-[#E6DED5] p-12 rounded-[2rem] h-[280px] flex flex-col justify-center text-center">
          <h4 className="text-xl font-bold uppercase mb-4">Furnitur Kustom</h4>
          <p className="text-xs text-gray-500">Setiap kamar dilengkapi furnitur yang dirancang khusus untuk Ethernal tanpa mengabaikan gaya.</p>
        </div>
      </section>
    </main>
  );
};

export default Home;