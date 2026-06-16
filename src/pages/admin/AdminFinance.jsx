import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import { HiPlus, HiTrash, HiTrendingUp, HiTrendingDown, HiX } from "react-icons/hi";

const AdminFinance = () => {
  const { transactions, addTransaction, deleteTransaction } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "pemasukan",
    category: "",
    amount: "",
    desc: "",
  });
  const [error, setError] = useState("");

  const totalIncome = transactions
    .filter((t) => t.type === "pemasukan")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "pengeluaran")
    .reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? (value === "" ? "" : parseInt(value) || 0) : value,
    }));
  };

  const resetForm = () => {
    setShowModal(false);
    setFormData({ date: new Date().toISOString().split("T")[0], type: "pemasukan", category: "", amount: "", desc: "" });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.category.trim()) return setError("Kategori wajib diisi.");
    if (!formData.amount || formData.amount <= 0) return setError("Nominal harus lebih dari 0.");
    if (!formData.desc.trim()) return setError("Keterangan wajib diisi.");
    addTransaction({ ...formData, amount: parseInt(formData.amount) });
    resetForm();
  };

  const handleDelete = (txId) => {
    if (window.confirm("Hapus transaksi ini?")) deleteTransaction(txId);
  };

  const txHeaders = [
    { key: "date", label: "Tanggal" },
    {
      key: "type", label: "Jenis",
      render: (v) => (
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase ${v === "pemasukan" ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
          {v === "pemasukan" ? <HiTrendingUp size={14} /> : <HiTrendingDown size={14} />}
          {v}
        </span>
      ),
    },
    { key: "category", label: "Kategori" },
    {
      key: "amount", label: "Nominal",
      render: (v, row) => (
        <span className={`font-bold ${row.type === "pemasukan" ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
          {row.type === "pemasukan" ? "+" : "-"} Rp {v.toLocaleString("id-ID")}
        </span>
      ),
    },
    { key: "desc", label: "Keterangan" },
    {
      key: "actions", label: "Aksi",
      render: (_, row) => (
        <button onClick={() => handleDelete(row.id)} className="p-1.5 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 rounded-lg transition" title="Hapus">
          <HiTrash size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-dark)]">
            Keuangan Kos
          </h1>
          <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 font-sans">
            Catat dan pantau arus kas kos secara real-time.
          </p>
        </div>
        <Button variant="primary" icon={HiPlus} onClick={() => { resetForm(); setShowModal(true); }}>
          Catat Transaksi
        </Button>
      </div>

      {/* ── Ringkasan Neumorphic ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="neumorphic" padding="p-6" className="flex items-center gap-4 border-l-4 border-[var(--color-success)]">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-success)]/10 flex items-center justify-center text-[var(--color-success)] shrink-0">
            <HiTrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-accent-text)]/50">Total Pemasukan</p>
            <p className="text-xl font-extrabold text-[var(--color-success)] font-serif">
              Rp {totalIncome.toLocaleString("id-ID")}
            </p>
          </div>
        </Card>

        <Card variant="neumorphic" padding="p-6" className="flex items-center gap-4 border-l-4 border-[var(--color-danger)]">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-danger)]/10 flex items-center justify-center text-[var(--color-danger)] shrink-0">
            <HiTrendingDown size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-accent-text)]/50">Total Pengeluaran</p>
            <p className="text-xl font-extrabold text-[var(--color-danger)] font-serif">
              Rp {totalExpense.toLocaleString("id-ID")}
            </p>
          </div>
        </Card>

        <Card variant="neumorphic" padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
            <span className="text-lg font-black">Rp</span>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-accent-text)]/50">Saldo Bersih</p>
            <p className={`text-xl font-extrabold font-serif ${netBalance >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
              Rp {netBalance.toLocaleString("id-ID")}
            </p>
          </div>
        </Card>
      </div>

      {/* ── Progress Bar Visual ── */}
      {totalIncome > 0 && (
        <Card variant="tertiary" padding="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold text-[var(--color-accent-text)]/60 font-sans">
              Rasio Pengeluaran terhadap Pemasukan
            </p>
            <p className="text-[11px] font-bold font-sans">
              {Math.round((totalExpense / totalIncome) * 100)}%
            </p>
          </div>
          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((totalExpense / totalIncome) * 100, 100)}%`,
                background: totalExpense > totalIncome
                  ? "var(--color-danger)"
                  : "linear-gradient(90deg, var(--color-success), var(--color-primary))",
              }}
            />
          </div>
        </Card>
      )}

      {/* ── Tabel ── */}
      <Card variant="tertiary" padding="p-0">
        <div className="p-4 border-b border-gray-100">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/60">
            Riwayat Transaksi ({transactions.length})
          </p>
        </div>
        <Table headers={txHeaders} data={transactions} emptyMessage="Belum ada transaksi." />
      </Card>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <Card variant="elevated" padding="p-0" className="w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold font-serif text-[var(--color-primary-dark)]">Catat Transaksi</h2>
                <p className="text-xs text-[var(--color-accent-text)]/50 font-sans">Pemasukan atau pengeluaran kas.</p>
              </div>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-xl"><HiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="p-3 rounded-xl bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 text-xs text-[var(--color-danger)] font-medium">{error}</div>}

              <Input label="Tanggal" type="date" name="date" value={formData.date} onChange={handleChange} required />

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/80">Jenis</label>
                <select name="type" value={formData.type} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                  <option value="pemasukan">Pemasukan</option>
                  <option value="pengeluaran">Pengeluaran</option>
                </select>
              </div>

              <Input label="Kategori" name="category" value={formData.category} onChange={handleChange} placeholder="Sewa Kamar, Listrik, dll" required />
              <Input label="Nominal (Rp)" type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="1500000" required />

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/80">Keterangan</label>
                <textarea name="desc" value={formData.desc} onChange={handleChange} rows={3}
                  placeholder="Keterangan tambahan..."
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition resize-none"
                  required />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button variant="outline" onClick={resetForm} className="flex-1">Batal</Button>
                <Button type="submit" variant="primary" className="flex-1" icon={HiPlus}>Simpan</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminFinance;
