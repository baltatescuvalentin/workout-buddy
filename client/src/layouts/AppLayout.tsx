import { Outlet } from "react-router";
import Sidebar from "../components/ui/sidebar/Sidebar";
import { useAppSelector } from "../hooks/useTypedStore";
import Navbar from "../components/ui/navbar/Navbar";

function AppLayout() {
  const sidebar = useAppSelector((state) => state.sidebar);

  return (
    <>
      <Navbar />
      {/* <SidebarMobile /> */}
      <Sidebar />
      <div
        className={`p-7 transition-[margin,width] ease-in-out ml-0 w-full duration-300 ${
          sidebar &&
          "blur-xs sm:blur-none pointer-events-none sm:pointer-events-auto "
        } ${
          sidebar
            ? " sm:ml-[330px] sm:w-[calc(100%-330px)] "
            : " sm:ml-[120px] sm:w-[calc(100%-120px)]  "
        }`}
      >
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
