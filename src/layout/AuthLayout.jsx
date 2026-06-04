import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden flex"
           style={{ minHeight: "340px" }}>
        <Outlet />
      </div>
    </div>
  );
}