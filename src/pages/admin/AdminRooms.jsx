import { useState } from "react";
import { useApp } from "../../context/AppContext";
import roomPhoto from "../../assets/img/room_photo.png";
import standardImg from "../../assets/img/standard.png";
import deluxeImg from "../../assets/img/deluxe.png";
import suiteImg from "../../assets/img/suite.png";
import { ROOM_FACILITIES } from "../../config/constants";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { HiPlus, HiTrash, HiPencil, HiX, HiOfficeBuilding } from "react-icons/hi";

const ROOM_IMAGES = {
  standard: standardImg,
  deluxe: deluxeImg,
  suite: suiteImg,
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

  // ── Filter state ──
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [typeFilter, setTypeFilter] = useState("Semua");

  const filteredRooms = rooms.filter((room) => {
    const matchStatus = statusFilter === "Semua" || room.status === statusFilter;
    const matchType = typeFilter === "Semua" || room.type?.toLowerCase() === typeFilter.toLowerCase();
    return matchStatus && matchType;
  });

  // ── Modal state ──
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "standard",
    price: 1500000,
    status: "Tersedia",
    image: "",
    facilities: ["bed_dipan", "desk", "ac", "bathroom_shower", "cabinet"],
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
      status: "Tersedia", image: "", facilities: ["bed_dipan", "desk", "ac", "bathroom_shower", "cabinet"],
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
    if (!formData.name.trim()) return setError("Nama Kamar wajib diisi.");
    if (!formData.type.trim()) return setError("Tipe Kamar wajib diisi.");

    if (isEditing) {
      if (!formData.id) return setError("ID Kamar tidak valid.");
      updateRoom(formData);
      resetForm();
    } else {
      addRoom(formData);
      resetForm();
    }
  };

  // Helper mapping has been removed in favor of passing status directly to Badge

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

      {/* ── Filter Bar ── */}
      <div className="flex flex-col sm:flex-row gap-4 bg-[var(--color-surface)] border border-[var(--color-primary-light)]/30 p-4 rounded-2xl shadow-sm justify-between items-center">
        <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/70">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[var(--color-surface-inset)] border border-[var(--color-primary-light)]/40 focus:outline-none focus:ring-1 focus:ring-primary text-xs font-semibold text-[var(--color-accent-text)]"
            >
              <option value="Semua">Semua Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Terisi">Terisi</option>
              <option value="Perbaikan">Perbaikan</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/70">
            <span>Tipe:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[var(--color-surface-inset)] border border-[var(--color-primary-light)]/40 focus:outline-none focus:ring-1 focus:ring-primary text-xs font-semibold text-[var(--color-accent-text)]"
            >
              <option value="Semua">Semua Tipe</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        </div>

        {/* Reset Filter Button */}
        {(statusFilter !== "Semua" || typeFilter !== "Semua") && (
          <button
            onClick={() => {
              setStatusFilter("Semua");
              setTypeFilter("Semua");
            }}
            className="text-xs text-[var(--color-primary)] font-bold hover:underline"
          >
            Reset Filter
          </button>
        )}
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
        ) : filteredRooms.length === 0 ? (
          <Card variant="tertiary" padding="p-12" className="col-span-full text-center">
            <HiOfficeBuilding size={48} className="mx-auto text-gray-300 animate-pulse" />
            <p className="mt-4 text-sm text-gray-400 font-sans">Tidak ada kamar yang cocok dengan filter aktif.</p>
            <Button
              variant="outline"
              className="mt-4 mx-auto"
              onClick={() => {
                setStatusFilter("Semua");
                setTypeFilter("Semua");
              }}
            >
              Reset Filter
            </Button>
          </Card>
        ) : (
          filteredRooms.map((room) => (
            <Card key={room.id} variant="default" padding="p-0" className="overflow-hidden">
              {/* Foto Kamar */}
              <div className="relative h-44 bg-[var(--color-primary-light)] overflow-hidden">
                <img
                  src={room.image === "/room_photo.png" || room.image?.includes("room_photo.png") ? roomPhoto : (room.image || ROOM_IMAGES[room.type?.toLowerCase()] || ROOM_IMAGES.standard)}
                  alt={room.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    room.status !== "Tersedia" ? "grayscale contrast-125 brightness-90" : ""
                  }`}
                />
              </div>

              {/* Info Kamar */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold font-serif text-[var(--color-accent-text)]">
                      {room.name}
                    </h3>
                    <div className="flex gap-2 items-center mt-1.5 mb-1 flex-wrap">
                      <Badge status={room.status} variant="chip" className="!text-[9px] !px-2.5 !py-0.5">
                        {room.status}
                      </Badge>
                      <span className="text-[9px] font-bold uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md border border-gray-200/50">
                        {typeLabels[room.type?.toLowerCase()] || room.type}
                      </span>
                    </div>
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
                  {isEditing ? `Edit Kamar: ${formData.name}` : "Tambah Kamar Baru"}
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
                <Input label="Nama Kamar" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Kamar A101" required />
                <Input label="Tipe Kamar" name="type" value={formData.type} onChange={handleChange}
                  placeholder="Standard / Deluxe / Suite" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

                <Input label="Tarif Sewa (Rp/bulan)" type="number" name="price"
                  value={formData.price} onChange={handleChange} required />
              </div>

              <Input label="URL Foto Kamar" name="image" value={formData.image} onChange={handleChange}
                placeholder="https://images.unsplash.com/... atau kosongkan untuk gambar default" />

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
