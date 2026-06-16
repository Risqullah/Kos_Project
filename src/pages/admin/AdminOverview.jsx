import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import {
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineCash,
  HiOutlineBell,
  HiCheck,
  HiX,
  HiCalendar,
  HiExclamationCircle,
} from "react-icons/hi";

const AdminOverview = () => {
  const { rooms, tenants, transactions, reservations, updateReservationStatus } =
    useApp();

  // ── Statistik ──
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.status === "Terisi").length;
  const availableRooms = rooms.filter((r) => r.status === "Tersedia").length;

  const totalIncome = transactions
    .filter((t) => t.type === "pemasukan")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "pengeluaran")
    .reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  // ── Jatuh tempo (14 hari) ──
  const nearDueTenants = tenants.filter((tenant) => {
    const parseLocalDate = (dateStr) => {
      if (!dateStr) return null;
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = parseLocalDate(tenant.dueDate);
    if (!dueDate) return false;

    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 14 && tenant.status === "Aktif";
  });

  // ── Tabel Reservasi ──
  const reservationHeaders = [
    { key: "date", label: "Tanggal" },
    { key: "name", label: "Nama" },
    { key: "roomName", label: "Kamar" },
    {
      key: "duration",
      label: "Durasi",
      render: (v) => `${v} Bulan`,
    },
    {
      key: "status",
      label: "Status",
      render: (v) => <Badge>{v}</Badge>,
    },
    {
      key: "actions",
      label: "Aksi",
      render: (_, row) => {
        if (row.status !== "Menunggu Konfirmasi")
          return (
            <span className="text-[10px] text-gray-400 italic font-medium">
              Selesai
            </span>
          );
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => updateReservationStatus(row.id, "Disetujui")}
              variant="success"
              size="sm"
              className="!rounded-lg !px-3 !py-1"
            >
              <HiCheck size={14} /> Setujui
            </Button>
            <Button
              onClick={() => updateReservationStatus(row.id, "Ditolak")}
              variant="danger"
              size="sm"
              className="!rounded-lg !px-3 !py-1"
            >
              <HiX size={14} /> Tolak
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-dark)]">
          Halo, Owner ✨
        </h1>
        <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 font-sans">
          Berikut ringkasan operasional Eternal Kos hari ini.
        </p>
      </div>

      {/* ── Stat Cards (Neumorphic) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="neumorphic" padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary-dark)] shrink-0">
            <HiOutlineOfficeBuilding size={24} />
          </div>
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-[var(--color-accent-text)]/75">
              Total Kamar
            </p>
            <p className="text-2xl font-extrabold text-[var(--color-accent-text)] font-serif">
              {totalRooms}
            </p>
          </div>
        </Card>

        <Card variant="neumorphic" padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-success)]/10 flex items-center justify-center text-[var(--color-success)] shrink-0">
            <HiOutlineOfficeBuilding size={24} />
          </div>
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-[var(--color-accent-text)]/75">
              Kamar Kosong
            </p>
            <p className="text-2xl font-extrabold text-[var(--color-success)] font-serif">
              {availableRooms}
            </p>
          </div>
        </Card>

        <Card variant="neumorphic" padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary-dark)] shrink-0">
            <HiOutlineUserGroup size={24} />
          </div>
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-[var(--color-accent-text)]/75">
              Kamar Terisi
            </p>
            <p className="text-2xl font-extrabold text-[var(--color-primary-dark)] font-serif">
              {occupiedRooms}
            </p>
          </div>
        </Card>

        <Card variant="neumorphic" padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-success)]/10 flex items-center justify-center text-[var(--color-success)] shrink-0">
            <HiOutlineCash size={24} />
          </div>
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-[var(--color-accent-text)]/75">
              Saldo Bersih
            </p>
            <p className="text-lg font-extrabold text-[var(--color-accent-text)] font-serif">
              Rp {netBalance.toLocaleString("id-ID")}
            </p>
          </div>
        </Card>
      </div>

      {/* ── Middle Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Jatuh Tempo ── */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary-dark)] flex items-center gap-2">
            <HiOutlineBell size={18} className="text-[var(--color-warning)]" />
            Peringatan Jatuh Tempo
          </h2>

          <Card variant="tertiary" padding="p-6" className="space-y-4 max-h-[380px] overflow-y-auto">
            {nearDueTenants.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-8 font-sans">
                Tidak ada penghuni yang mendekati jatuh tempo 🎉
              </p>
            ) : (
              nearDueTenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-accent-bg)]/40 shadow-sm border-l-4 border-[var(--color-warning)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--color-warning)]/15 flex items-center justify-center text-[var(--color-warning)]">
                      <HiExclamationCircle size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-accent-text)] font-sans">
                        {tenant.name}
                      </p>
                      <p className="text-xs text-[var(--color-accent-text)]/75 font-sans">
                        Kamar {tenant.roomId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[var(--color-primary-dark)] font-sans">
                      <HiCalendar size={12} className="inline mr-1" />
                      {tenant.dueDate}
                    </p>
                    <Badge status="warning" variant="chip" className="mt-1">
                      Jatuh Tempo
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>

        {/* ── Reservasi Masuk ── */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary-dark)] flex items-center gap-2">
            <HiOutlineUserGroup size={18} className="text-[var(--color-primary)]" />
            Pengajuan Reservasi Masuk
          </h2>

          <Card variant="tertiary" padding="p-0">
            <Table
              headers={reservationHeaders}
              data={reservations}
              emptyMessage="Tidak ada pengajuan reservasi masuk saat ini."
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
