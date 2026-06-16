import { ImSpinner2 } from "react-icons/im";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  icon: Icon,
  ...props
}) => {
  // Varian tombol — warm & premium (Eternal x CafeBlend)
  const variants = {
    primary: "bg-[var(--color-primary)] text-[var(--color-accent-text)] hover:bg-[var(--color-primary-dark)] hover:text-white active:scale-95 shadow-neumorphic-sm font-extrabold",
    secondary: "bg-[var(--color-primary-dark)] text-white hover:opacity-90 active:scale-95 shadow-neumorphic-sm font-extrabold",
    success: "bg-[var(--color-success)] text-white hover:opacity-90 active:scale-95 font-bold",
    danger: "bg-[var(--color-danger)] text-white hover:opacity-90 active:scale-95 font-bold",
    outline: "border-2 border-[var(--color-primary-dark)]/50 text-[var(--color-primary-dark)] hover:bg-[var(--color-primary-dark)] hover:text-white active:scale-95 font-extrabold",
    ghost: "text-[var(--color-accent-text)] hover:bg-[var(--color-primary-light)]/20 active:scale-95 font-bold",
    "neumorphic-primary": "bg-[var(--color-accent-bg)] text-[var(--color-primary-dark)] shadow-neumorphic-raised active:shadow-neumorphic-inset active:scale-95 font-bold border border-[var(--color-primary-light)]/40",
    "neumorphic-secondary": "bg-[var(--color-accent-bg)] text-[var(--color-accent-text)] shadow-neumorphic-raised active:shadow-neumorphic-inset active:scale-95 font-semibold",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs font-medium rounded-lg",
    md: "px-6 py-2.5 text-sm font-semibold rounded-xl shadow-sm hover:shadow",
    lg: "px-8 py-3.5 text-base font-semibold rounded-2xl shadow-sm hover:shadow-md",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 ${
        variants[variant] || variants.primary
      } ${sizes[size]} ${
        disabled || loading ? "opacity-50 cursor-not-allowed scale-100 shadow-none" : ""
      } ${className}`}
      {...props}
    >
      {loading && <ImSpinner2 className="animate-spin text-current" />}
      {!loading && Icon && <Icon size={size === "sm" ? 14 : 16} className="shrink-0" />}
      {children}
    </button>
  );
};

export default Button;
