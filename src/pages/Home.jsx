// src/pages/Home.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FAQ_LIST, ATURAN_KOS } from "../config/constants";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { HiOutlineArrowRight, HiChevronDown, HiChevronUp } from "react-icons/hi";

const Home = () => {
  const { rooms } = useApp();
  const navigate = useNavigate();
  
  // State untuk FAQ Accordion
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // Ambil maksimal 3 kamar untuk ditampilkan di halaman depan
  const featuredRooms = rooms.slice(0, 3);

  // Hitung jumlah kamar
  const totalRooms = rooms.length;
  const availableRoomsCount = rooms.filter((r) => r.status === "Tersedia").length;

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Helper untuk memetakan gambar mockup kamar berkualitas dari Unsplash
  const getRoomImage = (type) => {
    const images = {
      standard: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
      deluxe: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800",
      suite: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800"
    };
    return images[type] || images.standard;
  };

  return (
    <main className="max-w-7xl mx-auto space-y-16 p-4 md:p-8">
      {/* Hero Section */}
      <section className="relative h-[550px] w-full overflow-hidden rounded-[2rem] shadow-xl">
        <img 
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2000" 
          alt="Gedung Ethernal" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-white">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-4xl md:text-6xl font-black leading-tight uppercase tracking-tight">
              Membawa Ketenangan<br />Dalam Setiap Sudut
            </h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-12">
              <div className="max-w-md">
                <p className="text-xs md:text-sm opacity-90 leading-relaxed font-light">
                  Ethernal menyederhanakan cara Anda menemukan hunian. Kami menyediakan ruang eksklusif khusus perempuan dengan layanan setara hotel untuk kenyamanan jangka panjang.
                </p>
              </div>
              <Button 
                onClick={() => navigate("/kamar")}
                variant="primary" 
                size="lg"
                icon={HiOutlineArrowRight}
                className="hover:translate-x-1"
              >
                Cari Kamar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Siapa Kami */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-[#D3C1B0] text-accent-text flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 bg-primary-dark rounded-3xl mb-6 flex items-center justify-center font-bold text-white uppercase text-xs shadow-md">
            Kos
          </div>
          <div className="grid grid-cols-2 gap-8 w-full">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent-text/60 mb-1">Total Kamar</p>
              <span className="text-4xl font-extrabold">{totalRooms}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent-text/60 mb-1">Tersedia</p>
              <span className="text-4xl font-extrabold text-success">{availableRoomsCount}</span>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-primary-dark">Siapa Kami</h2>
          <div className="space-y-4 text-accent-text/75 text-xs md:text-sm leading-relaxed">
            <p>Di Ethernal, kami memahami tantangan mencari hunian yang memadukan estetika, kualitas, dan fungsionalitas. Kami hadir untuk mendefinisikan ulang konsep kos di perkotaan.</p>
            <p>Sebagai penyedia solusi hunian utama khusus mahasiswi dan pekerja perempuan, misi kami adalah menyederhanakan hidup Anda melalui desain interior yang tenang, sistem keamanan modern, dan pelayanan yang penuh perhatian.</p>
          </div>
        </Card>
      </section>

      {/* Featured Rooms Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-primary-dark tracking-tight">Kamar Rekomendasi</h2>
            <p className="text-xs text-accent-text/60">Pilihan tipe kamar ternyaman yang siap Anda huni hari ini.</p>
          </div>
          <Link to="/kamar" className="text-xs font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1">
            Lihat Semua Kamar <HiOutlineArrowRight />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <Card key={room.id} hoverable={true} padding="p-0 overflow-hidden" onClick={() => navigate(`/kamar/${room.id}`)}>
              <div className="relative h-64 w-full">
                <img 
                  src={getRoomImage(room.type)} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge>{room.status}</Badge>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{room.type} room</span>
                  <h3 className="text-lg font-bold text-primary-dark mt-1">{room.name}</h3>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <div>
                    <span className="text-[9px] text-accent-text/60 block uppercase">Harga Sewa</span>
                    <span className="text-sm font-bold text-accent-text">Rp {room.price.toLocaleString("id-ID")}/bln</span>
                  </div>
                  <span className="text-xs font-bold text-primary flex items-center gap-1">Detail <HiOutlineArrowRight /></span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Aturan Singkat Kos */}
      <section className="bg-primary-light/30 rounded-[2rem] p-8 md:p-12 space-y-8">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-primary-dark text-center tracking-tight">Tata Tertib & Keamanan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ATURAN_KOS.slice(0, 3).map((rule, idx) => (
            <Card key={idx} padding="p-6" className="bg-white/80 backdrop-blur-xs">
              <span className="text-xs font-black text-primary/70 block mb-2">0{idx + 1}.</span>
              <h3 className="text-sm font-bold text-primary-dark uppercase mb-2">{rule.title}</h3>
              <p className="text-xs text-accent-text/75 leading-relaxed">{rule.desc}</p>
            </Card>
          ))}
        </div>
        <div className="text-center pt-2">
          <Button onClick={() => navigate("/informasi")} variant="outline" size="sm">Baca Aturan Lengkap</Button>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-3xl mx-auto space-y-8 py-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-primary-dark tracking-tight">Pertanyaan Umum (FAQ)</h2>
          <p className="text-xs text-accent-text/60">Temukan jawaban cepat untuk beberapa pertanyaan seputar Eternal Kos.</p>
        </div>
        
        <div className="space-y-4">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div 
                key={idx} 
                className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-xs md:text-sm font-bold text-primary-dark hover:bg-gray-50/50 transition duration-150"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <HiChevronUp size={18} className="text-primary shrink-0" /> : <HiChevronDown size={18} className="text-primary shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-accent-text/75 leading-relaxed border-t border-gray-50 bg-[#FBF9F6]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;