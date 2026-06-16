import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import { HiPlus, HiOutlineChatAlt, HiClipboardList } from "react-icons/hi";

const TenantIssues = () => {
  const { currentUser, issues, addIssue } = useApp();
  
  // Form State
  const [formData, setFormData] = useState({
    category: "Fasilitas Kamar",
    desc: "",
    imageName: ""
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Filter pengaduan milik tenant ini sendiri
  const myIssues = issues.filter(
    (issue) => 
      (currentUser.roomId && issue.roomId === currentUser.roomId) || 
      issue.tenantName === currentUser.name
  );

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
      setFormData({ ...formData, imageName: file.name });
      if (errors.imageName) {
        setErrors({ ...errors, imageName: "" });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.desc.trim()) newErrors.desc = "Deskripsi laporan wajib diisi.";
    if (formData.desc.trim().length < 10) newErrors.desc = "Deskripsi minimal harus 10 karakter.";
    if (!formData.imageName) newErrors.imageName = "Foto bukti masalah wajib diunggah.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMsg("");

    setTimeout(() => {
      // Mockup link gambar Unsplash yang relevan berdasarkan kategori
      let mockImageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400";
      if (formData.category === "Kamar Mandi") {
        mockImageUrl = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400";
      } else if (formData.category === "Fasilitas Kamar") {
        mockImageUrl = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400"; // AC
      } else if (formData.category === "Kebersihan / Dapur") {
        mockImageUrl = "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&q=80&w=400"; // trash/kitchen
      }

      addIssue({
        tenantName: currentUser.name,
        roomId: currentUser.roomId || "Umum",
        category: formData.category,
        desc: formData.desc,
        image: mockImageUrl,
        imageName: formData.imageName
      });

      setFormData({
        category: "Fasilitas Kamar",
        desc: "",
        imageName: ""
      });
      setSuccessMsg("Laporan pengaduan berhasil dikirim! Owner akan segera memproses.");
      setLoading(false);
      
      // Hapus pesan sukses setelah 4 detik
      setTimeout(() => setSuccessMsg(""), 4000);
    }, 1200);
  };

  // Header Tabel
  const issueHeaders = [
    { key: "date", label: "Tanggal" },
    { key: "category", label: "Kategori" },
    { key: "desc", label: "Deskripsi Laporan" },
    {
      key: "status",
      label: "Status",
      render: (v) => <Badge status={v === "Pending" ? "warning" : v === "Diproses" ? "info" : "success"}>{v}</Badge>
    }
  ];

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-dark)]">
          Ajukan Pengaduan 📣
        </h1>
        <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 font-sans">
          Laporkan kendala fasilitas kamar atau area komunal agar pengelola segera memperbaikinya.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── Form Pengaduan (Left: 5 cols) ── */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary-dark)] flex items-center gap-2">
            <HiOutlineChatAlt size={18} />
            Formulir Laporan
          </h2>

          <Card variant="neumorphic">
            {successMsg && (
              <div className="mb-5 p-4 rounded-2xl bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 text-xs text-[var(--color-success)] font-bold font-sans">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category */}
              <div className="space-y-1.5 w-full">
                <label className="block text-xs font-bold uppercase tracking-wider text-accent-text/80">
                  Kategori Kendala <span className="text-danger">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg text-xs text-[var(--color-accent-text)] bg-[var(--color-surface-inset)] border border-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
                >
                  <option value="Fasilitas Kamar">Fasilitas Kamar (AC, Kasur + Dipan, Lemari, Meja)</option>
                  <option value="Kamar Mandi">Toilet / Kamar Mandi (Kran, Shower, Toilet)</option>
                  <option value="Internet / Wi-Fi">Koneksi Internet / Wi-Fi</option>
                  <option value="Kebersihan / Dapur">Kebersihan Area Bersama</option>
                  <option value="Keamanan & Ketertiban">Keamanan & Gangguan Suara</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-accent-text/80">
                  Deskripsi Kerusakan / Kendala <span className="text-danger">*</span>
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  placeholder="Ceritakan dengan jelas letak kerusakan dan detail masalahnya..."
                  rows={4}
                  className={`w-full px-4 py-2.5 rounded-lg text-xs text-[var(--color-accent-text)] bg-[var(--color-surface-inset)] border border-[var(--color-primary-light)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200 resize-none ${
                    errors.desc ? "border-danger focus:ring-danger" : ""
                  }`}
                />
                {errors.desc && (
                  <p className="text-[10px] text-danger font-medium tracking-wide">{errors.desc}</p>
                )}
              </div>

              {/* Upload File Bukti */}
              <div className="space-y-1.5 w-full">
                <label className="block text-xs font-bold uppercase tracking-wider text-accent-text/80">
                  Unggah Foto Bukti Kerusakan <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="issuePhoto"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="issuePhoto"
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs bg-[var(--color-surface-inset)] border border-[var(--color-primary-light)] hover:opacity-90 cursor-pointer transition duration-200 border-dashed ${
                      errors.imageName ? "border-danger text-danger" : "text-[var(--color-accent-text)]/60"
                    }`}
                  >
                    <span className="truncate">
                      {formData.imageName ? formData.imageName : "Pilih foto bukti kerusakan..."}
                    </span>
                    <span className="text-primary font-bold">Pilih File</span>
                  </label>
                </div>
                {errors.imageName && (
                  <p className="text-[10px] text-danger font-medium tracking-wide">{errors.imageName}</p>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" loading={loading} variant="primary" className="w-full" icon={HiPlus}>
                Kirim Laporan
              </Button>
            </form>
          </Card>
        </div>

        {/* ── Tabel Riwayat Laporan (Right: 7 cols) ── */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary-dark)] flex items-center gap-2">
            <HiClipboardList size={18} />
            Riwayat Laporan Saya
          </h2>

          <Card variant="tertiary" padding="p-0">
            <Table
              headers={issueHeaders}
              data={myIssues}
              emptyMessage="Anda belum pernah mengirimkan laporan pengaduan."
            />
          </Card>
        </div>

      </div>
    </div>
  );
};

export default TenantIssues;
