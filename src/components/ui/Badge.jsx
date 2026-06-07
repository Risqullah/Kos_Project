// src/components/ui/Badge.jsx
import React from "react";

const Badge = ({ children, status = "default", variant = "default", className = "" }) => {
  // Mapping warna status
  const statusStyles = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    danger: "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
    warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
    info: "bg-[var(--color-info)]/10 text-[var(--color-info)]",

    // Status spesifik aplikasi
    Tersedia: "bg-[var(--color-success)]/15 text-[var(--color-success)] font-bold",
    Terisi: "bg-[var(--color-primary-dark)]/15 text-[var(--color-primary-dark)] font-bold",
    Perbaikan: "bg-[var(--color-danger)]/15 text-[var(--color-danger)] font-bold",
    Aktif: "bg-[var(--color-success)]/15 text-[var(--color-success)] font-bold",
    "Tidak Aktif": "bg-gray-200 text-gray-500 font-bold",
    Pending: "bg-[var(--color-warning)]/15 text-[var(--color-warning)] font-bold",
    Disetujui: "bg-[var(--color-success)]/15 text-[var(--color-success)] font-bold",
    Ditolak: "bg-[var(--color-danger)]/15 text-[var(--color-danger)] font-bold",
    "Menunggu Konfirmasi": "bg-[var(--color-warning)]/15 text-[var(--color-warning)] font-bold",
    Diproses: "bg-[var(--color-info)]/15 text-[var(--color-info)] font-bold",
    Selesai: "bg-gray-200 text-gray-600 font-bold",
  };

  const variantStyles = {
    default: "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
    chip: "px-4 py-1.5 rounded-full text-[11px] font-semibold",
    neumorphic: "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--color-accent-bg)] shadow-neumorphic-sm",
  };

  const style = statusStyles[status] || statusStyles[children] || statusStyles.default;
  const varStyle = variantStyles[variant] || variantStyles.default;

  return (
    <span className={`inline-flex items-center ${varStyle} ${style} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
