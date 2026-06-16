import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import { HiOutlineCalendar, HiOutlineCreditCard, HiTrendingUp, HiBadgeCheck } from "react-icons/hi";

const TenantHistory = () => {
  const { currentUser, transactions, tenants } = useApp();

  // Cari data detail tenant dari list tenants
  const tenantDetails = tenants.find((t) => t.email === currentUser.email);
  const roomId = currentUser.roomId || (tenantDetails && tenantDetails.roomId);

  // Filter transaksi sewa milik tenant ini (berdasarkan kecocokan kamar atau nama/keterangan)
  const myTransactions = transactions.filter((t) => {
    const termRoom = roomId ? roomId.toLowerCase() : "___";
    const termName = currentUser.name.toLowerCase();
    
    return (
      t.category.toLowerCase().includes(termRoom) ||
      t.desc.toLowerCase().includes(termName) ||
      t.category.toLowerCase().includes(termName)
    );
  });

  // Hitung total pengeluaran sewa
  const totalPaid = myTransactions
    .filter((t) => t.type === "pemasukan") // di database owner tipe-nya pemasukan dari sisi owner
    .reduce((sum, t) => sum + t.amount, 0);

  // Header Tabel
  const transHeaders = [
    { key: "date", label: "Tanggal" },
    { key: "category", label: "Kategori" },
    { key: "desc", label: "Keterangan" },
    {
      key: "amount",
      label: "Jumlah Pembayaran",
      render: (v) => <span className="font-bold font-mono text-[var(--color-success)]">Rp {v.toLocaleString("id-ID")}</span>
    },
    {
      key: "status",
      label: "Status",
      render: () => <Badge status="success">Lunas</Badge>
    }
  ];

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-dark)]">
          Riwayat Sewa & Transaksi 🧾
        </h1>
        <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 font-sans">
          Daftar bukti pembayaran sewa bulanan Anda yang telah diverifikasi oleh pengelola.
        </p>
      </div>

      {/* ── Statistik Ringkas Sewa ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="neumorphic" padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-success)]/10 flex items-center justify-center text-[var(--color-success)] shrink-0">
            <HiTrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-accent-text)]/50 font-sans">
              Total Dana Dibayarkan
            </p>
            <p className="text-xl font-extrabold text-[var(--color-accent-text)] font-serif mt-0.5">
              Rp {totalPaid.toLocaleString("id-ID")}
            </p>
          </div>
        </Card>

        <Card variant="neumorphic" padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
            <HiBadgeCheck size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-accent-text)]/50 font-sans">
              Sewa Bulan Ini
            </p>
            <p className="text-xl font-extrabold text-[var(--color-success)] font-serif mt-0.5">
              LUNAS
            </p>
          </div>
        </Card>

        <Card variant="neumorphic" padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-warning)]/10 flex items-center justify-center text-[var(--color-warning)] shrink-0">
            <HiOutlineCalendar size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-accent-text)]/50 font-sans">
              Jatuh Tempo Berikutnya
            </p>
            <p className="text-sm font-extrabold text-[var(--color-accent-text)] font-sans mt-1">
              {tenantDetails?.dueDate || "Belum ditentukan"}
            </p>
          </div>
        </Card>
      </div>

      {/* ── Tabel Transaksi ── */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary-dark)] flex items-center gap-2">
          <HiOutlineCreditCard size={18} className="text-[var(--color-primary)]" />
          Daftar Pembayaran Sewa
        </h2>

        <Card variant="tertiary" padding="p-0">
          <Table
            headers={transHeaders}
            data={myTransactions}
            emptyMessage="Belum ditemukan transaksi pembayaran sewa kos atas nama Anda."
          />
        </Card>
      </div>
    </div>
  );
};

export default TenantHistory;
