import { Suspense, lazy } from "react";
import "./assets/tailwind.css"
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout"
import DashboardLayout from "./layout/DashboardLayout";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import('./pages/Home'));
const RoomsList = lazy(() => import("./pages/RoomsList"));
const InfoRules = lazy(() => import("./pages/InfoRules"));

// Admin pages
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminRooms = lazy(() => import("./pages/admin/AdminRooms"));
const AdminTenants = lazy(() => import("./pages/admin/AdminTenants"));
const AdminFinance = lazy(() => import("./pages/admin/AdminFinance"));
const AdminIssues = lazy(() => import("./pages/admin/AdminIssues"));
const AdminInfo = lazy(() => import("./pages/admin/AdminInfo"));

// Tenant pages
const TenantDashboard = lazy(() => import("./pages/tenant/TenantDashboard"));
const TenantIssues = lazy(() => import("./pages/tenant/TenantIssues"));
const TenantHistory = lazy(() => import("./pages/tenant/TenantHistory"));
const TenantProfile = lazy(() => import("./pages/tenant/TenantProfile"));

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-accent-bg text-accent-text font-bold">Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/kamar" element={<RoomsList />} />
          <Route path="/kamar/:id" element={<RoomsList />} />
          <Route path="/informasi" element={<InfoRules />} />
          <Route path="/reservasi/:roomId" element={<RoomsList />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/kamar" element={<AdminRooms />} />
          <Route path="/admin/penghuni" element={<AdminTenants />} />
          <Route path="/admin/keuangan" element={<AdminFinance />} />
          <Route path="/admin/pengaduan" element={<AdminIssues />} />
          <Route path="/admin/informasi" element={<AdminInfo />} />

          {/* Tenant Routes */}
          <Route path="/tenant" element={<TenantDashboard />} />
          <Route path="/tenant/pengaduan" element={<TenantIssues />} />
          <Route path="/tenant/riwayat" element={<TenantHistory />} />
          <Route path="/tenant/profil" element={<TenantProfile />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;