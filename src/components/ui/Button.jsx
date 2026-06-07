// src/components/ui/Button.jsx
import React from "react";
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
    primary: "bg-[var(--color-primary)] text-white hover:opacity-90 active:scale-95 shadow-neumorphic-sm",
    secondary: "bg-[var(--color-primary-dark)] text-white hover:opacity-90 active:scale-95 shadow-neumorphic-sm",
    success: "bg-[var(--color-success)] text-white hover:opacity-90 active:scale-95",
    danger: "bg-[var(--color-danger)] text-white hover:opacity-90 active:scale-95",
    outline: "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white active:scale-95",
    ghost: "text-[var(--color-accent-text)] hover:bg-[var(--color-primary-light)] active:scale-95",
    "neumorphic-primary": "bg-[var(--color-accent-bg)] text-[var(--color-primary)] shadow-neumorphic-raised active:shadow-neumorphic-inset active:scale-95 font-bold",
    "neumorphic-secondary": "bg-[var(--color-accent-bg)] text-[var(--color-accent-text)] shadow-neumorphic-raised active:shadow-neumorphic-inset active:scale-95",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs font-semibold rounded-full tracking-wider uppercase",
    md: "px-6 py-2.5 text-sm font-bold rounded-full tracking-wider uppercase",
    lg: "px-8 py-3.5 text-base font-bold rounded-full tracking-wider uppercase",
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
