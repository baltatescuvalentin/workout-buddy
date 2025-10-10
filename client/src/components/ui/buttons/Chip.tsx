import { cva } from "class-variance-authority";
import type React from "react";
import { useEffect, useState } from "react";

interface IChip {
  type?: "button" | "default";
  active?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
  styles?: string;
  children: React.ReactNode;
  size?: "large" | "medium" | "small";
  color: "primary" | "unknown" | "success" | "warning" | "danger";
}

function Chip({
  type,
  active,
  disabled,
  handleClick,
  styles,
  color,
  children,
  size,
}: IChip) {
  const chip = cva(
    "inline-flex items-center justify-center h-7 rounded-md px-5 text-sm font-medium transition-all duration-200 ease-in-out select-none",
    {
      variants: {
        type: {
          default: "",
          button: "cursor-pointer",
        },
        color: {
          primary: "bg-secondary-blue !text-main-blue",
          success: "bg-secondary-green !text-main-green",
          warning: "bg-secondary-orange !text-main-warning",
          danger: "bg-secondary-red !text-main-danger",
          unknown: "bg-gray-200 !text-main-gray",
        },
        disabled: {
          true: "!opacity-50 !pointer-events-none !cursor-not-allowed",
        },
        active: { true: "!opacity-100" },
        size: {
          large: "!h-9.5 !text-base",
          medium: "!h-8",
          small: "",
        },
      },
      defaultVariants: {
        color: "primary",
        disabled: false,
        active: false,
        type: "default",
        size: "small",
      },
      compoundVariants: [
        {
          color: "primary",
          active: true,
          class: "!bg-main-blue !text-white",
        },
        {
          color: "success",
          active: true,
          class: "!bg-main-green !text-white",
        },
        {
          color: "warning",
          active: true,
          class: "!bg-main-warning !text-white",
        },
        {
          color: "danger",
          active: true,
          class: "!bg-main-danger !text-white",
        },
        {
          color: "unknown",
          active: true,
          class: "!bg-main-gray !text-white",
        },
        {
          color: "primary",
          type: "button",
          class: "hover:!bg-main-blue hover:!text-white",
        },
        {
          color: "success",
          type: "button",
          class: "hover:!bg-main-green hover:!text-white",
        },
        {
          color: "warning",
          type: "button",
          class: "hover:!bg-main-warning hover:!text-white",
        },
        {
          color: "danger",
          type: "button",
          class: "hover:!bg-main-danger hover:!text-white",
        },
        {
          color: "unknown",
          type: "button",
          class: "hover:!bg-main-gray hover:!text-white",
        },
      ],
    }
  );
  const [chipStyles, setChipStyles] = useState<string>("");

  useEffect(() => {
    setChipStyles(
      chip({
        color,
        disabled,
        active,
        type,
        size,
      })
    );
  }, [active, chip, color, disabled, type, size]);

  return (
    <div
      className={`${chipStyles} ${styles}`}
      onClick={() => {
        if (type === "button" && handleClick) {
          handleClick();
        }
      }}
    >
      {children}
    </div>
  );
}

export default Chip;
