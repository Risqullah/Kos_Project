// src/pages/RoomsList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { HiOutlineArrowRight } from "react-icons/hi";

const RoomsList = () => {
  const { rooms } = useApp();
  const navigate = useNavigate();
  
  // State Filter
  const [selectedType, setSelectedType] = useState("semua");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Filter logika
  const filteredRooms = rooms.filter((room) => {
    const typeMatch = selectedType === "semua" || room.type === selectedType;
    const availableMatch = !onlyAvailable || room.status === "Tersedia";
    return typeMatch && availableMatch;
  });

  // Helper gambar Unsplash dinamis
  const getRoomImage = (type) => {
    const images = {
      standard: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
      deluxe: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800",
      suite: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800"
    };
    return images[type] || images.standard;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-4 md:p-8">
      {/* Header Halaman */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold uppercase text-primary-dark tracking-tight">Galeri Kamar Ethernal</h1>
        <p className="text-xs text-accent-text/60 max-w-lg">Temukan ruang pribadi terbaik Anda. Klik kamar untuk informasi selengkapnya atau melakukan reservasi online.</p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
        {/* Tab Filter Tipe Kamar */}
        <div className="flex flex-wrap gap-2">
          {["semua", "standard", "deluxe", "suite"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${
                selectedType === type
                  ? "bg-primary text-white shadow-xs"
                  : "bg-accent-bg text-accent-text hover:bg-primary-light/50"
              }`}
            >
              {type === "semua" ? "Semua Tipe" : `${type} room`}
            </button>
          ))}
        </div>

        {/* Toggle Kamar Tersedia */}
        <label className="flex items-center gap-2 text-xs font-bold text-accent-text cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 accent-primary"
          />
          Hanya Kamar Tersedia
        </label>
      </div>

      {/* Grid Kamar */}
      {filteredRooms.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-xs">
          <p className="text-gray-400 text-sm font-medium">Tidak ada kamar yang cocok dengan kriteria filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              hoverable={true}
              padding="p-0 overflow-hidden"
              onClick={() => navigate(`/kamar/${room.id}`)}
              className="flex flex-col h-full"
            >
              <div className="relative h-56 w-full">
                <img
                  src={getRoomImage(room.type)}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge>{room.status}</Badge>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      {room.type} room
                    </span>
                    <span className="text-[10px] font-bold text-accent-text/50">ID: {room.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary-dark">{room.name}</h3>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <div>
                    <span className="text-[9px] text-accent-text/60 block uppercase">Harga Sewa</span>
                    <span className="text-sm font-bold text-accent-text">
                      Rp {room.price.toLocaleString("id-ID")}/bln
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group"
                  >
                    <span className="flex items-center gap-1">
                      Lihat Detail <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsList;
