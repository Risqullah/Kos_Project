// src/pages/admin/AdminTenants.jsx — Data Penghuni Premium (CafeBlend)
import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import { HiPlus, HiTrash, HiPencil, HiSearch, HiX, HiUserAdd } from "react-icons/hi";

const AdminTenants = () => {
  const { tenants, rooms, addTenant, updateTenant, deleteTenant } = useApp();

  // ── Search ──
  const [searchQuery, setSearchQuery] = useState("");

  // ── Modal ──
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "", name: "", email: "", phone: "",
    roomId: "", entryDate: "", dueDate: "", status: "Aktif",
  });
  const [error, setError] = useState("");

  const availableRoomsForAssign = rooms.filter((r) => {
    if (r.status === "Tersedia") return true;
    if (isEditing && r.id === formData.roomId) return true;
    return false;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({ id: "", name: "", email: "", phone: "", roomId: "", entryDate: "", dueDate: "", status: "Aktif" });
    setError("");
  };

  const openEdit = (tenant) => {
    setIsEditing(true);
    setFormData({ ...tenant });
    setShowModal(true);
    setError("");
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleDelete = (tenantId) => {
    if (window.confirm("Hapus data penghuni ini? Kamar akan dikosongkan.")) {
      deleteTenant(tenantId);
      if (isEditing && formData.id === tenantId) resetForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name.trim()) return setError("Nama wajib diisi.");
    if (!formData.email.trim()) return setError("Email wajib diisi.");
    if (!formData.phone.trim()) return setError("No. HP wajib diisi.");
    if (!formData.roomId) return setError("Kamar wajib dipilih.");
    if (!formData.entryDate) return setError("Tanggal masuk wajib diisi.");
    if (!formData.dueDate) return setError("Tanggal jatuh tempo wajib diisi.");

    if (isEditing) {
      updateTenant(formData);
      resetForm();
    } else {
      addTenant({ ...formData, id: "T" + Date.now() });
      resetForm();
    }
  };

  const filtered = tenants.filter((t) => {
    const q = searchQuery.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.roomId.toLowerCase().includes(q) || t.email.toLowerCase().includes(q);
  });

  const tenantHeaders = [
    { key: "name", label: "Nama Penghuni" },
    { key: "roomId", label: "Kamar", render: (v) => <span className="font-extrabold text-[var(--color-accent-text)]">{v}</span> },
    { key: "phone", label: "No. WA" },
    { key: "entryDate", label: "Tgl Masuk" },
    { key: "dueDate", label: "Jatuh Tempo" },
    { key: "status", label: "Status", render: (v) => <Badge>{v}</Badge> },
    {
      key: "actions", label: "Aksi",
      render: (_, row) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(row)} className="p-1.5 text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] rounded-lg transition" title="Edit">
            <HiPencil size={16} />
          </button>
          <button onClick={() => handleDelete(row.id)} className="p-1.5 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 rounded-lg transition" title="Hapus">
            <HiTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-dark)]">
            Data Penghuni
          </h1>
          <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 font-sans">
            Kelola data penyewa kos, alokasi kamar, dan jadwal sewa.
          </p>
        </div>
        <Button variant="primary" icon={HiUserAdd} onClick={openAdd}>
          Daftarkan Penghuni
        </Button>
      </div>

      {/* ── Tabel ── */}
      <Card variant="tertiary" padding="p-0" className="overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/60">
            {tenants.length} Penghuni Terdaftar
          </p>
          <div className="relative w-64">
            <HiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-accent-text)]/40" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau kamar..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition" />
          </div>
        </div>
        <Table headers={tenantHeaders} data={filtered} emptyMessage="Tidak ada data penghuni ditemukan." />
      </Card>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <Card variant="elevated" padding="p-0" className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold font-serif text-[var(--color-primary-dark)]">
                  {isEditing ? "Edit Penghuni" : "Daftarkan Penghuni Baru"}
                </h2>
                <p className="text-xs text-[var(--color-accent-text)]/50 font-sans">Lengkapi data diri penyewa.</p>
              </div>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-xl"><HiX size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 text-xs text-[var(--color-danger)] font-medium">{error}</div>
              )}
              <Input label="Nama Lengkap" name="name" value={formData.name} onChange={handleChange} placeholder="Siti Rahma" required />
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="siti@email.com" required />
              <Input label="No. WhatsApp" name="phone" value={formData.phone} onChange={handleChange} placeholder="0812XXXXXXXX" required />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/80">Kamar</label>
                  <select name="roomId" value={formData.roomId} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" required>
                    <option value="">-- Pilih --</option>
                    {availableRoomsForAssign.map((r) => (
                      <option key={r.id} value={r.id}>{r.name} ({r.type})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/80">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Tanggal Masuk" type="date" name="entryDate" value={formData.entryDate} onChange={handleChange} required />
                <Input label="Jatuh Tempo" type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button variant="outline" onClick={resetForm} className="flex-1">Batal</Button>
                <Button type="submit" variant="primary" className="flex-1" icon={isEditing ? null : HiPlus}>
                  {isEditing ? "Simpan" : "Daftarkan"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminTenants;
