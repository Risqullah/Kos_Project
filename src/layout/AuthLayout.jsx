// src/layout/AuthLayout.jsx — CafeBlend Premium
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-accent-bg)] p-4 font-sans">
      {/* Background Decorative */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--color-primary)]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[var(--color-secondary)]/5 blur-3xl" />
      </div>

      <div className="w-full max-w-[420px] relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
