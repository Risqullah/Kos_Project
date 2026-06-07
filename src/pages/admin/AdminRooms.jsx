// src/pages/admin/AdminRooms.jsx — Manajemen Kamar Premium (CafeBlend)
import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ROOM_FACILITIES } from "../../config/constants";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { HiPlus, HiTrash, HiPencil, HiX, HiOfficeBuilding, HiPhotograph } from "react-icons/hi";

const ROOM_IMAGES = {
  standard: "https://images.unsplash.com/photo-1522771739015-7c1f5f5b1b6b?auto=format&fit=crop&q=80&w=500&h=350",
  deluxe: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=500&h=350",
  suite: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbb?auto=format&fit=crop&q=80&w=500&h=350",
};

const typeLabels = { standard: "Standard", deluxe: "Deluxe", suite: "Suite" };

const FacilityIcon = ({ id }) => {
  const f = ROOM_FACILITIES.find((x) => x.id === id);
  if (!f) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--color-primary-light)]/50 text-[10px] font-medium text-[var(--color-accent-text)]/70">
      {f.name}
    </span>
  );
};

const AdminRooms = () => {
  const { rooms, addRoom, updateRoom, deleteRoom } = useApp();

  // ── Modal state ──
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "standard",
    price: 1500000,
    status: "Tersedia",
    facilities: ["ac", "wifi", "bed", "cabinet"],
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value) || 0 : value,
    }));
  };

  const handleFacilityChange = (facilityId) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facilityId)
        ? prev.facilities.filter((id) => id !== facilityId)
        : [...prev.facilities, facilityId],
    }));
  };

  const resetForm = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({
      id: "", name: "", type: "standard", price: 1500000,
      status: "Tersedia", facilities: ["ac", "wifi", "bed", "cabinet"],
    });
    setError("");
  };

  const openEdit = (room) => {
    setIsEditing(true);
    setFormData({ ...room });
    setShowModal(true);
    setError("");
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleDelete = (roomId) => {
    if (window.confirm(`Hapus kamar ${roomId}?`)) {
      deleteRoom(roomId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.id.trim()) return setError("ID Kamar wajib diisi.");
    if (!formData.name.trim()) return setError("Nama Kamar wajib diisi.");

    if (isEditing) {
      updateRoom(formData);
      resetForm();
    } else {
      if (rooms.some((r) => r.id.toLowerCase() === formData.id.toLowerCase()))
        return setError(`Kamar "${formData.id}" sudah ada.`);
      addRoom(formData);
      resetForm();
    }
  };

  const statusColor = (s) => {
    if (s === "Tersedia") return "success";
    if (s === "Terisi") return "default";
    return "danger";
  };

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-dark)]">
            Manajemen Kamar
          </h1>
          <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 font-sans">
            Kelola kamar, fasilitas, harga, dan status ketersediaan.
          </p>
        </div>
        <Button variant="primary" icon={HiPlus} onClick={openAdd}>
          Tambah Kamar
        </Button>
      </div>

      {/* ── Grid Kamar ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms.length === 0 ? (
          <Card variant="tertiary" padding="p-12" className="col-span-full text-center">
            <HiOfficeBuilding size={48} className="mx-auto text-gray-300" />
            <p className="mt-4 text-sm text-gray-400 font-sans">Belum ada kamar terdaftar.</p>
            <Button variant="primary" icon={HiPlus} className="mt-4" onClick={openAdd}>
              Tambah Kamar Pertama
            </Button>
          </Card>
        ) : (
          rooms.map((room) => (
            <Card key={room.id} variant="default" padding="p-0" className="overflow-hidden">
              {/* Foto Kamar */}
              <div className="relative h-44 bg-[var(--color-primary-light)]">
                <img
                  src={ROOM_IMAGES[room.type] || ROOM_IMAGES.standard}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge status={statusColor(room.status)} variant="chip">
                    {room.status}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-bold uppercase bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    {typeLabels[room.type] || room.type}
                  </span>
                </div>
              </div>

              {/* Info Kamar */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold font-serif text-[var(--color-accent-text)]">
                      {room.name}
                    </h3>
                    <p className="text-[11px] text-[var(--color-accent-text)]/50 font-sans">
                      ID: {room.id}
                    </p>
                  </div>
                  <p className="text-sm font-extrabold text-[var(--color-primary)] font-serif">
                    Rp {room.price.toLocaleString("id-ID")}
                    <span className="text-[10px] font-sans font-normal text-gray-400">/bln</span>
                  </p>
                </div>

                {/* Fasilitas */}
                <div className="flex flex-wrap gap-1.5">
                  {room.facilities.map((fid) => (
                    <FacilityIcon key={fid} id={fid} />
                  ))}
                </div>

                {/* Aksi */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={HiPencil}
                    onClick={() => openEdit(room)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={HiTrash}
                    onClick={() => handleDelete(room.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* ── Modal Form ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <Card variant="elevated" padding="p-0" className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold font-serif text-[var(--color-primary-dark)]">
                  {isEditing ? `Edit ${formData.id}` : "Tambah Kamar Baru"}
                </h2>
                <p className="text-xs text-[var(--color-accent-text)]/50 font-sans">
                  Lengkapi data kamar di bawah ini.
                </p>
              </div>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-xl">
                <HiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 text-xs text-[var(--color-danger)] font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input label="ID Kamar" name="id" value={formData.id} onChange={handleChange}
                  placeholder="A101" disabled={isEditing} required />
                <Input label="Nama Kamar" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Kamar A101" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/80">
                    Tipe Kamar
                  </label>
                  <select name="type" value={formData.type} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition">
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/80">
                    Status Kamar
                  </label>
                  <select name="status" value={formData.status} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition">
                    <option value="Tersedia">Tersedia</option>
                    <option value="Terisi">Terisi</option>
                    <option value="Perbaikan">Perbaikan</option>
                  </select>
                </div>
              </div>

              <Input label="Tarif Sewa (Rp/bulan)" type="number" name="price"
                value={formData.price} onChange={handleChange} required />

              {/* Fasilitas */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/80">
                  Fasilitas Kamar
                </label>
                <div className="grid grid-cols-2 gap-2 p-4 rounded-2xl bg-[var(--color-tertiary)] border border-[var(--color-primary-light)] max-h-[140px] overflow-y-auto">
                  {ROOM_FACILITIES.map((fac) => (
                    <label key={fac.id} className="flex items-center gap-2 text-xs text-[var(--color-accent-text)] cursor-pointer select-none">
                      <input type="checkbox" checked={formData.facilities.includes(fac.id)}
                        onChange={() => handleFacilityChange(fac.id)}
                        className="w-4 h-4 rounded accent-[var(--color-primary)]" />
                      {fac.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Tombol */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button variant="outline" onClick={resetForm} className="flex-1">Batal</Button>
                <Button type="submit" variant="primary" className="flex-1" icon={isEditing ? null : HiPlus}>
                  {isEditing ? "Simpan Perubahan" : "Tambah Kamar"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
