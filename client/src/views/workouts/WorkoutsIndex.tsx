import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

function WorkoutsIndex() {
  const [lineStyle, setLineStyle] = useState<string>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/workouts") {
      navigate("/workouts/create");
    }

    if (location.pathname === "/workouts/create") {
      setLineStyle("left-0 w-[128px]");
    } else if (location.pathname === "/workouts/show") {
      setLineStyle("left-[140px] w-[104px]");
    } else {
      setLineStyle("left-[256px] w-[104px]");
    }
  }, [setLineStyle, navigate, location]);

  return (
    <>
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={() => {
            navigate("/workouts/create");
          }}
          className={`text-lg transition-all hover:text-main-blue duration-200 cursor-pointer ${
            location.pathname === "/workouts/create" && "text-main-blue"
          }`}
        >
          Create Workout
        </button>

        <button
          onClick={() => {
            navigate("/workouts/show");
          }}
          className={`text-lg transition-all hover:text-main-blue duration-200 cursor-pointer ${
            location.pathname === "/workouts/show" && "text-main-blue"
          }`}
        >
          My Workouts
        </button>
        {location.pathname.includes("/workouts/edit") && (
          <button
            className={`text-lg transition-all hover:text-main-blue duration-200 cursor-pointer ${
              location.pathname.includes("/workouts/edit") && "text-main-blue"
            }`}
          >
            Edit Workout
          </button>
        )}
      </div>
      <div className="h-0.5 bg-gray-100 w-full mt-2.5 relative">
        <div
          className={`absolute top-0 bg-main-blue h-full transition-[left,width] duration-200 ${lineStyle}`}
        ></div>
      </div>
      <div className="mt-6">
        <Outlet />
        {/* {currentTab === "create" ? (
          <WorkoutsCreate switchTab={() => setCurrentTab("workouts")} />
        ) : (
          <WorkoutsShow />
        )} */}
      </div>
    </>
  );
}

export default WorkoutsIndex;
