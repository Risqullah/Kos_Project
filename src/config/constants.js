// src/config/constants.js

export const ROOM_FACILITIES = [
  { id: "ac", name: "AC", icon: "HiOutlineSun" },
  { id: "wifi", name: "Wi-Fi Cepat", icon: "HiOutlineWifi" },
  { id: "bathroom", name: "Kamar Mandi Dalam", icon: "HiOutlineKey" },
  { id: "bed", name: "Kasur Queen", icon: "HiOutlineHome" },
  { id: "cabinet", name: "Lemari Pakaian", icon: "HiOutlineArchive" },
  { id: "desk", name: "Meja Kerja", icon: "HiOutlineDesktopComputer" },
  { id: "water_heater", name: "Water Heater", icon: "HiOutlineCloud" }
];

export const ROOM_TYPES = [
  {
    id: "standard",
    name: "Standard Room",
    price: 1500000,
    size: "3x4 m",
    description: "Kamar nyaman dengan sirkulasi udara baik, cocok untuk mahasiswi yang menginginkan ketenangan belajar.",
    facilities: ["ac", "wifi", "bed", "cabinet"]
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    price: 2000000,
    size: "4x4 m",
    description: "Kamar luas dengan jendela menghadap ke luar, dilengkapi meja kerja personal dan kamar mandi dalam.",
    facilities: ["ac", "wifi", "bathroom", "bed", "cabinet", "desk"]
  },
  {
    id: "suite",
    name: "Suite Room",
    price: 3000000,
    size: "4x5 m",
    description: "Kamar eksklusif premium dengan tambahan pemanas air dan area duduk santai yang luas.",
    facilities: ["ac", "wifi", "bathroom", "bed", "cabinet", "desk", "water_heater"]
  }
];

export const ATURAN_KOS = [
  {
    title: "Khusus Perempuan",
    desc: "Eternal Kos adalah hunian khusus perempuan demi menjaga kenyamanan dan privasi bersama."
  },
  {
    title: "Batas Jam Malam",
    desc: "Gerbang utama dikunci pukul 23:00 WIB. Akses masuk setelah jam tersebut harus menggunakan smart key."
  },
  {
    title: "Aturan Bertamu",
    desc: "Tamu laki-laki hanya diperbolehkan bertamu di area komunal / ruang tamu utama hingga pukul 21:00 WIB."
  },
  {
    title: "Kebersihan & Ketertiban",
    desc: "Setiap penghuni wajib menjaga ketenangan (no loud music setelah jam 22:00) dan kebersihan area komunal."
  },
  {
    title: "Larangan Hewan Peliharaan",
    desc: "Tidak diperkenankan membawa atau memelihara hewan di dalam kamar maupun area kos."
  }
];

export const FAQ_LIST = [
  {
    q: "Apakah biaya sewa sudah termasuk listrik?",
    a: "Biaya sewa kamar belum termasuk token listrik (setiap kamar menggunakan meteran listrik pulsa mandiri)."
  },
  {
    q: "Bagaimana sistem pembayaran sewa?",
    a: "Sewa dibayarkan setiap tanggal 1 atau sesuai tanggal check-in awal melalui transfer bank ke rekening owner."
  },
  {
    q: "Apakah boleh membawa tamu menginap?",
    a: "Tamu wanita boleh menginap maksimal 3 hari dalam sebulan dengan persetujuan pengelola dan dikenakan biaya tambahan."
  },
  {
    q: "Bagaimana jika ada fasilitas kamar yang rusak?",
    a: "Penghuni dapat melaporkannya langsung melalui fitur pengaduan di dashboard aplikasi agar ditindaklanjuti oleh tim pemeliharaan."
  }
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
  { name: "Riwayat Sewa", path: "/tenant/riwayat", icon: "History" }
];

// Data Dummy Kamar untuk Inisialisasi awal
export const INITIAL_ROOMS = [
  { id: "A101", name: "Kamar A101", type: "standard", price: 1500000, status: "Tersedia", facilities: ["ac", "wifi", "bed", "cabinet"] },
  { id: "A102", name: "Kamar A102", type: "standard", price: 1500000, status: "Terisi", facilities: ["ac", "wifi", "bed", "cabinet"] },
  { id: "B201", name: "Kamar B201", type: "deluxe", price: 2000000, status: "Tersedia", facilities: ["ac", "wifi", "bathroom", "bed", "cabinet", "desk"] },
  { id: "B202", name: "Kamar B202", type: "deluxe", price: 2000000, status: "Terisi", facilities: ["ac", "wifi", "bathroom", "bed", "cabinet", "desk"] },
  { id: "C301", name: "Kamar C301", type: "suite", price: 3000000, status: "Tersedia", facilities: ["ac", "wifi", "bathroom", "bed", "cabinet", "desk", "water_heater"] },
  { id: "C302", name: "Kamar C302", type: "suite", price: 3000000, status: "Perbaikan", facilities: ["ac", "wifi", "bathroom", "bed", "cabinet", "desk", "water_heater"] }
];

// Data Dummy Penghuni untuk Inisialisasi awal
export const INITIAL_TENANTS = [
  {
    id: "T001",
    name: "Siti Rahma",
    email: "siti@gmail.com",
    phone: "081234567890",
    roomId: "A102",
    entryDate: "2026-01-01",
    dueDate: "2026-07-01",
    status: "Aktif"
  },
  {
    id: "T002",
    name: "Amelia Putri",
    email: "amelia@gmail.com",
    phone: "081298765432",
    roomId: "B202",
    entryDate: "2026-03-15",
    dueDate: "2026-06-15", // Mendekati jatuh tempo (kurang dari 14 hari dari waktu sekarang Juni 2026)
    status: "Aktif"
  }
];

// Data Dummy Keuangan Awal
export const INITIAL_TRANSACTIONS = [
  { id: "TX001", date: "2026-06-01", type: "pemasukan", category: "Sewa Kamar A102", amount: 1500000, desc: "Pembayaran sewa Siti Rahma bulan Juni" },
  { id: "TX002", date: "2026-06-02", type: "pengeluaran", category: "Pemeliharaan", amount: 250000, desc: "Perbaikan keran air kamar C302" },
  { id: "TX003", date: "2026-06-03", type: "pengeluaran", category: "Utilitas", amount: 450000, desc: "Pembayaran tagihan Wifi utama" }
];

// Data Dummy Pengaduan Awal
export const INITIAL_ISSUES = [
  {
    id: "IS001",
    tenantName: "Siti Rahma",
    roomId: "A102",
    category: "Fasilitas Kamar",
    desc: "AC di kamar A102 kurang dingin, mungkin perlu cuci AC.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400",
    status: "Pending",
    date: "2026-06-05"
  }
];
