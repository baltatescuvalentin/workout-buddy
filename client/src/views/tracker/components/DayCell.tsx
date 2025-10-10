import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

interface IDayCell {
  id: string;
  day: string | number;
  active: boolean;
  styles?: string;
  handleClick?: () => void;
}

function DayCell({ id, day, active, styles, handleClick }: IDayCell) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef(null);

  useClickOutside(ref, () => {
    if (open) {
      setOpen(false);
    }
  });

  return (
    <div
      className={`relative h-[85px] sm:h-[125px] ${open && "bg-blue-200"} ${
        active && "bg-blue-100"
      } ${styles}`}
      ref={ref}
    >
      {open && (
        <div
          className={`absolute -top-10 z-10 w-fit rounded-lg border border-gray-100 shadow-lg bg-white flex flex-row gap-2 py-1 px-1.5 ${
            active ? " left-0 sm:left-[15%]" : " left-0 sm:left-[30%]"
          }`}
        >
          {active ? (
            <div className="flex flex-row gap-1">
              <div
                className="cursor-pointer p-1 hover:bg-gray-200 rounded-sm"
                onClick={() => {}}
              >
                <FaRegEdit size={16} color="var(--main-blue)" />
              </div>

              <div
                className="cursor-pointer p-1 hover:bg-gray-200 rounded-sm"
                onClick={() => {}}
              >
                <MdDeleteOutline size={16} color="var(--main-danger)" />
              </div>
            </div>
          ) : (
            <div
              className="cursor-pointer p-1 hover:bg-gray-200 rounded-sm"
              onClick={() => {}}
            >
              <FaPlus size={16} color="var(--main-green)" />
            </div>
          )}
        </div>
      )}

      <div
        className="p-2 transition-all duration-200 hover:bg-zinc-100 cursor-pointer h-full"
        onClick={() => {
          setOpen((prev) => !prev);
          handleClick?.();
        }}
      >
        <div className="flex items-center justify-end gap-3">
          {active && <div className="w-2 h-2 bg-main-blue rounded-full"></div>}
          <p
            className={`text-end text-sm md:text-base ${
              open && "text-main-blue"
            }`}
          >
            {day}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DayCell;
