import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import {
  HiOutlinePhotograph,
  HiOutlineClipboardList,
  HiCheckCircle,
  HiClock,
  HiRefresh,
  HiTrash,
} from "react-icons/hi";

const STATUS_ICONS = {
  Pending: HiClock,
  Diproses: HiRefresh,
  Selesai: HiCheckCircle,
};

const AdminIssues = () => {
  const { issues, updateIssueStatus, deleteIssue } = useApp();
  const statusOptions = ["Pending", "Diproses", "Selesai"];

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-dark)]">
          Pengaduan Masuk
        </h1>
        <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 font-sans">
          Tindak lanjuti laporan dan keluhan dari penghuni kos.
        </p>
      </div>

      {/* ── List ── */}
      {issues.length === 0 ? (
        <Card variant="tertiary" padding="p-16" className="text-center">
          <HiOutlineClipboardList size={48} className="mx-auto text-gray-300" />
          <p className="mt-4 text-sm text-gray-400 font-sans">Tidak ada pengaduan masuk. Semua baik-baik saja! 🎉</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Summary Bar */}
          <div className="flex gap-4 text-xs font-bold uppercase tracking-wider font-sans">
            <span className="text-[var(--color-warning)]">Pending: {issues.filter(i => i.status === "Pending").length}</span>
            <span className="text-[var(--color-info)]">Diproses: {issues.filter(i => i.status === "Diproses").length}</span>
            <span className="text-[var(--color-success)]">Selesai: {issues.filter(i => i.status === "Selesai").length}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {issues.map((issue) => {
              const StatusIcon = STATUS_ICONS[issue.status] || HiClock;

              return (
                <Card key={issue.id} variant="default" padding="p-6" className="space-y-5">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        issue.status === "Pending" ? "bg-[var(--color-warning)]" :
                        issue.status === "Diproses" ? "bg-[var(--color-info)]" : "bg-[var(--color-success)]"
                      }`}>
                        {issue.tenantName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[var(--color-accent-text)] font-sans">{issue.tenantName}</h3>
                        <p className="text-[10px] text-[var(--color-accent-text)]/50 font-sans">
                          Kamar {issue.roomId} &middot; {issue.date} &middot; {issue.category}
                        </p>
                      </div>
                    </div>
                    <Badge status={issue.status === "Pending" ? "warning" : issue.status === "Diproses" ? "info" : "success"}>
                      {issue.status}
                    </Badge>
                  </div>

                  {/* Deskripsi */}
                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    <p className="text-sm text-[var(--color-accent-text)]/75 leading-relaxed font-sans">
                      {issue.desc}
                    </p>

                    {issue.image && (
                      <div className="relative h-44 rounded-xl overflow-hidden border border-gray-100 shadow-neumorphic-sm">
                        <img src={issue.image} alt="Bukti" className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[9px] px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                          <HiOutlinePhotograph size={12} /> Foto Bukti
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Timeline Status */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <StatusIcon size={14} className={
                        issue.status === "Pending" ? "text-[var(--color-warning)]" :
                        issue.status === "Diproses" ? "text-[var(--color-info)]" : "text-[var(--color-success)]"
                      } />
                      <span className="text-[11px] font-semibold text-[var(--color-accent-text)]/60 font-sans">
                        {issue.status === "Pending" ? "Menunggu ditindaklanjuti" :
                         issue.status === "Diproses" ? "Sedang dalam penanganan" : "Pengaduan selesai"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center w-full">
                      {statusOptions.map((status) => (
                        <Button
                          key={status}
                          onClick={() => updateIssueStatus(issue.id, status)}
                          variant={issue.status === status ? "primary" : "ghost"}
                          size="sm"
                          className={`text-[10px] ${
                            issue.status === status
                              ? ""
                              : "border border-gray-200 bg-white"
                          }`}
                          icon={
                            status === "Pending" ? HiClock :
                            status === "Diproses" ? HiRefresh : HiCheckCircle
                          }
                        >
                          {status}
                        </Button>
                      ))}
                      
                      <Button
                        onClick={() => {
                          if (window.confirm("Hapus pengaduan ini secara permanen?")) {
                            deleteIssue(issue.id);
                          }
                        }}
                        variant="danger"
                        size="sm"
                        className="text-[10px] ml-auto !rounded-lg"
                        icon={HiTrash}
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminIssues;
