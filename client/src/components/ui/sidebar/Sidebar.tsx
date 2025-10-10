import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedStore";
import { FaDumbbell } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa";
import { IoCalculatorSharp } from "react-icons/io5";
import { FaRunning } from "react-icons/fa";
import { VscGraphLine } from "react-icons/vsc";
import { VscGraph } from "react-icons/vsc";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import SidebarElement from "./SidebarElement";
import { toggleSidebar } from "../../../stores/User";
import useUser from "../../../hooks/useUser";
import SidebarElementAuth from "./SidebarElementAuth";
import { useNavigate } from "react-router";
import { LuTimer } from "react-icons/lu";

function Sidebar() {
  const sidebar = useAppSelector((state) => state.sidebar);
  const user = useUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  return (
    <div className="relative">
      <div
        className={`fixed z-100 top-16 sm:top-2 sm:left-2 w-[95%] flex flex-col justify-between h-[90%] sm:h-[98%] ml-3 bg-white sm:ml-0  rounded-xl shadow-md  transition-[width,delay,left] duration-300 px-3 py-6 border-1 border-gray-200 ${
          sidebar ? "sm:w-[300px]  sm:delay-150" : "sm:w-[75px]"
        } ${sidebar ? "left-0" : "-left-[680px]"}`}
      >
        <button
          type="button"
          className={`absolute hidden sm:block z-20 -right-[15px] top-[56px] rounded-md border-1 border-gray-400 bg-white cursor-pointer`}
          onClick={() => dispatch(toggleSidebar(!sidebar))}
        >
          {sidebar ? (
            <IoIosArrowBack size={22} />
          ) : (
            <IoIosArrowForward size={22} />
          )}
        </button>
        <div className="flex flex-col justify-between gap-2">
          <div className={`hidden sm:flex flex-row items-center px-2`}>
            <div className="flex items-center justify-center">
              <FaDumbbell color="var(--main-blue)" size={36} />
            </div>

            <p
              className={`text-xl transition-[margin,max-width,opacity] ease-in-out whitespace-nowrap overflow-hidden italic text-main-blue ${
                sidebar
                  ? "sm:opacity-100 sm:max-w-[250px] sm:delay-300 ml-2"
                  : "sm:opacity-0 sm:max-w-0 sm:delay-75 sm:-ml-1"
              }`}
            >
              Workout Buddy
            </p>
          </div>
          <hr className="hidden sm:block w-full border-gray-100" />
          <div className={`flex flex-col gap-2 no-scrollbar`}>
            <SidebarElement
              name="Home"
              handleClick={() => navigate("/")}
              currentRoute="home"
              Icon={IoMdHome}
              key={"home"}
            />
            <SidebarElement
              name="Exercises"
              handleClick={() => navigate("/exercises")}
              currentRoute="exercises"
              Icon={FaDumbbell}
            />
            <SidebarElement
              name="Calculators"
              handleClick={() => navigate("/calculators")}
              currentRoute="calculators"
              Icon={IoCalculatorSharp}
            />
            <SidebarElement
              name="Workouts"
              handleClick={() => navigate("/workouts")}
              currentRoute="workouts"
              Icon={FaRunning}
            />
            <SidebarElement
              name="Exercise"
              handleClick={() => navigate("/exercise")}
              currentRoute="exercise"
              Icon={LuTimer}
            />
            <SidebarElement
              name="Tracker"
              handleClick={() => navigate("/tracker")}
              currentRoute="tracker"
              Icon={VscGraphLine}
            />
            <SidebarElement
              name="Summary"
              handleClick={() => navigate("/summary")}
              currentRoute="summary"
              Icon={VscGraph}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <hr className="w-full border-gray-100" />
          {user.isNoUser() && (
            <>
              <SidebarElementAuth
                name="Sign in"
                Icon={PiSignIn}
                handleClick={() => navigate("/login")}
              />
              <SidebarElementAuth
                name="Sign up"
                Icon={FaWpforms}
                handleClick={() => navigate("/register")}
              />
            </>
          )}
          {!user.isNoUser() && (
            <>
              <SidebarElementAuth
                name="Profile"
                Icon={FaRegUser}
                handleClick={() => navigate("/profile")}
                currentRoute="profile"
              />
              <SidebarElementAuth
                name="Log out"
                Icon={PiSignOut}
                handleClick={logoutUser}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
