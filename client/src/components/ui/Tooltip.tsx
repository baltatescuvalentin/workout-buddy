import React from "react";
import { useAppSelector } from "../../hooks/useTypedStore";

interface ITooltip {
  text: string;
  children: React.ReactNode;
}

const Tooltip = ({ children, text }: ITooltip) => {
  const sidebar = useAppSelector((state) => state.sidebar);

  return (
    <div className={`relative group`}>
      {children}
      <div
        className={`absolute left-1/2 transform translate-x-8 translate-y-12 bottom-full mb-2 hidden ${
          !sidebar ? "sm:group-hover:block" : ""
        }  bg-gray-400 text-white text-sm rounded py-1 px-2 z-100 min-w-16 text-center`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Tooltip;
