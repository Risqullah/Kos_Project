// src/pages/auth/Register.jsx — CafeBlend Premium
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function Register() {
  const navigate = useNavigate();
  const { registerUser } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validasi
    if (!dataForm.name.trim()) {
      setError("Nama lengkap wajib diisi.");
      setLoading(false);
      return;
    }
    if (!dataForm.email.trim()) {
      setError("Email wajib diisi.");
      setLoading(false);
      return;
    }
    if (!dataForm.password.trim()) {
      setError("Password wajib diisi.");
      setLoading(false);
      return;
    }
    if (dataForm.password.length < 6) {
      setError("Password minimal 6 karakter.");
      setLoading(false);
      return;
    }
    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    const result = await registerUser(dataForm.name, dataForm.email, dataForm.password, dataForm.phone);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setSuccess("Akun berhasil dibuat! Mengarahkan ke halaman login...");
    setLoading(false);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Card variant="elevated" padding="p-8" className="w-full">
      {/* ── Logo & Header ── */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-block hover:scale-105 transition-transform duration-200">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-dark)] flex items-center justify-center mx-auto shadow-sm mb-4 border border-[var(--color-primary-light)]/40">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
        </Link>
        <h1 className="text-2xl font-sans font-semibold text-[var(--color-primary-dark)] text-shadow">
          Buat Akun Baru
        </h1>
        <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 font-sans">
          Daftar untuk menjadi penghuni Eternal Kos
        </p>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-[var(--color-danger)]/8 border border-[var(--color-danger)]/15 flex items-start gap-2.5">
          <BsFillExclamationDiamondFill className="text-[var(--color-danger)] mt-0.5 shrink-0" size={14} />
          <span className="text-xs text-[var(--color-danger)] font-medium">{error}</span>
        </div>
      )}

      {/* ── Success ── */}
      {success && (
        <div className="mb-5 p-3.5 rounded-xl bg-[var(--color-success)]/8 border border-[var(--color-success)]/15 flex items-start gap-2.5">
          <BsCheckCircleFill className="text-[var(--color-success)] mt-0.5 shrink-0" size={14} />
          <span className="text-xs text-[var(--color-success)] font-medium">{success}</span>
        </div>
      )}

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Lengkap */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-accent-text)]/85 mb-1.5">
            Nama Lengkap <span className="text-[var(--color-danger)]">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={dataForm.name}
            onChange={handleChange}
            placeholder="Nama Anda"
            className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--color-surface)] border border-[var(--color-primary-light)]/30 hover:border-[var(--color-primary-light)]/60 placeholder-gray-400 text-[var(--color-accent-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-accent-text)]/85 mb-1.5">
            Email <span className="text-[var(--color-danger)]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="email@gmail.com"
            className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--color-surface)] border border-[var(--color-primary-light)]/30 hover:border-[var(--color-primary-light)]/60 placeholder-gray-400 text-[var(--color-accent-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition"
            required
          />
        </div>

        {/* No. WhatsApp (opsional) */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-accent-text)]/85 mb-1.5">
            No. WhatsApp
          </label>
          <input
            type="tel"
            name="phone"
            value={dataForm.phone}
            onChange={handleChange}
            placeholder="0812XXXXXXXX"
            className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--color-surface)] border border-[var(--color-primary-light)]/30 hover:border-[var(--color-primary-light)]/60 placeholder-gray-400 text-[var(--color-accent-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-accent-text)]/85 mb-1.5">
            Password <span className="text-[var(--color-danger)]">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--color-surface)] border border-[var(--color-primary-light)]/30 hover:border-[var(--color-primary-light)]/60 placeholder-gray-400 text-[var(--color-accent-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition pr-11"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-accent-text)]/40 hover:text-[var(--color-accent-text)]/70 transition"
            >
              {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
            </button>
          </div>
        </div>

        {/* Konfirmasi Password */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-accent-text)]/85 mb-1.5">
            Konfirmasi Password <span className="text-[var(--color-danger)]">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={dataForm.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password"
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--color-surface)] border border-[var(--color-primary-light)]/30 hover:border-[var(--color-primary-light)]/60 placeholder-gray-400 text-[var(--color-accent-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition pr-11"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-accent-text)]/40 hover:text-[var(--color-accent-text)]/70 transition"
            >
              {showConfirmPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" variant="primary" className="w-full mt-2" loading={loading}>
          {loading ? "Mendaftarkan..." : "Daftar"}
        </Button>
      </form>

      {/* ── Login Link ── */}
      <p className="text-center text-xs text-[var(--color-accent-text)]/50 mt-6 font-sans">
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="text-[var(--color-primary)] font-bold hover:underline"
        >
          Masuk Sekarang
        </Link>
      </p>
    </Card>
  );
}
