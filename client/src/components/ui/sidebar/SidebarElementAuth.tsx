import type { IconType } from "react-icons/lib";
import { useAppSelector } from "../../../hooks/useTypedStore";
import Tooltip from "../Tooltip";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { matchRoute } from "../../../router/helper";
interface ISidebarElementAuth {
  name: string;
  Icon: IconType;
  currentRoute?: string;
  handleClick: () => void | Promise<void>;
}

function SidebarElementAuth({
  Icon,
  handleClick,
  name,
  currentRoute,
}: ISidebarElementAuth) {
  const sidebar = useAppSelector((state) => state.sidebar);
  const { pathname } = useLocation();
  const [currRoute, setCurrRoute] = useState<string>(matchRoute(pathname));

  useEffect(() => {
    const routeName = matchRoute(pathname);
    setCurrRoute(routeName);
  }, [pathname]);

  return (
    <>
      <Tooltip text={name} show={sidebar ? false : true}>
        <div
          className={`flex flex-row items-center justify-start p-3 h-[52px] rounded-lg cursor-pointer 
            ${
              currentRoute === currRoute ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
          onClick={() => handleClick()}
        >
          <div className="flex items-center justify-center ml-0.25">
            <Icon size={24} />
          </div>
          <p
            className={`text-base transition-[margin,max-width,opacity] ease-in-out whitespace-nowrap overflow-hidden ${
              sidebar
                ? "sm:opacity-100 sm:max-w-xs sm:delay-300 sm:ml-2"
                : "sm:opacity-0 sm:max-w-0 sm:delay-75 sm:-ml-1"
            }`}
          >
            {name}
          </p>
        </div>
      </Tooltip>
    </>
  );
}

export default SidebarElementAuth;
