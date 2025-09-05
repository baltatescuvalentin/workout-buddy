import type React from "react";
import { useMemo } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface IInput<T extends FieldValues> {
  size?: "big" | "medium" | "small";
  name: string;
  id: Path<T>;
  type?: string;
  children?: React.ReactNode;
  errors?: FieldErrors<T> | undefined;
  validation?: RegisterOptions<T>;
  register: UseFormRegister<T>;
  info?: string;
}

function FormInput<T extends FieldValues>({
  name,
  id,
  children,
  errors,
  register,
  type,
  size,
  validation,
  info,
}: IInput<T>) {
  const cSize = useMemo(() => {
    if (size === "small") {
      return "px-2.5 pb-1.5 pt-2";
    } else if (size === "medium") {
      return "px-2.5 pb-2 pt-3";
    } else {
      return "px-2.5 pb-2.5 pt-4";
    }
  }, [size]);

  return (
    <div className=" w-full">
      <div className="relative">
        <input
          {...register(id, {
            ...validation,
            setValueAs: (v) => (type === "number" ? Number(v) : undefined),
          })}
          type={type ?? "text"}
          id={id}
          className={`${cSize} block w-full text-sm text-gray-900 bg-transparent rounded-lg border-gray-300 appearance-none focus:outline-none focus:ring-1 -ring-offset-1 ring-[var(--main-blue)] border-1  peer ${
            errors?.[id] && "ring-red-500 ring-1"
          }`}
          placeholder=" "
        />
        <label
          htmlFor={id}
          className={`absolute text-sm text-main-gray duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-main-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${
            errors?.[id] && "peer-focus:text-red-500 text-red-500"
          }`}
        >
          {name}
        </label>
      </div>
      {info && <p className="text-xs text-gray-400">{info}</p>}
      <div
        className={`${
          errors?.[id] ? "visible" : "invisible"
        } text-xs text-red-500 leading-5`}
      >
        {(errors?.[id]?.message as string) || "placeholder"}
        {children}
      </div>
    </div>
  );
}

export default FormInput;
