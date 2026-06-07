// src/pages/ReservationPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { HiCheckCircle, HiChevronLeft } from "react-icons/hi";

const ReservationPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { rooms, addReservation } = useApp();

  // Cari kamar berdasarkan parameter roomId
  const room = rooms.find((r) => r.id === roomId);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    duration: "1",
    identityCard: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!room) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-6">
        <h2 className="text-xl font-bold text-danger">Kamar tidak ditemukan</h2>
        <p className="text-xs text-accent-text/60">Kamar dengan ID {roomId} tidak tersedia untuk reservasi.</p>
        <Link to="/kamar" className="inline-block text-xs font-bold text-primary hover:underline">
          Kembali ke Galeri Kamar
        </Link>
      </div>
    );
  }

  if (room.status !== "Tersedia") {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-6">
        <h2 className="text-xl font-bold text-warning">Kamar Tidak Tersedia</h2>
        <p className="text-xs text-accent-text/60">Kamar {room.name} sedang terisi atau dalam perbaikan.</p>
        <Link to="/kamar" className="inline-block text-xs font-bold text-primary hover:underline">
          Pilih Kamar Lain
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, identityCard: file.name });
      if (errors.identityCard) {
        setErrors({ ...errors, identityCard: "" });
      }
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
    if (!formData.identityCard) newErrors.identityCard = "Foto KTP/KTM wajib diunggah.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Simulasi delay pengerjaan
    setTimeout(() => {
      // Simpan ke state global reservasi
      addReservation({
        roomId: room.id,
        roomName: room.name,
        roomPrice: room.price,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        startDate: formData.startDate,
        duration: parseInt(formData.duration),
        identityCardName: formData.identityCard
      });

      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <Card className="p-10 space-y-8 flex flex-col items-center shadow-lg border border-gray-100">
          <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center animate-bounce">
            <HiCheckCircle size={48} />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-black text-primary-dark uppercase">Reservasi Berhasil Diajukan!</h1>
            <p className="text-xs md:text-sm text-accent-text/75 max-w-md mx-auto leading-relaxed">
              Terima kasih **{formData.name}**, pengajuan reservasi kamar **{room.name}** telah kami terima. Pengelola kos akan memverifikasi berkas Anda dan menghubungi via WhatsApp di nomor **{formData.phone}** dalam 1x24 jam.
            </p>
          </div>

          <div className="w-full bg-accent-bg border border-gray-100 p-6 rounded-2xl text-left text-xs text-accent-text space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-primary-dark border-b border-gray-200/50 pb-2">Rincian Reservasi:</h4>
            <div className="grid grid-cols-2 gap-y-2">
              <span className="text-accent-text/60">ID Kamar:</span>
              <span className="font-bold text-right">{room.id}</span>
              
              <span className="text-accent-text/60">Harga Sewa:</span>
              <span className="font-bold text-right">Rp {room.price.toLocaleString("id-ID")}/bulan</span>
              
              <span className="text-accent-text/60">Tanggal Mulai:</span>
              <span className="font-bold text-right">{formData.startDate}</span>
              
              <span className="text-accent-text/60">Durasi Sewa:</span>
              <span className="font-bold text-right">{formData.duration} Bulan</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button onClick={() => navigate("/")} variant="outline" className="w-full sm:w-auto">
              Kembali ke Beranda
            </Button>
            <Button onClick={() => navigate("/kamar")} variant="primary" className="w-full sm:w-auto">
              Lihat Kamar Lain
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-8">
      {/* Back Button */}
      <Link 
        to={`/kamar/${room.id}`}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-text/70 hover:text-primary transition"
      >
        <HiChevronLeft size={18} /> Kembali ke Detail Kamar
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Ringkasan Kamar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary-dark border-b border-gray-150 pb-3">Ringkasan Pilihan</h3>
            
            <div className="space-y-4">
              <div className="h-40 rounded-xl overflow-hidden">
                <img 
                  src={
                    room.type === "standard" 
                      ? "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=400"
                      : room.type === "deluxe"
                      ? "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=400"
                      : "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400"
                  } 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-primary">{room.type} room</span>
                <h4 className="text-base font-bold text-accent-text mt-0.5">{room.name}</h4>
                <p className="text-[10px] text-accent-text/50">ID Kamar: {room.id}</p>
              </div>

              <div className="border-t border-gray-50 pt-4 flex justify-between items-center text-xs">
                <span className="text-accent-text/60">Biaya Sewa</span>
                <span className="font-bold text-primary-dark">Rp {room.price.toLocaleString("id-ID")}/bulan</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Form Pendaftaran Reservasi */}
        <div className="lg:col-span-8">
          <Card className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold uppercase text-primary-dark tracking-wider">Formulir Pengajuan Sewa</h2>
              <p className="text-[11px] text-accent-text/60">Isi data di bawah ini dengan lengkap dan benar untuk memproses pemesanan kamar.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 border-t border-gray-50 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Nama Lengkap sesuai KTP"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Misal: Siti Aminah"
                  error={errors.name}
                  required
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
                />

                <Input
                  label="Tanggal Mulai Sewa"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  error={errors.startDate}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Select Duration */}
                <div className="space-y-1.5 w-full">
                  <label className="block text-xs font-bold uppercase tracking-wider text-accent-text/80">
                    Durasi Sewa Kamar <span className="text-danger">*</span>
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-xs text-accent-text bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  >
                    <option value="1">1 Bulan</option>
                    <option value="3">3 Bulan</option>
                    <option value="6">6 Bulan</option>
                    <option value="12">12 Bulan (1 Tahun)</option>
                  </select>
                </div>

                {/* Upload Identitas Mock */}
                <div className="space-y-1.5 w-full">
                  <label className="block text-xs font-bold uppercase tracking-wider text-accent-text/80">
                    Unggah KTP / Kartu Mahasiswa (KTM) <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="identityCard"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="identityCard"
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs bg-white border border-gray-300 hover:bg-gray-50/50 cursor-pointer transition duration-200 border-dashed ${
                        errors.identityCard ? "border-danger text-danger" : "text-accent-text/60"
                      }`}
                    >
                      <span className="truncate">
                        {formData.identityCard ? formData.identityCard : "Pilih file gambar KTP/KTM..."}
                      </span>
                      <span className="text-primary font-bold">Pilih File</span>
                    </label>
                  </div>
                  {errors.identityCard && (
                    <p className="text-[10px] text-danger font-medium tracking-wide">{errors.identityCard}</p>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  loading={loading}
                  variant="primary"
                  className="w-full md:w-auto"
                >
                  Kirim Pengajuan Reservasi
                </Button>
              </div>
            </form>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ReservationPage;
