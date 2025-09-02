import { cva } from "class-variance-authority";
import type React from "react";

type ButtonType = {
  size: "small" | "medium" | "large";
  color: "primary" | "secondary" | "success" | "warning" | "danger";
  disabled?: boolean;
  children: React.ReactNode;
  styles?: string;
  handleClick?: () => void;
};

function Button({
  size,
  color,
  disabled = false,
  children,
  styles = "",
  handleClick,
}: ButtonType) {
  const buttonStyles = cva(
    "inline-flex items-center justify-center w-fit px-8 rounded-sm cursor-pointer transition-all duration-100 gap-1 disabled:opacity-50 disabled:cursor-not-allowed",
    {
      variants: {
        size: {
          small: "h-[24px] text-sm",
          medium: "h-[32px] ",
          large: "h-[42px] text-lg",
        },
        color: {
          primary: "text-white bg-main-blue hover:bg-blue-500/90",
          secondary:
            "text-gray-500 bg-white border-1 border-gray-300 hover:text-main-blue hover:border-[var(--main-blue)]",
          success: "text-white bg-main-green hover:bg-green-500/90",
          warning: "text-white bg-main-orange hover:bg-orange-500/90",
          danger: "text-white bg-main-danger hover:bg-red-500/90",
        },
      },
      defaultVariants: {
        size: "medium",
        color: "primary",
      },
    }
  );

  return (
    <button
      className={`${buttonStyles({ size, color })} ${styles}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
