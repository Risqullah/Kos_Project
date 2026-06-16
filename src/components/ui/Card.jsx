

const VARIANTS = {
  default: "bg-[var(--color-surface)] border border-[var(--color-secondary)]/50 shadow-sm",
  elevated: "bg-[var(--color-surface)] border border-[var(--color-secondary)]/45 shadow-neumorphic-md",
  neumorphic: "bg-[var(--color-surface-inset)] border border-[var(--color-secondary)]/60 shadow-neumorphic-raised",
  inset: "bg-[var(--color-surface-inset)] shadow-neumorphic-inset border border-[var(--color-secondary)]/50",
  tertiary: "bg-[var(--color-tertiary)] border border-[var(--color-secondary)]/55",
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
      className={`rounded-2xl transition-all duration-300 ${
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
