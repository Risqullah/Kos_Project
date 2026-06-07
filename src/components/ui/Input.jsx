// src/components/ui/Input.jsx
import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  error,
  required = false,
  className = "",
  icon: Icon,
  ...props
}) => {
  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-accent-text/80">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-text/50">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-2.5 rounded-xl text-xs text-accent-text bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ${
            Icon ? "pl-10" : ""
          } ${error ? "border-danger focus:ring-danger" : ""}`}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] text-danger font-medium tracking-wide">{error}</p>}
    </div>
  );
};

export default Input;
