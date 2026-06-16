import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  HiOutlineTemplate,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineCash,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineLogout,
  HiOutlineHome
} from "react-icons/hi";

const Sidebar = ({ menuItems = [] }) => {
  const { currentUser, logoutUser } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const iconMap = {
    Overview: HiOutlineTemplate,
    Rooms: HiOutlineOfficeBuilding,
    Tenants: HiOutlineUserGroup,
    Finance: HiOutlineCash,
    Issues: HiOutlineClipboardList,
    Info: HiOutlineDocumentText,
    History: HiOutlineClock
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-[var(--color-tertiary)] border-r border-[var(--color-primary-light)] flex flex-col h-screen sticky top-0 shrink-0">
      {/* ── Brand (Logo Link) ── */}
      <Link to="/" className="p-6 border-b border-[var(--color-primary-light)] flex items-center gap-3 hover:opacity-90 transition">
        <div className="w-9 h-9 bg-[var(--color-primary-dark)] rounded-lg flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </div>
        <div>
          <div className="text-lg font-bold tracking-wider text-[var(--color-primary)] uppercase font-serif">Eternal</div>
          <p className="text-[9px] text-[var(--color-accent-text)]/40 uppercase tracking-wider font-sans font-bold">Kos Management</p>
        </div>
      </Link>

      {/* ── Navigation ── */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, idx) => {
          const Icon = iconMap[item.icon] || HiOutlineTemplate;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-accent-text)]/60 hover:bg-[var(--color-primary-light)]/50 hover:text-[var(--color-accent-text)]"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* ── Back to Home Button ── */}
      <div className="p-4 border-t border-[var(--color-primary-light)]/40">
        <Link
          to="/"
          className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] hover:text-[var(--color-accent-text)] shadow-md transition-all duration-250 w-full border border-[var(--color-primary)]/20"
        >
          <HiOutlineHome size={18} className="shrink-0 text-white group-hover:text-[var(--color-accent-text)]" />
          Beranda Utama
        </Link>
      </div>

      {/* ── User ── */}
      {currentUser && (
        <div className="p-5 border-t border-[var(--color-primary-light)] bg-[var(--color-surface-inset)]/70">
          <div className="flex items-center gap-4 mb-4 px-2">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-accent-text)] font-black text-lg uppercase shadow-sm border border-[var(--color-primary)]/30 shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-extrabold text-[var(--color-accent-text)] truncate font-sans">{currentUser.name}</h4>
              <p className="text-xs text-[var(--color-accent-text)]/65 truncate font-sans mt-0.5">{currentUser.email}</p>
              <span className="inline-block mt-1.5 text-[9px] font-extrabold uppercase tracking-widest bg-[var(--color-primary-dark)] text-white px-2.5 py-1 rounded">
                {currentUser.role}
              </span>
            </div>
          </div>

          <button onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 transition-all duration-200">
            <HiOutlineLogout size={16} />
            Keluar
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
