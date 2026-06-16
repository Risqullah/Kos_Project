import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { HiSave, HiOutlineUserCircle, HiLockClosed, HiOutlinePhone } from "react-icons/hi";

const TenantProfile = () => {
  const { currentUser, updateProfile } = useApp();

  // Form State
  const [formData, setFormData] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    password: currentUser.password || "",
    confirmPassword: currentUser.password || ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

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
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor WhatsApp wajib diisi.";
    } else if (!/^\d{9,15}$/.test(formData.phone)) {
      newErrors.phone = "Nomor WhatsApp harus berupa angka (9-15 digit).";
    }
    
    if (formData.password) {
      if (formData.password.length < 4) {
        newErrors.password = "Password minimal harus 4 karakter.";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Konfirmasi password tidak cocok.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMsg("");

    setTimeout(() => {
      // Panggil aksi updateProfile di AppContext
      updateProfile({
        name: formData.name,
        phone: formData.phone,
        password: formData.password
      });

      setSuccessMsg("Profil Anda berhasil diperbarui!");
      setLoading(false);
      
      // Bersihkan pesan sukses setelah beberapa detik
      setTimeout(() => setSuccessMsg(""), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-dark)]">
          Edit Profil Saya ⚙️
        </h1>
        <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 font-sans">
          Perbarui informasi kontak dan keamanan akun Anda di sini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── Ringkasan Profil (Left: 4 cols) ── */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary-dark)] flex items-center gap-2">
            <HiOutlineUserCircle size={18} />
            Kartu Pengenal
          </h2>

          <Card variant="neumorphic" className="text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center font-black text-3xl uppercase shadow-neumorphic-inset mx-auto">
              {formData.name.charAt(0) || "U"}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-[var(--color-accent-text)]">{formData.name || "Nama User"}</h3>
              <p className="text-xs text-[var(--color-accent-text)]/50">{formData.email}</p>
              <span className="inline-block mt-2 text-[9px] font-bold uppercase tracking-wider bg-[var(--color-primary)] text-white px-3 py-1 rounded-full">
                Penghuni Kos
              </span>
            </div>

            <div className="border-t border-[var(--color-primary-light)] pt-4 text-left text-xs font-sans space-y-3">
              <div className="flex items-center gap-2 text-[var(--color-accent-text)]/75">
                <HiOutlinePhone size={16} className="text-[var(--color-primary)]" />
                <span>{formData.phone || "Belum ada nomor WA"}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-accent-text)]/75">
                <HiLockClosed size={16} className="text-[var(--color-primary)]" />
                <span className="font-mono">••••••••</span>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Form Edit Profil (Right: 8 cols) ── */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary-dark)] flex items-center gap-2">
            <HiOutlineUserCircle size={18} />
            Pengaturan Akun
          </h2>

          <Card variant="default">
            {successMsg && (
              <div className="mb-5 p-4 rounded-2xl bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 text-xs text-[var(--color-success)] font-bold font-sans">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Nama Lengkap"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama lengkap sesuai identitas"
                  error={errors.name}
                  required
                />
                
                <Input
                  label="Alamat Email (Akun)"
                  name="email"
                  value={formData.email}
                  disabled
                  className="opacity-60 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Nomor WhatsApp"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Misal: 0812xxxxxxxx"
                  error={errors.phone}
                  required
                />
              </div>

              <div className="border-t border-[var(--color-primary-light)]/40 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-dark)] mb-4 flex items-center gap-2">
                  <HiLockClosed size={16} /> Keamanan Password
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Ubah Password Baru"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Kosongkan jika tidak ingin diubah"
                    error={errors.password}
                  />

                  <Input
                    label="Konfirmasi Password Baru"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi password baru"
                    error={errors.confirmPassword}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" loading={loading} variant="primary" icon={HiSave}>
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default TenantProfile;
