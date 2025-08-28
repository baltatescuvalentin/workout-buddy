import { cva } from "class-variance-authority";
import type React from "react";

type ButtonType = {
  size: "small" | "medium" | "large";
  color: "primary" | "secondary" | "success" | "warning" | "danger";
  disabled?: boolean;
  children: React.ReactNode;
  styles?: string;
};

function Button({
  size,
  color,
  disabled = false,
  children,
  styles = "",
}: ButtonType) {
  const buttonStyles = cva(
    "inline-flex items-center justify-center w-fit px-8 rounded-sm cursor-pointer transition-all gap-1 disabled:opacity-50 disabled:cursor-not-allowed",
    {
      variants: {
        size: {
          small: "h-[24px] text-sm",
          medium: "h-[32px] ",
          large: "h-[48px] text-lg",
        },
        color: {
          primary: "text-white bg-main-blue hover:opacity-80",
          secondary:
            "text-gray-500 border-1 border-gray-300 hover:text-main-blue hover:border-[var(--main-blue)]",
          success: "",
          warning: "",
          danger: "",
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
    >
      {children}
    </button>
  );
}

export default Button;
