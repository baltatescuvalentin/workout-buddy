import { useEffect, useState } from "react";
import type { IWorkout } from "../../../interfaces/IWorkouts";
import axios from "../../../axios/AxiosConfig";
import Skeleton from "../../../components/ui/skeletons/Skeleton";
import Card from "../../../components/ui/cards/Card";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Button from "../../../components/ui/buttons/Button";
import { Link } from "react-router";

function WorkoutsShow() {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string>("");

  const truncateText = (text: string, size: number) => {
    let t: string = "";

    if (text.length < size) {
      return text;
    }

    if (text.length > size) {
      t = text.slice(0, size) + "...";
    }

    return t;
  };

  const deleteWorkout = (workout: IWorkout) => {
    axios
      .delete(`/workoutroutine/delete/${workout._id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        if (error.response?.data?.error) {
          setErr(error.response.data.error);
        } else {
          setErr("Error retrieving the workouts, try again later!");
        }
      });
  };

  const sendToExercise = (id: string) => {
    <Link to="/exercise" state={{ id: id }} />;
  };

  const fetchData = () => {
    setLoading(true);

    axios
      .get("/workoutroutine/getWorkouts")
      .then((data) => {
        console.log(data);
        setWorkouts(data.data.data);
        setErr("");
      })
      .catch((error) => {
        if (error.response?.data?.error) {
          setErr(error.response.data.error);
        } else {
          setErr("Error retrieving the workouts, try again later!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p className="text-2xl font-bold">My Workouts</p>
      <p className="text-lg">Manage your saved workout plans</p>
      {err && <p className="text-red-500 text-sm">{err}</p>}
      {loading ? (
        <div className="flex flex-row flex-wrap gap-2 lg:gap-6 items-center mt-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Card key={i} styles="w-full md:w-[400px]">
              <Skeleton type="line" styles="w-full h-[16px]" />
              <Skeleton type="rect" styles="w-full h-[100px]" />
            </Card>
          ))}
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-3 lg:gap-6 mt-6 `}
        >
          {workouts?.map((w) => (
            <div key={w.name} className="flex items-center justify-center">
              <Card styles="w-full md:w-[400px]">
                <div className="flex flex-row items-center justify-between gap-4 w-full">
                  <p>{truncateText(w.name, 125)}</p>
                  <div className="flex flex-row items-center gap-1">
                    <Link
                      to={`/workouts/edit/${w._id}`}
                      className="border border-gray-200 cursor-pointer p-1 rounded-md shadow-sm"
                    >
                      <FaEdit size={14} className="hover:text-blue-500" />
                    </Link>
                    <div
                      className="border border-gray-200 cursor-pointer p-1 rounded-md shadow-sm"
                      onClick={() => deleteWorkout(w)}
                    >
                      <FaTrash size={14} className="hover:text-red-500" />
                    </div>
                  </div>
                </div>

                {w.description && (
                  <p className="text-sm text-start text-ellipsis">
                    {truncateText(w.description, 250)}
                  </p>
                )}

                <Link to="/exercise" state={{ id: w._id }}>
                  <Button color="primary" size="small" styles="w-full">
                    Start Workout
                  </Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutsShow;
