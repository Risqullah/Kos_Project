import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import roomPhoto from "../assets/img/room_photo.png";
import standardImg from "../assets/img/standard.png";
import deluxeImg from "../assets/img/deluxe.png";
import suiteImg from "../assets/img/suite.png";
import { ROOM_FACILITIES } from "../config/constants";
import qrisMockup from "../assets/img/qris_mockup.png";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import {
  HiCheckCircle,
  HiChevronDown,
  HiOutlineKey,
  HiOutlineSun,
  HiOutlineWifi,
  HiOutlineHome,
  HiOutlineArchive,
  HiOutlineDesktopComputer,
  HiOutlineCloud,
  HiInformationCircle,
  HiShieldCheck
} from "react-icons/hi";

const RoomsList = () => {
  const { id: routeId, roomId: routeRoomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { rooms, addReservation, currentUser } = useApp();

  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    startDate: "",
    duration: "1",
    nik: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Extract selected room ID from Route Params or Query Params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryId = queryParams.get("roomId");
    const targetId = routeId || routeRoomId || queryId;

    if (targetId && rooms.some(r => r.id === targetId)) {
      setSelectedRoomId(targetId);
    } else if (rooms.length > 0) {
      // Find first available room, or default to first room
      const firstAvailable = rooms.find(r => r.status === "Tersedia");
      setSelectedRoomId(firstAvailable ? firstAvailable.id : rooms[0].id);
    }
  }, [routeId, routeRoomId, location.search, rooms]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync form details with logged-in user profile
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      }));
    }
  }, [currentUser]);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
  const isRoomAvailable = selectedRoom?.status === "Tersedia";
  const iconMap = {
    HiOutlineSun,
    HiOutlineWifi,
    HiOutlineKey,
    HiOutlineHome,
    HiOutlineArchive,
    HiOutlineDesktopComputer,
    HiOutlineCloud
  };

  const getRoomImage = () => {
    if (selectedRoom?.image === "/room_photo.png" || selectedRoom?.image?.includes("room_photo.png")) {
      return roomPhoto;
    }
    if (selectedRoom?.image) {
      return selectedRoom.image;
    }
    const type = selectedRoom?.type?.toLowerCase();
    if (type === "deluxe") return deluxeImg;
    if (type === "suite") return suiteImg;
    return standardImg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };



  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama lengkap wajib diisi.";
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor WhatsApp wajib diisi.";
    } else if (!/^\d{9,15}$/.test(formData.phone)) {
      newErrors.phone = "Nomor WhatsApp harus berupa angka (9-15 digit).";
    }
    if (!formData.startDate) newErrors.startDate = "Tanggal mulai sewa wajib dipilih.";
    if (!formData.nik) {
      newErrors.nik = "NIK wajib diisi.";
    } else if (!/^\d{16}$/.test(formData.nik.trim())) {
      newErrors.nik = "NIK harus terdiri dari 16 digit angka.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRoomId) return;
    if (!isRoomAvailable) {
      alert("Kamar yang Anda pilih tidak tersedia untuk direservasi.");
      return;
    }
    if (!validateForm()) return;

    setLoading(true);

    const result = await addReservation({
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      roomPrice: selectedRoom.price,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      startDate: formData.startDate,
      duration: parseInt(formData.duration),
      nik: formData.nik.trim()
    });

    setLoading(false);
    // Jika penyimpanan berhasil, ubah state isSubmitted menjadi true untuk menampilkan pop-up sukses
    if (result && result.success) {
      setIsSubmitted(true);
    } else {
      alert(result?.message || "Gagal mengirim pengajuan reservasi.");
    }
  };



  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-8">
      {/* Header Halaman */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-extrabold uppercase text-[var(--color-primary-dark)] tracking-tight">Formulir Reservasi Kos</h1>
        <p className="text-xs text-[var(--color-accent-text)]/60 max-w-lg">
          Lengkapi formulir pengajuan sewa untuk kamar kos pilihan Anda. Seluruh kamar memiliki desain & fasilitas standar yang sama.
        </p>
      </div>

      <div className="space-y-8">
        {/* Top Row: Ringkasan Pilihan & Fasilitas Kamar (Horizontal side-by-side) */}
        {selectedRoom && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ringkasan Pilihan Card */}
            <Card className="border border-[var(--color-primary-light)]/40 shadow-neumorphic-raised flex flex-col justify-between h-full">
              <div className="space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary-dark)] border-b border-[var(--color-primary-light)]/40 pb-3">Ringkasan Pilihan</h3>
                
                <div className="space-y-4">
                  {/* Large Room Preview Image */}
                  <div className="w-full h-52 sm:h-60 rounded-xl overflow-hidden shadow-sm border border-[var(--color-primary-light)]/20 bg-gray-50">
                    <img 
                      src={getRoomImage()} 
                      alt={selectedRoom.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                          {selectedRoom.type} room
                        </span>
                        <h4 className="text-lg font-bold text-[var(--color-primary-dark)] mt-0.5">
                          {selectedRoom.name}
                        </h4>
                      </div>
                      <span className="font-extrabold text-[var(--color-primary-dark)] font-serif text-sm">
                        Rp {selectedRoom.price.toLocaleString("id-ID")}/bln
                      </span>
                    </div>

                    <div className="pt-3 border-t border-[var(--color-primary-light)]/10 text-xs">
                      <div>
                        <span className="text-[9px] text-[var(--color-accent-text)]/50 uppercase block">Kategori Hunian</span>
                        <span className="font-bold text-[var(--color-primary)] uppercase tracking-wider text-[10px]">
                          Khusus Perempuan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Fasilitas Kamar Card */}
            <Card className="border border-[var(--color-primary-light)]/40 shadow-neumorphic-raised flex flex-col justify-between h-full">
              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary-dark)] border-b border-[var(--color-primary-light)]/40 pb-3">Fasilitas Kamar</h3>
                  <p className="text-[11px] text-[var(--color-accent-text)]/60 font-sans mt-2">
                    Fasilitas berikut sudah terpasang langsung di dalam kamar kos Anda dan siap digunakan sejak hari pertama sewa:
                  </p>
                </div>

                {/* Grid Fasilitas Diperbesar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ROOM_FACILITIES.filter(facility => selectedRoom.facilities.includes(facility.id)).map((facility) => {
                    const IconComponent = iconMap[facility.icon] || HiOutlineKey;
                    return (
                      <div key={facility.id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-tertiary)] border border-[var(--color-primary-light)]/30 shadow-xs hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/10 transition duration-200">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[var(--color-primary)] shadow-sm border border-[var(--color-primary-light)]/20 shrink-0">
                          <IconComponent size={20} />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-[var(--color-accent-text)]">{facility.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--color-primary-light)]/10 text-[10px] text-[var(--color-accent-text)]/40 italic">
                * Pemeliharaan AC dan fasilitas kamar lainnya ditanggung sepenuhnya oleh pengelola.
              </div>
            </Card>
          </div>
        )}

        {/* Bottom Row: Form Pengajuan Reservasi */}
        <div className="w-full">
          {!currentUser ? (
            <Card className="space-y-6 border border-[var(--color-primary-light)]/40 shadow-neumorphic-raised text-center py-12">
              <div className="max-w-md mx-auto space-y-5">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary-light)]/20 text-[var(--color-primary)] flex items-center justify-center mx-auto shadow-sm">
                  <HiOutlineKey size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-serif text-[var(--color-primary-dark)]">Login Diperlukan</h3>
                  <p className="text-xs text-[var(--color-accent-text)]/70 leading-relaxed">
                    Anda harus masuk sebagai Penghuni terlebih dahulu untuk dapat mengajukan reservasi kamar.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Button onClick={() => navigate("/login")} variant="primary" className="px-8">
                    Masuk Sekarang
                  </Button>
                  <Button onClick={() => navigate("/register")} variant="outline" className="px-8">
                    Daftar Akun
                  </Button>
                </div>
              </div>
            </Card>
          ) : currentUser.role === "owner" ? (
            <Card className="space-y-6 border border-[var(--color-primary-light)]/40 shadow-neumorphic-raised text-center py-12">
              <div className="max-w-md mx-auto space-y-5">
                <div className="w-16 h-16 rounded-full bg-[var(--color-danger)]/10 text-[var(--color-danger)] flex items-center justify-center mx-auto shadow-sm">
                  <HiInformationCircle size={32} className="text-[var(--color-danger)]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-serif text-[var(--color-primary-dark)]">Akses Ditolak</h3>
                  <p className="text-xs text-[var(--color-accent-text)]/70 leading-relaxed">
                    Akun Owner tidak dapat melakukan reservasi kamar. Jika ingin mendaftarkan penghuni secara manual, silakan gunakan menu Dashboard Admin.
                  </p>
                </div>
                <Button onClick={() => navigate("/admin")} variant="primary" className="px-8 mx-auto">
                  Ke Dashboard Admin
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="space-y-6 border border-[var(--color-primary-light)]/40 shadow-neumorphic-raised">
              <div className="space-y-4">
                {/* Custom Dropdown Selector */}
                <div className="space-y-1.5 w-full relative" ref={dropdownRef}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/85">
                    Nomor/ID Kamar <span className="text-danger">*</span>
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs bg-[var(--color-surface)] border border-[var(--color-primary-light)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                  >
                    {selectedRoom ? (
                      <div className="flex items-center justify-between w-full pr-2">
                        <span className={`font-bold ${selectedRoom.status !== "Tersedia" ? "text-gray-400" : "text-[var(--color-accent-text)]"}`}>
                          {selectedRoom.name}
                        </span>
                        <Badge status={selectedRoom.status}>{selectedRoom.status}</Badge>
                      </div>
                    ) : (
                      <span className="text-gray-400">Pilih nomor kamar...</span>
                    )}
                    <HiChevronDown className={`text-[var(--color-primary)] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} size={16} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-30 w-full mt-2 bg-white border border-[var(--color-primary-light)]/60 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {rooms.map((r) => {
                        const isAvailable = r.status === "Tersedia";
                        const idColorClass = isAvailable 
                          ? "text-[var(--color-accent-text)] font-extrabold" 
                          : "text-gray-400 font-medium";

                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => {
                              setSelectedRoomId(r.id);
                              setDropdownOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--color-primary-light)]/20 transition text-left border-b border-[var(--color-primary-light)]/10 last:border-b-0"
                          >
                            <span className={idColorClass}>{r.name}</span>
                            <Badge status={r.status}>{r.status}</Badge>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Warning Alert if room is not available */}
                {selectedRoom && !isRoomAvailable && (
                  <div className="p-4 rounded-xl bg-[var(--color-danger)]/8 border border-[var(--color-danger)]/15 flex items-start gap-2.5">
                    <HiInformationCircle className="text-[var(--color-danger)] mt-0.5 shrink-0" size={18} />
                    <div>
                      <h5 className="text-xs font-bold text-[var(--color-danger)] uppercase tracking-wider">Kamar Tidak Tersedia</h5>
                      <p className="text-[11px] text-[var(--color-danger)]/80 mt-0.5 leading-relaxed">
                        Kamar {selectedRoom.name} saat ini berstatus <strong>{selectedRoom.status}</strong>. Silakan pilih kamar lain yang berstatus <strong>Tersedia</strong> untuk melakukan reservasi.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 border-t border-[var(--color-primary-light)]/20 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Nama Lengkap sesuai KTP"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Misal: Siti Aminah"
                    error={errors.name}
                    required
                    disabled={true}
                  />
                  
                  <Input
                    label="Alamat Email Aktif"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="emailanda@gmail.com"
                    error={errors.email}
                    required
                    disabled={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Nomor WhatsApp"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Misal: 0812XXXXXXXX"
                    error={errors.phone}
                    required
                    disabled={true}
                  />

                  <Input
                    label="Tanggal Mulai Sewa"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    error={errors.startDate}
                    required
                    disabled={!isRoomAvailable}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select Duration */}
                  <div className="space-y-1.5 w-full">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/80">
                      Durasi Sewa Kamar <span className="text-danger">*</span>
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      disabled={!isRoomAvailable}
                      className="w-full px-4 py-2.5 rounded-xl text-xs text-[var(--color-accent-text)] bg-[var(--color-surface)] border border-[var(--color-primary-light)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
                    >
                      <option value="1">1 Bulan</option>
                      <option value="3">3 Bulan</option>
                      <option value="6">6 Bulan</option>
                      <option value="12">12 Bulan (1 Tahun)</option>
                    </select>
                  </div>

                  {/* Input NIK */}
                  <div className="space-y-1.5 w-full">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/80">
                      Nomor Induk Kependudukan (NIK) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="nik"
                      value={formData.nik || ""}
                      onChange={handleChange}
                      placeholder="Masukkan 16 digit NIK..."
                      disabled={!isRoomAvailable}
                      maxLength={16}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs text-[var(--color-accent-text)] bg-[var(--color-surface)] border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200 ${
                        !isRoomAvailable ? "opacity-50 cursor-not-allowed" : ""
                      } ${
                        errors.nik ? "border-danger focus:ring-danger" : "border-[var(--color-primary-light)]/60"
                      }`}
                    />
                    {errors.nik && (
                      <p className="text-[10px] text-danger font-medium tracking-wide">{errors.nik}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={!isRoomAvailable || !selectedRoomId}
                    variant="primary"
                    className="w-full md:w-auto"
                  >
                    Kirim Pengajuan Reservasi
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>

      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[var(--color-surface)] rounded-3xl border border-[var(--color-primary-light)]/40 shadow-2xl p-6 md:p-8 space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-full flex items-center justify-center animate-bounce shrink-0">
              <HiCheckCircle size={48} />
            </div>

            <div className="space-y-3 text-center">
              <h1 className="text-2xl md:text-3xl font-black text-primary-dark uppercase">Reservasi Berhasil Diajukan!</h1>
              <p className="text-xs md:text-sm text-accent-text/75 max-w-xl mx-auto leading-relaxed">
                Terima kasih <strong className="text-primary-dark">{formData.name}</strong>, pengajuan reservasi kamar <strong className="text-primary-dark">{selectedRoom?.name}</strong> telah kami terima. Pengelola kos akan memverifikasi berkas Anda dan menghubungi via WhatsApp di nomor <strong className="text-primary-dark">{formData.phone}</strong> dalam 1x24 jam.
              </p>
            </div>

            {/* 2-Column Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left">
              
              {/* Left Column: Reservation Summary */}
              <div className="bg-[var(--color-surface-inset)] border border-[var(--color-primary-light)]/40 p-6 rounded-2xl text-xs text-[var(--color-accent-text)] space-y-4 h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-primary-dark border-b border-[var(--color-primary-light)]/30 pb-2 mb-3">
                    Rincian Reservasi:
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3">
                    <span className="text-accent-text/60">Nama Kamar:</span>
                    <span className="font-bold text-right text-primary-dark">{selectedRoom?.name}</span>
                    
                    <span className="text-accent-text/60">Harga Sewa:</span>
                    <span className="font-bold text-right">Rp {selectedRoom?.price.toLocaleString("id-ID")}/bulan</span>
                    
                    <span className="text-accent-text/60">Tanggal Mulai:</span>
                    <span className="font-bold text-right">{formData.startDate}</span>
                    
                    <span className="text-accent-text/60">Durasi Sewa:</span>
                    <span className="font-bold text-right">{formData.duration} Bulan</span>
                  </div>
                </div>

                <div className="border-t border-[var(--color-primary-light)]/30 pt-4 mt-4 flex justify-between items-center text-sm">
                  <span className="font-bold text-accent-text">Total Pembayaran:</span>
                  <span className="text-lg font-black text-primary-dark">
                    Rp {(selectedRoom?.price * parseInt(formData.duration || 1)).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Right Column: QRIS Payment */}
              <div className="bg-white border border-[var(--color-primary-light)]/40 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4">
                <span className="text-[10px] font-bold text-accent-text/50 uppercase tracking-widest">
                  Metode Pembayaran QRIS
                </span>
                <div className="w-48 h-48 rounded-xl overflow-hidden border border-[var(--color-primary-light)]/20 p-2 shadow-xs bg-white">
                  <img 
                    src={qrisMockup} 
                    alt="Kode QRIS Pembayaran" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <p className="text-[10px] text-accent-text/60 text-center max-w-[200px] leading-relaxed">
                  Pindai kode QRIS di atas untuk melakukan transfer nominal secara instan dan aman.
                </p>
              </div>
              
            </div>

            {/* Payment Security Notice */}
            <div className="w-full bg-[var(--color-tertiary)] border-l-4 border-primary p-4 rounded-r-xl flex gap-3 text-left">
              <HiShieldCheck size={28} className="text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-primary-dark">Jaminan Keamanan Pembayaran 🛡️</h5>
                <p className="text-[11px] text-accent-text/80 leading-relaxed">
                  Seluruh dana transaksi pembayaran awal Anda aman 100%. Transaksi diverifikasi secara otomatis oleh sistem kami. Apabila pengajuan reservasi Anda ditolak oleh pengelola kos, dana Anda akan dikembalikan secara penuh (*100% refund*) ke rekening asal Anda tanpa potongan.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button onClick={() => navigate("/")} variant="outline" className="w-full sm:w-auto">
                Kembali ke Beranda
              </Button>
              <Button onClick={() => setIsSubmitted(false)} variant="primary" className="w-full sm:w-auto">
                Tutup & Kembali
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsList;
