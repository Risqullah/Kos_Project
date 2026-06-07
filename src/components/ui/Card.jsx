// src/components/ui/Card.jsx
import React from "react";

const VARIANTS = {
  default: "bg-white border border-gray-100 shadow-sm",
  elevated: "bg-white shadow-neumorphic-md",
  neumorphic: "bg-[var(--color-accent-bg)] shadow-neumorphic-raised",
  inset: "bg-[var(--color-surface-inset)] shadow-neumorphic-inset",
  tertiary: "bg-[var(--color-tertiary)] border border-[var(--color-primary-light)]",
};

const Card = ({
  children,
  className = "",
  padding = "p-6 md:p-8",
  variant = "default",
  hoverable = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-[2rem] transition-all duration-300 ${
        VARIANTS[variant] || VARIANTS.default
      } ${
        hoverable ? "hover:shadow-neumorphic-md hover:-translate-y-1 cursor-pointer" : ""
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
