import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { ROOM_FACILITIES } from "../../config/constants";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import {
  HiOutlineSun,
  HiOutlineWifi,
  HiOutlineKey,
  HiOutlineHome,
  HiOutlineArchive,
  HiOutlineDesktopComputer,
  HiOutlineCloud,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineCash,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlinePhone,
  HiExclamationCircle
} from "react-icons/hi";

const TenantDashboard = () => {
  const { currentUser, rooms, tenants, issues } = useApp();
  const navigate = useNavigate();

  // Cari data detail tenant dari list tenants
  const tenantDetails = tenants.find((t) => t.email === currentUser.email);
  
  // Kamar yang ditempati
  const roomId = currentUser.roomId || (tenantDetails && tenantDetails.roomId);
  const room = rooms.find((r) => r.id === roomId);

  // Fungsi pembaca tanggal lokal YYYY-MM-DD
  const parseLocalDate = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = tenantDetails?.dueDate ? parseLocalDate(tenantDetails.dueDate) : null;
  let remainingDays = null;
  if (dueDate) {
    const diffTime = dueDate - today;
    remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Filter issues milik tenant ini
  const myIssues = issues.filter(
    (issue) => 
      (roomId && issue.roomId === roomId) || 
      issue.tenantName === currentUser.name
  );
  const pendingIssuesCount = myIssues.filter(i => i.status === "Pending").length;

  // Ikon Fasilitas
  const iconMap = {
    HiOutlineSun,
    HiOutlineWifi,
    HiOutlineKey,
    HiOutlineHome,
    HiOutlineArchive,
    HiOutlineDesktopComputer,
    HiOutlineCloud
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── Header Halaman ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-primary-dark)]">
            Dashboard Hunian Saya 🌿
          </h1>
          <p className="text-sm text-[var(--color-accent-text)]/85 font-sans mt-1">
            Pantau detail sewa, fasilitas kamar, dan status pengaduan Anda di sini.
          </p>
        </div>
        
        {/* Tombol Back ke Home */}
        <Link to="/">
          <Button variant="outline" size="sm" icon={HiOutlineArrowLeft}>
            Kembali ke Beranda
          </Button>
        </Link>
      </div>

      {/* ── Notifikasi Peringatan Jatuh Tempo ── */}
      {roomId && remainingDays !== null && remainingDays <= 7 && (
        <div className={`p-4 rounded-xl border flex gap-3 text-left ${
          remainingDays >= 0 
            ? "bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 text-[var(--color-warning)]" 
            : "bg-[var(--color-danger)]/10 border-[var(--color-danger)]/30 text-[var(--color-danger)]"
        }`}>
          <HiExclamationCircle size={24} className="shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold uppercase tracking-wider font-sans">
              {remainingDays >= 0 ? "Peringatan Jatuh Tempo Pembayaran" : "Peringatan Keterlambatan Pembayaran"}
            </h5>
            <p className="text-[11px] text-[var(--color-accent-text)] leading-relaxed font-sans">
              {remainingDays >= 0 
                ? `Masa sewa Kamar ${room?.name || roomId} Anda akan berakhir dalam ${remainingDays} hari (${tenantDetails?.dueDate}). Harap segera hubungi pengelola untuk melakukan perpanjangan sewa.`
                : `Masa sewa Kamar ${room?.name || roomId} Anda telah berakhir ${Math.abs(remainingDays)} hari yang lalu (Jatuh tempo pada ${tenantDetails?.dueDate}). Silakan hubungi pengelola secepatnya.`}
            </p>
          </div>
        </div>
      )}

      {/* ── BENTO GRID LAYOUT ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* BENTO CARD 1: Profil & Status Sewa (Row Span 2) */}
        <div className="md:row-span-2">
          <Card variant="default" className="h-full flex flex-col justify-between border-accent-top shadow-md">
            <div className="space-y-6">
              {/* Profile Avatar */}
              <div className="text-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-[var(--color-primary-dark)] text-[var(--color-text-parchment)] flex items-center justify-center font-bold text-2xl uppercase mx-auto shadow-md border-2 border-[var(--color-primary-light)]">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-accent-text)] font-sans">{currentUser.name}</h3>
                  <p className="text-xs text-[var(--color-accent-text)]/75">{currentUser.email}</p>
                </div>
                <Badge variant="chip" status="Aktif">Penghuni Aktif</Badge>
              </div>

              <hr className="border-[var(--color-primary-light)]/40" />

              {/* Rincian Sewa */}
              {roomId ? (
                <div className="space-y-4 text-xs font-sans">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-accent-text)]/80">Nomor Kamar</span>
                    <Badge variant="default" className="bg-[var(--color-primary)]/15 text-[var(--color-primary-dark)] font-bold">
                      KAMAR {room?.name || roomId}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-accent-text)]/80">Tipe Sewa</span>
                    <span className="font-bold text-[var(--color-primary-dark)] uppercase tracking-wider text-xs">
                      {room?.type || "Standard"} Room
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-accent-text)]/80">Tanggal Masuk</span>
                    <span className="font-bold text-[var(--color-accent-text)] flex items-center gap-1">
                      <HiOutlineCalendar size={14} className="text-[var(--color-primary)]" />
                      {tenantDetails?.entryDate || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-accent-text)]/80">Jatuh Tempo Sewa</span>
                    <span className="font-bold text-[var(--color-warning)] flex items-center gap-1">
                      <HiOutlineCalendar size={14} />
                      {tenantDetails?.dueDate || "-"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-[var(--color-accent-text)]/60 italic">
                  Belum ada kamar aktif yang terdaftar atas nama Anda.
                </div>
              )}
            </div>

            {roomId && (
              <div className="mt-8 pt-4 border-t border-[var(--color-primary-light)]/40">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[var(--color-accent-text)]/80 font-sans">Biaya Sewa Bulanan</span>
                  <span className="text-base font-bold text-[var(--color-primary-dark)] font-mono">
                    Rp {room?.price?.toLocaleString("id-ID") || 0}
                  </span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* BENTO CARD 2: Kamar & Fasilitas Mandiri (Col Span 2) */}
        <div className="md:col-span-2">
          {room ? (
            <Card variant="default" className="shadow-md h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary-dark)]">
                      Spesifikasi Hunian
                    </span>
                    <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mt-0.5">
                      Fasilitas Kamar Mandiri
                    </h3>
                  </div>
                  <span className="text-xs font-bold bg-[var(--color-tertiary)] border border-[var(--color-primary-light)] text-[var(--color-primary-dark)] px-3 py-1 rounded-md">
                    Ukuran: {room?.size || "3x4 m"}
                  </span>
                </div>

                <p className="text-xs text-[var(--color-accent-text)]/85 leading-relaxed font-sans pb-2 border-b border-[var(--color-primary-light)]/40">
                  {room?.description || "Kamar kos premium yang didesain secara estetis dan ergonomis demi menjamin kenyamanan belajar dan istirahat Anda."}
                </p>

                {/* Grid Fasilitas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {ROOM_FACILITIES.filter((facility) => room.facilities.includes(facility.id)).map((facility) => {
                    const IconComponent = iconMap[facility.icon] || HiOutlineKey;
                    return (
                      <div
                        key={facility.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-tertiary)] border border-[var(--color-primary-light)]/40"
                      >
                        <div className="w-7 h-7 rounded-md bg-[var(--color-surface-inset)] flex items-center justify-center text-[var(--color-primary-dark)] shadow-sm shrink-0 border border-[var(--color-primary-light)]/30">
                          <IconComponent size={14} />
                        </div>
                        <span className="text-xs font-semibold text-[var(--color-accent-text)]">{facility.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          ) : (
            <Card variant="default" className="shadow-md h-full flex items-center justify-center py-20 text-center">
              <p className="text-sm text-[var(--color-accent-text)]/75 font-sans">Belum ada data kamar aktif.</p>
            </Card>
          )}
        </div>

        {/* BENTO CARD 3: Ringkasan Pembayaran & Billing (Col Span 1) */}
        <Card variant="default" className="shadow-sm border border-[var(--color-primary-light)]/40 flex flex-col justify-between hover:border-[var(--color-primary)] transition duration-200">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/75 font-sans flex items-center gap-1.5">
              <HiOutlineCash size={16} className="text-[var(--color-primary-dark)]" /> Status Pembayaran
            </h4>
            <div className="pt-2">
              {!roomId ? (
                <>
                  <div className="text-xl font-bold text-gray-400 font-serif">BELUM AKTIF</div>
                  <p className="text-xs text-[var(--color-accent-text)]/80 font-sans mt-1">Anda belum menempati kamar.</p>
                </>
              ) : remainingDays === null ? (
                <>
                  <div className="text-xl font-bold text-[var(--color-warning)] font-serif">PENDING</div>
                  <p className="text-xs text-[var(--color-accent-text)]/80 font-sans mt-1">Menunggu penetapan tanggal sewa.</p>
                </>
              ) : remainingDays < 0 ? (
                <>
                  <div className="text-2xl font-bold text-[var(--color-danger)] font-serif">MENUNGGAK</div>
                  <p className="text-xs text-[var(--color-accent-text)]/80 font-sans mt-1">Sewa terlambat {Math.abs(remainingDays)} hari.</p>
                </>
              ) : remainingDays <= 7 ? (
                <>
                  <div className="text-2xl font-bold text-[var(--color-warning)] font-serif">JATUH TEMPO</div>
                  <p className="text-xs text-[var(--color-accent-text)]/80 font-sans mt-1">Sewa selesai dalam {remainingDays} hari.</p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-[var(--color-success)] font-serif">LUNAS</div>
                  <p className="text-xs text-[var(--color-accent-text)]/80 font-sans mt-1">Sewa aktif terbayar.</p>
                </>
              )}
            </div>
          </div>
          <Button 
            onClick={() => navigate("/tenant/riwayat")} 
            variant="ghost" 
            size="sm" 
            className="w-full justify-between !px-0 mt-4 border-t border-[var(--color-primary-light)]/30 pt-3 group"
          >
            Lihat Transaksi <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </Card>

        {/* BENTO CARD 4: Pengaduan Aktif (Col Span 1) */}
        <Card variant="default" className="shadow-sm border border-[var(--color-primary-light)]/40 flex flex-col justify-between hover:border-[var(--color-primary)] transition duration-200">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/75 font-sans flex items-center gap-1.5">
              <HiOutlineClipboardList size={16} className="text-[var(--color-primary-dark)]" /> Pengaduan Masalah
            </h4>
            <div className="pt-2">
              <div className="text-2xl font-bold text-[var(--color-accent-text)] font-serif">
                {pendingIssuesCount} Laporan
              </div>
              <p className="text-xs text-[var(--color-accent-text)]/80 font-sans mt-1">
                {pendingIssuesCount > 0 ? "Menunggu respon tindak lanjut pengelola." : "Seluruh fasilitas kamar dalam kondisi baik."}
              </p>
            </div>
          </div>
          <Button 
            onClick={() => navigate("/tenant/pengaduan")} 
            variant="ghost" 
            size="sm" 
            className="w-full justify-between !px-0 mt-4 border-t border-[var(--color-primary-light)]/30 pt-3 group"
          >
            Lapor Kerusakan <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </Card>

        {/* BENTO CARD 5: Hubungi Pengelola (Col Span 1) */}
        <Card variant="default" className="shadow-sm border border-[var(--color-primary-light)]/40 flex flex-col justify-between hover:border-[var(--color-primary)] transition duration-200">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/75 font-sans flex items-center gap-1.5">
              <HiOutlinePhone size={16} className="text-[var(--color-primary-dark)]" /> Layanan Bantuan
            </h4>
            <div className="pt-2">
              <div className="text-sm font-bold text-[var(--color-accent-text)] font-sans">Owner Eternal Kos</div>
              <p className="text-xs text-[var(--color-accent-text)]/80 font-sans mt-1">Respon cepat survey lokasi & survey darurat.</p>
            </div>
          </div>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between !px-0 mt-4 border-t border-[var(--color-primary-light)]/30 pt-3 group"
            >
              Hubungi WhatsApp <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </Card>

      </div>
    </div>
  );
};

export default TenantDashboard;
