import { useEffect } from "react";
import useIsMobile from "./hooks/useIsMobile";
import Toast from "./providers/Toast";
import { useAppDispatch, useAppSelector } from "./hooks/useTypedStore";
import { setExerciseUtils, toggleSidebar } from "./stores/User";
import axios from "../src/axios/AxiosConfig";
import toast from "react-hot-toast";

function App() {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const exerciseUtils = useAppSelector((state) => state.exercisesUtils);

  useEffect(() => {
    axios
      .get("/exercises/getExerciseUtils")
      .then((data) => {
        if (
          !exerciseUtils ||
          ["bodyParts", "equipment", "target", "types"].some(
            (key) =>
              !Array.isArray(
                exerciseUtils[key as keyof typeof exerciseUtils]
              ) || exerciseUtils[key as keyof typeof exerciseUtils].length === 0
          )
        ) {
          dispatch(setExerciseUtils(data.data.data));
        }
      })
      .catch((err) => {
        if (err.response?.data?.error) {
          toast.error("Error fetching data. Retry!");
        }
      });
  }, [dispatch, exerciseUtils]);

  useEffect(() => {
    if (isMobile) {
      dispatch(toggleSidebar(false));
    }
  }, [dispatch, isMobile]);

  return (
    <>
      <Toast />
    </>
  );
}

export default App;
