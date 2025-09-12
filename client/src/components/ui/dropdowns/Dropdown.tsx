import React, { useMemo, useRef, useState } from "react";
import type {
  Path,
  FieldValues,
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import useClickOutside from "../../../hooks/useClickOutside";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type DropdownType = {
  name: string;
  value: string | number;
};

interface IDropdown<T extends FieldValues> {
  name: string;
  id: Path<T>;
  values: DropdownType[];
  errors?: FieldErrors<T>;
  children?: React.ReactNode;
  size?: "big" | "medium" | "small";
  validation?: RegisterOptions<T>;
  register: UseFormRegister<T>;
  styles?: string;
  info?: string;
  defaultValue?: number | string;
}

function Dropdown<T extends FieldValues>({
  name,
  values,
  id,
  size,
  errors,
  children,
  validation,
  register,
  styles,
  info,
  defaultValue,
}: IDropdown<T>) {
  const [selectValue, setSelectValue] = useState<DropdownType>({
    value: defaultValue || "",
    name: defaultValue ? String(defaultValue) : name,
  });
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => {
    if (open) {
      setOpen(false);
    }
  });

  const cSize = useMemo(() => {
    if (size === "small") {
      return "!py-1 !px-2 !min-w-[55px]";
    } else if (size === "medium") {
      return "!py-1.5 !px-3";
    } else {
      return "!py-3 !px-3";
    }
  }, [size]);

  const { onChange, ref, ...rest } = register(id, validation);

  function onClickSelect(val: DropdownType) {
    setSelectValue({
      name: val.name,
      value: val.value,
    });

    onChange({
      target: {
        name: id,
        value: val.value,
      },
    });
  }

  return (
    <div className={`w-full ${styles}`}>
      <input type="hidden" ref={ref} {...rest} value={selectValue.value} />
      <div
        ref={dropdownRef}
        className={`relative flex items-center justify-between rounded-md bg-inherit cursor-pointer -ring-offset-1 ring-[var(--main-blue)] px-3 py-3 pr-4 text-sm border-1 border-gray-300
          ${open && "ring-1"} ${
          errors?.[id] && "ring-red-500 ring-1"
        } ${cSize}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p>{selectValue.name}</p>

        {open ? <IoIosArrowUp /> : <IoIosArrowDown />}

        <ul
          className={`absolute max-h-[200px] overflow-y-auto transition-all ease-in-out duration-300 flex gap-1.5 flex-col w-full top-12 left-0 z-20 p-2 rounded-md border-1 border-gray-300 shadow-lg list-none bg-white
              ${
                open
                  ? "opacity-100 top-12 "
                  : "opacity-0 top-10 pointer-events-none"
              }
              ${size === "small" && "!top-9"}
              ${size === "medium" && "!top-10.5"}
              `}
        >
          {values.map((val: DropdownType) => (
            <li
              onClick={() => onClickSelect(val)}
              key={val.value}
              className={`p-1 cursor-pointer hover:bg-gray-100 rounded-md ${
                val.value === selectValue.value &&
                "bg-main-blue text-white hover:bg-main-blue"
              }`}
            >
              {val.name}
            </li>
          ))}
        </ul>

        <div className="absolute"></div>
      </div>
      {info && <p className="text-xs text-gray-400">{info}</p>}
      {errors && (
        <div
          className={`${
            errors?.[id] ? "visible" : "invisible"
          } text-xs text-red-500 leading-5`}
        >
          {(errors?.[id]?.message as string) || "placeholder"}
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
