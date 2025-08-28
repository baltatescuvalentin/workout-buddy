import { FaDumbbell } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedStore";
import { toggleSidebar } from "../../../stores/User";
import { useNavigate } from "react-router";

function Navbar() {
  const sidebar = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-2 w-[95%] ml-2.5 shadow-lg z-100 px-4 py-2 sm:hidden sm:pointer-events-none rounded-lg bg-white flex flex-row items-center justify-between
    `}
    >
      <RxHamburgerMenu
        size={32}
        onClick={() => dispatch(toggleSidebar(!sidebar))}
      />
      <div
        className={`flex flex-row items-center px-2 gap-2`}
        onClick={() => navigate("/")}
      >
        <p className={`font-bold text-lg italic text-main-blue `}>
          Workout Buddy
        </p>

        <FaDumbbell color="var(--main-blue)" size={32} />
      </div>
    </div>
  );
}

export default Navbar;
