

const Badge = ({ children, status = "default", variant = "default", className = "" }) => {
  // Mapping warna status
  const statusStyles = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    danger: "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
    warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
    info: "bg-[var(--color-info)]/10 text-[var(--color-info)]",

    // Status spesifik aplikasi
    Tersedia: "bg-[var(--color-success)] text-white font-bold",
    Terisi: "bg-[var(--color-danger)] text-white font-bold",
    Perbaikan: "bg-[var(--color-warning)] text-white font-bold",
    Aktif: "bg-[var(--color-success)]/15 text-[var(--color-success)] font-bold",
    "Tidak Aktif": "bg-gray-200 text-gray-500 font-bold",
    Nonaktif: "bg-gray-200 text-gray-500 font-bold",
    Pending: "bg-[var(--color-warning)]/15 text-[var(--color-warning)] font-bold",
    Disetujui: "bg-[var(--color-success)]/15 text-[var(--color-success)] font-bold",
    Ditolak: "bg-[var(--color-danger)]/15 text-[var(--color-danger)] font-bold",
    "Menunggu Konfirmasi": "bg-[var(--color-warning)]/15 text-[var(--color-warning)] font-bold",
    Diproses: "bg-[var(--color-info)]/15 text-[var(--color-info)] font-bold",
    Selesai: "bg-gray-200 text-gray-600 font-bold",
  };

  const variantStyles = {
    default: "px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest",
    chip: "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
    neumorphic: "px-3.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest bg-[var(--color-accent-bg)] border border-[var(--color-primary-light)] shadow-sm",
  };

  const style = (status === "default" ? statusStyles[children] : statusStyles[status]) || statusStyles[status] || statusStyles.default;
  const varStyle = variantStyles[variant] || variantStyles.default;

  return (
    <span className={`inline-flex items-center ${varStyle} ${style} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
