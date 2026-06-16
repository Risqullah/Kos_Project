import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Sidebar from "../components/layout/Sidebar";
import { ADMIN_MENU, TENANT_MENU } from "../config/constants";
import { HiMenuAlt2, HiX } from "react-icons/hi";

const DashboardLayout = () => {
  const { currentUser } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const menuItems = currentUser.role === "owner" ? ADMIN_MENU : TENANT_MENU;

  return (
    <div className="flex h-screen w-screen overflow-hidden dashboard-dark-theme font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar menuItems={menuItems} />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/40 backdrop-blur-sm">
          <div className="relative w-64 h-full animate-slide-in">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute right-4 top-4 text-[var(--color-accent-text)] hover:text-[var(--color-danger)] z-10"
            >
              <HiX size={24} />
            </button>
            <Sidebar menuItems={menuItems} />
          </div>
          <div className="flex-1" onClick={() => setIsMobileOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between bg-[var(--color-surface)] border-b border-[var(--color-primary-light)]/40 px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileOpen(true)}
              className="p-1 text-[var(--color-accent-text)] hover:bg-[var(--color-primary-light)]/50 rounded-lg">
              <HiMenuAlt2 size={24} />
            </button>
            <div className="text-lg font-bold tracking-wider text-[var(--color-primary-dark)] uppercase font-serif">Eternal</div>
          </div>
          <div className="w-8 h-8 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center font-bold text-xs uppercase text-[var(--color-accent-text)] shadow-sm border border-[var(--color-primary-light)]/50">
            {currentUser.name.charAt(0)}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
