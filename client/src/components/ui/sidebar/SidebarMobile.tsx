import { useAppSelector } from "../../../hooks/useTypedStore";
import { FaDumbbell } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa";
import { IoCalculatorSharp } from "react-icons/io5";
import { FaRunning } from "react-icons/fa";
import { VscGraphLine } from "react-icons/vsc";
import { VscGraph } from "react-icons/vsc";
import { FaUser } from "react-icons/fa";
import SidebarElement from "./SidebarElement";
import useUser from "../../../hooks/useUser";
import SidebarElementAuth from "./SidebarElementAuth";
import { useNavigate } from "react-router";

function SidebarMobile() {
  const sidebar = useAppSelector((state) => state.sidebar);
  const user = useUser();
  const navigate = useNavigate();

  return (
    <div className={`block sm:hidden`}>
      <div
        className={`fixed top-16 w-[95%] h-[90%]  ml-2.5  rounded-lg shadow-lg z-100 bg-white flex flex-col justify-between gap-2 transition-all duration-200 delay-100 p-6 border-r-2 border-gray-200 ${
          sidebar ? "left-0" : "-left-[380px]"
        }`}
      >
        {/* <div className={`flex flex-row items-center px-2 gap-2`}>
          <FaDumbbell color="var(--main-blue)" size={36} />

          <p className={`font-bold text-2xl italic text-main-blue`}>
            Workout Buddy
          </p>
        </div>
        <hr className="w-full border-gray-100" /> */}
        <div className="flex flex-col gap-2 no-scrollbar overflow-y-auto overflow-x-visible">
          <SidebarElement
            name="Home"
            handleClick={() => navigate("/")}
            currentRoute="home"
            Icon={IoMdHome}
            key={"home"}
          />
          <SidebarElement
            name="Exercices"
            handleClick={() => navigate("/exercices")}
            currentRoute="exercices"
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
          <SidebarElement
            name="Summary"
            handleClick={() => navigate("/summary")}
            currentRoute="summary"
            Icon={VscGraph}
          />{" "}
          <SidebarElement
            name="Summary"
            handleClick={() => navigate("/summary")}
            currentRoute="summary"
            Icon={VscGraph}
          />{" "}
          <SidebarElement
            name="Summary"
            handleClick={() => navigate("/summary")}
            currentRoute="summary"
            Icon={VscGraph}
          />
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
                Icon={FaUser}
                handleClick={() => navigate("/profile")}
              />
              <SidebarElementAuth
                name="Log out"
                Icon={PiSignOut}
                handleClick={() => {}}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SidebarMobile;
