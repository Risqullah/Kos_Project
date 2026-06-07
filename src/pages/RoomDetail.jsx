// src/pages/RoomDetail.jsx
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ROOM_TYPES, ROOM_FACILITIES } from "../config/constants";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { 
  HiOutlineSun, 
  HiOutlineWifi, 
  HiOutlineKey, 
  HiOutlineHome, 
  HiOutlineArchive, 
  HiOutlineDesktopComputer, 
  HiOutlineCloud,
  HiOutlineArrowLeft
} from "react-icons/hi";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms } = useApp();

  // Cari kamar berdasarkan ID
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-6">
        <h2 className="text-xl font-bold text-danger">Kamar tidak ditemukan</h2>
        <p className="text-xs text-accent-text/60">Kamar dengan ID {id} tidak ada di database kami.</p>
        <Link to="/kamar" className="inline-block text-xs font-bold text-primary hover:underline">
          Kembali ke Galeri Kamar
        </Link>
      </div>
    );
  }

  // Ambil data spesifikasi detail berdasarkan tipe kamar
  const typeDetails = ROOM_TYPES.find((t) => t.id === room.type) || {};

  // Map ikon fasilitas
  const iconMap = {
    HiOutlineSun,
    HiOutlineWifi,
    HiOutlineKey,
    HiOutlineHome,
    HiOutlineArchive,
    HiOutlineDesktopComputer,
    HiOutlineCloud
  };

  // Helper gambar Unsplash dinamis
  const getRoomImage = (type) => {
    const images = {
      standard: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200",
      deluxe: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200",
      suite: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200"
    };
    return images[type] || images.standard;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-8">
      {/* Back Button */}
      <Link 
        to="/kamar" 
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-text/70 hover:text-primary transition"
      >
        <HiOutlineArrowLeft size={16} /> Kembali ke Galeri Kamar
      </Link>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Image & Description */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative h-[300px] md:h-[450px] w-full rounded-[2rem] overflow-hidden shadow-md">
            <img 
              src={getRoomImage(room.type)} 
              alt={room.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <Badge>{room.status}</Badge>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xs space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{room.type} room</span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark mt-1">{room.name}</h1>
              </div>
              <span className="text-xs font-bold bg-accent-bg text-accent-text px-4 py-2 rounded-full border border-gray-100">
                Kode Kamar: {room.id}
              </span>
            </div>
            
            <div className="border-t border-gray-50 pt-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary-dark">Deskripsi Kamar</h3>
              <p className="text-xs md:text-sm text-accent-text/75 leading-relaxed">
                {typeDetails.description || "Kamar kos premium yang didesain secara estetis dan ergonomis demi menjamin kenyamanan belajar dan istirahat Anda."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Price, Specifications, Facilities & Reservation CTA */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Price & Booking Card */}
          <Card className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] text-accent-text/60 font-bold uppercase tracking-widest block">Harga Bulanan</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-primary-dark">Rp {room.price.toLocaleString("id-ID")}</span>
                <span className="text-xs text-accent-text/50 font-medium">/ bulan</span>
              </div>
            </div>

            <div className="border-t border-gray-50 pt-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-accent-text/60">Ukuran Kamar</span>
                <span className="font-bold text-accent-text">{typeDetails.size || "3x4 m"}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-accent-text/60">Tipe Kontrak</span>
                <span className="font-bold text-accent-text">Bulanan</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-accent-text/60">Kategori Hunian</span>
                <span className="font-bold text-primary font-semibold uppercase tracking-wider">Khusus Perempuan</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => navigate(`/reservasi/${room.id}`)}
                disabled={room.status !== "Tersedia"}
                variant={room.status === "Tersedia" ? "primary" : "outline"}
                className="w-full"
              >
                {room.status === "Tersedia" ? "Reservasi Sekarang" : `Kamar ${room.status}`}
              </Button>
            </div>
          </Card>

          {/* Facilities Card */}
          <Card className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary-dark">Fasilitas Kamar</h3>
            <div className="grid grid-cols-1 gap-3">
              {ROOM_FACILITIES.filter(facility => room.facilities.includes(facility.id)).map((facility) => {
                const IconComponent = iconMap[facility.icon] || HiOutlineKey;
                return (
                  <div key={facility.id} className="flex items-center gap-3 p-3 rounded-xl bg-accent-bg border border-gray-100/50">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-xs">
                      <IconComponent size={16} />
                    </div>
                    <span className="text-xs font-bold text-accent-text">{facility.name}</span>
                  </div>
                );
              })}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
