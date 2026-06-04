import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (item) =>
        item.email === dataForm.email && item.password === dataForm.password
    );

    if (!user) {
      setError("Invalid credentials. Pastikan email dan password sudah benar atau daftar terlebih dahulu.");
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/");
  };

  return (
    <div className="flex w-full h-full">

      {/* ── KIRI: area gambar ── */}
      <div className="w-[45%] bg-gray-200 rounded-l-2xl flex-shrink-0">
        {/* Ganti dengan gambar asli:
            <img src="/assets/banner.jpg" alt="banner"
                 className="w-full h-full object-cover rounded-l-2xl" />
        */}
      </div>

      {/* ── KANAN: form ── */}
      <div className="flex-1 bg-amber-50 rounded-r-2xl flex flex-col justify-center px-8 py-8">

        <h2 className="text-2xl font-bold text-gray-900 mb-5">Sign in</h2>

        {/* Error */}
        {error && (
          <div className="bg-red-100 mb-4 p-3 text-xs text-gray-600 rounded-lg flex items-start gap-2">
            <BsFillExclamationDiamondFill className="text-red-500 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-gray-100 mb-4 p-3 text-xs rounded-lg flex items-center gap-2">
            <ImSpinner2 className="animate-spin" />
            Mohon Tunggu...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="subiantosawit@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-9"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword
                  ? <HiEye size={15} />
                  : <HiEyeOff size={15} />
                }
              </button>
            </div>
          </div>

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-gray-300 accent-yellow-500"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-yellow-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white font-semibold py-2 rounded-md transition duration-200 text-sm mt-1"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-3">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
        >
          <FcGoogle size={16} />
          Sign in with Google
        </button>


        <p className="text-center text-xs text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}