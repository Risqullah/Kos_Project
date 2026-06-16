// src/config/constants.js

export const ROOM_FACILITIES = [
  { id: "bed_dipan", name: "Kasur + Dipan", icon: "HiOutlineHome" },
  { id: "desk", name: "Meja", icon: "HiOutlineDesktopComputer" },
  { id: "ac", name: "AC", icon: "HiOutlineSun" },
  { id: "bathroom_shower", name: "Toilet dalam + shower", icon: "HiOutlineKey" },
  { id: "cabinet", name: "Lemari", icon: "HiOutlineArchive" }
];

export const ADMIN_MENU = [
  { name: "Overview", path: "/admin", icon: "Overview" },
  { name: "Manajemen Kamar", path: "/admin/kamar", icon: "Rooms" },
  { name: "Data Penghuni", path: "/admin/penghuni", icon: "Tenants" },
  { name: "Keuangan Kos", path: "/admin/keuangan", icon: "Finance" },
  { name: "Pengaduan", path: "/admin/pengaduan", icon: "Issues" },
  { name: "Kelola Informasi", path: "/admin/informasi", icon: "Info" }
];

export const TENANT_MENU = [
  { name: "Dashboard Saya", path: "/tenant", icon: "Overview" },
  { name: "Ajukan Pengaduan", path: "/tenant/pengaduan", icon: "Issues" },
  { name: "Riwayat Sewa", path: "/tenant/riwayat", icon: "History" },
  { name: "Edit Profil", path: "/tenant/profil", icon: "Tenants" }
];
