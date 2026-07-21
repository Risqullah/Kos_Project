// src/pages/auth/Login.jsx — CafeBlend Premium
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await loginUser(dataForm.email, dataForm.password);

    if (!result.success) {
      setError("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
      return;
    }

    setLoading(false);
    if (result.user.role === "owner") {
      navigate("/admin");
    } else if (result.user.role === "tenant") {
      navigate("/tenant");
    } else {
      navigate("/");
    }
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
          Selamat Datang
        </h1>
        <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 font-sans">
          Masuk ke akun Eternal Kos Anda
        </p>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-[var(--color-danger)]/8 border border-[var(--color-danger)]/15 flex items-start gap-2.5">
          <BsFillExclamationDiamondFill className="text-[var(--color-danger)] mt-0.5 shrink-0" size={14} />
          <span className="text-xs text-[var(--color-danger)] font-medium">{error}</span>
        </div>
      )}

      {/* ── Loading ── */}
      {loading && (
        <div className="mb-5 p-3.5 rounded-xl bg-[var(--color-primary-light)]/50 flex items-center gap-2.5">
          <ImSpinner2 className="animate-spin text-[var(--color-primary)]" size={14} />
          <span className="text-xs text-[var(--color-accent-text)] font-medium">Memproses...</span>
        </div>
      )}

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-accent-text)]/85 mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="guest@gmail.com"
            className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--color-surface)] border border-[var(--color-primary-light)]/30 hover:border-[var(--color-primary-light)]/60 placeholder-gray-400 text-[var(--color-accent-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-accent-text)]/85 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--color-surface)] border border-[var(--color-primary-light)]/30 hover:border-[var(--color-primary-light)]/60 placeholder-gray-400 text-[var(--color-accent-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition pr-11"
              required
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

        {/* Submit */}
        <Button type="submit" variant="primary" className="w-full mt-2" loading={loading}>
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>

      {/* ── Register Link ── */}
      <p className="text-center text-xs text-[var(--color-accent-text)]/50 mt-5 font-sans">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="text-[var(--color-primary)] font-bold hover:underline"
        >
          Daftar Sekarang
        </Link>
      </p>
    </Card>
  );
}
