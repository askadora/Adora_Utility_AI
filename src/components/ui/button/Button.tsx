import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md" | "lg"; // Button size
  variant?: "primary" | "outline" | "secondary"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Additional classes
  fullWidth?: boolean; // Full width on mobile
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  fullWidth = false,
}) => {
  // Size Classes with improved touch targets
  const sizeClasses = {
    sm: "px-3 py-2.5 text-sm min-h-[44px] min-w-[44px]", // Minimum touch target
    md: "px-4 py-3 text-sm min-h-[44px] min-w-[44px]", // Minimum touch target
    lg: "px-6 py-4 text-base min-h-[48px] min-w-[48px]", // Larger touch target for important actions
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 focus:ring-2 focus:ring-brand-500/20 focus:outline-none",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 focus:ring-2 focus:ring-gray-500/20 focus:outline-none",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-500/20 focus:outline-none",
  };

  // Responsive width classes
  const widthClasses = fullWidth ? "w-full sm:w-auto" : "";

  return (
    <button
      className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition-all duration-200 ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${widthClasses}`}
      onClick={onClick}
      disabled={disabled}
      // Ensure proper touch behavior on mobile
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
    >
      {startIcon && <span className="flex items-center justify-center">{startIcon}</span>}
      <span className="flex items-center justify-center">{children}</span>
      {endIcon && <span className="flex items-center justify-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
