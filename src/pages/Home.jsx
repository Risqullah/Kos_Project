import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import roomPhoto from "../assets/img/room_photo.png";
import standardImg from "../assets/img/standard.png";
import deluxeImg from "../assets/img/deluxe.png";
import suiteImg from "../assets/img/suite.png";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { HiOutlineArrowRight, HiChevronDown } from "react-icons/hi";

const Home = () => {
  const { rooms, rules, faqs } = useApp();
  const navigate = useNavigate();
  
  // State untuk FAQ Accordion
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // Ambil maksimal 3 kamar berstatus Tersedia untuk ditampilkan di halaman depan
  const featuredRooms = rooms.filter((r) => r.status === "Tersedia").slice(0, 3);

  // Hitung jumlah kamar
  const totalRooms = rooms.length;
  const availableRoomsCount = rooms.filter((r) => r.status === "Tersedia").length;

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Helper untuk memetakan gambar mockup kamar berkualitas
  const getRoomImage = (room) => {
    if (room?.image === "/room_photo.png" || room?.image?.includes("room_photo.png")) return roomPhoto;
    if (room?.image) return room.image;
    const images = {
      standard: standardImg,
      deluxe: deluxeImg,
      suite: suiteImg
    };
    return images[room?.type?.toLowerCase()] || images.standard;
  };

  return (
    <main className="max-w-7xl mx-auto space-y-16 p-4 md:p-8">
      {/* Hero Section */}
      <section className="relative h-[550px] w-full overflow-hidden rounded-3xl shadow-neumorphic-lg border border-[var(--color-primary-light)]/30">
        <img 
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2000" 
          alt="Gedung Eternal" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px]"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-16 text-white">
          <div className="max-w-xl bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 space-y-6 shadow-2xl animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-black leading-tight uppercase tracking-tight text-white text-shadow">
              Membawa Ketenangan<br />Dalam Setiap Sudut
            </h1>
            
            <p className="text-xs md:text-sm text-white/90 leading-relaxed font-light">
              Eternal menyederhanakan cara Anda menemukan hunian. Kami menyediakan ruang eksklusif khusus perempuan dengan layanan setara hotel untuk kenyamanan jangka panjang.
            </p>
            
            <div className="pt-2">
              <Button 
                onClick={() => navigate("/kamar")}
                variant="primary" 
                size="lg"
                icon={HiOutlineArrowRight}
                className="hover:translate-x-1 shadow-glow transition-all"
              >
                Cari & Reservasi Kamar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Siapa Kami */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-tertiary)] border border-[var(--color-primary-light)]/40 shadow-neumorphic-raised flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)] rounded-3xl mb-6 flex items-center justify-center font-black uppercase text-sm border border-[var(--color-primary-light)]/30 shadow-sm">
            KOS
          </div>
          <div className="grid grid-cols-2 gap-8 w-full">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-text)]/50 mb-1">Total Kamar</p>
              <span className="text-4xl font-extrabold text-[var(--color-accent-text)]">{totalRooms}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-text)]/50 mb-1">Tersedia</p>
              <span className="text-4xl font-extrabold text-[var(--color-success)]">{availableRoomsCount}</span>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 flex flex-col justify-center space-y-6 border border-[var(--color-primary-light)]/30 shadow-neumorphic-raised">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[var(--color-primary-dark)]">Siapa Kami</h2>
          <div className="space-y-4 text-[var(--color-accent-text)]/75 text-xs md:text-sm leading-relaxed font-light">
            <p>Di Eternal, kami memahami tantangan mencari hunian yang memadukan estetika, kualitas, dan fungsionalitas. Kami hadir untuk mendefinisikan ulang konsep kos di perkotaan.</p>
            <p>Sebagai penyedia solusi hunian utama khusus mahasiswi dan pekerja perempuan, misi kami adalah menyederhanakan hidup Anda melalui desain interior yang tenang, sistem keamanan modern, dan pelayanan yang penuh perhatian.</p>
          </div>
        </Card>
      </section>

      {/* Featured Rooms Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[var(--color-primary-dark)] tracking-tight">Kamar Rekomendasi</h2>
            <p className="text-xs text-[var(--color-accent-text)]/60 font-light">Pilihan tipe kamar ternyaman yang siap Anda huni hari ini.</p>
          </div>
          <Link to="/kamar" className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition flex items-center gap-1">
            Lihat Semua Kamar <HiOutlineArrowRight />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRooms.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-primary-light)]/30 shadow-sm">
              <p className="text-xs md:text-sm text-[var(--color-accent-text)]/50 font-medium">
                Saat ini seluruh kamar kos sedang terisi. Silakan hubungi pengelola untuk masuk antrean daftar tunggu.
              </p>
            </div>
          ) : (
            featuredRooms.map((room) => (
              <Card key={room.id} hoverable={true} padding="p-0 overflow-hidden" className="group border border-[var(--color-primary-light)]/20 shadow-neumorphic-raised" onClick={() => navigate(`/kamar?roomId=${room.id}`)}>
                <div className="relative h-64 w-full overflow-hidden">
                  <img 
                    src={getRoomImage(room)} 
                    alt={room.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="neumorphic">{room.status}</Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">{room.type} room</span>
                    <h3 className="text-lg font-bold text-[var(--color-primary-dark)] mt-1">{room.name}</h3>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-[var(--color-primary-light)]/10">
                    <div>
                      <span className="text-[9px] text-[var(--color-accent-text)]/60 block uppercase">Harga Sewa</span>
                      <span className="text-sm font-extrabold text-[var(--color-accent-text)]">Rp {room.price.toLocaleString("id-ID")}/bln</span>
                    </div>
                    <span className="text-xs font-bold text-[var(--color-primary-dark)] flex items-center gap-1 group-hover:text-[var(--color-primary)] transition-colors">
                      Reservasi <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Aturan Singkat Kos */}
      <section className="bg-[var(--color-tertiary)] border border-[var(--color-primary-light)]/30 rounded-3xl p-8 md:p-12 space-y-8 shadow-neumorphic-raised">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[var(--color-primary-dark)] text-center tracking-tight">Tata Tertib & Keamanan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.slice(0, 3).map((rule, idx) => (
            <Card key={idx} padding="p-6" hoverable={true} className="border border-[var(--color-primary-light)]/20 bg-[var(--color-surface)]/80 backdrop-blur-xs hover:border-[var(--color-primary)]/40 hover:shadow-neumorphic-md transition-all duration-300">
              <span className="text-xs font-black text-[var(--color-primary)]/70 block mb-2">0{idx + 1}.</span>
              <h3 className="text-sm font-bold text-[var(--color-primary-dark)] uppercase mb-2">{rule.title}</h3>
              <p className="text-xs text-[var(--color-accent-text)]/75 leading-relaxed font-light">{rule.desc}</p>
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
          <p className="text-xs text-accent-text/60 font-light">Temukan jawaban cepat untuk beberapa pertanyaan seputar Eternal Kos.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div 
                key={idx} 
                className="border border-[var(--color-primary-light)]/20 rounded-2xl bg-[var(--color-surface)] overflow-hidden shadow-neumorphic-raised hover:border-[var(--color-primary-light)]/40 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className={`w-full flex items-center justify-between p-5 text-left text-xs md:text-sm font-bold transition duration-200 ${isOpen ? 'text-[var(--color-primary-dark)] bg-[var(--color-primary-light)]/10' : 'text-[var(--color-accent-text)] hover:bg-[var(--color-primary-light)]/5'}`}
                >
                  <span>{faq.q}</span>
                  <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--color-primary-dark)]' : 'text-[var(--color-primary)]'}`}>
                    <HiChevronDown size={18} className="shrink-0" />
                  </div>
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 pb-5 pt-3 text-xs text-[var(--color-accent-text)]/75 leading-relaxed border-t border-[var(--color-primary-light)]/10 bg-[var(--color-tertiary)]/50">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;